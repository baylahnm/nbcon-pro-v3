# NBCON Pro - Engineering Marketplace

A revolutionary engineering marketplace that fuses Uber's on-demand convenience with LinkedIn's professional networking—purpose-built for Saudi Arabia's engineering sector.

## 🚀 Features

- **Bilingual Support**: Full English and Arabic support with RTL layout
- **Role-Based Dashboards**: Client, Engineer, Enterprise, and Admin interfaces
- **AI-Powered Matching**: Smart matching between clients and engineers
- **Geofenced Check-In**: Location-based work verification
- **Real-Time Tracking**: Live project progress monitoring
- **Secure Payments**: Escrow-based payment system
- **SCE Verification**: Saudi Council of Engineers integration
- **Compliance Ready**: ZATCA e-invoicing, Saudi VAT (15%), PDPL compliance

## 🛠️ Tech Stack

- **Frontend**: Vite + React + TypeScript
- **Styling**: Tailwind CSS + shadcn/ui
- **State Management**: Zustand
- **Backend**: Supabase (Auth/DB/Edge Functions)
- **Routing**: React Router
- **Internationalization**: react-i18next
- **Animations**: Framer Motion
- **Maps**: React Leaflet

## 📱 Screens

### Authentication & Onboarding
- Splash & Language Selection
- Role Selection (Client/Engineer/Enterprise)
- Phone Number Verification
- OTP Verification
- Profile Setup
- Credentials Upload
- Service Area Definition
- Rate Setting
- Welcome & Tutorial
- Permission Requests
- Account Confirmation

### Dashboards
- Engineer Dashboard
- Client Dashboard
- Enterprise Dashboard
- Admin Dashboard

### Core Features
- Browse Services
- Job Request Wizard
- AI-Powered Matches
- Job Timeline & Milestones
- Geofenced Check-In/Check-Out
- Profile & Verification Center

## 🎨 Design System

### Colors
- **Primary Brand**: #00D084 (NBCON Green)
- **Dark Surfaces**: #0D1B0F, #1A2D1C, #243027
- **State Colors**: Success (#10b981), Warning (#f59e0b), Error (#ef4444)

### Typography
- **English**: Inter
- **Arabic**: Noto Sans Arabic

### Accessibility
- WCAG 2.2 AA compliance
- 44px minimum touch targets
- Keyboard navigation support
- Screen reader compatibility
- RTL support for Arabic

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- pnpm (recommended) or npm

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd nbcon-pro-v3
```

2. Install dependencies
```bash
pnpm install
```

3. Set up environment variables
```bash
cp env.example .env.local
# Edit .env.local with your Supabase credentials
```

4. Start the development server
```bash
pnpm dev
```

5. Open your browser and navigate to `http://localhost:3000`

### Build for Production

```bash
pnpm build
```

### Type Checking

```bash
pnpm typecheck
```

### Linting

```bash
pnpm lint
```

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   └── ui/             # Base UI components (Button, Input, etc.)
├── pages/              # Page components
│   ├── auth/           # Authentication pages
│   ├── dashboard/      # Dashboard pages
│   ├── jobs/           # Job management pages
│   ├── profile/        # Profile pages
│   └── services/       # Service pages
├── stores/             # Zustand state stores
├── i18n/               # Internationalization
│   └── locales/        # Translation files
├── lib/                # Utility functions
├── design-log.md       # Design decisions log
├── copy-source.md      # Copy and translations
└── component-library.md # Component documentation
```

## 🌍 Internationalization

The app supports English and Arabic with full RTL support. Translation files are located in `src/i18n/locales/`.

### Adding New Translations

1. Add the key to the appropriate JSON file in `src/i18n/locales/`
2. Use the `useTranslation` hook in your component
3. Access translations with `t('key.path')`

## 🎯 Component Library

The project includes a comprehensive component library documented in `src/component-library.md`. Key components include:

- **LanguageSelector**: Language selection with EN/AR options
- **RoleCard**: Role selection card
- **PhoneInput**: International phone number input
- **OtpCodeInput**: 4-digit OTP input with auto-advance
- **Stepper**: Multi-step progress indicator
- **MapPicker**: Interactive map with radius selection
- **SlideToAct**: Check-in/Check-out slide action
- **AvailabilityToggle**: Engineer availability status
- **JobCard**: Job listing card
- **MilestoneItem**: Project milestone with progress
- **UploadDropzone**: Multi-document upload
- **PermissionCard**: Permission request card
- **RateInputRow**: Rate input with currency selection

## 🔧 Development Guidelines

### Code Style
- Use TypeScript for all components
- Follow the established component patterns
- Use Tailwind CSS for styling
- Implement proper accessibility features
- Support both LTR and RTL layouts

### State Management
- Use Zustand for global state
- Keep component state local when possible
- Use proper TypeScript interfaces

### Testing
- Write unit tests for utility functions
- Test component behavior and accessibility
- Verify RTL support for Arabic

## 📱 Responsive Design

The app is fully responsive and supports:
- Mobile (320px+)
- Tablet (768px+)
- Desktop (1024px+)
- Large screens (1400px+)

## 🔒 Security & Compliance

- Saudi VAT (15%) calculation
- ZATCA e-invoicing integration
- PDPL data protection compliance
- SCE professional verification
- Secure payment processing
- Data encryption and privacy

## 📄 License

This project is proprietary and confidential. All rights reserved.

## 🤝 Contributing

Please follow the established patterns and guidelines when contributing to this project.

## 📞 Support

For technical support or questions, please contact the development team.
