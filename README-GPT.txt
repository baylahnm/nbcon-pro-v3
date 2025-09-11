```txt
NBCON PRO — CURSOR/CODEX BUILD SPEC (TXT, PASTE-READY) — v1.0 (KSA-FIRST)

========================
0) NON-NEGOTIABLES (USE EXACTLY)
========================
- Monorepo: pnpm workspaces
- Web: Vite + React + TypeScript + Tailwind + shadcn/ui + React Router + TanStack Query
- Mobile: Expo (React Native) — iOS-first
- Backend: Supabase (Auth, Postgres, RLS, Storage, Edge Functions, Realtime)
- Payments: Stripe Connect (test) + KSA gateway adapter (stub)
- Maps/Geo: Mapbox GL (fallback adapter for Google Maps)
- i18n: react-i18next with English + Arabic (RTL), Hijri/Gregorian toggle
- Theming: Light/Dark/System via Tailwind variables
- Security/Compliance: PDPL guardrails, ZATCA e-invoice placeholder module, audit trails
- Package manager: pnpm only (no npm/yarn). Expo via `pnpm exec expo`.

========================
1) CORE LIFECYCLE (STAGES)
========================
① Discover & Verify → ② Scope & Quote → ③ Assign & Start → ④ Execute & Track → ⑤ Deliver & Approve → ⑥ Invoice & Payout → ⑦ Aftercare

========================
2) PRIORITIES
========================
MUST-HAVE (MVP 3–6 mo): auth, profiles, SCE verify (manual), job post, quotes, assign, milestones, escrow fund/release, payouts, geo check-in/out, chat, files, notifications, ratings, invoices (VAT line), EN/AR + RTL, RLS, audit logs.
SHOULD-HAVE (Phase 2 6–12 mo): team bookings, templates, bulk posting, enterprise billing, BI dashboards, advanced filters, deliverables versioning, scheduler, dispute console, tax automations.
NICE-TO-HAVE (Phase 3 12–24 mo): AI QA, AR/VR, IoT feeds, blockchain hash anchoring, predictive analytics.

========================
3) MONOREPO LAYOUT
========================
/apps
  /web        # Vite React app
  /mobile     # Expo RN app
  /admin      # Admin web (optional MVP+)
/packages
  /ui         # shared UI (shadcn wrappers, primitives)
  /lib        # utils (auth, i18n, date, money, geo, errors)
  /types      # zod schemas + inferred TS types
  /config     # eslint, tailwind, tsconfig, prettier, commitlint
  /api        # typed SDK calling Edge Functions/RPC
/supabase
  /migrations # SQL
  /policies   # RLS SQL
  /seed       # seed data
/tools
  codegen.ts  # db types, clients

========================
4) ENV KEYS
========================
# client
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
VITE_MAPBOX_TOKEN=
VITE_STRIPE_PUBLISHABLE_KEY=

# server (Edge Functions/build env)
SUPABASE_SERVICE_ROLE_KEY=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
KSA_GATEWAY_API_KEY=
ZATCA_INTEGRATION_KEY=

========================
5) DATABASE V0 (SUPABASE/POSTGRES)
========================
-- All tables: created_at timestamptz default now(), updated_at, created_by uuid, deleted_at
-- Enums
create type role_t as enum ('engineer','client','admin','enterprise');
create type job_status_t as enum ('draft','open','quoting','assigned','active','delivered','completed','disputed','cancelled');
create type quote_status_t as enum ('submitted','accepted','rejected','withdrawn');
create type milestone_status_t as enum ('pending','in_progress','submitted','approved','paid');
create type sce_status_t as enum ('pending','verified','rejected');
create type checkin_type_t as enum ('in','out');

-- Profiles
create table public.profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  role role_t not null,
  full_name text,
  phone text,
  locale text default 'en',
  avatar_url text,
  sce_id text,
  sce_status sce_status_t default 'pending'
);

-- Companies (Phase 2 capable)
create table public.companies (
  id uuid primary key default gen_random_uuid(),
  owner_user_id uuid references auth.users(id),
  name text not null,
  cr_number text,
  vat_number text,
  logo_url text
);
create table public.company_members (
  id uuid primary key default gen_random_uuid(),
  company_id uuid references public.companies(id) on delete cascade,
  user_id uuid references auth.users(id) on delete cascade,
  role text,
  status text
);

-- Jobs
create table public.jobs (
  id uuid primary key default gen_random_uuid(),
  client_user_id uuid references auth.users(id),
  title text not null,
  category text,
  scope_json jsonb,
  address text,
  lat double precision,
  lng double precision,
  radius_m integer default 100,
  status job_status_t default 'draft',
  budget_min numeric,
  budget_max numeric,
  currency text default 'SAR',
  due_date date
);
create index jobs_geo_idx on public.jobs using gist (ST_SetSRID(ST_MakePoint(lng,lat),4326));

-- Quotes
create table public.quotes (
  id uuid primary key default gen_random_uuid(),
  job_id uuid references public.jobs(id) on delete cascade,
  engineer_user_id uuid references auth.users(id),
  amount numeric not null,
  currency text default 'SAR',
  terms text,
  status quote_status_t default 'submitted'
);

-- Milestones
create table public.milestones (
  id uuid primary key default gen_random_uuid(),
  job_id uuid references public.jobs(id) on delete cascade,
  title text,
  amount numeric not null,
  sequence int not null,
  status milestone_status_t default 'pending'
);

-- Time & Geofence
create table public.time_entries (
  id uuid primary key default gen_random_uuid(),
  job_id uuid references public.jobs(id) on delete cascade,
  engineer_user_id uuid references auth.users(id),
  start_ts timestamptz,
  end_ts timestamptz,
  hours numeric
);
create table public.checkins (
  id uuid primary key default gen_random_uuid(),
  job_id uuid references public.jobs(id) on delete cascade,
  engineer_user_id uuid references auth.users(id),
  type checkin_type_t,
  ts timestamptz default now(),
  lat double precision,
  lng double precision,
  radius_m integer
);

-- Messaging
create table public.threads (
  id uuid primary key default gen_random_uuid(),
  job_id uuid references public.jobs(id) on delete cascade
);
create table public.messages (
  id uuid primary key default gen_random_uuid(),
  thread_id uuid references public.threads(id) on delete cascade,
  sender_user_id uuid references auth.users(id),
  body text,
  attachments jsonb
);

-- Documents
create table public.documents (
  id uuid primary key default gen_random_uuid(),
  job_id uuid references public.jobs(id) on delete cascade,
  uploaded_by uuid references auth.users(id),
  name text,
  url text,
  type text,
  version int default 1,
  signed_off boolean default false
);

-- Ratings
create table public.ratings (
  id uuid primary key default gen_random_uuid(),
  job_id uuid references public.jobs(id) on delete cascade,
  from_user_id uuid references auth.users(id),
  to_user_id uuid references auth.users(id),
  stars int check (stars between 1 and 5),
  feedback text
);

-- Payments/Invoices (MVP)
create table public.escrows (
  id uuid primary key default gen_random_uuid(),
  job_id uuid references public.jobs(id) on delete cascade,
  hold_amount numeric,
  currency text default 'SAR',
  status text check (status in ('funded','partially_released','released','refunded')) default 'funded'
);
create table public.payments (
  id uuid primary key default gen_random_uuid(),
  job_id uuid references public.jobs(id),
  milestone_id uuid references public.milestones(id),
  type text check (type in ('charge','payout','refund')),
  amount numeric,
  currency text default 'SAR',
  provider text check (provider in ('stripe','ksa_gateway')),
  status text
);
create table public.invoices (
  id uuid primary key default gen_random_uuid(),
  job_id uuid references public.jobs(id),
  number text unique,
  subtotal numeric,
  vat_amount numeric,
  total numeric,
  status text,
  pdf_url text
);

-- Disputes & Audit
create table public.disputes (
  id uuid primary key default gen_random_uuid(),
  job_id uuid references public.jobs(id),
  raised_by uuid references auth.users(id),
  reason text,
  status text,
  resolution_json jsonb
);
create table public.audit_logs (
  id uuid primary key default gen_random_uuid(),
  actor_user_id uuid references auth.users(id),
  entity text,
  entity_id uuid,
  action text,
  meta jsonb
);

========================
6) RLS POLICY SKETCH (ENABLE THEN ALLOW)
========================
-- Deny by default: alter table ... enable row level security.
-- profiles: user_id = auth.uid() read/write; admins can read all.
-- jobs: owner (client_user_id) full; visible fields of 'open' jobs to engineers; assigned engineer full; company admins via membership.
-- quotes: engineer owns their rows; job owner (client) can read; accepted quote becomes visible to assigned engineer.
-- milestones/time/checkins/messages/documents/ratings: participants of job (client + assigned engineer[s]) can read; owner writes own rows.
-- admins bypass via dedicated role flag.

========================
7) EDGE FUNCTIONS / RPC (TYPED, ZOD)
========================
rpc_post_job(scope_json, ...): returns job_id
rpc_submit_quote(job_id, amount, terms)
rpc_accept_quote(quote_id): assigns engineer, job -> 'assigned'
rpc_create_milestone(job_id, title, amount, sequence)
rpc_checkin(job_id, lat, lng, type): verifies within radius
rpc_submit_deliverable(job_id, url, type)
rpc_approve_milestone(milestone_id): release escrow
rpc_rate_user(job_id, to_user_id, stars, feedback)
rpc_list_feed(role, filters)
webhook: /stripe/webhook, /payments/ksa/webhook, /notifications/webpush

========================
8) PAYMENTS ADAPTER CONTRACTS
========================
interface EscrowProvider {
  createHold(jobId: string, amount: number, currency: 'SAR'): Promise<{ holdId: string }>;
  release(holdId: string, milestoneId: string): Promise<void>;
  refund(holdId: string, reason?: string): Promise<void>;
}
-- Implement Stripe provider now; create ksaGateway provider with same interface (stub).
-- Escrow flow: client funds -> escrows.status='funded' -> approval triggers release -> payout to engineer (test mode ok).

========================
9) ANALYTICS WRAPPER
========================
type EventBase = { ts: string; user_role: 'engineer'|'client'|'enterprise'|'admin'; route: string; lang: 'en'|'ar'; env: 'web'|'mobile' };
function track(name: string, payload: Record<string,unknown> & EventBase): void;

========================
10) ERROR & OFFLINE CONTRACTS
========================
type AppError = { code: string; message_en: string; message_ar: string; retryable: boolean };
Offline policy: queue mutations in an 'outbox', optimistic UI for quotes/milestones, replay on reconnect; show a SyncBanner.

========================
11) UI ROUTES (WEB) — /apps/web
========================
/                   Dashboard (role-aware)
/auth/*            Login/Signup/OTP
/jobs/new          Job Wizard (Stepper EN/AR)
/jobs/:id          Timeline, milestones, chat, files
/quotes/:id        Review/Accept
/wallet            Escrow & payouts
/profile           Profile + SCE verification upload/status
/settings          Language/RTL, theme, notifications
/help              Help center

========================
12) MOBILE (EXPO) — /apps/mobile
========================
Tabs: Home, Jobs, Chat, Wallet, Profile
Screens: Check-in/out (geofence), Start/End shift, Timesheet, Deliverable upload (photo/PDF)

========================
13) SHARED UI COMPONENTS — /packages/ui
========================
JobCard, QuoteCard, MilestoneRow, EscrowBadge, GeoCheckButton, TimesheetTimer
ProfileHeader, CredentialStatus, RatingStars
MoneyInput, CurrencyBadge, VatBreakdown
KsaAddressPicker (Mapbox + reverse geocode)
LangSwitcher (EN/AR), ThemeToggle, RtlContainer
FileDropzone (CAD/PDF/BIM) to Supabase Storage

========================
14) I18N & RTL RULES
========================
- Namespaces: common, nav, jobs, payments
- Arabic RTL with dir="rtl"; logical spacing (ms/me) classes
- Hijri/Gregorian toggle util; Arabic numerals for ar locale
- All user-facing strings come from i18n keys

========================
15) PERFORMANCE BUDGETS
========================
- Initial route JS ≤ 250KB gzip; per-route chunk ≤ 150KB
- LCP ≤ 2.8s on mid-range Android
- Images lazy + responsive; code-split feature routes

========================
16) NOTIFICATIONS
========================
- Supabase Realtime + Expo push/Web Push
- Events: quote submitted/accepted, milestone submitted/approved, payout sent, dispute opened
- Quiet hours configurable in Settings

========================
17) SECURITY & PDPL
========================
- No PII in logs; signed URLs, 5MB default upload cap, MIME allow-list
- Data export/delete endpoints per user
- Audit log on payments, verification, role changes
- Secrets server-side only

========================
18) ACCEPTANCE CRITERIA (MVP DEMO)
========================
- Client posts job (EN/AR), receives ≥1 quote, accepts, funds escrow
- Engineer assigned, checks in within geofence, logs time, uploads deliverable
- Client approves milestone -> payout path triggered
- Chat + files work; notifications delivered
- Invoice PDF with VAT line and bilingual labels
- Admin verifies SCE docs and resolves a dispute end-to-end

========================
19) INITIAL SPRINTS (S0–S2)
========================
S0: Supabase project, schema, RLS enable; seeds; /packages scaffolds; configs
S1: Web auth + i18n/RTL + theme; Profile + SCE upload; Job Wizard; Job list/detail
S2: Quote submit/review/accept; Milestones; Stripe escrow (test); Chat + Files; Geofence check-in (mobile); Invoice PDF; Ratings; Simple dispute intake; Admin SCE review

========================
20) SCRIPTS & TOOLING
========================
- Use pnpm for all commands
- ESLint + Prettier + TS strict; commitlint; lint-staged
- GitHub Actions: build, typecheck, test, deploy web, run migrations

========================
21) QUICK BOOTSTRAP COMMAND HINTS (FOR AI)
========================
pnpm init -y
pnpm -w add -D typescript eslint prettier turbo commitlint @changesets/cli
pnpm -w add zod date-fns @tanstack/react-query react-router-dom i18next react-i18next
# Scaffold apps (web/mobile/admin), Tailwind + shadcn, workspaces, basic routes
# Generate Supabase types, Edge Functions stubs, and API SDK in /packages/api
# Apply /supabase/migrations and enable RLS with policies

========================
22) STRETCH HOOKS (STUB FILES)
========================
/packages/lib/ai/assist.ts         # placeholder matching engine
/packages/lib/iot/adapter.ts       # attach sensor snapshots to jobs
/packages/lib/audit/blockchain.ts  # hash anchor (phase 3)
/packages/lib/payments/ksa.ts      # local gateway interface mirroring Stripe

END OF SPEC
:contentReference[oaicite:0]{index=0}
```
