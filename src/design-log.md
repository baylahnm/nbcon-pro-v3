# NBCON Pro Design Log

## Project Identity
- **Name**: NBCON Pro (lowercase 'nbcon', uppercase 'P' in 'Pro')
- **Purpose**: Revolutionary engineering marketplace fusing Uber's on-demand convenience with LinkedIn's professional networking
- **Target Market**: Saudi Arabia's engineering sector
- **Languages**: Bilingual (EN/AR) with full RTL support
- **Compliance**: SCE verification, Saudi VAT (15%), ZATCA e-invoicing, PDPL-aligned

## Design System Decisions

### Color Palette
- **Primary Brand**: #00D084 (NBCON Green)
- **Dark Surfaces**: 
  - Surface 1: #0D1B0F
  - Surface 2: #1A2D1C  
  - Surface 3: #243027
- **State Colors**:
  - Success: #10b981
  - Warning: #f59e0b
  - Error: #ef4444

### Typography
- **English**: Inter (system fallback)
- **Arabic**: Noto Sans Arabic (system fallback)
- **RTL Support**: Full mirroring of layouts and chevrons

### Accessibility Standards
- **WCAG 2.2 AA** compliance
- **Touch Targets**: Minimum 44px
- **Focus Management**: Visible focus rings, logical tab order
- **Screen Reader**: Semantic HTML, ARIA annotations
- **Motion**: Reduced-motion fallbacks

### Component Patterns
- **Consistent Spacing**: 4px base unit (0.25rem)
- **Border Radius**: 8px default, 4px small, 12px large
- **Shadows**: Subtle elevation system
- **Animations**: 300ms ease-out transitions

## Navigation Structure
- **Main**: Dashboard (expandable), Notifications (badge)
- **Role-Specific**: Client, Engineer, Enterprise, Admin
- **Utility**: Settings, Help Center, Logout (destructive)

## Technical Stack
- **Frontend**: Vite + React + TypeScript
- **Styling**: Tailwind CSS + shadcn/ui
- **State**: Zustand stores
- **Backend**: Supabase (Auth/DB/Edge Functions)
- **Routing**: React Router
- **i18n**: react-i18next

## RTL Implementation
- All UI components support RTL mirroring
- Arabic text uses `dir="rtl"` attribute
- Layouts automatically mirror (left ↔ right)
- Chevrons and arrows flip direction
- Text alignment follows language direction

## Compliance Features
- **SCE Verification**: Professional credential verification
- **Saudi VAT**: 15% automatic calculation
- **ZATCA E-Invoicing**: Integration ready
- **Hijri Dates**: Optional Islamic calendar display
- **PDPL**: Privacy and data protection compliance

## Last Updated
- 2024-01-XX: Initial design system setup
