# MASTER PROMPT (TXT)

PROJECT IDENTITY
NBCON Pro is a revolutionary engineering marketplace that fuses Uber’s on-demand convenience with LinkedIn’s professional networking—purpose-built for Saudi Arabia’s engineering sector. It is bilingual (EN/AR) and enterprise-grade, connecting certified engineers with clients via AI-powered matching across services from quick site inspections to complex multi-phase projects. Core capabilities include geofenced check-ins, milestone-based escrow payments, real-time project tracking, and professional credential verification with the Saudi Council of Engineers (SCE). The platform uses a multi-dashboard architecture (Client, Engineer, Enterprise, Admin), streamlining the full workflow from job posting and quote comparison through completion and payment—supporting Vision 2030 with advanced features like IoT integration, predictive analytics, blockchain verification, and comprehensive compliance (e.g., ZATCA e-invoicing). Goal: the first comprehensive digital ecosystem for professional engineering services in the Kingdom.

NON-NEGOTIABLE DESIGN/BUILD CONTEXT

* Stack assumptions for implementation: Vite + React + TypeScript, Tailwind, shadcn/ui, React Router, Zustand stores, Supabase (Auth/DB/Edge Functions).
* Bilingual & RTL: All UI ships with English + Arabic. Arabic sets dir="rtl" and mirrors layouts and chevrons.
* Accessibility: WCAG 2.2 AA, keyboard-first flows, 44px touch targets, focus-visible rings, logical tab order, semantic/ARIA annotations, reduced-motion fallbacks.
* Theming/tokens: brand #00D084; dark surfaces #0D1B0F / #1A2D1C / #243027; success/warn/error states. Dark/Light mode supported everywhere.
* Compliance & regionalization: SCE verification, Saudi VAT (15%), optional Hijri date display, ZATCA e-invoicing, PDPL-aligned patterns.
* Navigation requirements (see “MENU NAVIGATION STRUCTURE”) must be reflected in every patch’s specs and copy.

PERSISTENCE & WORKING METHOD

* Maintain a persistent “Design Log” (decisions, tokens, patterns, components). Never contradict earlier entries unless explicitly refactoring (log the change).
* Maintain a “Copy Source” for strings with keys matching i18n paths (common.\*): list EN then AR for each key.
* Maintain a “Component Library” catalogue with component name, purpose, props/signatures, states/variants, keyboard/focus behavior, and example usage.
* For every ticket/screen, define: primary/secondary actions, empty/loading/error/success states, validation rules, keyboard nav, SR announcements, analytics events/payloads, and dependencies.
* Output style: PLAIN TEXT ONLY with ASCII headings and lists. Provide ASCII wireframes when structure benefits from a quick sketch.

PRIORITIZATION & ROADMAP FRAMING

* Cluster features by priority:
  • Must-Have (Launch Core): platform cannot function without these.
  • Should-Have (Phase 2 Growth): adoption/retention enhancers.
  • Nice-to-Have (Differentiators): visionary, long-term scale.
* Map features to the 7-Stage product flow:
  ① Discover & Verify → ② Scope & Quote → ③ Assign & Start → ④ Execute & Track → ⑤ Deliver & Approve → ⑥ Invoice & Payout → ⑦ Aftercare.
* Tie each feature to roles/dashboards (Client, Engineer, Enterprise, Admin).
* Timeline planning:
  • MVP (3–6 months): \~25 Must-Haves (login, profiles, booking, payments, verification).
  • Phase 2 (6–12 months): \~40 growth features (analytics, team bookings, enterprise tools).
  • Phase 3 (12–24 months): differentiators (AI QA, AR/VR, blockchain logs).
* In every patch, tag each ticket with Priority (Must/Should/Nice), Stage (①–⑦), Role(s), and MVP/Phase marker.

MENU NAVIGATION STRUCTURE (MUST MATCH COPY & WIREFRAMES)
MAIN (common)

* Dashboard (expandable group)

  * Project
  * Revenue
  * Insights
  * Analytics
  * Contracts
  * Payments
  * Notifications (badge shows unread count)

ROLE-SPECIFIC

* Client

  * Jobs (expandable): Post New Job / Active / Archive / Favorites
  * Vendors
  * Browse Profiles
* Engineer

  * Jobs (expandable): Invites / Assigned / Completed
  * Availability
  * Portfolio
  * Rates
* Enterprise

  * Projects
  * Team
  * RFPs
  * Vendors
  * Browse Profiles
  * Business Intelligence
  * Compliance
* Admin

  * Users
  * Moderation
  * Finance Ops
  * System
  * Reports
  * Business Intelligence
  * Security

UTILITY (common)

* Settings
* Help Center
* Logout (destructive styling, red)

NAV RULES

* All items have EN/AR labels.
* Full RTL compatibility for AR.
* Role-based visibility.
* Expandable items for Dashboard and Jobs.
* Notifications show unread count badge.
* Responsive: collapses to icons on narrow view; mobile uses a sheet/overlay.
* Dark/Light mode supported.

DELIVERABLES PER PATCH
(1) Overview (goal, users, success criteria, constraints)
(2) User Flows (ASCII steps, branches)
(3) Screen Specs (regions, components, interactions, states, validation, error handling)
(4) Component Library updates/additions
(5) Copy EN/AR additions (i18n keys and strings)
(6) Empty states & edge cases (timeouts, offline, denied permissions, partial data)
(7) Accessibility notes (roles/names, focus order, SR announcements)
(8) Analytics events (name + payload schema)
(9) Open questions & assumptions
(10) Design Log updates

SEQUENCING
Work in 9 patches. Complete Patch 1 fully before starting Patch 2, and so on. At the start of each patch, restate dependencies from previous patches. At the end of each patch, provide a Checklist for implementation and QA (including WCAG checks, RTL checks, and i18n coverage).

\================================================================
PATCH 1 — AUTHENTICATION & ONBOARDING (Pages 1–20)
==================================================

GOAL
Design the end-to-end onboarding funnel: language → role → verification → profile setup → permissions → tutorial → first dashboard. Must be fast, trust-building, AR-ready, and mobile-aware.

TICKETS

* Splash & Language Selection screen
* Role Selection screen
* Engineer Dashboard (initial view)
* Client Dashboard (initial view)
* Browse Services screen
* Job Request Wizard (Step 2: Location)
* AI-Powered Matches & Quotes screen
* Job Timeline & Milestones screen
* Geofenced Check-In / Check-Out screen
* Profile & Verification Center screen
* Phone Number Verification screen
* SMS Code Entry screen
* Personal Information Setup screen
* Professional Credentials Upload screen
* Service Specialization Selection screen
* Service Area Definition screen
* Rate Setting Interface screen
* Welcome & Tutorial screen
* Permission Requests screen
* Account Type Confirmation screen

MANDATORY COMPONENTS (add to Component Library)
LanguageSelector, RoleCard, PhoneInput, OtpCodeInput(4-digit, auto-advance), Stepper, MapPicker (pan/zoom + radius), SlideToAct (Check-In), AvailabilityToggle, JobCard, MilestoneItem, UploadDropzone (multi-doc), PermissionCard, RateInputRow.

EVENTS (examples)
auth\_start, language\_change, role\_selected, phone\_submit, otp\_verified, sce\_verification\_started, profile\_completed, permission\_granted, tutorial\_completed, dashboard\_view.

NOTES

* SCE verification entry point lives in Profile & Verification Center.
* Include Hijri date display option in timelines where dates appear.

\================================================================
PATCH 2 — CORE JOB MANAGEMENT (Pages 21–40)
===========================================

GOAL
Design job creation, discovery, matching, quoting, tracking, messaging, files, and collaboration primitives.

TICKETS

* Quick Job Post screen
* Advanced Job Builder screen
* Job Templates Library screen
* Engineer Filtering & Search screen
* Engineer Portfolio Viewer screen
* Real-Time Job Matching screen
* Quote Comparison Matrix screen
* Job Status Tracking screen
* Emergency Job Request screen
* Job Archive & History screen
* In-App Messaging Hub screen
* Video Call Integration screen
* File Manager & Document Hub screen
* Project Discussion Forum screen
* Live Chat with Translation screen
* Voice Notes & Transcription screen
* Notification Center screen
* Feedback & Rating System screen
* Support & Help Center screen
* Community & Forums screen

COMPONENTS
JobTemplateCard, FilterChipsRow, PortfolioHeader, QuoteMatrix, TimelineWithMilestones, ChatList, ChatInput, VoiceRecordButton, TranslationToggle, FileRow(Preview), ForumThreadCard, RatingStars, NotificationItem.

EVENTS
job\_posted, filter\_applied, match\_invited, quote\_received, quote\_accepted, status\_changed, message\_sent, file\_uploaded, notification\_opened, rating\_submitted.

\================================================================
PATCH 3 — PAYMENTS, FINANCIAL MANAGEMENT (Pages 41–60)
======================================================

GOAL
Design payment setup, escrow, invoices, reporting, enterprise finance tooling.

TICKETS

* Payment Methods Setup
* Invoice Generation & Management
* Earnings Dashboard (Engineer)
* Budget Tracking (Client)
* Escrow Payment System
* Financial Reports & Analytics
* Subscription & Premium Features
* Payout Settings & Withdrawals
* Tax & Compliance Management
* Payment Disputes & Resolution
* Enterprise Dashboard
* Multi-Project Management
* Team Management & Permissions
* Corporate Billing & Invoicing
* RFP (Request for Proposal) System
* Vendor Management Portal
* Compliance & Audit Dashboard
* Advanced Analytics & Reporting
* API & Integration Management
* White-Label & Customization

COMPONENTS
CardList(PaymentMethod), InvoiceRow(Status+PDF), EarningsCharts(D/W/M), EscrowMilestoneRow(Release/Logs), BudgetBar, ReportTabs(Income/Tax/Expenses), PayoutFrequencyPicker, TaxYearTabs, DisputeCaseRow.

NOTES

* VAT helper (15%) and totals breakdown in all financial UI.
* ZATCA e-invoice status badge where applicable.

EVENTS
payment\_method\_added, invoice\_created, invoice\_sent, escrow\_funded, escrow\_release, subscription\_upgraded, payout\_requested, dispute\_opened.

\================================================================
PATCH 4 — MOBILE UX, SETTINGS & ACCESSIBILITY (Pages 61–80)
===========================================================

GOAL
Design global preferences, offline behavior, performance, analytics surfaces.

TICKETS

* Dark/Light Mode Toggle
* Offline Mode & Sync
* Push Notification Settings
* Accessibility Settings
* Language & Localization (EN/AR + Hijri)
* Biometric Security Setup
* Data & Privacy Settings
* Performance & Storage
* Backup & Restore
* About & App Information
* AI-Powered Job Matching (controls)
* Predictive Analytics Dashboard
* Geospatial Analytics
* Performance Benchmarking
* Quality Assurance Dashboard
* Resource Utilization Analytics
* Market Intelligence Center
* Custom Report Builder
* Integration Analytics
* Business Intelligence Hub

COMPONENTS
ThemeToggle, SyncListItem, NotificationCategoryRow, FontSizeSlider, HighContrastToggle, CalendarTypeToggle(Hijri), BiometricToggle, ExportDataButton, CacheClearButton, BackupRow, AnalyticsCardGrid, ChartTabs.

EVENTS
theme\_changed, offline\_sync, notif\_pref\_changed, accessibility\_updated, report\_built.

\================================================================
PATCH 5 — PLATFORM ADMINISTRATION (Pages 81–100)
================================================

GOAL
Design admin consoles: users, content, finance, system, security, data.

TICKETS

* Admin Dashboard
* User Management System
* Content Moderation Center
* Financial Administration
* System Configuration
* Admin Analytics & Reporting
* Security & Compliance Center
* Platform Maintenance
* Communication Management
* API & Developer Console
* AR/VR Project Visualization
* Blockchain Project Verification
* IoT Data Integration
* AI-Powered Document Analysis
* Drone Data Integration
* Carbon Footprint Tracking
* Machine Learning Optimization
* Global Expansion Module
* Advanced BIM Integration
* Future Technology Preview

COMPONENTS
AdminTabNav, UserRow(Actions), FlaggedItemRow, TransactionLogRow, FeatureToggle, AlertRow(Acknowledge), MaintenanceTaskRow, AnnouncementEditor, ApiKeyRow, ARModeButton, LedgerRecordRow, SensorRow, AnalysisRunRow, FlightLogRow, EmissionsRow, ParameterSlider.

EVENTS
user\_suspended, content\_moderated, feature\_toggled, api\_key\_generated, maintenance\_run.

\================================================================
PATCH 6 — EXTENDED CORE FEATURES (Pages 101–130)
================================================

GOAL
Design advanced lifecycle: drafts, cancel/reschedule, teams, deliverables, certification.

TICKETS

* Saved Job Drafts
* Job Cancellation Flow
* Job Rescheduling Flow
* Engineer Availability Calendar
* Client Favorites (Saved Engineers)
* Bulk Job Posting (Enterprise)
* Job Cloning / Duplicate Posting
* Draft vs Published Projects
* Rehire Engineer Option
* Engineer Subscription Packages
* Engineer Availability Status (Granular)
* Holiday & Leave Planner (Engineer)
* Custom Quote Builder (Engineer)
* Add-On Services (Upsell)
* Time Tracking & Work Hours Log
* Overtime & Extra Hours Request
* Travel & Mileage Calculator
* Material Cost Estimator
* Scope Change Request Flow
* Multi-Engineer Collaboration on One Job
* Engineer-to-Engineer Subcontracting
* Engineer Teams & Partnerships
* Engineer Replacement Flow (Enterprise)
* Contract Extension Flow
* Deliverables Submission Form
* Multi-Format File Uploads (CAD, BIM, PDFs)
* Deliverables Version Control
* Client Review & Comments on Deliverables
* Final Report Submission Workflow
* Certificate of Completion

COMPONENTS
DraftRow, CancelConfirmModal, RescheduleCalendar, AvailabilityCalendar, FavoriteRow, CsvUpload, CloneJobButton, ProjectTabs(Drafts/Published), RehireButton, SubscriptionTierCard, StatusDropdown, LeavePlannerCalendar, QuoteItemRow, AddonCheckboxRow, TimerControl, OvertimeRequestForm, MileageTracker, MaterialRow, ScopeChangeForm, TeamMemberRow, SubcontractAssign, TeamCard, ReplacementRequestForm, ContractExtendForm, DeliverableUploadRow, VersionRow, CommentPin, FinalReportPanel, CertificateDownload.

EVENTS
job\_canceled, job\_rescheduled, draft\_saved, quote\_sent, scope\_change\_requested, deliverable\_uploaded, version\_reverted.

\================================================================
PATCH 7 — COLLABORATION & PRODUCTIVITY (Pages 131–160)
======================================================

GOAL
Design shared scheduling, boards, annotations, meetings, approvals, and audit.

TICKETS

* Shared Project Calendar
* Task Assignment (Micro-tasks)
* To-Do Lists per Engineer
* Client Notes Section
* Project Labels & Tagging
* Shared Project Board (Kanban)
* Shared Project Timeline (Gantt)
* File Locking & Edit Conflicts
* Watermarking for Sensitive Docs
* Project Knowledge Base (Wikis)
* Engineer-Client NDA Agreement Flow
* Secure Document Viewer (No Download)
* Document Expiry / Access Control
* Confidential File Request Flow
* Meeting Scheduler (Integrated Calendar)
* Video Call Recording & Storage
* Meeting Notes Auto-Summary (AI)
* Whiteboard Collaboration Tool
* Engineer Broadcast Announcements
* Client Broadcast Announcements
* Group Chat Rooms for Large Projects
* Reaction Emojis in Chat
* File Annotation Tools (Draw on PDF/CAD)
* Mark as Resolved / Archive Threads
* Polls & Votes in Collaboration Space
* Shared Project Dashboard for Stakeholders
* Client Approval Workflow for Designs
* Multiple Reviewer Workflow (Enterprise)
* Internal Notes (Engineers only)
* Audit Trail of All Communications

COMPONENTS
CalendarGrid, TaskRow(Assignee), TodoRow, NotesPanel, TagChip, KanbanColumn/Card, GanttBar, LockBadge, WatermarkToggle, WikiArticleRow, NDAModal, SecureViewer, ExpiryDatePicker, FileRequestForm, Scheduler, RecordToggle, SummaryGenerateButton, WhiteboardCanvas, BroadcastComposer, GroupChatCreator, EmojiPicker, PdfAnnotator, ThreadRow(Status), PollComposer, StakeholderDashboard, ApprovalButtons, ReviewerList, InternalNoteBadge, AuditTrailRow.

EVENTS
task\_created, card\_moved, approval\_granted, poll\_voted, annotation\_saved, thread\_resolved.

\================================================================
PATCH 8 — FINANCE, PAYMENTS & COMPLIANCE (Pages 161–190)
========================================================

GOAL
Deepen finance: invoices, splits, taxes, forecasting, reconciliation, fraud/compliance, insurance.

TICKETS

* Proforma Invoice Creation
* Split Payments (Multi-party payouts)
* Milestone-based Invoicing (Custom)
* Bulk Invoicing (Enterprise)
* Credit Notes & Refunds
* Payment Retry Flow (Failed Payments)
* Multi-Currency Support
* Currency Conversion Tool
* Payment Forecasting
* Automated Reminders (Invoices Due)
* Auto VAT Calculation (Saudi Rules)
* ZATCA E-Invoicing Integration
* Withholding Tax Calculation (Enterprise)
* Tax Residency Certificates Upload
* Tax Exemption Requests Flow
* Expense Tracking (Engineer)
* Expense Categories & Receipts Upload
* Travel & Per Diem Tracking
* Profit & Loss Statement (Engineer)
* Balance Sheet (Enterprise)
* Cash Flow Analysis
* Financial Forecasting Tools
* Budget vs Actual Reports
* Payment Gateway Management (Admin)
* Payment Reconciliation (Admin)
* Fraudulent Transaction Alerts
* Chargeback Management
* Suspicious Activity Reports
* Compliance Certificates Repository
* Insurance Policy Management

COMPONENTS
ProformaForm, SplitEditor(Percentages), MilestoneCreator, BulkInvoiceSelector, CreditNoteForm, RetryBanner, CurrencyPicker, FxConverter, ForecastCharts, ReminderScheduler, VATField(Auto), ZATCAStatusBadge, WHTCalculator, CertificateUploadRow, ExemptionForm, ExpenseRow, CategoryList, PerDiemRow, PnLView, BalanceSheetView, CashFlowChart, ForecastBuilder, BudgetVsActualTable, GatewayToggleRow, ReconcileRow, FraudAlertRow, ChargebackRow, SARForm, CertificateRow, InsurancePolicyRow.

EVENTS
invoice\_created, split\_configured, reminder\_enabled, vat\_calculated, zatca\_generated, expense\_logged, reconciliation\_done, fraud\_blocked.

\================================================================
PATCH 9 — PUBLIC WEB, LEGAL & OPS (Pages 191–230)
=================================================

GOAL
Design public-facing surfaces, legal/compliance, and internal ops consoles.

TICKETS

* Public Landing Page
* About Us Page
* Services Overview Page
* Pricing & Subscription Page
* Case Studies / Success Stories Page
* Blog & News Page
* Contact Us Page
* Careers Page
* Public Help Center Page
* Partner / Vendor Page
* Terms of Service (Web) Page
* Privacy Policy (Web) Page
* Cookie Consent Banner
* Status Page (Public)
* Media & Press Page
* Consent Management Screen
* PDPL Data Request Form (Saudi Compliance)
* KYC / Identity Verification Flow
* Tax Compliance Dashboard (Enterprise)
* Anti-Fraud Consent Prompt
* Export Compliance Notice
* Risk & Safety Acknowledgment (On-Site Jobs)
* Insurance Upload (Enterprise)
* Contract Signing (Digital)
* Regulatory Audit Export (Admin)
* Support Ticket Console (Admin)
* Dispute Resolution Console (Admin)
* Fraud Review Console (Admin)
* QA Checklist Console (Admin)
* Training & Certification Console (Admin)
* Workforce Dispatch Tool (Enterprise)
* Performance Monitoring Console (Admin)
* Knowledge Base Management Console
* Content Announcement Scheduler (Admin)
* Internal Chat Tool (Ops Team)
* System Alert Console (Admin)
* Developer Sandbox Console
* Internal Billing & Payroll Tool
* Regulatory Compliance Dashboard (Ops)
* Executive Reporting Dashboard (C-Suite)

COMPONENTS
HeroSection, PricingTierCard, CaseStudyCard, BlogPostRow, ContactForm, JobListingRow, FAQAccordion, PartnerForm, CookieBanner, StatusIndicator, PressKitDownload, ConsentToggleRow, PDPLForm, KYCUploader, ComplianceChart, ConsentPrompt, ExportNotice, SafetyAcknowledge, InsuranceUploader, DigitalSignaturePad, AuditExportForm, SupportTicketRow, DisputeRow, FraudReviewRow, QAChecklistRow, TrainingModuleRow, DispatchMap, PerfMonitorChart, KBEditor, AnnouncementScheduler, InternalChat, AlertRow, SandboxCreator, PayrollGenerator, OpsComplianceView, ExecSummaryCards.

EVENTS
signup\_clicked, contact\_submitted, kyc\_verified, consent\_saved, audit\_exported, ticket\_resolved, dispatch\_assigned.

\=======================================
ACROSS ALL PATCHES — ALWAYS INCLUDE

* Priority/Stage/Role mapping for each ticket (Must/Should/Nice + ①–⑦ + Role).
* Dependencies and data contracts with stores/APIs.
* i18n keys and EN/AR strings; confirm RTL mirror requirements per screen.
* Analytics: event names + JSON payload schemas (include user\_role, route, entity\_id, amount/currency where relevant).
* Accessibility verification checklist and SR announcement text.
* QA checklist covering WCAG, RTL, theme, responsiveness, and error states.
* Update Design Log and Component Library with any new patterns or overrides.

END OF MASTER PROMPT (TXT)
---

# PATCH 1 — AUTHENTICATION & ONBOARDING

## (1) OVERVIEW

**Goal:** Design complete onboarding funnel from first app launch to first dashboard view, establishing trust and cultural appropriateness for Saudi engineering marketplace.

**Users:** Engineers seeking work, Clients needing engineering services, Enterprise teams managing projects

**Success Criteria:** 
- 90%+ complete onboarding rate within 10 minutes
- Cultural comfort for Arabic-speaking users
- SCE verification initiated for engineers
- Proper role-based dashboard routing

**Constraints:** Mobile-first responsive, WCAG 2.2 AA, bilingual EN/AR with RTL, Saudi compliance patterns

## (2) USER FLOWS

```
START → Language Selection → Role Selection → Phone Verification → SMS Code → 
Personal Info → [BRANCH by Role] → Permissions → Tutorial → Dashboard

ENGINEER BRANCH:
Personal Info → Credentials Upload → Service Specialization → Service Area → 
Rate Setting → SCE Verification Prompt → Permissions → Tutorial → Engineer Dashboard

CLIENT BRANCH:
Personal Info → Company Details → Permissions → Tutorial → Client Dashboard

ENTERPRISE BRANCH:
Personal Info → Company Details → Team Size → Billing Setup → 
Permissions → Tutorial → Enterprise Dashboard
```

## (3) SCREEN SPECIFICATIONS

### 3.1 Splash & Language Selection
**Priority:** Must-Have | **Stage:** ① | **Role:** All

```
+------------------+
|    NBCON PRO     |
|   [Arabic Logo]  |
|                  |
| Welcome / أهلاً   |
|                  |
| [English] [عربي] |
|                  |
|   Continue       |
+------------------+
```

**Components:** LanguageSelector
**States:** Default, loading (0.5s delay for locale loading)
**Interactions:** 
- Language buttons toggle active state
- Continue button validates selection
- Auto-detects device locale as default
**Validation:** Language must be selected
**Accessibility:** Screen reader announces "Language selection required"

### 3.2 Role Selection
**Priority:** Must-Have | **Stage:** ① | **Role:** All

```
+------------------------+
|     Select Your Role   |
|                        |
| [Engineer Card]        |
| Provide services       |
| • Site inspections     |
| • Design reviews       |
|                        |
| [Client Card]          |
| Request services       |
| • Post projects        |
| • Hire engineers       |
|                        |
| [Enterprise Card]      |
| Manage teams           |
| • Multiple projects    |
| • Team coordination    |
+------------------------+
```

**Components:** RoleCard (3 variants)
**States:** Unselected, selected, hover
**Interactions:** Single selection, card highlights on selection
**Validation:** One role must be selected
**Arabic Adaptations:** Right-aligned text, mirrored card layout

### 3.3 Phone Number Verification
**Priority:** Must-Have | **Stage:** ① | **Role:** All

```
+----------------------+
| Verify Phone Number  |
|                      |
| We'll send SMS code  |
|                      |
| [🇸🇦] [+966] [Phone] |
|                      |
| [ Send Code ]        |
|                      |
| Privacy: SMS only    |
| for verification     |
+----------------------+
```

**Components:** PhoneInput (country code + number)
**States:** Empty, typing, validating, error, success
**Interactions:** 
- Country picker defaults to SA
- Auto-formats Saudi numbers
- Validates format before enabling Send
**Validation:** Valid Saudi mobile format (+966 5XXXXXXXX)
**Error States:** Invalid format, network error, rate limiting

### 3.4 SMS Code Entry
**Priority:** Must-Have | **Stage:** ① | **Role:** All

```
+-------------------+
| Enter SMS Code    |
|                   |
| Sent to +966...   |
|                   |
| [_] [_] [_] [_]   |
|                   |
| Resend in 60s     |
|                   |
| Wrong number?     |
| [Edit]            |
+-------------------+
```

**Components:** OtpCodeInput (4-digit, auto-advance)
**States:** Empty, partial, complete, verifying, error
**Interactions:**
- Auto-advance between digits
- Auto-submit when 4 digits entered
- Countdown timer for resend
**Validation:** 4-digit numeric code
**Accessibility:** Announces remaining time, auto-focus progression

### 3.5 Personal Information Setup
**Priority:** Must-Have | **Stage:** ① | **Role:** All

```
+-------------------------+
| Personal Information    |
|                         |
| Full Name [_________]   |
| Email     [_________]   |
| City      [Dropdown]   |
|                         |
| [Photo Upload Circle]   |
| Optional profile photo  |
|                         |
| [ Continue ]            |
+-------------------------+
```

**Components:** TextInput, CityDropdown, PhotoUpload
**States:** Empty, valid, invalid, uploading
**Validation:**
- Full name: Arabic or English characters
- Email: Valid format
- City: Saudi cities dropdown
**Arabic Adaptations:** RTL text input, Arabic city names

### 3.6 Professional Credentials Upload (Engineers Only)
**Priority:** Must-Have | **Stage:** ① | **Role:** Engineer

```
+---------------------------+
| Professional Credentials  |
|                          |
| Upload Required Docs:    |
|                          |
| [📄] Engineering Degree  |
|      PDF, JPG (Max 5MB)  |
|                          |
| [📄] Work Experience     |
|      CV/Resume           |
|                          |
| [📋] Certifications      |
|      Optional            |
|                          |
| [ Continue ]             |
+---------------------------+
```

**Components:** UploadDropzone (multi-doc)
**States:** Empty, uploading, uploaded, error
**Interactions:**
- Drag & drop or click to browse
- Progress indicators
- File type validation
**Validation:** PDF/JPG under 5MB each
**Required:** Degree certificate, CV minimum

### 3.7 Service Specialization Selection (Engineers Only)
**Priority:** Must-Have | **Stage:** ① | **Role:** Engineer

```
+---------------------------+
| Service Specializations   |
|                          |
| Select your expertise:   |
|                          |
| ☑ Structural Engineering |
| ☐ Electrical Systems     |
| ☐ MEP Engineering        |
| ☐ Civil Engineering      |
| ☐ Project Management     |
| ☐ Site Inspections       |
| ☐ Design Reviews         |
| ☐ Quality Assurance      |
|                          |
| [ Continue ]             |
+---------------------------+
```

**Components:** CheckboxGroup (multi-select)
**States:** None selected, some selected, all selected
**Validation:** Minimum 1 specialization required
**Interactions:** Multi-select with visual feedback
**Arabic Terms:** Localized engineering terminology

### 3.8 Service Area Definition (Engineers Only)
**Priority:** Must-Have | **Stage:** ① | **Role:** Engineer

```
+-------------------------+
| Service Area            |
|                         |
| [    MAP VIEW    ]      |
| 📍 Current Location     |
|                         |
| Service Radius:         |
| ○ 25 KM  ○ 50 KM       |
| ○ 100 KM ○ Kingdom-wide |
|                         |
| Major Cities:           |
| ☑ Riyadh  ☐ Jeddah     |
| ☐ Dammam  ☐ Mecca      |
|                         |
| [ Continue ]            |
+-------------------------+
```

**Components:** MapPicker (pan/zoom + radius), CityCheckboxes
**States:** Loading location, location set, radius selected
**Interactions:**
- Pan/zoom map interface
- Radius selection updates map overlay
- City selection adds markers
**Validation:** Must select radius or cities
**Permissions:** Location access for current position

### 3.9 Rate Setting Interface (Engineers Only)
**Priority:** Must-Have | **Stage:** ① | **Role:** Engineer

```
+--------------------------+
| Set Your Rates           |
|                          |
| Hourly Rate              |
| SAR [____] /hour         |
|                          |
| Daily Rate               |
| SAR [____] /day          |
|                          |
| Project-based quotes     |
| ☑ I prefer custom quotes |
|                          |
| Market Rate: SAR 150-300 |
| per hour in your area    |
|                          |
| [ Continue ]             |
+--------------------------+
```

**Components:** RateInputRow (currency formatted)
**States:** Empty, valid rates, market comparison shown
**Validation:**
- Hourly: 50-1000 SAR range
- Daily: 400-8000 SAR range
**Market Data:** Show local averages for specialization
**Currency:** SAR symbol, Arabic numerals option

### 3.10 SCE Verification Prompt (Engineers Only)
**Priority:** Must-Have | **Stage:** ① | **Role:** Engineer

```
+---------------------------+
| SCE Verification          |
|                           |
| [SCE Logo]                |
|                           |
| Verify with Saudi Council |
| of Engineers for:         |
|                           |
| ✓ Higher client trust     |
| ✓ Premium job access      |
| ✓ Increased visibility    |
|                           |
| [ Verify Now ]            |
| [ Skip for Now ]          |
|                           |
| You can verify later in   |
| your profile settings     |
+---------------------------+
```

**Components:** VerificationPrompt, SCE logo integration
**States:** Prompt shown, verification initiated, skipped
**Interactions:**
- "Verify Now" → SCE integration flow
- "Skip" → continues to permissions
**Integration:** External SCE verification system
**Priority:** High-trust engineers get better job matching

### 3.11 Permission Requests
**Priority:** Must-Have | **Stage:** ① | **Role:** All

```
+---------------------------+
| Permissions Needed        |
|                           |
| [📍] Location Services    |
| For nearby job matching   |
| [ Allow ] [ Deny ]        |
|                           |
| [🔔] Push Notifications   |
| For job alerts & updates  |
| [ Allow ] [ Deny ]        |
|                           |
| [📸] Camera Access        |
| For document scanning     |
| [ Allow ] [ Deny ]        |
|                           |
| [ Continue ]              |
+---------------------------+
```

**Components:** PermissionCard (3 types)
**States:** Pending, granted, denied
**Fallbacks:**
- Location denied → Manual city selection
- Notifications denied → Email fallback
- Camera denied → File upload only
**Progressive:** Request permissions when needed vs all upfront

### 3.12 Welcome & Tutorial
**Priority:** Must-Have | **Stage:** ① | **Role:** All

```
+---------------------------+
| Welcome to NBCON Pro!     |
|                           |
| [Illustration: Handshake] |
|                           |
| Quick Tutorial            |
| ○ ○ ○ ● ○                |
|                           |
| Find & hire certified     |
| engineers for your        |
| projects instantly        |
|                           |
| [ Next ] [ Skip ]         |
+---------------------------+
```

**Components:** Stepper, TutorialSlides
**States:** Tutorial slides (5 screens), skippable
**Content by Role:**
- Engineers: How to receive jobs, set availability
- Clients: How to post jobs, review quotes
- Enterprise: Team management, bulk operations
**Interactions:** Swipe/click navigation, skip option

### 3.13 Engineer Dashboard (Initial View)
**Priority:** Must-Have | **Stage:** ① | **Role:** Engineer

```
+---------------------------+
| Good morning, Ahmad       |
| Monday, 12 Rabi' I        |
|                           |
| [🟢] Available for work   |
|                           |
| Today's Opportunities     |
| [Job Card] Site Inspection|
| Riyadh • SAR 400/day      |
|                           |
| [Job Card] Design Review  |
| Jeddah • SAR 200/hour     |
|                           |
| Quick Actions             |
| [📋] Update Availability  |
| [💰] View Earnings        |
| [📄] Complete Profile     |
+---------------------------+
```

**Components:** JobCard, AvailabilityToggle, QuickActionCards
**States:** Online/offline, jobs available/none, profile complete/incomplete
**Personalization:** Islamic greeting, Hijri date option
**Navigation:** Main sidebar available, dashboard expanded by default

### 3.14 Client Dashboard (Initial View)
**Priority:** Must-Have | **Stage:** ① | **Role:** Client

```
+---------------------------+
| Welcome back, Sarah       |
|                           |
| Active Projects: 2        |
| Pending Quotes: 3         |
|                           |
| [+ Post New Job]          |
|                           |
| Recent Activity           |
| [Project] Office Renovation|
| 3 quotes received         |
|                           |
| [Project] Site Survey     |
| Engineer assigned         |
|                           |
| Recommended Engineers     |
| [Engineer Card] 4.9★      |
| Structural • Riyadh       |
+---------------------------+
```

**Components:** ProjectCard, PostJobButton, EngineerCard
**States:** No projects/has projects, quotes pending/none
**Quick Access:** Post job prominently featured
**Recommendations:** AI-powered engineer suggestions

## (4) COMPONENT LIBRARY UPDATES

### LanguageSelector
- Props: `languages: Array<{code, name, flag}>`, `onSelect: Function`
- States: `default`, `selected`
- Keyboard: Arrow keys navigation, Enter to select
- RTL: Button order reverses in Arabic

### RoleCard  
- Props: `role: string`, `description: string`, `features: Array`, `selected: boolean`
- States: `unselected`, `selected`, `hover`, `focus`
- Accessibility: Role description announced on focus
- Arabic: Text right-aligned, bullet points RTL

### PhoneInput
- Props: `countryCode: string`, `value: string`, `onChange: Function`
- States: `empty`, `typing`, `valid`, `invalid`, `disabled`
- Validation: Saudi mobile format (+966 5XXXXXXXX)
- Formatting: Auto-formats as user types

### OtpCodeInput
- Props: `length: number`, `onComplete: Function`, `autoSubmit: boolean`
- States: `empty`, `partial`, `complete`, `verifying`, `error`
- Behavior: Auto-advance, auto-submit, paste support
- Accessibility: Individual digit labels, completion announcement

### MapPicker
- Props: `center: LatLng`, `radius: number`, `onAreaChange: Function`
- States: `loading`, `interactive`, `area-selected`
- Interactions: Pan, zoom, radius selection
- Accessibility: Keyboard controls, area description

### UploadDropzone
- Props: `accept: string`, `maxSize: number`, `multiple: boolean`
- States: `empty`, `dragover`, `uploading`, `uploaded`, `error`
- Validation: File type, size, count limits
- Preview: Thumbnail generation for images

### RateInputRow
- Props: `currency: string`, `value: number`, `min: number`, `max: number`
- States: `empty`, `valid`, `invalid`, `market-comparison`
- Formatting: Currency symbol, thousand separators
- Arabic: Optional Arabic numerals

## (5) COPY EN/AR ADDITIONS

```json
{
  "auth": {
    "welcome": {
      "en": "Welcome to NBCON Pro",
      "ar": "أهلاً بك في منصة إنبكون برو"
    },
    "selectLanguage": {
      "en": "Select Language",
      "ar": "اختر اللغة"
    },
    "selectRole": {
      "en": "Select Your Role",
      "ar": "اختر دورك"
    },
    "engineer": {
      "en": "Engineer - Provide Services",
      "ar": "مهندس - تقديم الخدمات"
    },
    "client": {
      "en": "Client - Request Services", 
      "ar": "عميل - طلب الخدمات"
    },
    "enterprise": {
      "en": "Enterprise - Manage Teams",
      "ar": "مؤسسة - إدارة الفرق"
    },
    "phoneVerification": {
      "en": "Verify Phone Number",
      "ar": "تأكيد رقم الهاتف"
    },
    "smsCodeSent": {
      "en": "SMS code sent to",
      "ar": "تم إرسال رمز التأكيد إلى"
    },
    "personalInfo": {
      "en": "Personal Information",
      "ar": "المعلومات الشخصية"
    },
    "fullName": {
      "en": "Full Name",
      "ar": "الاسم الكامل"
    },
    "email": {
      "en": "Email Address",
      "ar": "البريد الإلكتروني"
    },
    "city": {
      "en": "City",
      "ar": "المدينة"
    },
    "credentials": {
      "en": "Professional Credentials",
      "ar": "المؤهلات المهنية"
    },
    "engineeringDegree": {
      "en": "Engineering Degree",
      "ar": "شهادة الهندسة"
    },
    "workExperience": {
      "en": "Work Experience",
      "ar": "الخبرة العملية"
    },
    "specializations": {
      "en": "Service Specializations",
      "ar": "التخصصات المهنية"
    },
    "structuralEng": {
      "en": "Structural Engineering",
      "ar": "الهندسة الإنشائية"
    },
    "serviceArea": {
      "en": "Service Area",
      "ar": "منطقة الخدمة"
    },
    "currentLocation": {
      "en": "Current Location",
      "ar": "الموقع الحالي"
    },
    "serviceRadius": {
      "en": "Service Radius",
      "ar": "نطاق الخدمة"
    },
    "kingdomWide": {
      "en": "Kingdom-wide",
      "ar": "على مستوى المملكة"
    },
    "ratesSetting": {
      "en": "Set Your Rates",
      "ar": "تحديد الأسعار"
    },
    "hourlyRate": {
      "en": "Hourly Rate",
      "ar": "السعر بالساعة"
    },
    "dailyRate": {
      "en": "Daily Rate", 
      "ar": "السعر اليومي"
    },
    "sceVerification": {
      "en": "SCE Verification",
      "ar": "التحقق من هيئة المهندسين"
    },
    "higherTrust": {
      "en": "Higher client trust",
      "ar": "ثقة أكبر من العملاء"
    },
    "verifyNow": {
      "en": "Verify Now",
      "ar": "تأكيد الآن"
    },
    "skipForNow": {
      "en": "Skip for Now",
      "ar": "تخطي الآن"
    },
    "permissions": {
      "en": "Permissions Needed",
      "ar": "الأذونات المطلوبة"
    },
    "locationServices": {
      "en": "Location Services",
      "ar": "خدمات الموقع"
    },
    "pushNotifications": {
      "en": "Push Notifications",
      "ar": "الإشعارات"
    },
    "cameraAccess": {
      "en": "Camera Access",
      "ar": "الوصول للكاميرا"
    },
    "allow": {
      "en": "Allow",
      "ar": "السماح"
    },
    "deny": {
      "en": "Deny", 
      "ar": "رفض"
    },
    "welcomeTutorial": {
      "en": "Welcome to NBCON Pro!",
      "ar": "أهلاً بك في منصة إنبكون برو!"
    },
    "quickTutorial": {
      "en": "Quick Tutorial",
      "ar": "جولة سريعة"
    },
    "goodMorning": {
      "en": "Good morning",
      "ar": "صباح الخير"
    },
    "availableForWork": {
      "en": "Available for work",
      "ar": "متاح للعمل"
    },
    "todayOpportunities": {
      "en": "Today's Opportunities",
      "ar": "فرص اليوم"
    },
    "quickActions": {
      "en": "Quick Actions",
      "ar": "إجراءات سريعة"
    },
    "updateAvailability": {
      "en": "Update Availability",
      "ar": "تحديث التوفر"
    },
    "viewEarnings": {
      "en": "View Earnings",
      "ar": "عرض الأرباح"
    },
    "completeProfile": {
      "en": "Complete Profile",
      "ar": "إكمال الملف الشخصي"
    },
    "welcomeBack": {
      "en": "Welcome back",
      "ar": "أهلاً بعودتك"
    },
    "activeProjects": {
      "en": "Active Projects",
      "ar": "المشاريع النشطة"
    },
    "pendingQuotes": {
      "en": "Pending Quotes",
      "ar": "العروض المعلقة"
    },
    "postNewJob": {
      "en": "Post New Job",
      "ar": "نشر وظيفة جديدة"
    },
    "recentActivity": {
      "en": "Recent Activity",
      "ar": "النشاط الأخير"
    },
    "recommendedEngineers": {
      "en": "Recommended Engineers",
      "ar": "المهندسون المقترحون"
    }
  }
}
```

## (6) EMPTY STATES & EDGE CASES

**No Network Connection:**
- Cache last language selection
- Show offline banner with retry option
- Allow partial completion, sync when online

**SMS Delivery Failure:**
- Resend button active after 60s
- Alternative: Call verification option
- Carrier-specific troubleshooting

**Location Permission Denied:**
- Fallback to city dropdown selection
- Manual service area input
- Show impact: "Limited job matching"

**SCE Verification Failure:**
- Continue without verification
- Badge shows "Pending Verification"
- Retry option in profile

**Incomplete Profile:**
- Save progress automatically
- Resume from last step
- Progress indicator shows completion

**Camera/Upload Failures:**
- Fallback to file picker
- Clear error messages with retry
- Alternative: Email documents option

## (7) ACCESSIBILITY NOTES

**Screen Reader Announcements:**
- "Language Arabic selected, interface will switch to right-to-left"
- "Step 3 of 8: Phone verification"
- "4-digit code entry, auto-advancing to next field"
- "Profile photo uploaded successfully"
- "Service area updated, 50 kilometer radius"

**Keyboard Navigation:**
- Tab order: logical flow, skip links available
- Enter/Space: Activates buttons and selections
- Arrow keys: Navigate between radio options
- Escape: Closes modals, cancels upload

**Focus Management:**
- Focus moves to first input on screen entry
- Error focus: First invalid field on submission
- Modal focus: Trapped within modal bounds
- Skip navigation: Jump to main content

**ARIA Labels:**
- `role="progressbar"` for step indicator
- `aria-describedby` for input hints and errors
- `aria-expanded` for collapsible sections
- `aria-live` regions for status updates

## (8) ANALYTICS EVENTS

```javascript
// Event Schemas
{
  "auth_start": {
    "timestamp": "ISO 8601",
    "device_type": "mobile|desktop",
    "language_detected": "en|ar"
  },
  
  "language_change": {
    "from_language": "en|ar", 
    "to_language": "en|ar",
    "step": "splash|settings"
  },
  
  "role_selected": {
    "role": "engineer|client|enterprise",
    "time_to_select": "seconds"
  },
  
  "phone_submit": {
    "country_code": "string",
    "is_saudi_number": "boolean",
    "retry_count": "number"
  },
  
  "otp_verified": {
    "attempt_count": "number", 
    "time_to_verify": "seconds",
    "verification_method": "sms|call"
  },
  
  "sce_verification_started": {
    "user_role": "engineer",
    "initiated_from": "onboarding|profile"
  },
  
  "profile_completed": {
    "role": "engineer|client|enterprise",
    "completion_time": "seconds",
    "skip_count": "number",
    "upload_count": "number"
  },
  
  "permission_granted": {
    "permission_type": "location|notifications|camera",
    "granted": "boolean",
    "prompt_count": "number"
  },
  
  "tutorial_completed": {
    "slides_viewed": "number",
    "completion_rate": "percentage", 
    "skipped": "boolean"
  },
  
  "dashboard_view": {
    "user_role": "engineer|client|enterprise",
    "first_view": "boolean",
    "onboarding_duration": "seconds"
  }
}
```

## (9) OPEN QUESTIONS & ASSUMPTIONS

**Questions:**
1. SCE API integration timeline - is test environment available?
2. SMS provider preference for Saudi market (STC vs others)?
3. Should enterprise accounts require company CR verification?
4. Offline capability requirements for rural areas?
5. Integration with existing Saudi digital identity systems?

**Assumptions:**
- Users have smartphones with camera capability
- SMS delivery reliable across Saudi telecom providers  
- SCE verification can be completed asynchronously
- Profile photos are optional for initial launch
- English proficiency sufficient for dual-language onboarding

**Technical Dependencies:**
- Supabase Auth configuration for phone verification
- Map service API key (Google Maps vs local provider)
- File upload service with virus scanning
- SMS gateway with Saudi carrier optimization
- Geolocation services with Saudi city database

## (10) DESIGN LOG UPDATES

**Design Decisions:**
- Progressive onboarding reduces cognitive load vs single long form
- Role-based branching personalizes experience early
- SCE verification positioned as value-add, not barrier
- Cultural adaptations: Islamic greetings, Hijri calendar optional
- Error recovery: always provide fallback options

**UI Patterns Established:**
- Primary buttons: #00D084 background, white text
- Secondary buttons: outlined with brand color
- Input validation: inline, non-blocking
- Loading states: skeleton screens vs spinners
- Arabic typography: +2px font size for readability

**Component Standards:**
- All form inputs have floating labels
- Upload zones show clear file requirements
- Progress indicators show steps remaining
- Permission requests explain value proposition
- Cultural icons: Saudi flag, SCE logo, mosque icons where appropriate

---

## IMPLEMENTATION CHECKLIST

**Development Tasks:**
- [ ] Configure Supabase Auth with phone verification
- [ ] Implement RTL CSS framework
- [ ] Set up SMS gateway integration
- [ ] Create component library with accessibility
- [ ] Build Arabic font loading optimization
- [ ] Implement offline-first data persistence

**QA Verification:**
- [ ] WCAG 2.2 AA compliance testing
- [ ] RTL layout verification in Arabic
- [ ] Screen reader testing with Arabic content
- [ ] Mobile responsiveness across devices
- [ ] Network failure recovery testing
- [ ] Cultural appropriateness review
- [ ] Performance testing (<2s load times)

**Cultural Review:**
- [ ] Arabic translations by native speaker
- [ ] Islamic calendar integration testing
- [ ] Saudi cultural consultant approval
- [ ] Engineering terminology accuracy
- [ ] Visual design cultural sensitivity

This completes Patch 1 - Authentication & Onboarding with full specifications for implementation.

do the same for patch 2

---

PATCH 2 — CORE JOB MANAGEMENT
(1) OVERVIEW
 Goal: Design complete job lifecycle from creation through discovery, matching, quoting, tracking, and collaboration. Enable efficient marketplace operations with AI-powered matching and seamless communication.
 Users: All roles — Engineers receiving/bidding jobs, Clients posting/managing jobs, Enterprise coordinating multiple projects.
 Success Criteria:
80%+ job post completion rate
<5 minutes average job posting time
70%+ engineer response rate to matched jobs
Real-time communication with <2s message delivery
AI matching accuracy >85% (client satisfaction with suggested engineers)
 Constraints: Bilingual UI, real-time updates, mobile-optimized, cultural sensitivity for Saudi market.
 Dependencies from Patch 1: User authentication, role-based dashboards, profile data, SCE verification status.
(2) USER FLOWS
 JOB CREATION FLOW:
 Client Dashboard → Quick/Advanced Job Post → Template Selection → Job Details → Location & Schedule → Budget → Review → Publish → AI Matching → Engineer Invites
JOB DISCOVERY FLOW:
 Engineer Dashboard → Browse/Filter Jobs → View Details → Portfolio Review → Submit Quote/Interest → Client Reviews → Selection → Job Assignment
JOB MANAGEMENT FLOW:
 Active Job → Status Updates → Milestone Tracking → File Sharing → Communication → Issue Resolution → Completion → Payment
COLLABORATION FLOW:
 Job Active → Messaging Hub → File Manager → Video Calls → Progress Updates → Client Approval → Final Delivery
(3) SCREEN SPECIFICATIONS
3.1 Quick Job Post
 Priority: Must-Have | Stage: ② | Role: Client, Enterprise
+---------------------------+
| Quick Job Post            |
|                           |
| Job Title                 |
| [Site Inspection_____]    |
|                           |
| Service Type              |
| [Dropdown: Inspection]    |
|                           |
| Location                  |
| [📍 Riyadh, King Fahd St] |
|                           |
| Budget Range              |
| SAR [500] - [1500]        |
|                           |
| Urgency                   |
| ○ Today ○ This Week       |
| ○ Flexible               |
|                           |
| [ Post Job ] [ Advanced ] |
+---------------------------+
Components: TextInput, ServiceDropdown, LocationPicker, BudgetRange, UrgencySelector
 States: Draft, validating, posting, published
 Validation: Title required, budget minimum 100 SAR, location within Saudi Arabia
 AI Integration: Service type suggestions based on title
 Arabic Adaptations: RTL layout, Arabic location names
3.2 Advanced Job Builder
 Priority: Must-Have | Stage: ② | Role: Client, Enterprise
+---------------------------+
| Advanced Job Builder      |
| [Progress: ●●○○○]        |
|                           |
| Step 2: Project Details   |
|                           |
| Description               |
| [Rich Text Editor___]     |
|                           |
| Required Skills           |
| ☑ Structural Analysis     |
| ☑ AutoCAD                |
| ☐ Project Management      |
|                           |
| Experience Level          |
| ○ Junior (1-3 years)     |
| ● Mid-level (3-7 years)  |
| ○ Senior (7+ years)      |
|                           |
| Attachments               |
| [📄] floor_plan.pdf       |
| [+] Add Document          |
|                           |
| [ Back ] [ Next ]         |
+---------------------------+
Components: Stepper, RichTextEditor, SkillsSelector, ExperienceRadio, AttachmentList
 States: Step navigation (5 steps), auto-save draft, validation per step
 Features:
Rich text with formatting, bullet points, Arabic support
Skill suggestions based on service type
Document preview and organization
Enterprise: Template saving, approval workflows
3.3 Job Templates Library
 Priority: Should-Have | Stage: ② | Role: Client, Enterprise
+---------------------------+
| Job Templates             |
|                           |
| [Search templates____]    |
|                           |
| Your Templates (3)        |
| [📋] Site Inspection      |
|      Last used: 2 days    |
|      [Use] [Edit]         |
|                           |
| [📋] Design Review        |
|      Last used: 1 week    |
|      [Use] [Edit]         |
|                           |
| Public Templates          |
| [📋] MEP System Check     |
|      Used 847 times       |
|      [Preview] [Use]      |
|                           |
| [ Create New Template ]   |
+---------------------------+
Components: JobTemplateCard, SearchInput, TemplatePreview
 States: Loading templates, template selected, creating new
 Features:
Personal and public template library
Usage statistics and ratings
Template versioning
Enterprise team sharing
Personalization: Most-used templates prioritized
3.4 Engineer Filtering & Search
 Priority: Must-Have | Stage: ① | Role: Client, Enterprise
+---------------------------+
| Find Engineers            |
|                           |
| [Search by name/skill___] |
|                           |
| Filters                   |
| Location   [25 KM ▼]     |
| Rating     [4+ Stars ▼]   |
| Price      [100-500 SAR]  |
| Available  [☑ This Week]  |
|                           |
| Sort by: [Relevance ▼]    |
|                           |
| Results (127 engineers)   |
|                           |
| [Engineer Card]           |
| Ahmad Al-Fahad ⭐ 4.8     |
| Structural Engineer       |
| 5 KM away • SAR 200/hr    |
| ☑ SCE Verified            |
| [View] [Invite]          |
|                           |
| [ Show More Results ]     |
+---------------------------+
Components: FilterChipsRow, EngineerCard, SortDropdown, SearchInput
 States: Loading results, filtered results, no results found
 AI Features:
Smart search with typo tolerance
Relevance scoring based on job requirements
Availability prediction
 Real-time: Live availability status, distance calculation
3.5 Engineer Portfolio Viewer
 Priority: Must-Have | Stage: ① | Role: Client, Enterprise
+---------------------------+
| Ahmad Al-Fahad            |
| [Profile Photo] ⭐ 4.8    |
| Structural Engineer       |
| ☑ SCE Verified            |
|                           |
| Overview                  |
| 8 years experience        |
| 47 completed projects     |
| Response time: 2 hours    |
|                           |
| Skills & Certifications   |
| • Structural Analysis     |
| • AutoCAD, Revit         |
| • PMP Certified          |
|                           |
| Recent Projects           |
| [📸] Riyadh Metro Station |
|      Completed: Jan 2024  |
|      Client Rating: 5⭐   |
|                           |
| Reviews (12)              |
| "Excellent work..." 5⭐   |
|                           |
| [ Send Message ]          |
| [ Request Quote ]         |
+---------------------------+
Components: PortfolioHeader, SkillsList, ProjectGallery, ReviewsList
 States: Loading profile, full profile loaded, messaging opened
 Features:
Project portfolio with images
Client testimonials and ratings
Real-time availability indicator
Direct messaging capability
 Verification: SCE status, identity verification badges
3.6 Real-Time Job Matching
 Priority: Must-Have | Stage: ② | Role: All
+---------------------------+
| AI-Powered Matches        |
|                           |
| For: Site Inspection Job  |
| Budget: SAR 800-1200      |
|                           |
| Perfect Matches (3)       |
|                           |
| [Match Card] 98% Match    |
| Sara Al-Mansouri ⭐ 4.9   |
| Available today           |
| 2 KM from site           |
| [Invite] [View Profile]   |
|                           |
| [Match Card] 95% Match    |
| Mohamed Hassan ⭐ 4.7     |
| Available tomorrow        |
| 8 KM from site           |
| [Invite] [View Profile]   |
|                           |
| Good Matches (7)          |
| [View All]               |
|                           |
| [ Invite All ] [ Refine ] |
+---------------------------+
Components: MatchCard, MatchScore, InviteButton, AIInsights
 States: Analyzing matches, matches found, no suitable matches
 AI Logic:
Skills compatibility
Location proximity
Availability correlation
Budget alignment
Past performance metrics
 Real-time: Updates as engineer availability changes
3.7 Quote Comparison Matrix
 Priority: Must-Have | Stage: ② | Role: Client, Enterprise
+---------------------------+
| Quote Comparison          |
|                           |
| Job: Office HVAC Inspection|
| 5 quotes received         |
|                           |
| [Table Format]            |
| Engineer | Price | Time   |
| ---------|-------|--------|
| Ahmad    | 1200  | 2 days |
| Sara     | 1000  | 3 days |
| Hassan   | 1500  | 1 day  |
|                           |
| [Detailed View Toggle]    |
|                           |
| Recommended: Sara Al-Mansouri
| ⭐ Best value + timeline  |
|                           |
| [Accept] [Decline] [Message]
|                           |
| [ Export Comparison ]     |
+---------------------------+
Components: QuoteMatrix, CompareTable, RecommendationCard
 States: Collecting quotes, comparison ready, quote accepted
 Features:
Side-by-side comparison
AI recommendation with reasoning
Detailed breakdown view
Export for enterprise
 Insights: Price vs quality analysis, timeline feasibility
3.8 Job Status Tracking
 Priority: Must-Have | Stage: ④ | Role: All
+---------------------------+
| Site Inspection Project   |
| Status: In Progress       |
|                           |
| Timeline                  |
| ●━━━○━━━○ 40% Complete    |
|                           |
| ✓ Project Started         |
|   Today 9:00 AM           |
|                           |
| ◐ Site Visit              |
|   In Progress             |
|   📍 Live Location        |
|                           |
| ○ Report Submission       |
|   Est. Tomorrow 5 PM      |
|                           |
| ○ Client Review           |
|   Pending                 |
|                           |
| Next Action               |
| Engineer will submit      |
| initial findings by 3 PM  |
|                           |
| [ View Details ]          |
| [ Contact Engineer ]      |
+---------------------------+
Components: TimelineWithMilestones, StatusBadge, ProgressBar, NextActionCard
 States: Not started, in progress, paused, completed, cancelled
 Real-time: Live progress, location tracking, milestone completion
 Notifications: Status changes, milestone alerts, deadline reminders
3.9 Emergency Job Request
 Priority: Should-Have | Stage: ② | Role: Client, Enterprise
+---------------------------+
| 🚨 Emergency Job Request  |
|                           |
| Urgency Level             |
| ● Critical (< 2 hours)    |
| ○ Urgent (< 6 hours)      |
| ○ Same Day                |
|                           |
| Issue Description         |
| [Text area with voice___] |
| [🎤 Voice Note]           |
|                           |
| Location                  |
| 📍 Current Location       |
| [Share Live Location]     |
|                           |
| Budget (Emergency Rate)   |
| SAR [1500] +50% premium   |
|                           |
| [ Broadcast Now ]         |
|                           |
| Available Engineers (12)  |
| Notifying all nearby...   |
+---------------------------+
Components: UrgencySelector, VoiceInput, LiveLocationShare, EmergencyBroadcast
 States: Creating emergency, broadcasting, receiving responses
 Features:
Voice note recording
Live location sharing
Premium rate calculation
Mass notification to nearby engineers
 Priority: Bypass normal matching, direct notifications
3.10 In-App Messaging Hub
 Priority: Must-Have | Stage: ④ | Role: All
+---------------------------+
| Messages                  |
|                           |
| [Search conversations__]  |
|                           |
| Active Projects (3)       |
|                           |
| [Chat Preview]            |
| Ahmad Al-Fahad            |
| Site inspection update    |
| 2 min ago • Project #1234 |
|                           |
| [Chat Preview]            |
| Sara Al-Mansouri          |
| Report submitted ✓        |
| 1 hour ago • Project #5678|
|                           |
| General Messages          |
|                           |
| [Chat Preview]            |
| NBCON Support             |
| Account verification...   |
| Yesterday                 |
|                           |
| [ New Message ]           |
+---------------------------+
Components: ChatList, ChatPreview, SearchInput, MessageStatus
 States: Loading conversations, active chat, new message indicator
 Features:
Project-based grouping
Status (sent, delivered, read)
Global search
Support chat integration
3.11 Chat Interface (Individual Conversation)
 Priority: Must-Have | Stage: ④ | Role: All
+---------------------------+
| Ahmad Al-Fahad            |
| Project: Site Inspection  |
| [📞] [📹] [📋 Project]   |
|                           |
| [Message Bubble]          |
| Hello, I've arrived at    |
| the site. Starting the    |
| inspection now.           |
| 10:30 AM ✓✓               |
|                           |
| [Your Message]            |
| Perfect! Please check     |
| the basement area first.  |
| 10:32 AM ✓✓               |
|                           |
| [File Shared]             |
| 📸 foundation_photo.jpg   |
| 10:45 AM                  |
|                           |
| [Input Area]              |
| [Type message_______] [🎤]|
| [📎] [📸] [📍] [Send]    |
+---------------------------+
Components: ChatInput, MessageBubble, FileShare, VoiceMessage, LocationShare
 States: Typing, sending, delivered, read
 Features:
Voice messages
Photo/document sharing
Location sharing
Translation toggle (EN/AR)
E2E encryption (server notes)
3.12 Video Call Integration
 Priority: Should-Have | Stage: ④ | Role: All
+---------------------------+
| Video Call - Ahmad        |
|                           |
| [Large Video Window]      |
| Ahmad Al-Fahad            |
| 📹 On  🎤 On              |
|                           |
| [Small Self Video]        |
| You                       |
|                           |
| Call Controls             |
| [🎤] [📹] [📋] [📞]      |
| Mute Video Share End      |
|                           |
| Chat Panel [▼]            |
| Type message...           |
|                           |
| Duration: 05:23           |
+---------------------------+
Components: VideoWindow, CallControls, InCallChat
 States: Calling, connected, screen sharing, call ended
 Features:
Screen share for docs
In-call chat
Optional recording (consent)
Arabic captions
3.13 File Manager & Document Hub
 Priority: Must-Have | Stage: ④ | Role: All
+---------------------------+
| Project Documents         |
| Site Inspection #1234     |
|                           |
| [Tabs: All | Shared | My] |
|                           |
| Folders                   |
| 📁 Plans & Drawings (5)   |
| 📁 Reports (3)            |
| 📁 Photos (12)            |
| 📁 Certificates (2)       |
|                           |
| Recent Files              |
| [File Row]                |
| 📄 inspection_report.pdf  |
| 2.4 MB • 2 hours ago      |
| Shared by Ahmad           |
| [👁] [⬇] [💬]            |
|                           |
| [File Row]                |
| 📸 foundation_crack.jpg   |
| 856 KB • 3 hours ago      |
| [👁] [⬇] [💬]            |
|                           |
| [ Upload Files ]          |
+---------------------------+
Components: FileRow, FolderTree, FilePreview, UploadZone
 States: Loading, uploading, preview mode, organizing
 Features:
Categorization & tagging
Version control
Previews (images, PDFs)
File comments
Access controls
CAD/PDF/image/spreadsheet support
3.14 Project Discussion Forum
 Priority: Should-Have | Stage: ④ | Role: Client, Engineer
+---------------------------+
| Project Discussion        |
| Site Inspection #1234     |
|                           |
| [+ New Discussion]        |
|                           |
| Pinned Topics (1)         |
| 📌 Safety Guidelines      |
|    Started by Client      |
|    5 replies • 2 days ago |
|                           |
| Recent Discussions        |
|                           |
| [Thread Card]             |
| Foundation Concerns       |
| Ahmad Al-Fahad            |
| 3 replies • 4 hours ago   |
| 💬 Latest: "I'll check..."|
|                           |
| [Thread Card]             |
| Schedule Update           |
| You                       |
| 1 reply • Yesterday       |
| ❓ Question               |
|                           |
| [ Load More ]             |
+---------------------------+
Components: ForumThreadCard, DiscussionStarter, ThreadPreview
 States: Loading, new discussion, thread view
 Features:
Threaded discussions
Topic categories
Pinned topics
Mentions (@user)
Search within discussions
3.15 Notification Center
 Priority: Must-Have | Stage: ① | Role: All
+---------------------------+
| Notifications             |
|                           |
| [Tabs: All | Projects |   |
|       Messages | System]  |
|                           |
| Today                     |
| [Notification Item] 🔵    |
| New quote received        |
| Ahmad submitted quote for |
| Site Inspection project   |
| 2 hours ago               |
| [View] [Dismiss]          |
|                           |
| [Notification Item]       |
| Project milestone ✓       |
| Site visit completed      |
| 4 hours ago               |
| [View]                    |
|                           |
| Yesterday                 |
| [Notification Item]       |
| Payment received          |
| SAR 1,200 for Project...  |
| [View]                    |
|                           |
| [ Mark All Read ]         |
+---------------------------+
Components: NotificationItem, NotificationTabs, CategoryFilter
 States: Unread, filtered view, all read
 Features:
Real-time push
Category filtering
Bulk mark read
Deep links
Preferences
Smart bundling
3.16 Feedback & Rating System
 Priority: Must-Have | Stage: ⑥ | Role: All
+---------------------------+
| Rate Your Experience      |
| Project: Site Inspection  |
|                           |
| Overall Rating            |
| ⭐⭐⭐⭐⭐                   |
|                           |
| Detailed Ratings          |
| Quality of Work           |
| ⭐⭐⭐⭐⭐                   |
| Communication             |
| ⭐⭐⭐⭐○                   |
| Timeliness                |
| ⭐⭐⭐⭐⭐                   |
|                           |
| Written Review            |
| [Text area__________]     |
| "Ahmad was professional   |
| and thorough..."          |
|                           |
| [ Submit Review ]         |
| [ Skip for Now ]          |
+---------------------------+
Components: RatingStars, ReviewTextArea, CategoryRatings
 States: In progress, submitted, published
 Features:
Multi-criteria ratings
Optional text
Anonymous mode
Moderation
Mutual ratings
3.17 Support & Help Center
 Priority: Should-Have | Stage: ⑦ | Role: All
+---------------------------+
| Help & Support            |
|                           |
| [Search help topics___]   |
|                           |
| Quick Actions             |
| [📞] Contact Support      |
| [💬] Live Chat            |
| [📧] Email Support        |
|                           |
| Popular Topics            |
| [FAQ] How to post a job?  |
| [FAQ] Payment and billing |
| [FAQ] SCE verification    |
|                           |
| Categories                |
| 📋 Getting Started        |
| 💰 Payments & Billing     |
| 🔧 Technical Issues       |
| 🛡 Safety & Security      |
|                           |
| [ Submit Ticket ]         |
+---------------------------+
Components: SearchInput, FAQAccordion, ContactOptions, CategoryList
 States: Browse, searching, contact form open, ticket submitted
 Features:
Searchable KB
Multiple contact methods
Ticket tracking
AR support
Video tutorials
AI “related articles”
(4) COMPONENT LIBRARY UPDATES
JobTemplateCard
Props: template, onUse, onEdit, isPublic
States: default, hover, selected, loading
Features: Usage stats, preview modal, quick actions
Arabic: RTL layout, Arabic date formatting
FilterChipsRow
Props: filters[], onFilterChange, activeFilters
States: collapsed, expanded, filtered, cleared
Behavior: Collapsible on mobile, “clear all”
A11y: SR announces filter count
QuoteMatrix
Props: quotes[], onAccept, onDecline, recommendation
States: loading, comparing, quote-selected, action-taken
Features: Sortable columns, export
Mobile: Stacked card view
ChatList
Props: conversations[], onSelect, searchQuery
States: loading, empty, filtered, conversation-selected
Features: Real-time, unread badges, search highlighting
Perf: Virtualized list
VoiceRecordButton
Props: onRecording, onSend, maxDuration
States: idle, recording, recorded, sending
Features: Waveform, playback, AR transcription
Permissions: Mic access handling
FileRow
Props: file, onPreview, onDownload, onComment
States: uploading, uploaded, preview-open, downloading
Features: File icons, size formatting, sharing controls
Preview: Embedded viewers
TimelineWithMilestones
Props: milestones[], currentStage, onMilestoneClick
States: loading, interactive, completed
Features: Progress %, ETA
Responsive: Vertical on mobile
NotificationItem
Props: notification, onView, onDismiss, isRead
States: unread, read, dismissed, viewed
Features: Deep links, actions, timestamps
Grouping: Collapse similar items
(5) COPY EN/AR ADDITIONS
 json
 {
 "jobs": {
 "quickPost": { "en": "Quick Job Post", "ar": "نشر وظيفة سريع" },
 "advancedBuilder": { "en": "Advanced Job Builder", "ar": "منشئ الوظائف المتقدم" },
 "jobTitle": { "en": "Job Title", "ar": "عنوان الوظيفة" },
 "serviceType": { "en": "Service Type", "ar": "نوع الخدمة" },
 "budgetRange": { "en": "Budget Range", "ar": "نطاق الميزانية" },
 "urgency": { "en": "Urgency", "ar": "الأولوية" },
 "today": { "en": "Today", "ar": "اليوم" },
 "thisWeek": { "en": "This Week", "ar": "هذا الأسبوع" },
 "flexible": { "en": "Flexible", "ar": "مرن" },
 "postJob": { "en": "Post Job", "ar": "نشر الوظيفة" },
 "advanced": { "en": "Advanced", "ar": "متقدم" },
 "projectDetails": { "en": "Project Details", "ar": "تفاصيل المشروع" },
 "description": { "en": "Description", "ar": "الوصف" },
 "requiredSkills": { "en": "Required Skills", "ar": "المهارات المطلوبة" },
 "experienceLevel": { "en": "Experience Level", "ar": "مستوى الخبرة" },
 "junior": { "en": "Junior (1-3 years)", "ar": "مبتدئ (١–٣ سنوات)" },
 "midLevel": { "en": "Mid-level (3-7 years)", "ar": "متوسط (٣–٧ سنوات)" },
 "senior": { "en": "Senior (7+ years)", "ar": "خبير (٧+ سنوات)" },
 "attachments": { "en": "Attachments", "ar": "المرفقات" },
 "addDocument": { "en": "Add Document", "ar": "إضافة مستند" },
 "templates": { "en": "Job Templates", "ar": "قوالب الوظائف" },
 "yourTemplates": { "en": "Your Templates", "ar": "قوالبك" },
 "publicTemplates": { "en": "Public Templates", "ar": "القوالب العامة" },
 "lastUsed": { "en": "Last used", "ar": "آخر استخدام" },
 "createNewTemplate": { "en": "Create New Template", "ar": "إنشاء قالب جديد" },
 "findEngineers": { "en": "Find Engineers", "ar": "البحث عن مهندسين" },
 "filters": { "en": "Filters", "ar": "المرشحات" },
 "location": { "en": "Location", "ar": "الموقع" },
 "rating": { "en": "Rating", "ar": "التقييم" },
 "price": { "en": "Price", "ar": "السعر" },
 "available": { "en": "Available", "ar": "متاح" },
 "sortBy": { "en": "Sort by", "ar": "ترتيب حسب" },
 "relevance": { "en": "Relevance", "ar": "الصلة" },
 "results": { "en": "Results", "ar": "النتائج" },
 "engineers": { "en": "engineers", "ar": "مهندس" },
 "away": { "en": "away", "ar": "بعيد" },
 "sceVerified": { "en": "SCE Verified", "ar": "معتمد من هيئة المهندسين" },
 "view": { "en": "View", "ar": "عرض" },
 "invite": { "en": "Invite", "ar": "دعوة" },
 "showMoreResults": { "en": "Show More Results", "ar": "عرض المزيد من النتائج" },
 "overview": { "en": "Overview", "ar": "نظرة عامة" },
 "yearsExperience": { "en": "years experience", "ar": "سنوات خبرة" },
 "completedProjects": { "en": "completed projects", "ar": "مشروع مكتمل" },
 "responseTime": { "en": "Response time", "ar": "وقت الاستجابة" },
 "hours": { "en": "hours", "ar": "ساعات" },
 "skillsCertifications": { "en": "Skills & Certifications", "ar": "المهارات والشهادات" },
 "recentProjects": { "en": "Recent Projects", "ar": "المشاريع الأخيرة" },
 "completed": { "en": "Completed", "ar": "مكتمل" },
 "clientRating": { "en": "Client Rating", "ar": "تقييم العميل" },
 "reviews": { "en": "Reviews", "ar": "التقييمات" },
 "excellentWork": { "en": "Excellent work...", "ar": "عمل ممتاز..." },
 "sendMessage": { "en": "Send Message", "ar": "إرسال رسالة" },
 "requestQuote": { "en": "Request Quote", "ar": "طلب عرض سعر" },
 "aiPoweredMatches": { "en": "AI-Powered Matches", "ar": "المطابقات المدعومة بالذكاء الاصطناعي" },
 "perfectMatches": { "en": "Perfect Matches", "ar": "مطابقات مثالية" },
 "goodMatches": { "en": "Good Matches", "ar": "مطابقات جيدة" },
 "availableToday": { "en": "Available today", "ar": "متاح اليوم" },
 "availableTomorrow": { "en": "Available tomorrow", "ar": "متاح غداً" },
 "fromSite": { "en": "from site", "ar": "من الموقع" },
 "viewProfile": { "en": "View Profile", "ar": "عرض الملف الشخصي" },
 "viewAll": { "en": "View All", "ar": "عرض الكل" },
 "inviteAll": { "en": "Invite All", "ar": "دعوة الكل" },
 "refine": { "en": "Refine", "ar": "تحسين" },
 "quoteComparison": { "en": "Quote Comparison", "ar": "مقارنة العروض" },
 "quotesReceived": { "en": "quotes received", "ar": "عرض سعر مستلم" },
 "engineer": { "en": "Engineer", "ar": "المهندس" },
 "time": { "en": "Time", "ar": "الوقت" },
 "days": { "en": "days", "ar": "أيام" },
 "day": { "en": "day", "ar": "يوم" },
 "detailedView": { "en": "Detailed View", "ar": "عرض مفصل" },
 "recommended": { "en": "Recommended", "ar": "موصى به" },
 "bestValue": { "en": "Best value + timeline", "ar": "أفضل قيمة + جدول زمني" },
 "accept": { "en": "Accept", "ar": "قبول" },
 "decline": { "en": "Decline", "ar": "رفض" },
 "message": { "en": "Message", "ar": "رسالة" },
 "exportComparison": { "en": "Export Comparison", "ar": "تصدير المقارنة" },
 "status": { "en": "Status", "ar": "الحالة" },
 "inProgress": { "en": "In Progress", "ar": "قيد التنفيذ" },
 "timeline": { "en": "Timeline", "ar": "الجدول الزمني" },
 "complete": { "en": "Complete", "ar": "مكتمل" },
 "projectStarted": { "en": "Project Started", "ar": "بدء المشروع" },
 "siteVisit": { "en": "Site Visit", "ar": "زيارة الموقع" },
 "liveLocation": { "en": "Live Location", "ar": "الموقع المباشر" },
 "reportSubmission": { "en": "Report Submission", "ar": "تقديم التقرير" },
 "clientReview": { "en": "Client Review", "ar": "مراجعة العميل" },
 "pending": { "en": "Pending", "ar": "معلق" },
 "nextAction": { "en": "Next Action", "ar": "الإجراء التالي" },
 "viewDetails": { "en": "View Details", "ar": "عرض التفاصيل" },
 "contactEngineer": { "en": "Contact Engineer", "ar": "الاتصال بالمهندس" },
 "emergencyJob": { "en": "Emergency Job Request", "ar": "طلب وظيفة طارئة" },
 "urgencyLevel": { "en": "Urgency Level", "ar": "مستوى الأولوية" },
 "critical": { "en": "Critical (< 2 hours)", "ar": "عاجل (< ساعتين)" },
 "urgent": { "en": "Urgent (< 6 hours)", "ar": "مستعجل (< ٦ ساعات)" },
 "sameDay": { "en": "Same Day", "ar": "نفس اليوم" },
 "issueDescription": { "en": "Issue Description", "ar": "وصف المشكلة" },
 "voiceNote": { "en": "Voice Note", "ar": "مذكرة صوتية" },
 "currentLocation": { "en": "Current Location", "ar": "الموقع الحالي" },
 "shareLiveLocation": { "en": "Share Live Location", "ar": "مشاركة الموقع المباشر" },
 "emergencyRate": { "en": "Emergency Rate", "ar": "سعر الطوارئ" },
 "premium": { "en": "premium", "ar": "إضافي" },
 "broadcastNow": { "en": "Broadcast Now", "ar": "البث الآن" },
 "availableEngineers": { "en": "Available Engineers", "ar": "المهندسون المتاحون" },
 "notifyingAll": { "en": "Notifying all nearby...", "ar": "جاري إشعار جميع المهندسين القريبين..." },
 "messages": { "en": "Messages", "ar": "الرسائل" },
 "searchConversations": { "en": "Search conversations", "ar": "البحث في المحادثات" },
 "activeProjects": { "en": "Active Projects", "ar": "المشاريع النشطة" },
 "generalMessages": { "en": "General Messages", "ar": "الرسائل العامة" },
 "support": { "en": "NBCON Support", "ar": "دعم إنبكون" },
 "accountVerification": { "en": "Account verification...", "ar": "تأكيد الحساب..." },
 "yesterday": { "en": "Yesterday", "ar": "أمس" },
 "newMessage": { "en": "New Message", "ar": "رسالة جديدة" },
 "project": { "en": "Project", "ar": "المشروع" },
 "arrivedAtSite": { "en": "Hello, I've arrived at the site. Starting the inspection now.", "ar": "مرحباً، لقد وصلت إلى الموقع. سأبدأ التفتيش الآن." },
 "checkBasement": { "en": "Perfect! Please check the basement area first.", "ar": "ممتاز! يرجى فحص منطقة القبو أولاً." },
 "fileShared": { "en": "File Shared", "ar": "ملف مشارك" },
 "typeMessage": { "en": "Type message", "ar": "اكتب رسالة" },
 "videoCall": { "en": "Video Call", "ar": "مكالمة فيديو" },
 "callControls": { "en": "Call Controls", "ar": "ضوابط المكالمة" },
 "mute": { "en": "Mute", "ar": "كتم الصوت" },
 "video": { "en": "Video", "ar": "فيديو" },
 "share": { "en": "Share", "ar": "مشاركة" },
 "end": { "en": "End", "ar": "إنهاء" },
 "chatPanel": { "en": "Chat Panel", "ar": "لوحة الدردشة" },
 "duration": { "en": "Duration", "ar": "المدة" },
 "projectDocuments": { "en": "Project Documents", "ar": "مستندات المشروع" },
 "all": { "en": "All", "ar": "الكل" },
 "shared": { "en": "Shared", "ar": "مشارك" },
 "my": { "en": "My", "ar": "ملفاتي" },
 "folders": { "en": "Folders", "ar": "المجلدات" },
 "plansDrawings": { "en": "Plans & Drawings", "ar": "المخططات والرسومات" },
 "reports": { "en": "Reports", "ar": "التقارير" },
 "photos": { "en": "Photos", "ar": "الصور" },
 "certificates": { "en": "Certificates", "ar": "الشهادات" },
 "recentFiles": { "en": "Recent Files", "ar": "الملفات الأخيرة" },
 "sharedBy": { "en": "Shared by", "ar": "شارك بواسطة" },
 "uploadFiles": { "en": "Upload Files", "ar": "رفع الملفات" },
 "projectDiscussion": { "en": "Project Discussion", "ar": "نقاش المشروع" },
 "newDiscussion": { "en": "New Discussion", "ar": "نقاش جديد" },
 "pinnedTopics": { "en": "Pinned Topics", "ar": "المواضيع المثبتة" },
 "safetyGuidelines": { "en": "Safety Guidelines", "ar": "إرشادات السلامة" },
 "startedByClient": { "en": "Started by Client", "ar": "بدأ من قبل العميل" },
 "replies": { "en": "replies", "ar": "رد" },
 "recentDiscussions": { "en": "Recent Discussions", "ar": "النقاشات الأخيرة" },
 "foundationConcerns": { "en": "Foundation Concerns", "ar": "مخاوف الأساس" },
 "latest": { "en": "Latest", "ar": "الأحدث" },
 "illCheck": { "en": "I'll check...", "ar": "سأقوم بالفحص..." },
 "scheduleUpdate": { "en": "Schedule Update", "ar": "تحديث الجدولة" },
 "you": { "en": "You", "ar": "أنت" },
 "reply": { "en": "reply", "ar": "رد" },
 "question": { "en": "Question", "ar": "سؤال" },
 "loadMore": { "en": "Load More", "ar": "تحميل المزيد" },
 "notifications": { "en": "Notifications", "ar": "الإشعارات" },
 "system": { "en": "System", "ar": "النظام" },
 "newQuoteReceived": { "en": "New quote received", "ar": "عرض سعر جديد مستلم" },
 "ahmadSubmitted": { "en": "Ahmad submitted quote for Site Inspection project", "ar": "أحمد قدم عرض سعر لمشروع تفتيش الموقع" },
 "projectMilestone": { "en": "Project milestone", "ar": "معلم المشروع" },
 "siteVisitCompleted": { "en": "Site visit completed", "ar": "تم إنجاز زيارة الموقع" },
 "paymentReceived": { "en": "Payment received", "ar": "تم استلام الدفعة" },
 "forProject": { "en": "for Project...", "ar": "للمشروع..." },
 "dismiss": { "en": "Dismiss", "ar": "تجاهل" },
 "markAllRead": { "en": "Mark All Read", "ar": "تحديد الكل كمقروء" },
 "rateExperience": { "en": "Rate Your Experience", "ar": "قيّم تجربتك" },
 "overallRating": { "en": "Overall Rating", "ar": "التقييم الإجمالي" },
 "detailedRatings": { "en": "Detailed Ratings", "ar": "تقييمات مفصلة" },
 "qualityOfWork": { "en": "Quality of Work", "ar": "جودة العمل" },
 "communication": { "en": "Communication", "ar": "التواصل" },
 "timeliness": { "en": "Timeliness", "ar": "الالتزام بالوقت" },
 "writtenReview": { "en": "Written Review", "ar": "مراجعة مكتوبة" },
 "professionalThorough": { "en": "Ahmad was professional and thorough...", "ar": "أحمد كان مهنياً ودقيقاً..." },
 "submitReview": { "en": "Submit Review", "ar": "إرسال المراجعة" },
 "skipForNow": { "en": "Skip for Now", "ar": "تخطي الآن" },
 "helpSupport": { "en": "Help & Support", "ar": "المساعدة والدعم" },
 "searchHelpTopics": { "en": "Search help topics", "ar": "البحث في مواضيع المساعدة" },
 "quickActions": { "en": "Quick Actions", "ar": "إجراءات سريعة" },
 "contactSupport": { "en": "Contact Support", "ar": "الاتصال بالدعم" },
 "liveChat": { "en": "Live Chat", "ar": "دردشة مباشرة" },
 "emailSupport": { "en": "Email Support", "ar": "دعم البريد الإلكتروني" },
 "popularTopics": { "en": "Popular Topics", "ar": "المواضيع الشائعة" },
 "howToPost": { "en": "How to post a job?", "ar": "كيف تنشر وظيفة؟" },
 "paymentBilling": { "en": "Payment and billing", "ar": "الدفع والفوترة" },
 "sceVerificationProcess": { "en": "SCE verification process", "ar": "عملية التحقق من هيئة المهندسين" },
 "categories": { "en": "Categories", "ar": "الفئات" },
 "gettingStarted": { "en": "Getting Started", "ar": "البدء" },
 "paymentsBilling": { "en": "Payments & Billing", "ar": "المدفوعات والفوترة" },
 "technicalIssues": { "en": "Technical Issues", "ar": "مشاكل تقنية" },
 "safetySecurity": { "en": "Safety & Security", "ar": "السلامة والأمان" },
 "submitTicket": { "en": "Submit Ticket", "ar": "إرسال تذكرة" }
 }
 }
(6) EMPTY STATES & EDGE CASES
No Jobs Available:
Show “No jobs match your criteria” with filter suggestions.
Market insights (e.g., local SAR ranges).
Offer to broaden search radius or skills.
Network Issues:
Cache recent jobs; offline banner with last sync time.
Queue messages for auto-send on reconnect.
File Upload Failures:
Retries with exponential backoff; on-the-fly compression.
Fallback to email attachment option.
No Engineers Found:
Suggest nearby engineers; offer emergency broadcast.
Video Call Issues:
Audio-only fallback; encourage doc upload; keep chat alive.
Empty Chat:
Starter prompts (request update, share location, upload file).
No Notifications:
“You’re all caught up!” + pending actions and upcoming milestones.
(7) ACCESSIBILITY NOTES
SR announcements: new messages, quote submitted, file uploaded (name/size), call started, milestone completed.
Keyboard: Tab through search → filters → results → actions; Enter = open/submit; Space = toggle; Esc = close; Arrows = navigate chat history.
Voice messages: transcript displayed; playback speeds; waveform progress; keyboard shortcuts.
Files: alt text for images; announce size/type; keyboard preview controls; accessible PDF structure.
Real-time: live regions for updates; unobtrusive announcements; configurable frequency.
(8) ANALYTICS EVENTS
{
  "job_posted": {
    "job_id": "string",
    "job_type": "string",
    "budget_range": "object",
    "urgency": "today|week|flexible",
    "posting_method": "quick|advanced|template",
    "template_used": "string|null",
    "user_role": "client|enterprise",
    "completion_time": "seconds",
    "attachments_count": "number",
    "skills_required": "array"
  },
  "filter_applied": {
    "filter_type": "location|rating|price|availability|skills",
    "filter_value": "string",
    "results_count": "number",
    "user_role": "client|enterprise",
    "search_query": "string|null"
  },
  "match_invited": {
    "job_id": "string",
    "engineer_id": "string",
    "match_score": "number",
    "invitation_method": "individual|bulk",
    "ai_recommended": "boolean"
  },
  "quote_received": {
    "job_id": "string",
    "engineer_id": "string",
    "quote_amount": "number",
    "currency": "SAR",
    "delivery_time": "days",
    "response_time": "minutes"
  },
  "quote_accepted": {
    "job_id": "string",
    "engineer_id": "string",
    "final_amount": "number",
    "decision_time": "minutes",
    "competing_quotes": "number"
  },
  "status_changed": {
    "job_id": "string",
    "from_status": "string",
    "to_status": "string",
    "changed_by": "client|engineer|system",
    "milestone_completed": "boolean"
  },
  "message_sent": {
    "conversation_id": "string",
    "message_type": "text|voice|file|location",
    "file_type": "string|null",
    "translation_used": "boolean",
    "user_role": "client|engineer|enterprise"
  },
  "file_uploaded": {
    "job_id": "string",
    "file_type": "pdf|image|cad|other",
    "file_size": "bytes",
    "upload_method": "drag_drop|click|camera",
    "user_role": "client|engineer"
  },
  "notification_opened": {
    "notification_type": "quote|status|message|system",
    "time_to_open": "minutes",
    "opened_from": "notification_center|push|email"
  },
  "rating_submitted": {
    "job_id": "string",
    "overall_rating": "number",
    "detailed_ratings": "object",
    "has_written_review": "boolean",
    "submission_time": "minutes_after_completion"
  }
}
(9) OPEN QUESTIONS & ASSUMPTIONS
 Questions:
AI matching data sources for Saudi market?
Real-time infra: WebSocket vs SSE?
File storage limits per project (enterprise tiers)?
Video calls: native WebRTC vs Zoom/Teams integration?
Emergency premium rate policy?
Assumptions:
Engineers share live location during active jobs.
Clients accept AI-based recommendations.
Typical file size <50MB.
Video calls mainly for clarifications.
Emergency jobs <10% of volume.
Technical Dependencies:
WebRTC, real-time messaging (e.g., Socket.io), virus-scanned storage/CDN, AI matching service, push notifications (AR-ready), KSA maps.
Cultural Considerations:
Prayer time awareness, gender considerations on calls/site visits, conservative profile handling, accurate Arabic engineering terms.
(10) DESIGN LOG UPDATES
 New UI Patterns:
AI match % with reasoning
Emergency job prominence (alert colors)
Real-time status indicators
Project-scoped file structure
Voice message waveform
Interaction Patterns:
Swipe quick actions (mobile)
Long-press menus
Pull-to-refresh
Infinite scroll with smart pagination
Progressive disclosure for complex forms
Component Behaviors:
Draft autosave every 30s
Optimistic send for messages
Smart retry for uploads
First-time tooltips
Adaptive layouts by density
Performance:
Lazy-loaded chat history
Image compression on upload
Virtualized engineer lists
Debounced search (300ms)
Background sync for offline queue
IMPLEMENTATION CHECKLIST
 Development:
 Real-time messaging with AR support
 AI matching with adjustable weights
 File uploads with preview + scanning
 WebRTC video calls + screen share
 Multi-channel notifications (push/email/in-app)
 KSA location services integration
 Offline-first job browsing
QA:
 Messaging load tests (100+ users)
 Upload formats/sizes coverage
 AI matching accuracy evaluation
 Video quality under varied networks
 Notification delivery E2E
 Location accuracy in KSA
 Arabic handling in chat/UI
Performance:
 Message latency <2s
 Search p95 <1s for 10k engineers
 Call setup <10s
 Offline sync reliability
 Mobile responsiveness and battery use
— End of Patch 2 (Core Job Management) —

---

PATCH 3 — PAYMENTS & FINANCIAL MANAGEMENT
(1) OVERVIEW
 Goal: Design end-to-end money flows: payment methods, invoicing, escrow, earnings/payouts, budgets, disputes, enterprise billing, analytics, and admin-level financial controls. Optimize trust, clarity, and regulatory compliance in KSA.
 Users: Engineers (earnings, payouts), Clients (pay, budgets, invoices), Enterprise (multi-project finance, team permissions), Admin/Finance Ops (recon, disputes, compliance).
 Success Criteria:
90%+ payment method setup success on first attempt
95% invoice delivery rate within 10s (PDF render + email)
<2 clicks to release escrow when milestone complete
Payouts requested to approved in <24h (policy-dependent)
<1% charge/dispute rate; >80% disputes resolved in <7 days
 Constraints: Bilingual EN/AR with full RTL; WCAG 2.2 AA; KSA VAT (15%) display; ZATCA e-invoicing compatible data model (Phase 1 notes, Phase 2 integration later); desktop-first responsive; secure PCI-aligned patterns (collect via provider, never store PAN).
 Dependencies from Patch 1–2: Auth & roles, profiles (legal names, TRN if available), job/quote/contract objects, notifications, file hub, analytics hooks.
(2) USER FLOWS
 PAYMENT METHOD SETUP (Client/Enterprise):
 Dashboard → Payments → Add Method → Provider sheet (card/Apple Pay/STC Pay/bank) → 3-DS verify → Method saved → Test small charge (optional) → Ready to pay.
INVOICE LIFECYCLE (Any payer):
 Quote accepted → Generate Draft Invoice → Review (VAT, line items) → Issue/Send → Client pays (card/transfer/Apple Pay) → Receipt + ZATCA ref (when applicable) → Status: Paid/Part-Paid/Overdue → Reminders → Export/Share.
ESCROW MILESTONES (Job):
 Job Confirmed → Create Escrow Hold for Milestone #1 → Funds captured (hold or wallet) → Work → Mark Milestone Complete → Client Approves → Release Funds → Auto-record to Earnings → Invoice/Receipt generated.
ENGINEER EARNINGS & PAYOUT:
 Earnings Dashboard → Select Balance → Request Payout → Choose Method (IBAN) → KYC check → Confirm → Status: Pending → Processed → Receipt emailed.
BUDGET TRACKING (Client/Enterprise):
 Set Budget → Allocate by project/category → Track actual spend vs budget → Alerts on thresholds → Adjust → Export report.
DISPUTE & RESOLUTION:
 Payment issue reported → Open Case → Attach evidence → Counter-party responds → Mediation tools → Decision → Refund/partial credit note → Case closed.
ENTERPRISE FINANCE GOVERNANCE:
 Enterprise Dashboard → Multi-Project Spend → Team Permissions (who can approve) → Corporate Billing cycles → Vendor management → API/Integrations → White-label invoicing.
(3) SCREEN SPECIFICATIONS
3.1 Payment Methods Setup
 Priority: Must-Have | Stage: ③ | Role: Client, Enterprise
+-------------------------------+
| Payment Methods               |
|                               |
| [ + Add Payment Method ]      |
|                               |
| Saved Methods                 |
| [VISA •••• 4242]  Default     |
|  Exp 08/27  [Set Default] [x] |
|                               |
| Add Method (Sheet)            |
|  Card  Apple Pay  STC Pay     |
|  Bank Transfer (IBAN)         |
|  [ Card Number ____ ]         |
|  [ MM/YY ] [ CVC ]            |
|  [ Save & Verify ]            |
+-------------------------------+
Components: PaymentMethodCard, AddMethodSheet, Verify3DSModal, DefaultToggle.
 States: Empty, adding, verifying 3-DS, saved, error.
 Validation: BIN rules, expiry in future, IBAN checksum.
 A11y: Card fields grouped with aria-describedby for help; error text announced.
3.2 Invoice Generation & Management
 Priority: Must-Have | Stage: ⑤ | Role: All (issuers: engineers/enterprise; payers: clients)
+------------------------------------------+
| Invoices                                 |
| [ New Invoice ] [ Export CSV ] [ Filters]|
|                                          |
| [Table] No. | Client | Amount | VAT | St |
| INV-1023  ACME     SAR 3,450  15%  Due   |
| INV-1022  Sarah    SAR 1,265  15%  Paid  |
|                                          |
| Right Panel: Invoice Editor              |
| Bill To: ACME Ltd  TRN: 3xxxx            |
| Items:                                   |
|  • Site Inspection   SAR 1,000 x1        |
|  • Report Writing    SAR   500 x1        |
| Subtotal SAR 1,500                        |
| VAT (15%) SAR 225                         |
| Total SAR 1,725                           |
| [ Save Draft ] [ Issue & Send ]          |
+------------------------------------------+
Components: InvoiceRow, LineItemEditor, TaxSummary, StatusBadge, PDFPreview.
 States: Draft, Issued, Paid, Part-Paid, Overdue, Refunded.
 Features: VAT auto; TRN capture; PDF render; email/send; reminders; notes & terms.
3.3 Earnings Dashboard (Engineer)
 Priority: Must-Have | Stage: ⑤ | Role: Engineer
+-------------------------------+
| Earnings                      |
| Balance: SAR 12,430           |
| [ Request Payout ]            |
|                               |
| Range: Day | Week | Month     |
| [ Area/Bar Chart ]            |
|                               |
| Recent Transactions           |
| • Escrow release  SAR 1,200   |
| • Invoice INV-1022 SAR 1,265  |
+-------------------------------+
Components: EarningsCharts, BalanceCard, PayoutCTA, TransactionList.
 States: Loading, empty, chart with range, payout pending/success.
 Insights: Net after VAT (if issuer), fees breakdown.
3.4 Budget Tracking (Client)
 Priority: Must-Have | Stage: ⑤ | Role: Client, Enterprise
+--------------------------------+
| Budget vs Actual                |
| FY 2025                         |
| [ Set Budget ] [ Export ]       |
|                                |
| Category         Budget  Actual |
| Inspections      50k     38k    |
| Designs          120k    130k ! |
|                                |
| [ Stacked Bar / Donut Chart ]   |
+--------------------------------+
Components: BudgetBar, CategoryTable, ThresholdAlert.
 States: No budget set (empty), thresholds crossed (alerts).
 Actions: Adjust budget, attach to projects.
3.5 Escrow Payment System
 Priority: Must-Have | Stage: ⑤ | Role: Client (payer), Engineer (beneficiary)
+--------------------------------------+
| Escrow: Project #1234                |
| Hold Balance: SAR 4,500              |
|                                      |
| Milestones                           |
| 1. Site Visit        SAR 1,500 Held  |
| 2. Report Draft      SAR 1,500 Held  |
| 3. Final Approval    SAR 1,500 Open  |
|                                      |
| [ Release Funds ] [ View Logs ]      |
|                                      |
| Logs (tab)                           |
| • Hold created by Client             |
| • Release approved (Milestone 1)     |
+--------------------------------------+
Components: EscrowMilestoneRow (tabs: Release/Logs), ConfirmModal.
 States: Hold created, partially funded, pending approval, released, disputed.
 Rules: Only client can release; engineer can request release; dual-confirmation option.
3.6 Financial Reports & Analytics
 Priority: Must-Have | Stage: ⑤ | Role: All (summaries differ by role)
+-----------------------------------+
| Financial Reports                 |
| Tabs: Income | Tax | Expenses     |
| [ Date Range ] [ Export PDF/CSV ] |
|                                   |
| KPI Cards (Revenue, AR, Aging)    |
|                                   |
| Charts: Trend, Category breakdown |
+-----------------------------------+
Components: ReportTabs, KPIGrid, DateRangePicker, ExportButtons.
 States: Range applied, loading, empty, exported.
 A11y: Chart summaries for SR; table alt.
3.7 Subscription & Premium Features
 Priority: Should-Have | Stage: ⑤ | Role: Engineer, Enterprise
+----------------------------------+
| Subscriptions                    |
|                                  |
| Tiers: Basic | Pro | Enterprise  |
| [ Monthly | Yearly ]             |
|                                  |
| Pro: SAR 79/mo  [ Upgrade ]      |
| • More invites  • Priority Match |
|                                  |
| Invoices & Billing History       |
+----------------------------------+
Components: PricingTierCard, BillingHistoryRow, UpgradeModal.
 States: Trial, active, past-due, canceled.
 Logic: Proration rules, tax display.
3.8 Payout Settings & Withdrawals
 Priority: Must-Have | Stage: ⑤ | Role: Engineer
+-----------------------------------+
| Payouts                            |
| Linked IBANs                       |
|  • SA03 8000 **** 1234  [Default]  |
| Frequency: Manual | Weekly | Monthly
| Next Run: 15 Sha'ban 1446          |
| [ Request Payout Now ]             |
+-----------------------------------+
Components: PayoutFrequencyPicker, IBANRow, PayoutNowModal.
 States: KYC required, pending, success, failed.
 Validation: IBAN + beneficiary name match.
3.9 Tax & Compliance Management
 Priority: Should-Have | Stage: ⑤ | Role: Enterprise, Engineer (if VAT registered)
+-------------------------------------+
| Tax & Compliance                    |
| VAT Registration: On  TRN: 3xxxx    |
| Tax Year: [2024 ▼]                  |
|                                     |
| Documents                           |
| • Residency Certificates  [Upload]  |
| • WHT Declarations       [Upload]   |
|                                     |
| [ Generate Tax Report ] [ Export ]  |
+-------------------------------------+
Components: TaxYearTabs, CertificateUploadRow, ComplianceChecklist.
 States: Missing docs, expiring docs, report generated.
 Notes: Display VAT (15%) helper; link to guidance; ZATCA readiness flag.
3.10 Payment Disputes & Resolution
 Priority: Should-Have | Stage: ⑤ | Role: All (opened by payer/beneficiary)
+------------------------------------+
| Disputes                           |
| [ Open Case ]                      |
|                                    |
| Case #D-4321  Amount SAR 1,200     |
| Status: Awaiting Evidence          |
| [ View ]                           |
|                                    |
| Case Detail                        |
| Timeline, Messages, Evidence       |
| [ Submit Evidence ] [ Settle ]     |
+------------------------------------+
Components: DisputeCaseRow, EvidenceUploader, MediationPanel.
 States: Open, evidence requested, under review, settled, refunded.
 Flows: Partial refund → credit note.
3.11 Enterprise Dashboard (Finance slice)
 Priority: Should-Have | Stage: ⑤ | Role: Enterprise
+----------------------------------------+
| Enterprise Finance                     |
| Total Spend (MTD)  Budget Utilization  |
| Overdue Invoices  Vendor Performance   |
|                                        |
| [ Projects ] [ Teams ] [ Billing ]     |
+----------------------------------------+
Components: FinanceKPIGrid, TabsNav, SpendByProjectChart.
 States: Filters by BU, time.
3.12 Multi-Project Management
 Priority: Should-Have | Stage: ⑤ | Role: Enterprise
+------------------------------------+
| Projects (Finance View)            |
| [ Search ] [ Filters ]             |
|                                    |
| Project | Budget | Actual | Variance
| A-Retail  2.0M     1.6M     +0.4M  |
| B-Metro   8.5M     9.1M     -0.6M !|
+------------------------------------+
Components: ProjectFinanceTable, VarianceBadge, Drill-in Drawer.
 States: Over/under-spend highlights, export.
3.13 Team Management & Permissions
 Priority: Should-Have | Stage: ⑤ | Role: Enterprise/Admin
+-----------------------------------+
| Team Permissions                  |
| Member         Role     Can Approve
| Fatimah        Finance  ✓ up to SAR50k
| Omar           Manager  ✓ up to SAR10k
| [ Edit Limits ] [ Invite ]         |
+-----------------------------------+
Components: UserRow(actions), ApprovalLimitEditor, RoleSelector.
 States: Pending invite, disabled, escalations.
3.14 Corporate Billing & Invoicing
 Priority: Should-Have | Stage: ⑤ | Role: Enterprise
+-----------------------------------+
| Corporate Billing                 |
| Billing Cycle: Net 30             |
| Consolidated Invoice: On          |
| [ Generate Statement ]            |
| Statements History                |
+-----------------------------------+
Components: BillingPolicyForm, StatementRow, GenerateModal.
 States: Statement generated, emailed, paid.
3.15 RFP (Request for Proposal) System (Finance hooks)
 Priority: Should-Have | Stage: ②–③ | Role: Enterprise
+-----------------------------------+
| RFPs                               |
| [ New RFP ] [ Export ]             |
| Open | Under Review | Awarded      |
| RFP-009  HVAC Upgrade  Bids: 7     |
| [ Compare Bids ] [ Award ]         |
+-----------------------------------+
Components: RfpRow, BidCompareMatrix, AwardModal.
 States: Open, bidding, awarded, canceled.
 Finance: Award → purchase order → project budget.
3.16 Vendor Management Portal
 Priority: Should-Have | Stage: ⑤ | Role: Enterprise
+----------------------------------+
| Vendors                          |
| [ Add Vendor ] [ Import CSV ]    |
| Name    Rating  Contracts  Status|
| Axiom   4.6     12         Active|
| [ View ] [ Prefer ] [ Block ]    |
+----------------------------------+
Components: VendorRow, PreferenceToggle, ContractsList.
 States: Preferred, blocked, probation.
 Finance: Rates, payment terms, compliance docs.
3.17 Compliance & Audit Dashboard
 Priority: Must-Have | Stage: ⑤ | Role: Admin/Enterprise
+----------------------------------+
| Compliance & Audit               |
| Alerts: VAT Mismatch (3)         |
| Logs: Invoice edits, releases    |
| [ Export Audit Log ]             |
+----------------------------------+
Components: AlertRow, AuditTrailTable, ExportAuditButton.
 States: No alerts, alerts present.
 Filters: By user, action, object.
3.18 Advanced Analytics & Reporting
 Priority: Should-Have | Stage: ⑤ | Role: Enterprise/Admin
+----------------------------------+
| Advanced Analytics               |
| Build Report ▸                   |
|  Metrics ▸ Revenue, AR, Churn    |
|  Dimensions ▸ Project, Vendor    |
| [ Generate ]  [ Save Template ]  |
+----------------------------------+
Components: ReportBuilder, MetricPicker, SavedReportsList.
 States: Draft config, generated, saved.
3.19 API & Integration Management
 Priority: Should-Have | Stage: ⑤ | Role: Enterprise/Admin
+---------------------------------+
| Integrations & API              |
| [ Generate API Key ]            |
| Keys: • sk_live_••• [Disable]  |
| Webhooks: Invoice.paid → URL    |
| [ Test Webhook ]                |
+---------------------------------+
Components: ApiKeyRow, WebhookRow, TestWebhookModal.
 States: Active, disabled; delivery logs.
3.20 White-Label & Customization
 Priority: Should-Have | Stage: ⑤ | Role: Enterprise
+----------------------------------+
| White-Label                      |
| Logo [Upload]  Primary Color [ ] |
| Invoice Footer [Text area]       |
| [ Preview ] [ Save ]             |
+----------------------------------+
Components: BrandUploader, ColorPicker, InvoicePreview.
 States: Unsaved changes, preview generated.
(4) COMPONENT LIBRARY UPDATES
PaymentMethodCard
Props: type, last4, brand, exp, isDefault, onMakeDefault, onRemove
States: default, verifying, error, disabled.
AddMethodSheet
Props: providers[], onSave, onCancel; 3-DS callback.
InvoiceRow
Props: id, clientName, total, vatRate, status, dueDate, onOpen.
LineItemEditor
Props: items[], onAdd, onEdit, onRemove; calc subtotal/VAT/total.
TaxSummary
Props: subtotal, vatRate(=0.15), discounts[], rounding?.
EarningsCharts
Props: series, range: 'day'|'week'|'month'.
BudgetBar
Props: budget, actual, threshold; shows variance badge.
EscrowMilestoneRow
Props: title, amount, status, onRelease, onViewLogs; Tabs: Release/Logs.
KPIGrid / KPIBadge
Props: label, value, delta?.
PayoutFrequencyPicker
Props: value, options['manual'|'weekly'|'monthly'], onChange.
TaxYearTabs
Props: years[], activeYear, onChange.
DisputeCaseRow
Props: caseId, amount, status, openedBy, updatedAt, onOpen.
StatementRow
Props: period, total, status, downloadUrl.
VendorRow
Props: name, rating, contractsCount, status, onView, onTogglePreferred.
ApiKeyRow
Props: keyMask, createdAt, lastUsed, status, onDisable, onRotate.
(5) COPY EN/AR ADDITIONS
json
{
  "finance": {
    "paymentMethods": { "en": "Payment Methods", "ar": "طرق الدفع" },
    "addPaymentMethod": { "en": "Add Payment Method", "ar": "إضافة طريقة دفع" },
    "saveVerify": { "en": "Save & Verify", "ar": "حفظ والتحقق" },
    "default": { "en": "Default", "ar": "افتراضي" },
    "setDefault": { "en": "Set Default", "ar": "تعيين كافتراضي" },
    "remove": { "en": "Remove", "ar": "إزالة" },

    "invoices": { "en": "Invoices", "ar": "الفواتير" },
    "newInvoice": { "en": "New Invoice", "ar": "فاتورة جديدة" },
    "issueSend": { "en": "Issue & Send", "ar": "إصدار وإرسال" },
    "saveDraft": { "en": "Save Draft", "ar": "حفظ كمسودة" },
    "paid": { "en": "Paid", "ar": "مدفوع" },
    "due": { "en": "Due", "ar": "مستحق" },
    "overdue": { "en": "Overdue", "ar": "متأخر" },
    "refunded": { "en": "Refunded", "ar": "مسترد" },

    "earnings": { "en": "Earnings", "ar": "الأرباح" },
    "balance": { "en": "Balance", "ar": "الرصيد" },
    "requestPayout": { "en": "Request Payout", "ar": "طلب سحب" },

    "budgetVsActual": { "en": "Budget vs Actual", "ar": "الميزانية مقابل الفعلي" },
    "setBudget": { "en": "Set Budget", "ar": "تعيين الميزانية" },
    "export": { "en": "Export", "ar": "تصدير" },

    "escrow": { "en": "Escrow", "ar": "الحساب المعلق" },
    "holdBalance": { "en": "Hold Balance", "ar": "الرصيد المحتجز" },
    "releaseFunds": { "en": "Release Funds", "ar": "إطلاق الأموال" },
    "viewLogs": { "en": "View Logs", "ar": "عرض السجل" },

    "reports": { "en": "Financial Reports", "ar": "التقارير المالية" },
    "income": { "en": "Income", "ar": "الدخل" },
    "tax": { "en": "Tax", "ar": "الضريبة" },
    "expenses": { "en": "Expenses", "ar": "المصروفات" },
    "dateRange": { "en": "Date Range", "ar": "النطاق الزمني" },
    "exportPDF": { "en": "Export PDF", "ar": "تصدير PDF" },
    "exportCSV": { "en": "Export CSV", "ar": "تصدير CSV" },

    "subscriptions": { "en": "Subscriptions", "ar": "الاشتراكات" },
    "upgrade": { "en": "Upgrade", "ar": "ترقية" },
    "billingHistory": { "en": "Billing History", "ar": "سجل الفوترة" },

    "payouts": { "en": "Payouts", "ar": "المدفوعات" },
    "linkedIBANs": { "en": "Linked IBANs", "ar": "أرقام الآيبان المرتبطة" },
    "frequency": { "en": "Frequency", "ar": "التكرار" },
    "manual": { "en": "Manual", "ar": "يدوي" },
    "weekly": { "en": "Weekly", "ar": "أسبوعي" },
    "monthly": { "en": "Monthly", "ar": "شهري" },

    "taxCompliance": { "en": "Tax & Compliance", "ar": "الضرائب والامتثال" },
    "vatRegistration": { "en": "VAT Registration", "ar": "تسجيل ضريبة القيمة المضافة" },
    "trn": { "en": "Tax Registration Number (TRN)", "ar": "رقم التسجيل الضريبي" },
    "generateTaxReport": { "en": "Generate Tax Report", "ar": "إنشاء تقرير ضريبي" },

    "disputes": { "en": "Disputes", "ar": "النزاعات" },
    "openCase": { "en": "Open Case", "ar": "فتح قضية" },
    "submitEvidence": { "en": "Submit Evidence", "ar": "تقديم أدلة" },
    "settle": { "en": "Settle", "ar": "تسوية" },

    "enterpriseFinance": { "en": "Enterprise Finance", "ar": "المالية للمؤسسات" },
    "projects": { "en": "Projects", "ar": "المشاريع" },
    "teams": { "en": "Teams", "ar": "الفرق" },
    "billing": { "en": "Billing", "ar": "الفوترة" },

    "teamPermissions": { "en": "Team Permissions", "ar": "أذونات الفريق" },
    "approvalLimit": { "en": "Approval Limit", "ar": "حد الموافقة" },

    "corporateBilling": { "en": "Corporate Billing", "ar": "الفوترة المؤسسية" },
    "net30": { "en": "Net 30", "ar": "30 يوماً" },
    "generateStatement": { "en": "Generate Statement", "ar": "إنشاء كشف حساب" },

    "rfp": { "en": "RFPs", "ar": "طلب عروض" },
    "compareBids": { "en": "Compare Bids", "ar": "مقارنة العطاءات" },
    "award": { "en": "Award", "ar": "ترسية" },

    "vendors": { "en": "Vendors", "ar": "الموردون" },
    "prefer": { "en": "Prefer", "ar": "تفضيل" },
    "block": { "en": "Block", "ar": "حظر" },

    "complianceAudit": { "en": "Compliance & Audit", "ar": "الامتثال والتدقيق" },
    "exportAuditLog": { "en": "Export Audit Log", "ar": "تصدير سجل التدقيق" },

    "integrations": { "en": "Integrations & API", "ar": "التكامل وواجهة برمجة التطبيقات" },
    "generateApiKey": { "en": "Generate API Key", "ar": "إنشاء مفتاح API" },
    "testWebhook": { "en": "Test Webhook", "ar": "اختبار Webhook" },

    "whiteLabel": { "en": "White-Label", "ar": "العلامة البيضاء" },
    "uploadLogo": { "en": "Upload Logo", "ar": "رفع الشعار" },
    "primaryColor": { "en": "Primary Color", "ar": "اللون الأساسي" },
    "invoiceFooter": { "en": "Invoice Footer", "ar": "تذييل الفاتورة" },
    "preview": { "en": "Preview", "ar": "معاينة" }
  }
}
(6) EMPTY STATES & EDGE CASES
No payment methods: Show CTA to add + supported providers; FAQ link.
3-DS failure: Retry with fallback; contact bank message.
Invoice empty: “No invoices yet” + Create button + sample template.
Overdue invoices: Auto-reminder schedule preview; one-click send now.
Escrow: Partial funding → disable Release until fully funded; highlight missing amount.
Payout: IBAN mismatch → error + help text about beneficiary name.
Tax docs missing: Banner with checklist; block issuing tax invoices if VAT registered but TRN missing.
Dispute evidence too large: Chunked upload + compression suggestion.
API webhooks failing: Retry with exponential backoff; show last error and timestamp.
White-label logo too big: Auto-resize with warning; WCAG contrast guard for primary color.
(7) ACCESSIBILITY NOTES
Forms: Clear label/description pairs, error text with aria-live="polite".
Tables: Use <th scope="col/row">; enable keyboard sort; focus ring on row actions.
Money: Read out SAR amounts with currency first (“SAR one thousand seven hundred twenty-five”).
Charts: Provide text summaries below; keyboard toggles for series.
Dialogs (3-DS, release funds): Focus trap; Escape closes; primary action first in tab order.
Color/Contrast: Avoid using red/green alone for statuses; include icons + text.
Time/Calendars: Hijri toggle respected in statements and payout schedules.
(8) ANALYTICS EVENTS
json
{
  "payment_method_added": {
    "provider": "card|apple_pay|stc_pay|bank",
    "verified": "boolean",
    "attempts": "number"
  },
  "invoice_created": {
    "invoice_id": "string",
    "source": "quote|manual|api",
    "currency": "SAR",
    "line_count": "number",
    "vat_rate": 0.15,
    "total": "number"
  },
  "invoice_sent": {
    "invoice_id": "string",
    "delivery": "email|link|api",
    "viewed": "boolean",
    "time_to_view_s": "number"
  },
  "invoice_paid": {
    "invoice_id": "string",
    "method": "card|apple_pay|stc_pay|bank",
    "amount": "number",
    "time_to_pay_s": "number"
  },
  "escrow_hold_created": {
    "job_id": "string",
    "milestone_id": "string",
    "amount": "number",
    "funding_status": "full|partial"
  },
  "escrow_released": {
    "job_id": "string",
    "milestone_id": "string",
    "amount": "number",
    "approval_latency_s": "number"
  },
  "payout_requested": {
    "user_id": "string",
    "amount": "number",
    "method": "iban",
    "frequency": "manual|weekly|monthly"
  },
  "payout_completed": {
    "user_id": "string",
    "amount": "number",
    "processing_time_h": "number"
  },
  "subscription_upgraded": {
    "plan": "basic|pro|enterprise",
    "billing_cycle": "monthly|yearly",
    "prorated": "boolean"
  },
  "dispute_opened": {
    "case_id": "string",
    "amount": "number",
    "reason": "service|fraud|duplicate|other"
  },
  "dispute_resolved": {
    "case_id": "string",
    "outcome": "refund|partial|deny",
    "resolution_time_h": "number"
  },
  "report_exported": {
    "type": "income|tax|expenses|statement",
    "format": "pdf|csv",
    "row_count": "number"
  },
  "api_key_generated": {
    "key_id": "string",
    "scopes": "array"
  },
  "white_label_applied": {
    "color_changed": "boolean",
    "logo_uploaded": "boolean"
  },
  "budget_alert_triggered": {
    "project_id": "string",
    "category": "string",
    "variance": "number"
  }
}
(9) OPEN QUESTIONS & ASSUMPTIONS
 Questions:
Gateways: preferred providers for KSA (Mada rails via Stripe/Checkout.com/Tamara/STC Pay)?
Will we support bank transfer with virtual IBANs at launch?
ZATCA: do we need full Phase 2 e-invoicing now or Phase 1-style PDFs with QR?
Who bears fees (client vs platform vs engineer)? Configurable per contract?
Payout policy/SLAs and cut-off times (e.g., weekdays 3pm AST)?
Approval limits for enterprise — per user or per role + project?
Refund flows: credit note vs direct refund preference?
Assumptions:
Currency SAR only at launch; multi-currency deferred.
VAT is 15% (auto unless VAT-exempt flag).
Platform is not PCI-DSS scoped for PAN (client-side tokenization only).
Engineers provide IBAN; payouts batched daily.
Email is primary invoice delivery; in-app link always available.
Technical Dependencies:
Payment processor SDK (cards/Apple Pay/STC Pay).
PDF renderer (server or client worker).
ZATCA QR payload generator (Phase-aligned).
Payout rails (bank API/processor).
Secure webhook handling with signature verification.
Analytics + audit log persistence.
(10) DESIGN LOG UPDATES
 New Patterns:
Escrow Milestone Tabs (Release/Logs) with explicit confirmations.
Invoice Editor with live VAT and totals; ZATCA QR block in PDF preview.
Budget variance badges (+/- with text and icon, not color alone).
Approval Limits UI (per-member cap + escalation path).
White-label preview for invoices with contrast guard.
Interaction Decisions:
“Issue & Send” always snapshots totals & taxes, locks line edits.
Release Funds requires typed confirmation for large amounts.
Payout Now respects KYC gating; disables button until passed.
Invoice table supports bulk actions (remind, export).
API keys masked by default; copy with one-time reveal toast.
Performance:
Virtualized tables for invoices/projects.
Debounced filters in reports.
Background PDF generation for large batches.
Optimistic status updates for reminders.
— VAT Helper Note (UI): Display “VAT (15%)” and compute total = subtotal - discounts + (subtotal * 0.15). Show TRN when available.
 — Currency Formatting: Place “SAR 1,234.56” left-to-right consistently; when AR, keep numerals per locale preference (Arabic-Indic optional).
IMPLEMENTATION CHECKLIST
 Development:
 Integrate payment SDK(s) with 3-DS and Apple Pay/STC Pay buttons.
 Invoice service: line items, VAT, PDF, email delivery, reminders.
 Escrow service: holds, releases, logs, permissions.
 Earnings & payouts: balances, IBAN validation, KYC gating.
 Budget & reports: aggregations, exports, KPIs.
 Disputes: case model, evidence upload, mediation channel.
 Enterprise: approval limits, consolidated billing, vendor prefs.
 API/Webhooks: key mgmt, signed deliveries.
 White-label settings with live invoice preview.
QA:
 3-DS success/failure paths; Apple Pay/STC Pay device tests.
 VAT math & rounding, invoice statuses, reminders cadence.
 Escrow edge cases (partial funding, double-click release guard).
 Payout negative/insufficient balance handling.
 ZATCA QR data validity; PDF accessibility tags.
 RTL invoices and currency layout checks.
 Permission matrix for approvals & releases.
Performance:
 Invoice list p95 < 800ms for 10k rows (server-filtered).
 PDF batch gen within SLA; queue & retry.
 Charts render under 200ms with downsampled series.
 Webhook processing idempotent and <2s median.
This completes Patch 3 — Payments & Financial Management with production-ready UI/UX specs, components, copy, accessibility notes, analytics, and implementation guidance.

---

PATCH 4 — MOBILE UX, SETTINGS & ACCESSIBILITY
(1) OVERVIEW
 Goal: Design global preferences and system behaviors (theme, language/RTL/Hijri, notifications, accessibility, privacy, performance/storage, backup/restore, about) and specify analytics surfaces (AI Matching, Predictive, Geospatial, Performance Benchmarking, QA, Resource Utilization, Market Intelligence, Custom Report Builder, Integration Analytics, BI Hub). Deliver WCAG 2.2 AA-compliant, bilingual, responsive UI with sane defaults and safe fallbacks for KSA users.
 Users: All roles. Settings are universal; analytics surfaces primarily for Enterprise/Admin, with read-only summaries for Clients/Engineers when applicable.
 Success Criteria:
Theme toggle <200ms perceived switch, persisted cross-session
Notification preference setup completion >90%
Accessibility adjustments (font/contrast) reduce task time for low-vision users by ≥20%
Offline sync success rate >95% with conflict resolution
Analytics dashboards generate within <2s P50 and export within <10s for 50k rows
 Constraints: Bilingual EN/AR, full RTL, Hijri toggle, desktop-first responsive with mobile-friendly patterns; privacy-first defaults; KSA cultural considerations; no blocking modals for noncritical settings.
 Dependencies from Patches 1–3: Auth/session, i18n engine, Hijri helper, analytics hooks, file hub, notifications system, billing identifiers for analytics.
(2) USER FLOWS
 SETTINGS ENTRY FLOW:
 Sidebar → Settings → tabs (Appearance | Notifications | Accessibility | Language & Calendar | Security | Privacy & Data | Performance | Backup & Restore | About)
THEME TOGGLE FLOW:
 Settings/Appearance → toggle Dark/Light/System → instant preview → persist → show toast “Theme updated”
OFFLINE & SYNC FLOW:
 Settings/Performance → toggle “Enable Offline Cache” → select content types → “Sync Now” → progress → results + last sync timestamp → conflict review (if any)
PUSH NOTIFICATIONS FLOW:
 Settings/Notifications → category toggles → quiet hours range → device permission check → test notification
LOCALIZATION FLOW:
 Settings/Language & Calendar → choose English/Arabic → set dir + fonts → optional Hijri toggle → preview dates → confirm and save
BIOMETRIC FLOW:
 Settings/Security → enable Face ID/Touch ID → OS prompt → success → auto-lock policy selector
PRIVACY & DATA FLOW:
 Settings/Privacy & Data → consent toggles → “Export My Data” (background job) → email/link → “Delete Cached Data” confirm
PERFORMANCE & STORAGE FLOW:
 Settings/Performance → cache size, clear cache → network mode (Auto/Low Data) → image compression setting
BACKUP & RESTORE FLOW:
 Settings/Backup & Restore → “Backup Now” → list previous backups → restore a prior state (confirm + scoped restore)
ANALYTICS FLOW:
 Analytics (from nav) → pick dashboard → filter bar (date, role, BU, region) → KPI cards + charts/table → export PDF/CSV → save view
(3) SCREEN SPECIFICATIONS
3.1 Dark/Light Mode Toggle
 Priority: Must-Have | Stage: ④ | Role: All
+-------------------------------+
| Appearance                    |
| Theme                         |
|  ( ) Light  (•) Dark  ( ) System
|                               |
| Accent                        |
| [ Brand #00D084 ] [ Change ]  |
|                               |
| Preview                       |
| [████ card ███ button ███]    |
|                               |
| [ Save ] [ Reset ]            |
+-------------------------------+
Components: ThemeToggle, ColorSwatch, PreviewCard.
 States: Light/Dark/System; unsaved changes banner.
 A11y: Focus-visible on tiles; contrast guard warns if accent fails WCAG.
3.2 Offline Mode & Sync
 Priority: Must-Have | Stage: ④ | Role: All
+----------------------------------+
| Offline & Sync                   |
| [ ] Enable Offline Cache         |
| Cache Content:                   |
| [x] Jobs  [x] Messages  [ ] Files
|                                  |
| Last Sync: Today 10:12           |
| [ Sync Now ]  [ View Logs ]      |
|                                  |
| Sync Progress: 73%  [======   ]  |
| Conflicts: 2  [ Review ]         |
+----------------------------------+
Components: SyncListItem, ProgressBar, ConflictReviewModal.
 States: Disabled, syncing, success, conflicts.
 Edge: Low storage → suggest disable files or compress images.
3.3 Push Notification Settings
 Priority: Must-Have | Stage: ④ | Role: All
+----------------------------------+
| Notifications                    |
| Device Permission: Granted       |
| Quiet Hours: [22:00–07:00]       |
|                                  |
| Categories                       |
| [x] Job Updates                  |
| [x] Messages                     |
| [ ] Marketing                    |
| [x] System Alerts                |
|                                  |
| [ Send Test Notification ]       |
+----------------------------------+
Components: NotificationCategoryRow, QuietHoursSlider, TestNotifButton.
 States: OS permission missing → CTA to enable.
 A11y: aria-live polite for test outcome.
3.4 Accessibility Settings
 Priority: Must-Have | Stage: ④ | Role: All
+----------------------------------+
| Accessibility                    |
| Text Size   [———|———]  100%      |
| [ ] High Contrast Mode           |
| [ ] Reduce Motion                |
| Focus Style:  (•) Strong  ( ) Subtle
| Cursor Size:  ( ) Default (•) Large
|                                  |
| [ Preview ] [ Save ]             |
+----------------------------------+
Components: FontSizeSlider, HighContrastToggle, MotionToggle, FocusStyleRadio.
 States: Live preview region updates with settings.
3.5 Language & Localization (EN/AR + Hijri)
 Priority: Must-Have | Stage: ④ | Role: All
+----------------------------------+
| Language & Calendar              |
| Language: (•) English  ( ) عربي  |
| Calendar: [ ] Use Hijri dates    |
| Number Format: (•) Latin ( ) Arabic-Indic
|                                  |
| Preview                           |
| Mon 12 Rabi' I 1447  •  09:45    |
|                                  |
| [ Apply ]                        |
+----------------------------------+
Components: LanguageSelector (inline), CalendarTypeToggle, NumeralFormatRadio.
 Behavior: On Arabic → set dir="rtl" and mirror chevrons; toast summarizes changes.
3.6 Biometric Security Setup
 Priority: Should-Have | Stage: ④ | Role: All
+----------------------------------+
| Security (Biometrics)            |
| [ ] Enable Face ID/Touch ID      |
| Auto-lock after: [ 5 min ▼ ]     |
| Require re-auth for payments [x] |
|                                  |
| [ Test Unlock ]                  |
+----------------------------------+
Components: BiometricToggle, AutoLockDropdown.
 States: Unsupported device → disabled with info note.
 Security: Payment re-auth always recommended.
3.7 Data & Privacy Settings
 Priority: Must-Have | Stage: ④ | Role: All
+----------------------------------+
| Privacy & Data                   |
| Consents                         |
| [x] Terms  [x] Privacy  [ ] Marketing
|                                  |
| Data Controls                    |
| [ Export My Data ] [ Delete Cache ]
| Session Management               |
| Active sessions: 3  [ Manage ]   |
+----------------------------------+
Components: ConsentToggleRow, ExportDataButton, CacheClearButton, SessionsList.
 States: Export queued; email with link; revoke session.
3.8 Performance & Storage
 Priority: Must-Have | Stage: ④ | Role: All
+----------------------------------+
| Performance & Storage            |
| Cache Size: 312 MB [ Clear ]     |
| Network Mode: (•) Auto ( ) Low Data
| Image Upload: (•) Compress ( ) Original
|                                  |
| Diagnostics                      |
| [ Run Performance Check ]        |
+----------------------------------+
Components: CacheMeter, NetworkModeRadio, CompressionRadio, DiagnosticsButton.
 States: Diagnostics prints actionable tips.
3.9 Backup & Restore
 Priority: Should-Have | Stage: ④ | Role: All
+----------------------------------+
| Backup & Restore                 |
| Backups                          |
| • 2025-09-01 09:00  28 MB [Restore]
| • 2025-08-15 18:12  25 MB [Restore]
|                                  |
| [ Backup Now ]                   |
| [ Schedule: Weekly ▼ ]           |
+----------------------------------+
Components: BackupRow, ScheduleDropdown, RestoreConfirmModal.
 Scope: Settings + lightweight state (not files).
3.10 About & App Information
 Priority: Must-Have | Stage: ④ | Role: All
+----------------------------------+
| About NBCON Pro                  |
| Version: v2.5.0 (web)            |
| Legal: [Terms] [Privacy] [PDPL]  |
| Support: help@nbcon.pro          |
| Build Info: Region KSA           |
+----------------------------------+
Components: LinkRow, CopyToClipboard for build hash.
 A11y: External links have aria-label with destination.
--- ANALYTICS SURFACES (Dashboards) ---
3.11 AI-Powered Job Matching (controls & explainability)
 Priority: Should-Have | Stage: ④ | Role: Enterprise/Admin
+----------------------------------+
| AI Matching Controls             |
| Weighting                        |
| Skills [——|—]  Location [—|——]  |
| Ratings [—|——]  Price [—|——]    |
|                                  |
| Outcome Preview (last 30 days)   |
| Match Accuracy 87%  ▲ +3%        |
| [ Generate Report ] [ Reset ]    |
+----------------------------------+
Components: WeightSliderGroup, KPIChip, InsightCallout.
 Explainability: Show top 3 reasons per match.
3.12 Predictive Analytics Dashboard
 Priority: Should-Have | Stage: ④ | Role: Enterprise/Admin
+----------------------------------+
| Predictive Demand (90 days)      |
| Filters: Region [All] Service [All]
| KPIs: Demand ↑12%, Fill Rate 89% |
| [ Forecast Chart ]               |
| [ Export PDF ] [ Save View ]     |
+----------------------------------+
Components: ChartTabs (ARIMA/Prophet label only in UI), FilterBar, ExportButtons.
3.13 Geospatial Analytics
 Priority: Should-Have | Stage: ④ | Role: Enterprise/Admin
+----------------------------------+
| Geospatial Analytics             |
| Map Layers: Demand | Supply | Jobs
| Time: [ Last 30d ▼ ]             |
| [ Map with clusters ]            |
| Region table (sortable)          |
+----------------------------------+
Components: MapWidget (cluster pins), LayerToggle, RegionTable.
3.14 Performance Benchmarking
 Priority: Should-Have | Stage: ④ | Role: Enterprise/Admin
+----------------------------------+
| Performance Benchmarking         |
| Compare: BU [Riyadh] vs [Jeddah] |
| KPIs: Time-to-Assign, SLA hits   |
| [ Comparison Charts ]            |
+----------------------------------+
Components: SegmentedControl, ComparisonChart, KPIGrid.
3.15 Quality Assurance Dashboard
 Priority: Should-Have | Stage: ④ | Role: Enterprise/Admin
+----------------------------------+
| Quality Assurance                |
| Flags open: 12  Resolved: 47     |
| [ Issue Table ] [ Trends ]       |
+----------------------------------+
Components: QAFlagTable, TrendChart, ResolveAction.
3.16 Resource Utilization Analytics
 Priority: Should-Have | Stage: ④ | Role: Enterprise/Admin
+----------------------------------+
| Resource Utilization             |
| Range: Week | Month              |
| Engineers load (heatmap)         |
| Underutilized: 14                |
+----------------------------------+
Components: Heatmap, UtilizationList, ReassignCTA.
3.17 Market Intelligence Center
 Priority: Nice-to-Have | Stage: ④ | Role: Enterprise/Admin
+----------------------------------+
| Market Intelligence              |
| Trends: Pricing, Demand, Skills  |
| Insight: “HVAC demand +18%”      |
| [ Read Report ]                  |
+----------------------------------+
Components: InsightCard, TrendList, ReportLink.
3.18 Custom Report Builder
 Priority: Should-Have | Stage: ④ | Role: Enterprise/Admin
+----------------------------------+
| Custom Report Builder            |
| Metrics ▸ Revenue, Fill Rate     |
| Dimensions ▸ Project, City       |
| Filters ▸ Date, Role             |
| [ Generate ] [ Save Template ]   |
+----------------------------------+
Components: MetricPicker, DimensionPicker, SavedTemplateRow, TableVirtualized.
3.19 Integration Analytics
 Priority: Should-Have | Stage: ④ | Role: Enterprise/Admin
+----------------------------------+
| Integration Analytics            |
| API Calls: 12,430  Errors: 0.7%  |
| Top Endpoints: /invoices, /jobs  |
| [ Latency Chart ] [ Error Table ]|
+----------------------------------+
Components: LatencyChart, ErrorTable, EndpointList.
3.20 Business Intelligence Hub
 Priority: Should-Have | Stage: ④ | Role: Enterprise/Admin/C-Suite
+----------------------------------+
| BI Hub                           |
| Exec KPIs: GMV, Take Rate, AR    |
| Dashboards: Finance, Ops, CX     |
| [ Share Link ] [ Subscribe ]     |
+----------------------------------+
Components: ExecSummaryCards, DashboardCatalog, ShareModal, SubscriptionToggle.
(4) COMPONENT LIBRARY UPDATES
ThemeToggle(props: value 'light'|'dark'|'system', onChange)
ColorSwatch(props: color, onPick, contrastWarning)
SyncListItem(props: type, enabled, lastSync, onSync, conflictsCount)
QuietHoursSlider(props: start, end, onChange)
NotificationCategoryRow(props: id, label, enabled, onToggle)
FontSizeSlider(props: min, max, value, onChange, previewId)
HighContrastToggle(props: enabled, onToggle)
MotionToggle(props: enabled, onToggle)
FocusStyleRadio(props: value, options, onChange)
LanguageInlineSelector(props: value 'en'|'ar', onChange)
CalendarTypeToggle(props: hijriEnabled, onToggle)
NumeralFormatRadio(props: value 'latin'|'ar', onChange)
BiometricToggle(props: supported, enabled, onToggle)
ExportDataButton(props: onExport, status 'idle'|'queued'|'ready')
CacheMeter(props: sizeMB, onClear)
DiagnosticsButton(props: onRun, result)
BackupRow(props: date, size, onRestore)
ScheduleDropdown(props: value, options, onChange)
KPIChip(props: label, value, delta)
InsightCallout(props: title, body, tone 'positive'|'warning'|'neutral')
WeightSliderGroup(props: weights, onChange)
FilterBar(props: filters[], onApply, onReset)
MapWidget(props: layers[], onLayerChange, data)
ComparisonChart(props: series[], mode)
Heatmap(props: matrix, range)
MetricPicker/DimensionPicker(props: options[], selected[], onChange)
TableVirtualized(props: rows, columns, onSort, rowActions)
ExportButtons(props: formats[], onExport)
 All components: i18n keys, RTL-safe paddings/margins, 44px targets, focus-visible ring.
(5) COPY EN/AR ADDITIONS
json
{
  "settings": {
    "appearance": { "en": "Appearance", "ar": "المظهر" },
    "theme": { "en": "Theme", "ar": "السمة" },
    "light": { "en": "Light", "ar": "فاتحة" },
    "dark": { "en": "Dark", "ar": "داكنة" },
    "system": { "en": "System", "ar": "النظام" },
    "accentColor": { "en": "Accent Color", "ar": "لون التمييز" },
    "preview": { "en": "Preview", "ar": "معاينة" },
    "save": { "en": "Save", "ar": "حفظ" },
    "reset": { "en": "Reset", "ar": "إعادة تعيين" },

    "offlineSync": { "en": "Offline & Sync", "ar": "وضع عدم الاتصال والمزامنة" },
    "enableOffline": { "en": "Enable Offline Cache", "ar": "تفعيل التخزين دون اتصال" },
    "cacheContent": { "en": "Cache Content", "ar": "محتوى التخزين" },
    "syncNow": { "en": "Sync Now", "ar": "مزامنة الآن" },
    "viewLogs": { "en": "View Logs", "ar": "عرض السجلات" },
    "conflicts": { "en": "Conflicts", "ar": "التعارضات" },

    "notifications": { "en": "Notifications", "ar": "الإشعارات" },
    "devicePermission": { "en": "Device Permission", "ar": "صلاحية الجهاز" },
    "quietHours": { "en": "Quiet Hours", "ar": "ساعات الهدوء" },
    "sendTest": { "en": "Send Test Notification", "ar": "إرسال إشعار تجريبي" },

    "accessibility": { "en": "Accessibility", "ar": "إمكانية الوصول" },
    "textSize": { "en": "Text Size", "ar": "حجم النص" },
    "highContrast": { "en": "High Contrast Mode", "ar": "وضع التباين العالي" },
    "reduceMotion": { "en": "Reduce Motion", "ar": "تقليل الحركة" },
    "focusStyle": { "en": "Focus Style", "ar": "نمط المؤشر" },
    "cursorSize": { "en": "Cursor Size", "ar": "حجم المؤشر" },

    "languageCalendar": { "en": "Language & Calendar", "ar": "اللغة والتقويم" },
    "useHijri": { "en": "Use Hijri dates", "ar": "استخدام التقويم الهجري" },
    "numberFormat": { "en": "Number Format", "ar": "تنسيق الأرقام" },
    "latin": { "en": "Latin", "ar": "لاتيني" },
    "arabicIndic": { "en": "Arabic-Indic", "ar": "هندي عربي" },
    "apply": { "en": "Apply", "ar": "تطبيق" },

    "security": { "en": "Security", "ar": "الأمان" },
    "biometric": { "en": "Biometric Authentication", "ar": "المصادقة الحيوية" },
    "autoLock": { "en": "Auto-lock after", "ar": "القفل التلقائي بعد" },
    "requireReauthPayments": { "en": "Require re-auth for payments", "ar": "طلب إعادة المصادقة للمدفوعات" },
    "testUnlock": { "en": "Test Unlock", "ar": "اختبار الفتح" },

    "privacyData": { "en": "Privacy & Data", "ar": "الخصوصية والبيانات" },
    "consents": { "en": "Consents", "ar": "الموافقات" },
    "exportData": { "en": "Export My Data", "ar": "تصدير بياناتي" },
    "deleteCache": { "en": "Delete Cache", "ar": "حذف الذاكرة المؤقتة" },
    "sessions": { "en": "Active Sessions", "ar": "الجلسات النشطة" },
    "manage": { "en": "Manage", "ar": "إدارة" },

    "performance": { "en": "Performance & Storage", "ar": "الأداء والتخزين" },
    "cacheSize": { "en": "Cache Size", "ar": "حجم الذاكرة المؤقتة" },
    "clear": { "en": "Clear", "ar": "مسح" },
    "networkMode": { "en": "Network Mode", "ar": "وضع الشبكة" },
    "lowData": { "en": "Low Data", "ar": "بيانات منخفضة" },
    "imageUpload": { "en": "Image Upload", "ar": "رفع الصور" },
    "compress": { "en": "Compress", "ar": "ضغط" },
    "original": { "en": "Original", "ar": "أصلي" },
    "runDiagnostics": { "en": "Run Performance Check", "ar": "تشغيل فحص الأداء" },

    "backupRestore": { "en": "Backup & Restore", "ar": "النسخ الاحتياطي والاستعادة" },
    "backupNow": { "en": "Backup Now", "ar": "نسخ احتياطي الآن" },
    "schedule": { "en": "Schedule", "ar": "الجدولة" },
    "restore": { "en": "Restore", "ar": "استعادة" },

    "about": { "en": "About & App Information", "ar": "حول التطبيق ومعلوماته" },
    "version": { "en": "Version", "ar": "الإصدار" },
    "legal": { "en": "Legal", "ar": "اللوائح" }
  },
  "analytics": {
    "aiMatching": { "en": "AI Matching", "ar": "المطابقة بالذكاء الاصطناعي" },
    "predictive": { "en": "Predictive Analytics", "ar": "التحليلات التنبؤية" },
    "geospatial": { "en": "Geospatial Analytics", "ar": "التحليلات الجغرافية" },
    "benchmarking": { "en": "Performance Benchmarking", "ar": "مقارنة الأداء" },
    "quality": { "en": "Quality Assurance", "ar": "ضمان الجودة" },
    "utilization": { "en": "Resource Utilization", "ar": "استغلال الموارد" },
    "marketIntel": { "en": "Market Intelligence", "ar": "ذكاء السوق" },
    "reportBuilder": { "en": "Custom Report Builder", "ar": "منشئ التقارير المخصصة" },
    "integration": { "en": "Integration Analytics", "ar": "تحليلات التكامل" },
    "biHub": { "en": "Business Intelligence Hub", "ar": "مركز ذكاء الأعمال" },
    "generateReport": { "en": "Generate Report", "ar": "إنشاء تقرير" },
    "saveView": { "en": "Save View", "ar": "حفظ العرض" },
    "exportPDF": { "en": "Export PDF", "ar": "تصدير PDF" },
    "exportCSV": { "en": "تصدير CSV", "ar": "تصدير CSV" }
  }
}
(6) EMPTY STATES & EDGE CASES
Theme conflict (custom accent fails contrast): show warning + auto-suggest nearest accessible color.
Offline cache disabled by OS/storage: show banner; allow partial caching (messages only).
Push permission denied: instruct path to OS settings; provide email fallback toggle.
Biometric unsupported: explain, hide toggles; keep passcode-only.
Data export large: queue with progress + email link; retention window notice.
Backup restore scope: warn that only settings/state restored; jobs/messages unaffected.
Analytics no data: show sample widget + “Insufficient data. Adjust range.”
(7) ACCESSIBILITY NOTES
All toggles/radios: 44px min hit area; role="switch" with aria-checked.
Sliders: labelled with min/max/value; keyboard support (←/→ step, Shift for 10x).
Focus management: After “Apply Language”, set focus to main heading; announce direction change.
Reduced motion: disable chart animations; prefer fades.
High contrast: ensure tokens meet WCAG AA (>=4.5:1 text).
Map alternatives: Summary table below map; each cluster is keyboard reachable.
Live regions: Non-intrusive toasts with aria-live="polite".
(8) ANALYTICS EVENTS
json
{
  "theme_changed": { "from": "light|dark|system", "to": "light|dark|system" },
  "offline_sync": { "trigger": "manual|auto", "success": "boolean", "conflicts": "number", "duration_ms": "number" },
  "notif_pref_changed": { "category": "jobs|messages|marketing|system", "enabled": "boolean", "quiet_hours": "string" },
  "accessibility_updated": { "font_scale": "number", "contrast": "boolean", "reduce_motion": "boolean", "focus_style": "string" },
  "locale_changed": { "from": "en|ar", "to": "en|ar" },
  "hijri_toggled": { "enabled": "boolean" },
  "biometric_enabled": { "enabled": "boolean", "autolock_minutes": "number" },
  "data_exported": { "method": "link|email", "size_mb": "number" },
  "cache_cleared": { "size_mb": "number" },
  "backup_created": { "size_mb": "number", "schedule": "none|weekly|monthly" },
  "backup_restored": { "from_date": "ISO8601" },
  "analytics_filter_applied": { "dashboard": "predictive|geospatial|...", "filters": "object" },
  "analytics_report_built": { "dashboard": "string", "rows": "number", "duration_ms": "number" },
  "analytics_exported": { "dashboard": "string", "format": "pdf|csv", "rows": "number" }
}
(9) OPEN QUESTIONS & ASSUMPTIONS
 Questions:
Should Hijri toggle propagate to invoices/receipts or UI-only?
Default quiet hours across roles? Respect prayer times in reminders?
Biometric policy: mandatory for Admin role? Re-auth window length?
Offline scope: Are file previews cached or metadata only?
Analytics storage: sampling strategy for large orgs? Row-level permissions by BU?
Data export format (JSON/CSV) and fields under PDPL?
Assumptions:
Arabic-Indic numerals are optional, default Latin unless user chooses.
Analytics exports include metadata footers (time, filters).
Backup excludes large binaries; restores are idempotent.
(10) DESIGN LOG UPDATES
 New Patterns:
Instant theme preview with contrast guard.
Quiet-hours slider with AR 24h labels mirrored in RTL.
Locale apply pattern with direction change announcement.
Analytics FilterBar standardized across dashboards.
MapWidget with accessible summary table.
Interaction Decisions:
“Apply” on Language triggers toast with “Restart not required.”
Offline Sync “Review Conflicts” opens diff view (local vs server).
Diagnostics produces actionable, copyable checklist.
Report Builder saves templates to user profile; shareable links per role.
Performance:
Virtualized tables on all dashboards.
Debounced filters (300ms); precomputed aggregates for common ranges.
Map clusters rendered server-side-aggregated when >10k points.
IMPLEMENTATION CHECKLIST
 Development:
 Implement settings routes/tabs; persist via Zustand with hydration.
 Theme tokens + contrast guard; system-pref detection.
 Offline cache (IndexedDB) with content scopes; conflict resolver.
 Push preferences UI + OS permission bridge; quiet hours scheduling.
 Accessibility controls: font scale, contrast, motion, focus styles.
 Language/RTL switch; Hijri date helper integration; numeral format.
 Biometric toggle (WebAuthn/FIDO2 where available) + auto-lock.
 Privacy actions: data export queue, cache clear, session revoke.
 Performance & Storage panel; diagnostics runner.
 Backup/Restore of settings/state; scheduler.
 Analytics dashboards: shared FilterBar, KPI cards, charts; exports.
QA:
 WCAG 2.2 AA audit (focus, contrast, keyboard, SR).
 RTL end-to-end review (mirroring, numerals, dates).
 Offline/online transitions (airplane mode tests).
 Push permissions (grant/deny) across browsers/devices.
 Biometric supported/unsupported fallbacks.
 Analytics performance and export accuracy.
Performance:
 Theme switch P95 < 200ms.
 Dashboard render P50 < 2s with 50k rows (server-filtered).
 Export P90 < 10s for 50k rows.
 IndexedDB operations non-blocking; UI responsive ≥ 60fps.
This completes Patch 4 — Mobile UX, Settings & Accessibility with thorough specs, components, copy, accessibility, analytics, and implementation guidance.

---

PATCH 5 — PLATFORM ADMINISTRATION

(1) OVERVIEW
Goal: Deliver secure, auditable, role-based admin consoles to govern users, content, finance, configuration, security/compliance, integrations, data products, and future-tech pilots. Ensure fast triage, safe changes, full traceability, and minimal blast radius.
Users: Admin (super-admin), Compliance, Finance Ops, Security (SecOps), Support/Ops, Enterprise Admins (restricted views).
Success Criteria:

* P95 page load < 2s; table ops (filter/sort) < 500ms
* All destructive or high-risk actions gated by confirm + 2FA + reason + audit trail
* Reconciliation mismatch rate < 0.5%; dispute resolution median < 48h
* Moderation first-response SLA < 2h; queue aging dashboard
* Feature flag rollouts: instant kill-switch; rollback < 30s
  Constraints: Bilingual EN/AR, full RTL, WCAG 2.2 AA, server-driven pagination, RLS-aware queries, PDPL compliance, KSA regulatory context.
  Dependencies (from P1–P4): Auth with roles, i18n/RTL, analytics hooks, files hub, payments infra, notifications system.

(2) USER FLOWS
USER ADMIN FLOW:
Admin Dashboard → Users → Filter (role/status/verification) → Select user → Actions (Verify/Suspend/Reset MFA/Impersonate\*) → Confirm → Audit log entry → Notification (optional)

CONTENT MODERATION FLOW:
Moderation → Queue → Open item → Review evidence (media, metadata, prior reports) → Decision (Approve/Reject/Remove/Shadowban) → Reason tags → Notify parties → SLA+metrics update

FINANCE OPS FLOW:
Finance Admin → Reconciliation (Payments/Refunds/Fraud) → Filter by date/gateway → Match transactions → Resolve discrepancies or raise dispute → Export report

FEATURE FLAG & CONFIG FLOW:
System Config → Feature Flags → Targeting (percentage/role/region) → Rollout → Monitor metrics → Rollback if needed → Audit

SECURITY & COMPLIANCE FLOW:
Security Center → Alerts (auth anomalies, RLS violations) → Acknowledge → Mitigate (lock user/rotate keys) → File incident → Export audit

COMMUNICATION FLOW:
Comms → New Announcement → Audience (role/region) → Schedule → A/B → Preview EN/AR → Send → Track deliveries

INTEGRATIONS FLOW:
API Console → Create API Key → Scope/TTL → Copy → Test webhook → Monitor usage/latency/errors → Rotate/Disable

DATA/INNOVATION FLOW:
AR/VR, Blockchain, IoT, AI Docs, Drone, Carbon, ML, BIM → Open module → Configure source → Run job → Review outputs → Export

(3) SCREEN SPECIFICATIONS

3.1 Admin Dashboard
Priority: Must-Have | Stage: ⑤ | Role: Admin/SecOps/Finance

```
+----------------------------------------------+
| KPI Cards: MAU | GMV | Disputes Open | SLA   |
| Alerts: [High] API error spike 12:10 (Ack)   |
| Queues: Moderation: 27 | Disputes: 8 | KYC: 5|
| Quick Actions: [Users] [Flags] [Recon] [Comms]
| Recent Activity (Audit Log)                  |
+----------------------------------------------+
```

Components: KPIGrid, AlertRow(acknowledge), QueueChips, QuickActionButtons, AuditLogList.
States: No alerts; degraded state banner if incidents active.

3.2 User Management System
Priority: Must-Have | Stage: ⑤ | Role: Admin/Support

```
Filters: Role, Status, SCE, KYC, Joined, Region
Table: Name | Email | Role | Status | SCE | Last Seen | Actions [...]
Row actions: View, Verify, Suspend, Reset MFA, Impersonate*, Export
Bulk actions: Email, Suspend, Role change
```

Components: UserRow(actions), BulkBar, SidePanel(UserProfile), ReasonModal.
Safety: Impersonate requires ticket ref + 2FA; banner shows “Impersonating as X”.

3.3 Content Moderation Center
Priority: Must-Have | Stage: ⑤ | Role: Moderators

```
Tabs: Reports | Auto-flags | Appeals
Queue list → Detail: Content preview (image/doc/chat), Reporter notes, Policy refs
Decision: Approve | Remove | Restrict | Ban (duration)
Reason tags + freeform note; notify user toggle
```

Components: FlaggedItemRow, EvidenceViewer, DecisionBar, PolicyTagPicker.
Edge: PII detection hints; redact preview if sensitive.

3.4 Financial Administration
Priority: Must-Have | Stage: ③/⑤ | Role: Finance

```
Tabs: Payments | Refunds | Fraud
Reconciliation: Gateway tx vs Ledger vs DB
Table: Tx ID | Amount | Status | Gateway | Match | Action [Reconcile/Flag]
Disputes: Case list → Evidence → Submit response
```

Components: TransactionLogRow, ReconcileRow, DisputeCaseRow, ExportButtons.
A11y: Table semantics; sticky headers; keyboard reconcile.

3.5 System Configuration
Priority: Must-Have | Stage: ⑤ | Role: Admin

```
Feature Flags: name | status | rollout % | audience | modified | [Toggle/Targeting]
Rate Limits: endpoint | limit/min | burst | [Edit]
Email/SMS Templates: [Edit/Preview/Test]
Locales & Formats: EN/AR & Hijri toggles (global defaults)
Maintenance Mode: [Enable for X min] [Banner message]
```

Components: FeatureToggle, TargetingDrawer, RateLimitControl, TemplateEditor, MaintenanceBannerEditor.

3.6 Admin Analytics & Reporting
Priority: Should-Have | Stage: ⑤ | Role: Admin/Exec

```
Catalog: Finance | Ops | CX | Risk
Report Viewer: Filters → KPI cards → Charts → Table
[Export PDF/CSV] [Schedule email]
```

Components: ReportCatalog, FilterBar, KPIGrid, ChartTabs, ScheduledExportRow.

3.7 Security & Compliance Center
Priority: Must-Have | Stage: ⑤ | Role: SecOps/Compliance

```
Auth Anomalies: geo/risk heatmap, IP lists
Access Policies: Role → Permissions matrix (read-only)
Audit Log Search: actor/action/resource/time [Search]
Data Requests (PDPL): open/fulfilled; export builder
Key Vault status: rotations due
```

Components: RiskHeatmap, PermissionMatrix, AuditLogRow, PDPLRequestRow, KeyRotationRow.

3.8 Platform Maintenance
Priority: Must-Have | Stage: ⑤ | Role: Admin/DevOps

```
Tasks: Backups | Updates | Logs
Backups list [Run now] [Restore…]
Update channels: Canary/Stable; current build hash
Log viewer (tail with filters)
```

Components: MaintenanceTaskRow, BackupRow, RestoreConfirmModal, LogStream.

3.9 Communication Management
Priority: Must-Have | Stage: ⑤ | Role: Admin/Comms

```
Announcement Editor: Title, Body EN/AR, Audience, Schedule, A/B variant
Preview (EN/AR), Send test, Publish, Results (open/click)
Templates library
```

Components: AnnouncementEditor, AudiencePicker, ABVariantTabs, DeliveryStats.

3.10 API & Developer Console
Priority: Must-Have | Stage: ⑤ | Role: Admin/Partners

```
API Keys: name | scopes | created | expires | status | [Copy/Rotate/Revoke]
Webhooks: endpoint | secret | last delivery | success % | [Send test]
Usage: Calls, Latency, Errors (charts)
```

Components: ApiKeyRow, WebhookRow, LatencyChart, ErrorTable.
Safety: Mask secrets; show once on creation.

3.11 AR/VR Project Visualization
Priority: Nice-to-Have | Stage: ⑤ | Role: Admin/Enterprise

```
3D Viewer: glTF/OBJ; Layers; Measure; Share read-only link
Fallback: preview thumbnails if unsupported
```

Components: ARModeButton, ModelViewerPanel, LayerList.

3.12 Blockchain Project Verification
Priority: Nice-to-Have | Stage: ⑤ | Role: Compliance/Enterprise

```
Ledger Records: document hash | txid | chain | status | timestamp
[Verify] [Anchor new hash] [Export proof]
```

Components: LedgerRecordRow, ProofBadge, AnchorModal.
Note: Off-chain fallback if chain unavailable.

3.13 IoT Data Integration
Priority: Should-Have | Stage: ⑤ | Role: Enterprise

```
Sensors: name | site | status | last ping | [View stream]
Data Health: uptime %, gaps; throttling rules
Mappings: Sensor → Project → Permissions
```

Components: SensorRow, StreamViewer, MappingDrawer, ThrottleRuleRow.

3.14 AI-Powered Document Analysis
Priority: Should-Have | Stage: ⑤ | Role: Admin/QA

```
Upload/Select docs → Pipelines: OCR, PII, Entities, QC checks
Run analysis → Results: findings list, highlights, risks
[Export JSON/CSV] [Open in Secure Viewer]
```

Components: AnalysisRunRow, FindingRow, SecureViewer.

3.15 Drone Data Integration
Priority: Nice-to-Have | Stage: ⑤ | Role: Enterprise

```
Flights: id | site | pilot | date | coverage | [Open]
Map track + photo grid; stitching job status
```

Components: FlightLogRow, MapTrack, StitchJobBadge.

3.16 Carbon Footprint Tracking
Priority: Should-Have | Stage: ⑤ | Role: Enterprise/Compliance

```
Project emissions: Scope 1/2 (basic) summary; factors reference
Upload utility data; calculator; targets vs actuals; export
```

Components: EmissionsRow, FactorPicker, TargetProgress.

3.17 Machine Learning Optimization
Priority: Should-Have | Stage: ⑤ | Role: Admin/ML

```
Models: name | version | traffic % | status | metrics | [Promote/Rollback]
Experiments: A/B toggles; guardrails (latency, error)
```

Components: ModelRow, ExperimentToggle, GuardrailBadge.

3.18 Global Expansion Module
Priority: Should-Have | Stage: ⑤ | Role: Admin

```
Regions: country | currency | VAT | locale | legal docs
Enable region, default pricing rules, translations completeness
```

Components: RegionRow, LegalDocUploader, TranslationStatusRow.

3.19 Advanced BIM Integration
Priority: Nice-to-Have | Stage: ⑤ | Role: Enterprise

```
BIM Viewer: IFC/BCF; layer control; comments; issue pins; version compare
```

Components: BIMViewerPanel, LayerControl, IssuePinRow.

3.20 Future Technology Preview
Priority: Nice-to-Have | Stage: ⑤ | Role: Admin

```
Feature cards (pilot) → enable per tenant → feedback capture
```

Components: PreviewCard, FeedbackForm.

(4) COMPONENT LIBRARY UPDATES

* AdminTabNav(props: tabs\[], value, onChange)
* KPIGrid(props: items\[{label,value,delta}])
* AlertRow(props: severity, title, time, onAck)
* QueueChips(props: items\[{label,count,href}])
* UserRow(props: user, onAction); actions: view, verify, suspend, resetMFA, impersonate
* BulkBar(props: selectedCount, actions\[])
* EvidenceViewer(props: files\[], redactions\[])
* DecisionBar(props: actions\[], reasons\[], note, onSubmit)
* TransactionLogRow(props: tx, onReconcile)
* ReconcileRow(props: mismatch, onResolve)
* DisputeCaseRow(props: case, onSubmitDefense)
* FeatureToggle(props: enabled, onToggle, rollout)
* TargetingDrawer(props: rules, percent, audience)
* RateLimitControl(props: endpoint, limit, burst, onSave)
* TemplateEditor(props: subject/body EN/AR, preview)
* MaintenanceTaskRow(props: task, status, onRun)
* LogStream(props: source, filters)
* AnnouncementEditor(props: titleEN, titleAR, bodyEN, bodyAR, schedule, ab)
* AudiencePicker(props: segments\[])
* DeliveryStats(props: sent, open, click)
* ApiKeyRow(props: name, scopes, expires, status, onRotate)
* WebhookRow(props: url, secretMasked, status, lastDelivery, onTest)
* RiskHeatmap(props: data)
* PermissionMatrix(props: roles\[], perms\[])
* AuditLogRow(props: entry)
* PDPLRequestRow(props: request, onExport)
* KeyRotationRow(props: key, dueDate, onRotate)
* ModelViewerPanel(props: src, layers\[])
* LedgerRecordRow(props: hash, chain, status, onVerify)
* SensorRow(props: sensor, onView)
* AnalysisRunRow(props: job, status, onExport)
* FindingRow(props: finding, severity)
* FlightLogRow(props: flight, onOpen)
* EmissionsRow(props: project, scope1, scope2, trend)
* ParameterSlider(props: label, value, min, max)
* ExperimentToggle(props: model, traffic, onChange)
* RegionRow(props: region, enabled, currency, vat)
* BIMViewerPanel(props: ifcUrl, layers\[], issues\[] )
* PreviewCard(props: feature, enabled, onToggle)

(5) COPY EN/AR ADDITIONS

```
json
{
  "admin": {
    "dashboard": { "en": "Admin Dashboard", "ar": "لوحة تحكم المشرف" },
    "users": { "en": "User Management", "ar": "إدارة المستخدمين" },
    "moderation": { "en": "Content Moderation", "ar": "مراجعة المحتوى" },
    "finance": { "en": "Financial Administration", "ar": "الإدارة المالية" },
    "system": { "en": "System Configuration", "ar": "إعدادات النظام" },
    "analytics": { "en": "Admin Analytics & Reporting", "ar": "تحليلات وتقارير الإدارة" },
    "security": { "en": "Security & Compliance", "ar": "الأمن والامتثال" },
    "maintenance": { "en": "Platform Maintenance", "ar": "صيانة المنصة" },
    "comms": { "en": "Communication Management", "ar": "إدارة الإعلانات" },
    "api": { "en": "API & Developer Console", "ar": "واجهة البرمجة للمطورين" },
    "arvr": { "en": "AR/VR Visualization", "ar": "عرض الواقع المعزز/الافتراضي" },
    "blockchain": { "en": "Blockchain Verification", "ar": "التحقق عبر البلوك تشين" },
    "iot": { "en": "IoT Integration", "ar": "تكامل إنترنت الأشياء" },
    "aiDocs": { "en": "AI Document Analysis", "ar": "تحليل المستندات بالذكاء الاصطناعي" },
    "drone": { "en": "Drone Integration", "ar": "تكامل الطائرات بدون طيار" },
    "carbon": { "en": "Carbon Footprint", "ar": "البصمة الكربونية" },
    "ml": { "en": "ML Optimization", "ar": "تحسين نماذج التعلم الآلي" },
    "expansion": { "en": "Global Expansion", "ar": "التوسع العالمي" },
    "bim": { "en": "BIM Integration", "ar": "تكامل نمذجة معلومات البناء" },
    "preview": { "en": "Future Technology Preview", "ar": "معاينة التقنيات المستقبلية" },

    "verify": { "en": "Verify", "ar": "تحقق" },
    "suspend": { "en": "Suspend", "ar": "تعليق" },
    "resetMFA": { "en": "Reset MFA", "ar": "إعادة ضبط التحقق الثنائي" },
    "impersonate": { "en": "Impersonate", "ar": "تسجيل الدخول كمستخدم" },
    "approve": { "en": "Approve", "ar": "قبول" },
    "remove": { "en": "Remove", "ar": "إزالة" },
    "restrict": { "en": "Restrict", "ar": "تقييد" },
    "ban": { "en": "Ban", "ar": "حظر" },
    "reconcile": { "en": "Reconcile", "ar": "تسوية" },
    "flag": { "en": "Flag", "ar": "إبلاغ" },
    "export": { "en": "Export", "ar": "تصدير" },
    "toggle": { "en": "Toggle", "ar": "تبديل" },
    "targeting": { "en": "Targeting", "ar": "الاستهداف" },
    "maintenanceMode": { "en": "Maintenance Mode", "ar": "وضع الصيانة" },
    "announcement": { "en": "Announcement", "ar": "إعلان" },
    "schedule": { "en": "Schedule", "ar": "جدولة" },
    "generateKey": { "en": "Generate Key", "ar": "إنشاء مفتاح" },
    "rotate": { "en": "Rotate", "ar": "تدوير" },
    "copy": { "en": "Copy", "ar": "نسخ" },
    "sendTest": { "en": "Send Test", "ar": "إرسال اختبار" },
    "verifyHash": { "en": "Verify Hash", "ar": "تحقق من البصمة" },
    "anchor": { "en": "Anchor", "ar": "تثبيت" },
    "runAnalysis": { "en": "Run Analysis", "ar": "تشغيل التحليل" },
    "restore": { "en": "Restore", "ar": "استعادة" }
  }
}
```

(6) EMPTY STATES & EDGE CASES

* Users: “No results. Adjust filters.” Offer saved filters.
* Moderation: “No items in queue.” Show recent decisions and policies.
* Finance: Partial gateway outage → banner; actions disabled with rationale.
* Config: Flag dependencies conflict → warn; block enabling without dependency met.
* API: Key creation fails → explain scopes/limits; show retry backoff.
* Blockchain: Network lag → pending state with retry; offline proof export.
* IoT: Sensor offline → suggest health checks; allow muting noisy sensors.
* Drone: Large imagery → staged processing; preview thumbnails first.
* BIM/AR: Unsupported browser → fallback viewer; downloadable report.

(7) ACCESSIBILITY NOTES

* Tables: `<table>` semantics, `<th scope="col">`, row checkboxes with `aria-label`.
* Bulk actions region receives focus after selection; ESC cancels bulk bar.
* DecisionBar: radio group with labelled reasons; note textarea has `aria-describedby`.
* Live regions for alerts/ack banners (polite).
* Code/keys: copy buttons announce “Copied”.
* Charts: provide data table toggles; high-contrast palettes.
* Map/3D viewers: keyboard pan/zoom shortcuts + textual summaries.

(8) ANALYTICS EVENTS

```
json
{
  "admin_login": { "actor_id": "string", "mfa": "true|false" },
  "user_action_performed": { "actor_id": "string", "target_user": "string", "action": "verify|suspend|reset_mfa|impersonate", "reason": "string" },
  "moderation_decision": { "item_id": "string", "decision": "approve|remove|restrict|ban", "reasons": ["string"], "sla_minutes": "number" },
  "reconciliation_done": { "batch_id": "string", "matched": "number", "mismatches": "number", "duration_ms": "number" },
  "feature_flag_changed": { "flag": "string", "from": "boolean|percent", "to": "boolean|percent", "audience": "string" },
  "api_key_generated": { "key_id": "string", "scopes": ["string"], "expires": "ISO8601" },
  "webhook_test_sent": { "endpoint": "url", "status": "number", "latency_ms": "number" },
  "maintenance_started": { "window_min": "number", "message": "string" },
  "backup_completed": { "backup_id": "string", "size_mb": "number", "duration_ms": "number" },
  "incident_acknowledged": { "incident_id": "string", "actor_id": "string" },
  "report_exported": { "report": "string", "format": "pdf|csv", "rows": "number" },
  "model_rollout": { "model": "string", "from_pct": "number", "to_pct": "number", "guardrail_hit": "boolean" },
  "iot_sensor_added": { "sensor_id": "string", "site": "string" },
  "ledger_verified": { "hash": "string", "chain": "string", "status": "ok|fail" },
  "emissions_calculated": { "project_id": "string", "scope1": "number", "scope2": "number" }
}
```

(9) OPEN QUESTIONS & ASSUMPTIONS
Questions:

1. Impersonation policy: who can, max duration, explicit user consent?
2. Moderation policy library: localized guidelines for KSA contexts?
3. Financial reconciliation source of truth (gateway vs internal ledger)?
4. Feature flag SDK: client-side eval allowed or server-only?
5. PDPL exports: fields, retention, redaction rules?
6. Blockchain chain choice and cost model?
7. IoT ingestion protocol (MQTT/HTTPS), retention windows, PII in payloads?
8. Drone/BIM licensing constraints for viewers?

Assumptions:

* All admin actions require reason codes; audits immutable and exportable.
* Flags rollouts default to 1% canary for 10 minutes before ramp.
* Webhooks must verify HMAC signatures.
* AR/VR/BIM modules are read-only in this phase.

(10) DESIGN LOG UPDATES

* Established “High-Risk Action Pattern”: confirm → OTP → reason → audit toast with link.
* Admin tables standardized: server pagination, column configs, saved views.
* Global “Impersonation Banner” pattern with exit CTA and time-left.
* Feature flags include audience presets: role, tenant, region, percentage.
* Report exports include filter watermark and timezone.

IMPLEMENTATION CHECKLIST
Development:

* [ ] Admin routes with role guards; redirect non-admins.
* [ ] KPI/queue endpoints; alert feed with acknowledge API.
* [ ] Users table: filters, bulk ops, side panel; 2FA-gated actions; audit service.
* [ ] Moderation queue: evidence viewer, decision API, policy tags.
* [ ] Finance: reconciliation UI, disputes workflow, exports.
* [ ] Config: feature flags (rollout + targeting), rate limits, templates, maintenance mode.
* [ ] Security: audit search, PDPL requests, key rotation, risk heatmap.
* [ ] Comms: announcement composer, audience targeting, scheduling, stats.
* [ ] API console: key CRUD (show-once secret), webhooks test + logs, usage charts.
* [ ] Integrations: stubs for AR/VR, blockchain, IoT, AI Docs, Drone, Carbon, ML, BIM.

QA:

* [ ] RLS/permissions checks for all admin endpoints.
* [ ] Destructive actions require confirm + MFA + reason.
* [ ] Audit logs immutable; time-synced.
* [ ] Table navigation keyboard + SR labels.
* [ ] Exports accurate, localized EN/AR; RTL verified.
* [ ] Feature flag rollback works under load.

Performance:

* [ ] Tables virtualized; queries indexed & server-paginated.
* [ ] Charts lazy-render; data limits with “load more”.
* [ ] Logs stream with backpressure.
* [ ] Console stays responsive under 10k rows/filter ops.

This completes Patch 5 — Platform Administration with secure, auditable, and efficient admin experiences aligned to KSA compliance and NBCON Pro’s operational needs.

---

PATCH 6 — EXTENDED CORE FEATURES

(1) OVERVIEW
Goal: Extend the end-to-end job lifecycle with drafting, cancellation/rescheduling, availability & scheduling, reusable quotes, upsells, time/materials, scope changes, multi-engineer collaboration, deliverables management, and completion certification. Optimize for speed, clarity, and enterprise readiness.
Users: Clients, Engineers, Enterprise Managers/Admins.
Success Criteria:

* Draft recovery rate ≥ 95% within 24h
* Reschedule flow time-to-complete ≤ 60s
* ≥ 70% engineers actively maintaining availability calendar weekly
* Scope change acceptance median ≤ 24h
* Deliverable approval cycle time reduced by ≥ 20%
  Constraints: Bilingual EN/AR, full RTL, WCAG 2.2 AA, desktop-first responsive, Saudi market norms, SAR currency.
  Dependencies: P1–P5 (auth, nav, stores, payments/escrow, notifications, files hub, analytics, admin).

(2) USER FLOWS
DRAFT → PUBLISH FLOW
Client: Create Job → Auto-save draft (30s or step change) → Drafts list → Reopen/Edit → Publish → Match & Quotes.

CANCEL/RESCHEDULE FLOW
Active Job → “More” → Cancel (with reason) or Reschedule → Pick new date/time + notify stakeholders → Update timeline/availability.

TEAMING & COLLABORATION FLOW
Job → Add Engineers / Subcontract → Assign tasks & rates → Track time/materials → Submit deliverables → Client review.

DELIVERABLES & APPROVAL FLOW
Engineer uploads deliverables (versions) → Client comments/pins → Revisions → Final report → Certificate of Completion → Payment release.

(3) SCREEN SPECIFICATIONS

3.1 Saved Job Drafts
Priority: Must-Have | Stage: ② → ③ | Role: Client/Enterprise

```
+------------------------------+
| Drafts                       |
| [Search____]  [Sort ▼]       |
|                              |
| [Row] Site Inspection        |
| Updated 2h ago • 45%         |
| [Continue] [Delete]          |
|                              |
| [Row] Office Fit-Out         |
| Updated Yesterday • 20%      |
| [Continue] [Delete]          |
+------------------------------+
```

Components: DraftRow, ProgressBar, SearchInput.
States: Empty (CTA “Start new job”), loading, recovering.
Validation: Confirm Delete (modal + reason optional).

3.2 Job Cancellation Flow
Priority: Must-Have | Stage: ④ | Role: Client/Engineer (permissioned)

```
Modal: Cancel Job
Reason (required): [Dropdown]
Note (optional):  [Textarea]
Affects: milestones, escrow, notifications
[Keep Job]   [Confirm Cancel]
```

Components: CancelConfirmModal, ImpactSummary.
Rules: If escrow held → prompt to open dispute or partial release; notify all parties; create audit entry.

3.3 Job Rescheduling Flow
Priority: Must-Have | Stage: ④ | Role: Client/Engineer

```
+------------------------------+
| Reschedule                   |
| Calendar [ Month grid ]      |
| Time Slots [09:00][11:00]... |
| Conflict warnings + prayer   |
| times note for locality      |
| [Notify All] [Save]          |
+------------------------------+
```

Components: RescheduleCalendar, SlotPicker, ConflictBadge.
Logic: Check engineer availability; suggest nearest free slots; adjust milestones.

3.4 Engineer Availability Calendar
Priority: Must-Have | Stage: ③/④ | Role: Engineer

```
Tabs: Week | Month
[Calendar grid] blocks (Available/Busy/Off-site)
[+ Add Block]  [Sync external ▼]
```

Components: AvailabilityCalendar, StatusDropdown.
Features: Drag to create blocks; ICS import; color legend; holiday overlays.

3.5 Client Favorites (Saved Engineers)
Priority: Should-Have | Stage: ② | Role: Client/Enterprise

```
[Search____]  Filters: Specialty, City, Rating
Card: Name • Rating • City • Rate
[Hire Again] [Remove]
```

Components: FavoriteRow, FilterChipsRow.

3.6 Bulk Job Posting (Enterprise)
Priority: Should-Have | Stage: ② | Role: Enterprise

```
Upload CSV [Choose file]
Template: [Download CSV template]
Preview table (validated) → Errors panel
[Post All] [Save as Drafts]
```

Components: CsvUpload, ValidationList, BulkActionsBar.

3.7 Job Cloning / Duplicate Posting
Priority: Must-Have | Stage: ② | Role: Client/Enterprise
Button “Clone Job” → prefilled builder.
Components: CloneJobButton, DiffNote.

3.8 Draft vs Published Projects
Priority: Must-Have | Stage: ②/③ | Role: Client/Enterprise
Tabs: Drafts | Published (counts & filters).
Components: ProjectTabs, ProjectList.

3.9 Rehire Engineer Option
Priority: Should-Have | Stage: ② | Role: Client
Past Job → “Rehire” → prefilled quick post with engineer invited.
Components: RehireButton, PrefillBadge.

3.10 Engineer Subscription Packages
Priority: Should-Have | Stage: ③ | Role: Engineer

```
Tiers: Basic | Pro | Elite
Benefits list, price SAR/mo, trial
[Subscribe] [Manage billing]
```

Components: SubscriptionTierCard, FeatureCompare.

3.11 Engineer Availability Status (Granular)
Priority: Must-Have | Stage: ③ | Role: Engineer
Quick toggle: Available | Busy | Off-Site | Custom until \[time].
Components: StatusDropdown, UntilPicker.

3.12 Holiday & Leave Planner (Engineer)
Priority: Should-Have | Stage: ③ | Role: Engineer
Calendar select date ranges → “Submit leave”.
Components: LeavePlannerCalendar, LeaveRequestRow.

3.13 Custom Quote Builder (Engineer)
Priority: Must-Have | Stage: ②/③ | Role: Engineer

```
Items:
[+ Add Item]
Row: Name | Qty | Unit | Unit Price (SAR) | Tax | Total
Terms, Validity, Attachments
[Send Quote]
```

Components: QuoteItemRow, TotalsSummary, TermsEditor.
Rules: VAT helper visible (15% note), Arabic numerals option.

3.14 Add-On Services (Upsell)
Priority: Should-Have | Stage: ②/③ | Role: Engineer

```
Checkbox list (add-ons) + price impacts
[Add to Quote] → updates totals
```

Components: AddonCheckboxRow.

3.15 Time Tracking & Work Hours Log
Priority: Must-Have | Stage: ④ | Role: Engineer

```
Timer: [Start/Stop]  Current job #1234
Daily log list: Start/End/Break/Notes
[Submit for approval]
```

Components: TimerControl, WorkLogRow.
Edge: Geofenced validation reminder.

3.16 Overtime & Extra Hours Request
Priority: Should-Have | Stage: ④ | Role: Engineer
Form: Hours, Reason, Rate change (if allowed) → Client approval.
Components: OvertimeRequestForm, ApprovalBadge.

3.17 Travel & Mileage Calculator
Priority: Should-Have | Stage: ④ | Role: Engineer/Enterprise
Start/End address or GPS track → distance → SAR/km (configurable) → expense line.
Components: MileageTracker, MapSnippet.

3.18 Material Cost Estimator
Priority: Should-Have | Stage: ④ | Role: Engineer
Add materials (catalog or custom), qty, unit cost → totals.
Components: MaterialRow, CatalogPicker.

3.19 Scope Change Request Flow
Priority: Must-Have | Stage: ④/⑤ | Role: Both

```
Modal: Request Scope Change
Changes summary, price/time impact
Attach files
[Send to Client]  → Approve/Reject
```

Components: ScopeChangeForm, DiffViewer, ImpactBadge.

3.20 Multi-Engineer Collaboration on One Job
Priority: Must-Have | Stage: ④ | Role: Enterprise/Client (owner)
Team list, roles, tasks per engineer, rate cards.
Components: TeamMemberRow, RoleTag, TaskAssign.

3.21 Engineer-to-Engineer Subcontracting
Priority: Should-Have | Stage: ④ | Role: Engineer (permissioned)
Pick engineer from network → set scope & pay → client informed/approve.
Components: SubcontractAssign, ConsentBanner.

3.22 Engineer Teams & Partnerships
Priority: Should-Have | Stage: ③/④ | Role: Engineer/Enterprise
Create team, invite members, define roles & revenue share.
Components: TeamCard, ShareSplitEditor.

3.23 Engineer Replacement Flow (Enterprise)
Priority: Should-Have | Stage: ④ | Role: Enterprise
Request replacement → AI suggests substitutes → approval and handover checklist.
Components: ReplacementRequestForm, HandoverChecklist.

3.24 Contract Extension Flow
Priority: Must-Have | Stage: ④/⑤ | Role: Client/Enterprise
Select new end date & additional cost → approval & contract amendment.
Components: ContractExtendForm, AmendmentSummary.

3.25 Deliverables Submission Form
Priority: Must-Have | Stage: ⑤ | Role: Engineer
Upload files + metadata (discipline, version note), link to milestones.
Components: DeliverableUploadRow, DisciplinePicker.

3.26 Multi-Format File Uploads (CAD/BIM/PDF)
Priority: Must-Have | Stage: ⑤ | Role: All
Support DWG, IFC, PDF, images; progress bars; virus scan; preview or placeholder.
Components: FileTypeBadge, PreviewFallback.

3.27 Deliverables Version Control
Priority: Must-Have | Stage: ⑤ | Role: All
Version list with diff/compare; restore (with confirm).
Components: VersionRow, CompareViewer.

3.28 Client Review & Comments on Deliverables
Priority: Must-Have | Stage: ⑤ | Role: Client
Pin comments on document; discussion thread per pin; resolve status.
Components: CommentPin, ThreadPanel, ResolveToggle.

3.29 Final Report Submission Workflow
Priority: Must-Have | Stage: ⑤/⑥ | Role: Engineer
Assemble final report (files + cover data) → submit → triggers payment review/release.
Components: FinalReportPanel, ChecklistSteps.

3.30 Certificate of Completion
Priority: Must-Have | Stage: ⑥ | Role: Client (issuer)/Platform
Generate certificate (project, parties, dates, seals) → PDF download/share.
Components: CertificatePreview, DownloadButton.

(4) COMPONENT LIBRARY UPDATES

* DraftRow(props: title, updatedAt, progress, onContinue, onDelete)
* CancelConfirmModal(props: reasons\[], requiresNote, escrowImpact)
* RescheduleCalendar(props: value, conflicts\[], prayerTimes\[], onSelect)
* SlotPicker(props: slots\[], selected, onChange)
* AvailabilityCalendar(props: view, blocks\[], onCreateBlock, onEdit)
* StatusDropdown(props: value: 'available'|'busy'|'offsite'|'custom', until?)
* LeavePlannerCalendar(props: leaves\[], onSubmit)
* CsvUpload(props: templateUrl, onValidate, onImport)
* QuoteItemRow(props: name, qty, unit, unitPrice, taxPct, editable)
* TotalsSummary(props: subtotal, vat, total, currency)
* AddonCheckboxRow(props: items\[], onToggle)
* TimerControl(props: running, startTime, onStart, onStop, geofence?)
* WorkLogRow(props: start, end, breaks\[], notes)
* OvertimeRequestForm(props: defaultRate, maxHours)
* MileageTracker(props: start, end, distance, onCalc, onSave)
* MaterialRow(props: item, unit, unitCost, qty)
* CatalogPicker(props: categories\[], search)
* ScopeChangeForm(props: currentScope, proposedScope, impact)
* DiffViewer(props: left, right)
* TeamMemberRow(props: user, role, tasksCount, rate)
* SubcontractAssign(props: candidates\[], rate, scope)
* TeamCard(props: name, members\[], shareRules)
* ShareSplitEditor(props: members\[], percentages\[])
* ReplacementRequestForm(props: reason, constraints)
* HandoverChecklist(props: items\[], completed\[])
* ContractExtendForm(props: currentEnd, newEnd, deltaCost)
* AmendmentSummary(props: changes\[], total)
* DeliverableUploadRow(props: file, progress, discipline, versionNote)
* DisciplinePicker(props: list\[], selected)
* FileTypeBadge(props: type)
* PreviewFallback(props: reason)
* VersionRow(props: version, author, date, notes, onRevert)
* CompareViewer(props: vA, vB, type)
* CommentPin(props: position, author, status)
* ThreadPanel(props: comments\[], onReply, onResolve)
* FinalReportPanel(props: files\[], coverData, checks\[])
* CertificatePreview(props: project, parties, date, seals)

(5) COPY EN/AR ADDITIONS

```
json
{
  "extended": {
    "drafts": { "en": "Saved Drafts", "ar": "المسودات المحفوظة" },
    "continue": { "en": "Continue", "ar": "متابعة" },
    "delete": { "en": "Delete", "ar": "حذف" },
    "cancelJob": { "en": "Cancel Job", "ar": "إلغاء المهمة" },
    "reason": { "en": "Reason", "ar": "السبب" },
    "confirmCancel": { "en": "Confirm Cancel", "ar": "تأكيد الإلغاء" },
    "reschedule": { "en": "Reschedule", "ar": "إعادة الجدولة" },
    "conflict": { "en": "Conflict", "ar": "تعارض" },
    "availability": { "en": "Availability", "ar": "التوفر" },
    "status": { "en": "Status", "ar": "الحالة" },
    "available": { "en": "Available", "ar": "متاح" },
    "busy": { "en": "Busy", "ar": "مشغول" },
    "offsite": { "en": "Off-Site", "ar": "خارج الموقع" },
    "until": { "en": "Until", "ar": "حتى" },
    "favorites": { "en": "Favorites", "ar": "المفضلون" },
    "hireAgain": { "en": "Hire Again", "ar": "توظيف مرة أخرى" },
    "bulkPosting": { "en": "Bulk Job Posting", "ar": "نشر الوظائف بالجملة" },
    "uploadCsv": { "en": "Upload CSV", "ar": "رفع ملف CSV" },
    "cloneJob": { "en": "Clone Job", "ar": "نسخ المهمة" },
    "rehire": { "en": "Rehire", "ar": "إعادة التوظيف" },
    "subscriptions": { "en": "Subscription Packages", "ar": "باقات الاشتراك" },
    "subscribe": { "en": "Subscribe", "ar": "اشترك" },
    "leavePlanner": { "en": "Leave Planner", "ar": "مخطط الإجازات" },
    "customQuote": { "en": "Custom Quote", "ar": "عرض سعر مخصص" },
    "addItem": { "en": "Add Item", "ar": "إضافة عنصر" },
    "sendQuote": { "en": "Send Quote", "ar": "إرسال العرض" },
    "addons": { "en": "Add-On Services", "ar": "خدمات إضافية" },
    "timeTracking": { "en": "Time Tracking", "ar": "تتبع الوقت" },
    "start": { "en": "Start", "ar": "بدء" },
    "stop": { "en": "Stop", "ar": "إيقاف" },
    "submitForApproval": { "en": "Submit for Approval", "ar": "إرسال للموافقة" },
    "overtime": { "en": "Overtime Request", "ar": "طلب ساعات إضافية" },
    "travelMileage": { "en": "Travel & Mileage", "ar": "السفر وعدّاد المسافة" },
    "materials": { "en": "Materials", "ar": "المواد" },
    "scopeChange": { "en": "Scope Change Request", "ar": "طلب تغيير نطاق" },
    "collaboration": { "en": "Collaboration", "ar": "التعاون" },
    "subcontract": { "en": "Subcontract", "ar": "مقاول فرعي" },
    "teams": { "en": "Teams & Partnerships", "ar": "الفرق والشراكات" },
    "replacement": { "en": "Engineer Replacement", "ar": "استبدال المهندس" },
    "contractExtension": { "en": "Contract Extension", "ar": "تمديد العقد" },
    "deliverables": { "en": "Deliverables", "ar": "المخرجات" },
    "uploadFiles": { "en": "Upload Files", "ar": "رفع الملفات" },
    "versions": { "en": "Versions", "ar": "الإصدارات" },
    "reviewComments": { "en": "Review & Comments", "ar": "المراجعة والتعليقات" },
    "finalReport": { "en": "Final Report", "ar": "التقرير النهائي" },
    "certificate": { "en": "Certificate of Completion", "ar": "شهادة إنجاز" },
    "download": { "en": "Download", "ar": "تنزيل" }
  }
}
```

(6) EMPTY STATES & EDGE CASES

* Drafts: None → prompt to start new job; autosave failed → banner with “Restore from local copy”.
* Reschedule: No common free slot → suggest multi-day window; allow split session option.
* Availability: External calendar sync conflict → “read-only source” badge; offer override with confirm.
* Bulk CSV: Row errors listed with line numbers; partial import allowed with “skip invalid”.
* Time tracking: GPS off → soft warning + manual entry enabled.
* Materials/Catalog: Item missing price → require manual cost entry.
* Deliverables: Unsupported CAD/BIM in browser → upload allowed, preview fallback + desktop viewer note.
* Version control: Revert blocked if linked to approved payment milestone → require new revision.

(7) ACCESSIBILITY NOTES

* Calendars: keyboard arrows to move date, Enter to select; `aria-current` for today; `aria-selected` for chosen slot.
* Timers: buttons ≥44px; status announced via `aria-live="polite"`.
* Tables (CSV preview, versions): proper `<th scope>`; row actions labelled.
* Pins/annotations: provide a list view of pins with coordinates and text; keyboard focus jumps to corresponding area.
* Modal flows: focus trap; ESC to close; return focus to trigger.
* Color contrast: ensure status/badges meet AA; provide text alternatives to color-only signals.
* Arabic numerals option toggles appropriate input direction and number shaping.

(8) ANALYTICS EVENTS

```
json
{
  "draft_saved": { "job_id": "string", "progress_pct": "number", "autosave": "boolean" },
  "job_canceled": { "job_id": "string", "reason": "string", "escrow_state": "held|released|none" },
  "job_rescheduled": { "job_id": "string", "from": "ISO", "to": "ISO", "conflicts_resolved": "number" },
  "availability_updated": { "engineer_id": "string", "blocks_added": "number", "status": "available|busy|offsite|custom" },
  "favorite_hired": { "engineer_id": "string", "job_id": "string" },
  "bulk_posted": { "batch_id": "string", "rows_total": "number", "rows_imported": "number" },
  "job_cloned": { "source_job_id": "string", "new_job_id": "string" },
  "quote_sent": { "job_id": "string", "items_count": "number", "subtotal": "number", "vat": "number", "total": "number" },
  "addons_added": { "job_id": "string", "addons": ["string"], "delta_total": "number" },
  "time_logged": { "job_id": "string", "minutes": "number", "source": "timer|manual" },
  "overtime_requested": { "job_id": "string", "hours": "number", "status": "pending|approved|rejected" },
  "mileage_recorded": { "job_id": "string", "km": "number", "source": "gps|manual" },
  "materials_added": { "job_id": "string", "items": "number", "total_cost": "number" },
  "scope_change_requested": { "job_id": "string", "price_delta": "number", "time_delta_days": "number", "status": "pending|approved|rejected" },
  "collaborator_added": { "job_id": "string", "engineer_id": "string", "role": "string" },
  "subcontract_created": { "job_id": "string", "to_engineer_id": "string", "value": "number" },
  "contract_extended": { "job_id": "string", "new_end": "ISO", "price_delta": "number" },
  "deliverable_uploaded": { "job_id": "string", "type": "pdf|image|cad|ifc|other", "size_bytes": "number" },
  "version_reverted": { "job_id": "string", "from_version": "number", "to_version": "number" },
  "deliverable_commented": { "job_id": "string", "pin_count": "number" },
  "final_report_submitted": { "job_id": "string", "files_count": "number" },
  "certificate_generated": { "job_id": "string", "format": "pdf" }
}
```

(9) OPEN QUESTIONS & ASSUMPTIONS
Questions:

1. CSV schema for bulk posting: required columns and validation rules?
2. Payment tie-ins: which actions block (e.g., revert after milestone approval)?
3. Default SAR/km rate and VAT treatment for mileage/materials?
4. External calendar integrations (Google/Microsoft/Apple) priority?
5. Approval matrix for subcontracting and replacement (client vs enterprise vs admin)?
6. CAD/BIM preview licensing constraints?
7. Certificate template branding (per tenant?) and signature requirements?

Assumptions:

* All monetary values in SAR; VAT presentation consistent with Patch 3.
* Prayer time awareness is advisory (non-blocking) in scheduling.
* Geofence checks are advisory for time logs unless enterprise mandates.
* Subcontract actions are visible to clients (transparency).

(10) DESIGN LOG UPDATES

* Established “Impact Summary” pattern for actions changing scope/time/cost.
* Calendar primitives standardized (availability, leave, reschedule).
* Versioning UI unified across files and deliverables with CompareViewer.
* Quote Builder items follow consistent columns and VAT hint.
* Collaboration banner shows all active engineers on job with roles and contact.

IMPLEMENTATION CHECKLIST
Development:

* [ ] Drafts persistence (autosave, recover) with conflict resolution.
* [ ] Cancel/Reschedule APIs (notify, audit, payment hooks).
* [ ] Availability/Leave stores + ICS import; status quick-toggle.
* [ ] Favorites list with hire-again shortcut.
* [ ] Bulk CSV import (validate → preview → create drafts/jobs).
* [ ] Clone job endpoint + UI.
* [ ] Quote Builder (items, addons, totals); send/accept flows.
* [ ] Timer & work logs with geofence hinting; overtime request & approvals.
* [ ] Mileage and materials calculators; expense lines.
* [ ] Scope change request/approve with diff and payment impact.
* [ ] Teaming/subcontract modules with approvals and rate splits.
* [ ] Replacement & contract extension forms with audit.
* [ ] Deliverables upload (multi-format), versioning, comments/pins, compare.
* [ ] Final report assembly & submission; certificate PDF generator.

QA:

* [ ] RTL/i18n across calendars, timers, tables.
* [ ] Draft recovery under network loss.
* [ ] Validation of CSV errors; partial import behavior.
* [ ] Time zone & Hijri display sanity for dates.
* [ ] Version revert protections when tied to payments.
* [ ] Accessibility: keyboard flows, live regions, labels on pins.

Performance:

* [ ] Virtualized lists (drafts, versions, comments).
* [ ] Debounced auto-save; background upload with progress.
* [ ] Lazy load heavy previews (CAD/BIM).
* [ ] Calendar rendering optimized for many blocks.

This completes Patch 6 — Extended Core Features with robust drafting, scheduling, collaboration, scope, and deliverables capabilities tailored for NBCON Pro’s Saudi engineering marketplace.

---

PATCH 8 — FINANCE, PAYMENTS & COMPLIANCE

(1) OVERVIEW
Goal: Design end-to-end financial operations: payment setup, invoicing (proforma → milestone → final), escrow releases, multi-party splits, tax (VAT 15%, WHT), ZATCA e-invoicing, reconciliation, fraud/compliance, forecasting, and insurance—optimized for Saudi market and enterprise governance.
Users: Engineers (earnings, expenses), Clients (budgeting, invoices, payments), Enterprise Finance/Ops (multi-project control, reconciliation, compliance), Admin (gateways, fraud, policy).
Success Criteria:

* Invoice creation to payment collection < 5 days median
* Payment retry recovery rate ≥ 65%
* ZATCA e-invoice success rate ≥ 99% (ack received)
* Reconciliation coverage ≥ 98% of transactions monthly
* Fraud false-positive rate < 2%; time-to-decision < 24h
  Constraints: EN/AR + RTL, WCAG 2.2 AA, SAR defaults with multi-currency display, Hijri display option for dates, privacy & PDPL, exportable records (CSV/PDF), auditability.
  Dependencies: P1–P7 (auth, routing, stores, files, messaging, approvals, audit trail). Requires escrow primitives from P3 and documents hub from P2/P6.

(2) USER FLOWS
PAYMENT SETUP FLOW (Engineer/Client/Admin)
Wallet/Methods → Add card/IBAN → 3DS or micro-deposits → Set default → Payout frequency → KYC/Tax info → Ready.

INVOICE LIFECYCLE
Proforma → Client review → Convert to Final → ZATCA generate & submit → Send to client → Payment (card/transfer/escrow) → Receipt → If needed: Credit Note/Refund.

MILESTONE/ESCROW FLOW
Create milestones → Client funds escrow → Engineer completes milestone → Client approves → Release funds → Auto-post to Earnings.

SPLIT PAYMENTS
Define beneficiaries & percentages → Validate 100% total → Pay → Automatic distribution & receipts per party.

RETRY & DISPUTES
Payment failed → Retry banner → Update method → Reattempt → If dispute/chargeback → Case workflow → Resolution.

TAX & COMPLIANCE
VAT auto-calc (15%) → WHT when applicable → ZATCA e-invoice (UUID, QR) → Certificates (residency, exemptions) → Compliance repository.

FINANCE OPS
Bulk invoicing → Reconciliation (gateway vs ledger) → Fraud alerts triage → SAR filing → Reports (P\&L, Cash Flow, Budget vs Actual) → Forecasting.

(3) SCREEN SPECIFICATIONS

3.1 Proforma Invoice Creation
Priority: Must-Have | Stage: ⑤–⑥ | Role: Engineer/Enterprise

```
+----------------------------------------------+
| Proforma Invoice                             |
| Client [Select ▼]  Project [Select ▼]        |
| Issue Date [____]   Due [____]               |
| Items                                          |
| 1) Desc [text]  Qty [1]  Price [SAR 500]     |
| Subtotal SAR 500                              |
| VAT (15%) SAR 75  [i]                         |
| Total SAR 575                                 |
| Notes [textarea]                              |
| [Save Draft] [Generate Proforma]              |
+----------------------------------------------+
```

Components: ProformaForm, VATField(auto), ItemRow(add/remove), ClientProjectPicker.
Validations: Positive amounts, VAT on taxable items, due ≥ issue.
States: Draft, generated, validation errors.
Export: PDF (EN/AR bilingual header), QR placeholder (final only).

3.2 Split Payments (Multi-party)
Priority: Must-Have | Stage: ⑥ | Role: Client/Enterprise/Admin

```
+----------------------------------------------+
| Split Payments                                |
| Total: SAR 10,000                             |
| Beneficiaries                                 |
| - Engineer A   [% 70]  Amount SAR 7,000       |
| - Subcontractor B [% 20] Amount SAR 2,000     |
| - Platform Fee [% 10] Amount SAR 1,000        |
| Remainder: 0% / SAR 0                         |
| [Validate] [Pay & Distribute]                 |
+----------------------------------------------+
```

Rules: Sum = 100%; rounding to smallest currency; warnings for net-of-fees vs gross modes.
Components: SplitEditor, RemainderBadge.

3.3 Milestone-based Invoicing (Custom)
Priority: Must-Have | Stage: ⑤–⑥ | Role: All (project-scoped)

```
Milestones Table: Title | Amount | Due | Status | Actions
[Add Milestone] → modal with WHT/VAT flags and deliverable link.
```

Components: MilestoneCreator, EscrowMilestoneRow (Release/Logs).
States: Funded, In Progress, Submitted, Released, Disputed.

3.4 Bulk Invoicing (Enterprise)
Priority: Should-Have | Stage: ⑥ | Role: Enterprise Finance

```
Select Projects [multi] → Preview invoices (N) → Validate taxes →
[Generate All] → Progress bar + results list.
```

Components: BulkInvoiceSelector, ResultList.

3.5 Credit Notes & Refunds
Priority: Must-Have | Stage: ⑥ | Role: Finance/Admin

```
Select Invoice → Reason [dropdown] → Amount [≤ remaining] → 
Adjust VAT accordingly → Issue Credit Note → Optional Refund.
```

Components: CreditNoteForm, RefundPanel.
Rules: Immutable history; ZATCA link to original invoice.

3.6 Payment Retry Flow (Failed)
Priority: Must-Have | Stage: ⑥ | Role: Client

```
Banner: “Payment failed (Code: …).” [Retry] [Change Method] [Details]
```

Components: RetryBanner, MethodPicker, ErrorDetailsDrawer.
Logic: Exponential backoff hints; 3DS redirect if needed.

3.7 Multi-Currency Support + Currency Conversion Tool
Priority: Should-Have | Stage: ⑤–⑥ | Role: All

```
Currency: [SAR ▼]  FX Source: [NB/Provider ▼]  Rate Time: 12:04
Amount [ 1,000.00 ] → SAR [ 998.35 ] [Convert]
```

Components: CurrencyPicker, FxConverter.
Notes: Display SAR as settlement currency; store rate+timestamp; warn if stale (>24h).

3.8 Payment Forecasting
Priority: Should-Have | Stage: ⑥–⑦ | Role: Engineer/Enterprise

```
Cards: Next 7 days / 30 days / Quarter. 
Chart with expected vs actual inflows; filters by project/tag.
```

Components: ForecastCharts, PeriodTabs.

3.9 Automated Reminders (Invoices Due)
Priority: Must-Have | Stage: ⑥ | Role: Engineer/Enterprise

```
Toggle [On] Frequency [3d before | On due | 3d after] Channels [Email/App/SMS]
Template preview.
```

Components: ReminderScheduler.

3.10 ZATCA E-Invoicing Integration
Priority: Must-Have | Stage: ⑥ | Role: Finance/Admin

```
Invoice #INV-1024
Status: Submitted ✓  UUID: …  QR [⟂]
[Generate E-Invoice] [Resend to ZATCA] [View Payload] [Download PDF]
```

Components: ZATCAStatusBadge, ZATCAActions.
Fields: Seller/Buyer VAT IDs, Simplified/Standard type, QR with TLVs.
Edge: ZATCA downtime → queue & backoff; audit logs.

3.11 Withholding Tax (WHT) Calculator
Priority: Should-Have | Stage: ⑥ | Role: Enterprise/Admin

```
Beneficiary type [Resident/Non-Resident] Rate [% ▼] Amount [ SAR ] 
WHT Due [calc]  Net to Pay [calc]
[Attach Certificate] [Approval Workflow]
```

Components: WHTCalculator, CertificateUploadRow.

3.12 Tax Residency Certificates Upload
Priority: Should-Have | Stage: ⑥ | Role: Engineer/Enterprise

```
List with expiry highlights (soon/expired), OCR auto-read name/id/expiry.
```

Components: CertificateRow, OCRBadge.

3.13 Tax Exemption Requests Flow
Priority: Should-Have | Stage: ⑥ | Role: Engineer/Enterprise

```
Form: Reason, Evidence files, Period → Submit → Review status timeline.
```

Components: ExemptionForm, StatusTimeline.

3.14 Expense Tracking (Engineer)
Priority: Must-Have | Stage: ⑤–⑥ | Role: Engineer

```
[Add Expense] Category [Fuel] Amount [SAR] Date [ ] Receipt [Upload] 
List with monthly totals and export.
```

Components: ExpenseRow, CategoryList, ReceiptPreview.

3.15 Expense Categories & Receipts
Priority: Should-Have | Stage: ⑤–⑥ | Role: Engineer
Tabs by category; camera capture with compression; OCR amount/date.
Components: CategoryList, ReceiptScanner.

3.16 Travel & Per Diem Tracking
Priority: Should-Have | Stage: ⑤–⑥ | Role: Engineer/Enterprise

```
Per Diem Rule [ SAR/day ] Travel Log: Start/End geotag + distance.
```

Components: PerDiemRow, MileageTracker (map-less fallback input).

3.17 Profit & Loss (Engineer)
Priority: Must-Have | Stage: ⑥–⑦ | Role: Engineer

```
Period picker → Income vs Expenses → Net Profit → Export CSV/PDF.
```

Components: PnLView, PeriodPicker.

3.18 Balance Sheet (Enterprise)
Priority: Should-Have | Stage: ⑥–⑦ | Role: Enterprise
Assets/Liabilities/Equity with drilldowns; quarter switcher.
Components: BalanceSheetView.

3.19 Cash Flow Analysis
Priority: Should-Have | Stage: ⑥–⑦ | Role: All finance roles
Operating/Investing/Financing flows; waterfall and line charts.
Components: CashFlowChart.

3.20 Financial Forecasting Tools
Priority: Should-Have | Stage: ⑥–⑦ | Role: Enterprise
Scenario builder (growth %, seasonality, payment lags) → projection.
Components: ForecastBuilder.

3.21 Budget vs Actual Reports
Priority: Must-Have | Stage: ⑥–⑦ | Role: Client/Enterprise
Table per project/category; variance heatmap; alerts on thresholds.
Components: BudgetVsActualTable, VarianceBadge.

3.22 Payment Gateway Management (Admin)
Priority: Must-Have | Stage: Admin | Role: Admin

```
Gateways: Mada, Apple Pay, Credit Cards → [Enable] [Configure Keys] 
Webhook status, health, settlement delays.
```

Components: GatewayToggleRow, WebhookStatus.

3.23 Payment Reconciliation (Admin)
Priority: Must-Have | Stage: Admin | Role: Admin/Finance

```
Import settlements → Match with internal ledger → Unreconciled list →
[Mark Reconciled] [Flag Discrepancy]
```

Components: ReconcileRow, DiscrepancyDialog.

3.24 Fraudulent Transaction Alerts
Priority: Must-Have | Stage: Admin | Role: Risk/Admin
Alerts feed with risk scores, rules hit, actions (Block/Approve/Review).
Components: FraudAlertRow, RuleChips.

3.25 Chargeback Management
Priority: Must-Have | Stage: Admin | Role: Risk/Admin
Case view: stages (Retrieval → Representment → Arbitration) with evidence upload.
Components: ChargebackRow, EvidencePanel.

3.26 Suspicious Activity Reports (SAR)
Priority: Should-Have | Stage: Admin | Role: Compliance/Admin
Form + case vault; restricted access; immutable timestamping.
Components: SARForm, AccessBadge.

3.27 Compliance Certificates Repository
Priority: Should-Have | Stage: Admin/Enterprise | Role: Admin/Compliance
Store ISO/insurance/licenses; expiry reminders; scoped access.
Components: CertificateRow, ReminderToggle.

3.28 Insurance Policy Management
Priority: Should-Have | Stage: Admin/Enterprise | Role: Enterprise/Admin
Upload policies, coverage view, expiry detection (OCR), link to projects.
Components: InsurancePolicyRow, CoverageViewer.

(4) COMPONENT LIBRARY UPDATES

* ProformaForm(props: clientId, projectId, items\[], vatEnabled, notes)
* ItemRow(props: desc, qty, price, taxable)
* VATField(props: rate=0.15, auto=true, override?)
* SplitEditor(props: total, parties\[], mode: "gross|net")
* EscrowMilestoneRow(props: title, amount, status, onRelease)
* BulkInvoiceSelector(props: projects\[], preview\[])
* CreditNoteForm(props: invoiceId, reason, amount)
* RetryBanner(props: code, message, onRetry, onChangeMethod)
* CurrencyPicker(props: currency, allowed\[])
* FxConverter(props: amount, from, to, rate, timestamp)
* ForecastCharts(props: series\[], period)
* ReminderScheduler(props: channels\[], rules\[])
* ZATCAStatusBadge(props: status, uuid, qrData)
* ZATCAActions(props: onGenerate, onResend, onViewPayload, onPdf)
* WHTCalculator(props: amount, rate, residency)
* CertificateUploadRow(props: type, file, expiry)
* ExemptionForm(props: reason, evidence\[], period)
* ExpenseRow(props: category, amount, date, receipt)
* CategoryList(props: categories\[], totals\[])
* ReceiptScanner(props: onExtract)
* PerDiemRow(props: dayRate, days)
* MileageTracker(props: start, end, km)
* PnLView(props: period, income\[], expenses\[])
* BalanceSheetView(props: period, sections\[])
* CashFlowChart(props: inflows\[], outflows\[])
* ForecastBuilder(props: variables, onRun)
* BudgetVsActualTable(props: rows\[], varianceRules\[])
* VarianceBadge(props: delta, severity)
* GatewayToggleRow(props: name, enabled, health)
* WebhookStatus(props: url, lastEvent, failures)
* ReconcileRow(props: gatewayTxn, ledgerTxn, status)
* DiscrepancyDialog(props: txnId, reason)
* FraudAlertRow(props: score, rules\[], amount, actor)
* ChargebackRow(props: stage, amount, deadlines)
* EvidencePanel(props: files\[], addFile)
* SARForm(props: caseId, subject, narrative, attachments\[])
* InsurancePolicyRow(props: policyNo, expiry, coverage)
* CoverageViewer(props: sections\[], limits)

(5) COPY EN/AR ADDITIONS

```
json
{
  "finance": {
    "proforma": { "en": "Proforma Invoice", "ar": "فاتورة مبدئية" },
    "invoice": { "en": "Invoice", "ar": "فاتورة" },
    "generateProforma": { "en": "Generate Proforma", "ar": "إنشاء فاتورة مبدئية" },
    "convertToInvoice": { "en": "Convert to Invoice", "ar": "تحويل إلى فاتورة" },
    "client": { "en": "Client", "ar": "العميل" },
    "project": { "en": "Project", "ar": "المشروع" },
    "issueDate": { "en": "Issue Date", "ar": "تاريخ الإصدار" },
    "dueDate": { "en": "Due Date", "ar": "تاريخ الاستحقاق" },
    "subtotal": { "en": "Subtotal", "ar": "المجموع الفرعي" },
    "vat": { "en": "VAT (15%)", "ar": "ضريبة القيمة المضافة (15%)" },
    "total": { "en": "Total", "ar": "الإجمالي" },
    "splitPayments": { "en": "Split Payments", "ar": "تقسيم المدفوعات" },
    "beneficiaries": { "en": "Beneficiaries", "ar": "المستفيدون" },
    "validate": { "en": "Validate", "ar": "تحقق" },
    "payDistribute": { "en": "Pay & Distribute", "ar": "الدفع والتوزيع" },
    "milestones": { "en": "Milestones", "ar": "المعالم" },
    "bulkInvoicing": { "en": "Bulk Invoicing", "ar": "إصدار فواتير بالجملة" },
    "creditNote": { "en": "Credit Note", "ar": "إشعار دائن" },
    "refund": { "en": "Refund", "ar": "استرداد" },
    "retryPayment": { "en": "Retry Payment", "ar": "إعادة محاولة الدفع" },
    "changeMethod": { "en": "Change Method", "ar": "تغيير طريقة الدفع" },
    "currency": { "en": "Currency", "ar": "العملة" },
    "convert": { "en": "Convert", "ar": "تحويل" },
    "forecast": { "en": "Forecast", "ar": "توقعات" },
    "reminders": { "en": "Reminders", "ar": "التذكيرات" },
    "enable": { "en": "Enable", "ar": "تفعيل" },
    "zatca": { "en": "ZATCA E-Invoice", "ar": "فاتورة إلكترونية (هيئة الزكاة)" },
    "generateEInvoice": { "en": "Generate E-Invoice", "ar": "إنشاء فاتورة إلكترونية" },
    "resend": { "en": "Resend", "ar": "إعادة الإرسال" },
    "viewPayload": { "en": "View Payload", "ar": "عرض البيانات" },
    "downloadPdf": { "en": "Download PDF", "ar": "تحميل PDF" },
    "wht": { "en": "Withholding Tax", "ar": "ضريبة الاستقطاع" },
    "resident": { "en": "Resident", "ar": "مقيم" },
    "nonResident": { "en": "Non-Resident", "ar": "غير مقيم" },
    "certificate": { "en": "Certificate", "ar": "شهادة" },
    "exemption": { "en": "Tax Exemption", "ar": "إعفاء ضريبي" },
    "expenses": { "en": "Expenses", "ar": "المصروفات" },
    "receipt": { "en": "Receipt", "ar": "إيصال" },
    "perDiem": { "en": "Per Diem", "ar": "بدل يومي" },
    "pnl": { "en": "Profit & Loss", "ar": "قائمة الدخل" },
    "balanceSheet": { "en": "Balance Sheet", "ar": "الميزانية العمومية" },
    "cashFlow": { "en": "Cash Flow", "ar": "التدفق النقدي" },
    "budgetVsActual": { "en": "Budget vs Actual", "ar": "الميزانية مقابل الفعلي" },
    "gateways": { "en": "Payment Gateways", "ar": "بوابات الدفع" },
    "reconciliation": { "en": "Reconciliation", "ar": "التسوية" },
    "fraudAlerts": { "en": "Fraud Alerts", "ar": "تنبيهات الاحتيال" },
    "chargebacks": { "en": "Chargebacks", "ar": "عمليات رد المبلغ" },
    "sar": { "en": "Suspicious Activity Report", "ar": "بلاغ نشاط مشبوه" },
    "insurance": { "en": "Insurance Policies", "ar": "وثائق التأمين" }
  }
}
```

(6) EMPTY STATES & EDGE CASES

* No Payment Method: Show CTA “Add Method”; explain Mada/Apple Pay availability.
* Split Sum ≠ 100%: Disable submit; show remainder both % and amount; suggest auto-rebalance.
* VAT Exempt Line Items: Display badge; total VAT recalculates; tooltip with reason.
* ZATCA Downtime: Queue submission; surface ticket id; allow “Print non-fiscal copy” with watermark “PENDING”.
* FX Rate Stale: Banner “Rate older than 24h”; require confirm to use or fetch new.
* Refund > Paid: Block with error; suggest partial refund.
* Reconciliation Mismatch: Flag discrepancy; open dialog to create adjustment or mark pending settlement.
* Fraud High Risk: Force step-up verification; hold funds; notify compliance.
* Chargeback Deadline Near: Countdown badge; prioritize evidence upload.
* Expense OCR Failed: Allow manual entry; keep raw image; mark “unverified”.
* Per Diem Overlap: Prevent double claims for same day/location.
* WHT Residency Unknown: Require residency declaration/certificate before calc.

(7) ACCESSIBILITY NOTES

* Tables (invoices, reconciliation, reports): Use semantic `<table>` equivalents; headers with `scope`; caption summarizing content; keyboard sortable columns.
* Money Inputs: LTR numeric entry even in RTL UI; aria-label with currency (e.g., “Amount in Saudi Riyal”).
* Charts: Provide data tables + text summary; ensure 4.5:1 color contrast; patterns for color-blind safety; pause animations for reduced-motion.
* Status Badges: Include aria-labels (e.g., “ZATCA status: submitted”).
* Notifications/Errors: Use polite live regions; do not steal focus unless blocking.
* QR/Barcode: Provide copyable textual UUID and invoice number.
* Large Click Targets: 44px min for pay/retry/export; keyboard equivalents for “move to next cell” in item grids.

(8) ANALYTICS EVENTS

```
json
{
  "invoice_created": {
    "invoice_id": "string", "type": "proforma|final",
    "items": "number", "subtotal": "number", "vat": "number",
    "currency": "SAR", "from_role": "engineer|enterprise"
  },
  "invoice_sent": { "invoice_id": "string", "channel": "email|link|in_app" },
  "e_invoice_generated": {
    "invoice_id": "string", "zatca_status": "submitted|ack|failed",
    "uuid": "string", "latency_ms": "number"
  },
  "escrow_release": {
    "project_id": "string", "milestone_id": "string",
    "amount": "number", "released_by": "client|system"
  },
  "split_configured": {
    "payment_id": "string", "parties": "number",
    "mode": "gross|net", "valid": "boolean"
  },
  "payment_retry": {
    "invoice_id": "string", "attempt": "number",
    "reason": "insufficient_funds|3ds_failed|network|other",
    "succeeded": "boolean"
  },
  "credit_note_issued": { "invoice_id": "string", "amount": "number" },
  "wht_calculated": { "invoice_id": "string", "rate": "number", "resident": "boolean" },
  "expense_logged": { "expense_id": "string", "category": "string", "amount": "number", "has_receipt": "boolean" },
  "reconciliation_done": { "batch_id": "string", "matched": "number", "unmatched": "number" },
  "fraud_alert_actioned": { "alert_id": "string", "action": "approve|block|review", "score": "number" },
  "chargeback_stage_changed": { "case_id": "string", "from": "string", "to": "string" },
  "sar_filed": { "case_id": "string", "attachments": "number" },
  "insurance_uploaded": { "policy_id": "string", "expiry": "ISO8601" }
}
```

(9) OPEN QUESTIONS & ASSUMPTIONS
Questions:

1. Gateways: Required at launch (Mada, Apple Pay, Visa/Mastercard)? Any bank partners?
2. ZATCA mode: Simplified only or both simplified/standard? Sandbox availability and credentials?
3. FX provider of record and caching policy? SLA for rate freshness?
4. WHT default rates & rules—admin managed or hardcoded presets?
5. Refunds policy and limits—partial/line-level; settlement time expectations?
6. Fraud rules ownership—internal rules engine vs provider (e.g., gateway)?
7. SAR retention period and legal storage region?
8. Insurance minimum coverage templates per project type?

Assumptions:

* Settlement currency is SAR; multi-currency for display and reporting only.
* VAT default 15% with item-level overrides (exempt/zero-rated where allowed).
* E-invoice QR & UUID stored; PDFs stamped with bilingual headers.
* Engineers can log expenses and per diem; Enterprises can override categories/tax codes.
* Reconciliation is monthly with on-demand runs.

(10) DESIGN LOG UPDATES

* Status taxonomy: Invoice {Draft, Proforma, Final, Sent, Paid, Overdue, Credited}; ZATCA {Pending, Submitted, Acknowledged, Failed}.
* Monetary formatting pattern established (LTR numerals in RTL); thousands separators per locale; currency always spelled out for SR (“SAR”).
* Risk surface: unified AlertRow style across Fraud/Chargeback/SAR with severity colors and icons, accessible text.
* Reports share export toolbar pattern (CSV/PDF + “Send via email”).
* Financial charts use lines + markers and include a “View data” table toggle.

IMPLEMENTATION CHECKLIST
Development:

* [ ] Proforma/Invoice engine with item grid, VAT auto-calc, PDF export (EN/AR).
* [ ] Milestone/escrow integration + release logs; split payments engine (gross/net).
* [ ] Payment methods (card/IBAN), payout settings, retry flow with 3DS handling.
* [ ] ZATCA integration adapter (queue, retries, payload viewer, QR).
* [ ] WHT calculator + certificate uploads + exemption request workflow.
* [ ] Expenses + receipts OCR (client-side/offline fallback); per diem + mileage.
* [ ] Reports: P\&L, Balance Sheet, Cash Flow, Budget vs Actual; forecasting.
* [ ] Reconciliation UI with import/match/adjustment; gateway admin + webhooks.
* [ ] Fraud alerts, chargebacks pipeline, SAR form + restricted access.
* [ ] Insurance repository with OCR expiry detection + project linking.

QA:

* [ ] VAT/WHT math validation incl. edge rounding; RTL number entry tests.
* [ ] ZATCA sandbox end-to-end: generate → submit → ack → PDF with QR.
* [ ] Retry scenarios (3DS fail, insufficient funds, network).
* [ ] Split rounding across many parties; correctness to halalah.
* [ ] Reconciliation: large batch performance; unmatched handling.
* [ ] Accessibility on tables/charts, export flows, banners, and forms.
* [ ] EN/AR copy accuracy; Hijri date toggle on invoices and reports.

Performance:

* [ ] Virtualized tables for invoices/recon batches.
* [ ] Debounced calculations on large item lists.
* [ ] Background workers for PDF generation, bulk invoicing, and ZATCA submissions.
* [ ] Cached FX rates with TTL; graceful fallback when stale.

This completes Patch 8 — Finance, Payments & Compliance with practical, Saudi-ready financial flows, compliance tooling, and enterprise-grade reporting and controls.

---

PATCH 9 — PUBLIC WEB, LEGAL & OPS

(1) OVERVIEW
Goal: Design the public-facing web, legal/compliance surfaces, and internal ops consoles that convert visitors, support partnerships, and provide operational control. Emphasize trust, clarity, performance, and Saudi regulatory alignment (PDPL, KSA tax/compliance).
Users: Public visitors, prospects, partners, media; Admin/Ops; Enterprise stakeholders; C-Suite.
Success Criteria:

* Landing → sign-up CTR ≥ 6%
* Contact/partner form completion ≥ 40%
* Careers application completion ≥ 35%
* Help Center self-serve resolution ≥ 60%
* Ops console task completion ≤ 3 clicks average
  Constraints: EN/AR + full RTL, WCAG 2.2 AA, SEO-friendly (SSR-ready markup), fast TTI (<1.5s on broadband), PDPL consent, cache-friendly, strong legal clarity.
  Dependencies: P1–P8 (auth, routing, i18n, analytics, files, payments, compliance).

(2) USER FLOWS
PUBLIC CONVERSION
Visitor → Accept cookies/Manage consent → Browse (Landing/Services/Pricing/Case Studies/Blog) → CTA (Sign up / Contact / Request Quote) → Auth (from P1).

PARTNERSHIP/CONTACT
Visitor → Partner/Vendor page → Fill form → Auto-route to Ops → SLA timers → Email + in-app follow-up.

CAREERS
Visitor → Careers → Job detail → Apply → Upload CV → Confirmation → HR pipeline (Ops console).

HELP & PDPL
Visitor → Help Center (search/browse) → Read articles → If unresolved → Submit ticket → Track status.
Visitor → PDPL Data Request → Select request type → Verify identity → Submit → Status updates.

LEGAL ACKS
First use of risky features → Anti-Fraud Consent → Export Compliance Notice → Risk & Safety Acknowledge (on-site jobs).

ENTERPRISE/ADMIN OPS
Enterprise → Tax Compliance Dashboard → Reports/Exports.
Admin → Support Tickets / Disputes / Fraud Review / QA Checklist / Training / Content Scheduler / System Alerts / Knowledge Base / Workforce Dispatch / Performance Monitoring / Developer Sandbox / Payroll / Regulatory Compliance / Executive Dashboard.

(3) SCREEN SPECIFICATIONS

3.1 Public Landing Page
Priority: Must-Have | Role: Public

```
+----------------------------------------------------+
| HERO: NBCON Pro — Engineering marketplace for KSA  |
| [CTA: Sign Up] [CTA: Browse Services]              |
| Trust: SCE-friendly • Escrow • Bilingual EN/AR     |
| -------------------------------------------------- |
| Value Cards (3): On-demand • Verified Engineers •  |
| Secure Payments                                    |
| -------------------------------------------------- |
| Logos/Stats • How it Works (① Post → ② Match → ③ Pay)|
| -------------------------------------------------- |
| Testimonials • Case Studies • Press mentions       |
| -------------------------------------------------- |
| Footer: Links, Legal, Language toggle EN/AR        |
+----------------------------------------------------+
```

Components: HeroSection, ValueCard, StatsRow, TestimonialCarousel, CTAButtons, FooterNav.
SEO: h1/h2 tags, meta/OG tags, JSON-LD breadcrumbs.
States: Default, AR/RTL mirrored, low-bandwidth (defer heavy assets).

3.2 About Us Page

```
Mission • Vision 2030 alignment • Leadership cards • Timeline.
```

Components: TeamCard, MilestoneTimeline.

3.3 Services Overview Page

```
Filter chips (Residential/Commercial/Industrial) → Service grid cards →
[Request Quote] CTA per service.
```

Components: ServiceCategoryCard, FilterChipsRow.

3.4 Pricing & Subscription Page

```
PricingTierCard x3 (Client/Engineer/Enterprise) → Feature comparison table → FAQ → CTA.
```

Components: PricingTierCard, FeatureCompareTable, FAQAccordion.

3.5 Case Studies / Success Stories

```
Grid of CaseStudyCard → Detail view: summary, metrics, images, quotes.
```

3.6 Blog & News

```
List of BlogPostRow with tags; Sidebar: categories, popular; Post page with ToC.
```

3.7 Contact Us

```
Form: Name, Email, Company, Topic, Message, Attachment[opt] → [Submit] → Success state.
```

Components: ContactForm, AttachmentInput.

3.8 Careers Page

```
Filters (Dept, Location, Type) → JobListingRow → Detail → [Apply] → Upload CV → Consent.
```

3.9 Public Help Center

```
Search bar → Categories grid → Article list → Article page with ToC, rating (“Was this helpful?”).
```

Components: FAQAccordion, HelpSearch, ArticleRating.

3.10 Partner / Vendor Page

```
Pitch + requirements → PartnerForm (company, service area, licenses) → NDA checkbox → Submit.
```

3.11 Terms of Service (Web) Page

```
Sticky ToC → Sections → Last updated → Accept references.
```

3.12 Privacy Policy (Web) Page
Similar structure; PDPL disclosures; data retention table.

3.13 Cookie Consent Banner

```
Bottom sheet: [Accept All] [Manage Preferences] → Modal with toggles (Necessary/Analytics/Marketing).
```

Components: CookieBanner, ConsentToggleRow.

3.14 Status Page (Public)

```
Overall status badge • Components list (API, Realtime, Files, Payments) • Incidents timeline • Subscribe.
```

Components: StatusIndicator, IncidentRow.

3.15 Media & Press Page

```
Press kit downloads (logo, brand guide) • Coverage links • Contact PR.
```

Components: PressKitDownload, MediaContactCard.

3.16 Consent Management Screen

```
User dashboard page: view/update consents; export consent log.
```

3.17 PDPL Data Request Form (Saudi)

```
Select type: Access/Rectify/Delete/Portability/Restrict • Identity proof upload • Reason • [Submit].
```

Components: PDPLForm, KYCAttachRow, StatusTimeline.

3.18 KYC / Identity Verification Flow

```
Step 1: ID type → Step 2: Upload front/back → Step 3: Liveness check → Step 4: Review → [Submit].
```

Components: KYCUploader, LivenessGuide, VerificationStatus.

3.19 Tax Compliance Dashboard (Enterprise)

```
Cards: VAT due, WHT pending, ZATCA statuses • Filters (period, entity) • Export.
```

Components: ComplianceChart, KPIGrid, ExportToolbar.

3.20 Anti-Fraud Consent Prompt

```
Modal: Why checks? Data usage summary → [Agree] [Disagree] (exits risky flow).
```

3.21 Export Compliance Notice

```
Banner + modal details on cross-border data/tech items. [I Acknowledge].
```

3.22 Risk & Safety Acknowledgment (On-Site Jobs)

```
Checklist (PPE, hazards) → Signature checkbox → [I Agree].
```

3.23 Insurance Upload (Enterprise)

```
Policy number, provider, coverage PDF, expiry OCR → Link to projects.
```

Components: InsuranceUploader, CoverageViewer.

3.24 Contract Signing (Digital)

```
Viewer + signature pad → Initials fields → Download signed copy → Audit trail.
```

Components: DigitalSignaturePad, SignerFields, AuditTrailRow.

3.25 Regulatory Audit Export (Admin)

```
Select date range + event types → [Export Audit Log] → Background job + email link.
```

Components: AuditExportForm, JobProgress.

3.26 Support Ticket Console (Admin)

```
Table: ID | Priority | Status | Assignee | SLA | Updated • Filters • Bulk actions • Detail drawer.
```

Components: SupportTicketRow, SLAClock, BulkActionsBar.

3.27 Dispute Resolution Console (Admin)

```
List → Case detail (timeline, evidence) → Actions: Mediate/Finalize → Payout hold toggle.
```

Components: DisputeRow, EvidencePanel.

3.28 Fraud Review Console (Admin)

```
Queue with risk score chips • Rule hits • Device/IP fingerprint • Actions: Approve/Block/Review.
```

Components: FraudReviewRow, RuleChips, DecisionButtons.

3.29 QA Checklist Console (Admin)

```
Project checklist templates; per-project completion; add item; mark done; export.
```

3.30 Training & Certification Console (Admin)

```
Modules list → Assign to user/group → Track completion → Certificates.
```

3.31 Workforce Dispatch Tool (Enterprise)

```
Map with jobs + engineer pins • Drag engineer → job (assignment) • Conflict warnings.
```

Components: DispatchMap, AssignmentDrawer, ConflictBadge.

3.32 Performance Monitoring Console (Admin)

```
System KPIs: uptime, latency, error rates; drilldowns; alert thresholds.
```

Components: PerfMonitorChart, ThresholdEditor.

3.33 Knowledge Base Management Console

```
Articles table → Editor (markdown + attachments) → Publish flow → Versioning.
```

Components: KBEditor, VersionRow.

3.34 Content Announcement Scheduler (Admin)

```
Compose → Audience → Schedule → Preview → Calendar view of scheduled sends.
```

3.35 Internal Chat Tool (Ops Team)

```
Channels/DMs list • Threaded messages • File share • Mentions • Admin-only retention.
```

Components: InternalChat, ChannelSidebar, ThreadRow.

3.36 System Alert Console (Admin)

```
Alert feed • Severity • Ack/Resolve • Runbooks links.
```

Components: AlertRow, RunbookLink.

3.37 Developer Sandbox Console

```
Create sandbox → API keys → Rate limits → Example requests → Reset.
```

Components: SandboxCreator, ApiKeyRow.

3.38 Internal Billing & Payroll Tool

```
Timesheets → Payroll runs → Adjustments → Approvals → Generate Payroll.
```

Components: PayrollGenerator, TimesheetRow, AdjustmentDialog.

3.39 Regulatory Compliance Dashboard (Ops)

```
Matrix of controls vs status; gaps; owners; remediation tasks.
```

Components: OpsComplianceView, GapBadge.

3.40 Executive Reporting Dashboard (C-Suite)

```
ExecSummaryCards (GMV, fill rate, NPS) • Trend charts • Export summary.
```

Components: ExecSummaryCards, TrendChart, ExportSummary.

(4) COMPONENT LIBRARY UPDATES

* HeroSection(props: heading, sub, ctas\[])
* ValueCard(props: icon, title, text)
* PricingTierCard(props: title, price, features\[], cta)
* FeatureCompareTable(props: rows\[], cols\[])
* CaseStudyCard(props: title, metrics\[], image)
* BlogPostRow(props: title, tag, date, excerpt)
* ContactForm(props: topics\[], onSubmit)
* JobListingRow(props: title, dept, location, type)
* FAQAccordion(props: items\[])
* CookieBanner(props: categories\[], onSave)
* ConsentToggleRow(props: key, required)
* StatusIndicator(props: status, uptime)
* IncidentRow(props: title, start, resolved?)
* PressKitDownload(props: files\[])
* PartnerForm(props: fields, ndaRequired)
* PDPLForm(props: requestTypes\[], identityDocs)
* KYCUploader(props: docTypes\[], maxSize)
* LivenessGuide(props: steps)
* ComplianceChart(props: series, filters)
* InsuranceUploader(props: policy, files)
* DigitalSignaturePad(props: signerName)
* AuditExportForm(props: ranges, eventTypes\[])
* SupportTicketRow(props: priority, status, sla)
* DisputeRow(props: stage, amount, deadline)
* FraudReviewRow(props: score, rules\[], amount)
* QAListRow(props: item, owner, done)
* TrainingModuleRow(props: module, assignedTo, status)
* DispatchMap(props: jobs\[], engineers\[], onAssign)
* PerfMonitorChart(props: metric, period)
* KBEditor(props: title, body, attachments\[])
* AnnouncementScheduler(props: audience, schedule)
* InternalChat(props: channels\[], currentChannel)
* AlertRow(props: severity, source, acked)
* SandboxCreator(props: quota, resettable)
* PayrollGenerator(props: period, employees\[])
* OpsComplianceView(props: controls\[], owners\[])
* ExecSummaryCards(props: cards\[])

(5) COPY EN/AR ADDITIONS

```
json
{
  "public": {
    "heroTitle": { "en": "Saudi Engineering, On-Demand.", "ar": "الهندسة في السعودية، عند الطلب." },
    "heroSub": { "en": "Match with certified engineers, escrow payments, bilingual support.", "ar": "تطابق مع مهندسين معتمدين، مدفوعات بضمان، ودعم ثنائي اللغة." },
    "signUp": { "en": "Sign Up", "ar": "إنشاء حساب" },
    "browseServices": { "en": "Browse Services", "ar": "تصفح الخدمات" },
    "howItWorks": { "en": "How it works", "ar": "كيف تعمل المنصة" },
    "services": { "en": "Services", "ar": "الخدمات" },
    "pricing": { "en": "Pricing", "ar": "الأسعار" },
    "caseStudies": { "en": "Case Studies", "ar": "دراسات حالة" },
    "blog": { "en": "Blog & News", "ar": "المدونة والأخبار" },
    "contact": { "en": "Contact Us", "ar": "اتصل بنا" },
    "careers": { "en": "Careers", "ar": "الوظائف" },
    "helpCenter": { "en": "Help Center", "ar": "مركز المساعدة" },
    "partner": { "en": "Partner with Us", "ar": "كن شريكاً" },
    "pressKit": { "en": "Press Kit", "ar": "حزمة إعلامية" },
    "status": { "en": "Status", "ar": "الحالة" },
    "terms": { "en": "Terms of Service", "ar": "شروط الخدمة" },
    "privacy": { "en": "Privacy Policy", "ar": "سياسة الخصوصية" },
    "cookieBannerTitle": { "en": "We use cookies", "ar": "نستخدم ملفات تعريف الارتباط" },
    "acceptAll": { "en": "Accept All", "ar": "قبول الكل" },
    "managePrefs": { "en": "Manage Preferences", "ar": "إدارة التفضيلات" },
    "necessary": { "en": "Strictly necessary", "ar": "ضرورية للغاية" },
    "analytics": { "en": "Analytics", "ar": "التحليلات" },
    "marketing": { "en": "Marketing", "ar": "التسويق" },
    "pdplRequest": { "en": "PDPL Data Request", "ar": "طلب بيانات وفق نظام حماية البيانات" },
    "submit": { "en": "Submit", "ar": "إرسال" },
    "kyc": { "en": "Identity Verification (KYC)", "ar": "التحقق من الهوية" },
    "liveness": { "en": "Liveness Check", "ar": "فحص الحيوية" },
    "consent": { "en": "Consent", "ar": "الموافقة" },
    "agree": { "en": "Agree", "ar": "موافقة" },
    "disagree": { "en": "Disagree", "ar": "رفض" },
    "acknowledge": { "en": "I Acknowledge", "ar": "أُقِرّ" },
    "safetyAcknowledge": { "en": "Risk & Safety Acknowledgment", "ar": "إقرار المخاطر والسلامة" },
    "insuranceUpload": { "en": "Insurance Upload", "ar": "رفع وثيقة التأمين" },
    "contractSign": { "en": "Sign Contract", "ar": "توقيع العقد" },
    "exportAudit": { "en": "Export Audit Log", "ar": "تصدير سجل التدقيق" },
    "supportConsole": { "en": "Support Ticket Console", "ar": "وحدة تذاكر الدعم" },
    "disputeConsole": { "en": "Dispute Resolution Console", "ar": "وحدة تسوية النزاعات" },
    "fraudReview": { "en": "Fraud Review Console", "ar": "وحدة مراجعة الاحتيال" },
    "qaChecklist": { "en": "QA Checklist", "ar": "قائمة ضبط الجودة" },
    "training": { "en": "Training & Certification", "ar": "التدريب والشهادات" },
    "dispatch": { "en": "Workforce Dispatch", "ar": "توزيع القوى العاملة" },
    "perfMonitoring": { "en": "Performance Monitoring", "ar": "مراقبة الأداء" },
    "kbManage": { "en": "Knowledge Base", "ar": "قاعدة المعرفة" },
    "announce": { "en": "Announcements", "ar": "الإعلانات" },
    "internalChat": { "en": "Internal Chat", "ar": "دردشة داخلية" },
    "systemAlerts": { "en": "System Alerts", "ar": "تنبيهات النظام" },
    "sandbox": { "en": "Developer Sandbox", "ar": "بيئة المطورين" },
    "payroll": { "en": "Billing & Payroll", "ar": "الفوترة والرواتب" },
    "opsCompliance": { "en": "Regulatory Compliance", "ar": "الامتثال التنظيمي" },
    "execDashboard": { "en": "Executive Dashboard", "ar": "لوحة القيادة التنفيذية" }
  }
}
```

(6) EMPTY STATES & EDGE CASES

* Landing: JS disabled → graceful server-rendered CTAs; images with `<noscript>` fallbacks.
* Help Center: No results → suggest popular articles + contact options.
* Contact/Partner forms: Rate limiting; bot detection; offline save → “We’ll send when online.”
* Cookie Banner: If declined analytics, ensure no tracking; respect GPC (Global Privacy Control).
* Status Page: Partial outage vs scheduled maintenance; backfill incidents if API down.
* PDPL Request: Identity mismatch → guide to KYC; allow resubmit; SLA timer visible.
* KYC: Poor lighting/liveness fails → retry with tips; manual verification path.
* Contract Signing: Name mismatch with ID → warn + require acknowledgment/initials.
* Ops consoles: Large datasets → virtualize; export disabled if >100k rows (prompt to email export).
* Dispatch: GPS unavailable → manual address; conflict if overlapping assignment.

(7) ACCESSIBILITY NOTES

* Public pages use semantic landmarks (header/nav/main/aside/footer), skip-to-content link.
* Focus management for cookie/consent modals; ESC closes; focus return to triggering control.
* All CTAs ≥44px; keyboard-operable carousels; pause/stop for autoplay sections.
* Language switch updates `lang` and `dir`; dates honor Hijri toggle in public/legal.
* Tables: `scope`, captions, keyboard sorting; charts include data table toggle.
* Signature pad has keyboard alternative: “Type signature” + downloadable typed stamp.

(8) ANALYTICS EVENTS

```
json
{
  "landing_viewed": { "locale": "en|ar", "utm": "object", "ab_variant": "string" },
  "signup_clicked": { "cta": "hero|header|footer|pricing", "role_hint": "client|engineer|enterprise|null" },
  "pricing_cta_clicked": { "tier": "client|engineer|enterprise" },
  "contact_submitted": { "topic": "sales|support|partnership|media", "has_attachment": "boolean" },
  "cookie_consent_saved": { "necessary": true, "analytics": "boolean", "marketing": "boolean" },
  "help_article_viewed": { "article_id": "string", "helpful_vote": "boolean|null" },
  "pdpl_request_filed": { "type": "access|rectify|delete|port|restrict", "kyc_verified": "boolean" },
  "kyc_step_changed": { "step": "doc_upload|liveness|review|submitted", "success": "boolean" },
  "contract_signed": { "contract_id": "string", "method": "draw|type", "elapsed_sec": "number" },
  "audit_exported": { "range_days": "number", "size_mb": "number", "via": "ui|email" },
  "ticket_resolved": { "ticket_id": "string", "sla_met": "boolean" },
  "dispute_actioned": { "case_id": "string", "action": "mediate|finalize", "payout_hold": "boolean" },
  "fraud_decision_made": { "alert_id": "string", "decision": "approve|block|review", "score": "number" },
  "qa_item_completed": { "project_id": "string", "item_id": "string" },
  "training_assigned": { "module_id": "string", "assignees": "number" },
  "dispatch_assigned": { "job_id": "string", "engineer_id": "string" },
  "alert_acknowledged": { "alert_id": "string", "time_to_ack_sec": "number" },
  "announcement_scheduled": { "audience": "engineers|clients|all", "send_at": "ISO8601" },
  "kb_article_published": { "article_id": "string", "has_attachments": "boolean" },
  "payroll_generated": { "period": "string", "employees": "number", "gross_total": "number" },
  "exec_report_exported": { "period": "string", "format": "pdf|csv" }
}
```

(9) OPEN QUESTIONS & ASSUMPTIONS
Questions:

1. SEO/SSR: Will we pre-render public pages or rely on SPA hydration only?
2. Status page: Use third-party (e.g., hosted page) or internal status service?
3. KYC vendor preferences (local KSA vs global), acceptable PII storage region?
4. PDPL SLAs for request fulfillment and identity proofing acceptance criteria?
5. Press policy for brand assets and co-marketing approvals?
6. Careers: ATS integration or internal pipeline only?
7. Dispatch: Which map provider + license constraints for enterprise usage?
8. System Alerts: Who owns runbooks and escalation matrix?

Assumptions:

* Public pages prioritize load speed (lazy images, critical CSS).
* Cookie consent persists per PDPL, with 12-month expiry and audit trail.
* KYC documents encrypted at rest, regionally stored; manual review path exists.
* Ops consoles share table/filter/export patterns for consistency and speed.
* Executive dashboard favors read-only, printable summaries with drilldown links.

(10) DESIGN LOG UPDATES

* Public brand rhythm: Hero (bold claim), Value trio, Proof (stats/press), Flow, CTA.
* Legal pages: sticky ToC pattern; machine-readable dates; version anchors.
* Consent stack: unified UI for Cookie/PDPL/Anti-Fraud/Export notice with consistent iconography and copy tone.
* Ops console table pattern: left filters, right table, top bulk actions; detail in drawer; export toolbar consistent.
* Dispatch interactions: drag-to-assign with conflict/resolution badges; keyboard assignment via list + enter.
* Charts share “View data” toggle; colors meet contrast and print-friendly.

IMPLEMENTATION CHECKLIST
Development

* [ ] Public routes with SEO meta + OG/Twitter cards, sitemap/robots.
* [ ] Cookie/consent framework with PDPL audit logging + GPC support.
* [ ] Help Center (search, categories, article CRUD for KB console).
* [ ] Contact/Partner/Careers forms with spam protection, attachments, and routing.
* [ ] Status page components and incidents feed adapter.
* [ ] PDPL request workflow + identity proofing + status tracking.
* [ ] KYC flow (doc upload + liveness) + storage policy toggles.
* [ ] Digital signing (draw/type) with audit trail; PDF stamping.
* [ ] Ops consoles (Tickets/Disputes/Fraud/QA/Training/Announcements/Alerts/KB/Dispatch/Perf/Sandbox/Payroll/Compliance/Executive).
* [ ] Shared table/export/filters/pagination components; virtualized lists.

QA

* [ ] WCAG 2.2 AA across public and ops; keyboard-only navigation passes.
* [ ] RTL review for all public pages, legal pages, and consoles.
* [ ] SEO audit (headings, schema, link semantics), LCP/CLS/INP budgets.
* [ ] Consent tests: analytics blocked until granted; audit logs accurate.
* [ ] KYC edge cases (blur, glare, non-matching names) + manual override.
* [ ] Contract signing fidelity (drawn → vector, typed fonts embedded).
* [ ] Ops console performance with large data; export integrity.

Performance

* [ ] Critical CSS inline for public pages; code-split by route; prefetch on hover.
* [ ] Image optimization (srcset, lazy, WebP/AVIF).
* [ ] Search/indexing caching for Help Center.
* [ ] Virtualized tables; debounced filters; workerized heavy exports.
* [ ] Telemetry on conversion funnels and console task completion.

This completes Patch 9 — Public Web, Legal & Ops with conversion-ready public pages, PDPL-aligned legal/consent flows, and robust internal consoles for support, risk, compliance, and executive oversight.

