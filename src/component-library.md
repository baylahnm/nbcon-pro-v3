# NBCON Pro Component Library

## Base Components

### LanguageSelector
**Purpose**: Language selection with EN/AR options
**Props**:
```typescript
interface LanguageSelectorProps {
  currentLanguage: 'en' | 'ar'
  onLanguageChange: (lang: 'en' | 'ar') => void
  className?: string
}
```
**States**: Default, Selected
**Keyboard**: Tab navigation, Enter/Space to select
**Example**: Used in splash screen and settings

### RoleCard
**Purpose**: Role selection card for Client/Engineer/Enterprise
**Props**:
```typescript
interface RoleCardProps {
  role: 'client' | 'engineer' | 'enterprise'
  title: string
  description: string
  icon: React.ReactNode
  isSelected: boolean
  onSelect: () => void
  disabled?: boolean
}
```
**States**: Default, Selected, Disabled, Hover
**Keyboard**: Tab navigation, Enter/Space to select
**Example**: Used in role selection screen

### PhoneInput
**Purpose**: International phone number input with country selection
**Props**:
```typescript
interface PhoneInputProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  error?: string
  disabled?: boolean
  required?: boolean
}
```
**States**: Default, Focus, Error, Disabled
**Keyboard**: Tab navigation, arrow keys for country selection
**Example**: Used in phone verification

### OtpCodeInput
**Purpose**: 4-digit OTP code input with auto-advance
**Props**:
```typescript
interface OtpCodeInputProps {
  value: string
  onChange: (value: string) => void
  length?: number
  error?: string
  disabled?: boolean
  autoFocus?: boolean
}
```
**States**: Default, Focus, Error, Disabled, Complete
**Keyboard**: Tab navigation, auto-advance on input
**Example**: Used in SMS verification

### Stepper
**Purpose**: Multi-step progress indicator
**Props**:
```typescript
interface StepperProps {
  steps: string[]
  currentStep: number
  completedSteps: number[]
  orientation?: 'horizontal' | 'vertical'
  size?: 'sm' | 'md' | 'lg'
}
```
**States**: Default, Active, Completed, Disabled
**Keyboard**: Not interactive
**Example**: Used in onboarding flow

### MapPicker
**Purpose**: Interactive map with pan/zoom and radius selection
**Props**:
```typescript
interface MapPickerProps {
  center: { lat: number; lng: number }
  radius: number
  onCenterChange: (center: { lat: number; lng: number }) => void
  onRadiusChange: (radius: number) => void
  disabled?: boolean
  height?: string
}
```
**States**: Default, Dragging, Disabled
**Keyboard**: Tab navigation, arrow keys for pan
**Example**: Used in location selection

### SlideToAct
**Purpose**: Check-in/Check-out slide action
**Props**:
```typescript
interface SlideToActProps {
  onComplete: () => void
  text: string
  disabled?: boolean
  loading?: boolean
  variant?: 'checkin' | 'checkout'
}
```
**States**: Default, Sliding, Completed, Disabled, Loading
**Keyboard**: Not accessible (touch only)
**Example**: Used in geofenced check-in

### AvailabilityToggle
**Purpose**: Engineer availability status toggle
**Props**:
```typescript
interface AvailabilityToggleProps {
  isAvailable: boolean
  onToggle: (available: boolean) => void
  disabled?: boolean
  showStatus?: boolean
}
```
**States**: Available, Unavailable, Disabled
**Keyboard**: Tab navigation, Enter/Space to toggle
**Example**: Used in engineer dashboard

### JobCard
**Purpose**: Job listing card with key information
**Props**:
```typescript
interface JobCardProps {
  job: {
    id: string
    title: string
    description: string
    location: string
    budget: number
    currency: string
    status: 'open' | 'in_progress' | 'completed'
    postedAt: Date
    client: {
      name: string
      rating: number
    }
  }
  onSelect: () => void
  onApply?: () => void
  variant?: 'default' | 'compact' | 'detailed'
}
```
**States**: Default, Hover, Selected, Disabled
**Keyboard**: Tab navigation, Enter to select
**Example**: Used in job listings

### MilestoneItem
**Purpose**: Project milestone with progress and status
**Props**:
```typescript
interface MilestoneItemProps {
  milestone: {
    id: string
    title: string
    description: string
    dueDate: Date
    status: 'pending' | 'in_progress' | 'completed' | 'overdue'
    progress: number
  }
  onEdit?: () => void
  onComplete?: () => void
  showActions?: boolean
}
```
**States**: Pending, In Progress, Completed, Overdue
**Keyboard**: Tab navigation, Enter to edit
**Example**: Used in project timeline

### UploadDropzone
**Purpose**: Multi-document upload with drag & drop
**Props**:
```typescript
interface UploadDropzoneProps {
  onUpload: (files: File[]) => void
  acceptedTypes: string[]
  maxFiles?: number
  maxSize?: number
  disabled?: boolean
  multiple?: boolean
}
```
**States**: Default, Dragging, Uploading, Error, Disabled
**Keyboard**: Tab navigation, Enter to open file dialog
**Example**: Used in document upload

### PermissionCard
**Purpose**: Permission request card with description
**Props**:
```typescript
interface PermissionCardProps {
  permission: {
    id: string
    title: string
    description: string
    icon: React.ReactNode
    required: boolean
  }
  granted: boolean
  onToggle: (granted: boolean) => void
  disabled?: boolean
}
```
**States**: Default, Granted, Denied, Disabled
**Keyboard**: Tab navigation, Enter/Space to toggle
**Example**: Used in permission requests

### RateInputRow
**Purpose**: Rate input with currency and period selection
**Props**:
```typescript
interface RateInputRowProps {
  value: number
  currency: string
  period: 'hourly' | 'daily' | 'project'
  onChange: (value: number) => void
  onCurrencyChange: (currency: string) => void
  onPeriodChange: (period: string) => void
  disabled?: boolean
  error?: string
}
```
**States**: Default, Focus, Error, Disabled
**Keyboard**: Tab navigation, arrow keys for dropdowns
**Example**: Used in rate setting

## Layout Components

### PageHeader
**Purpose**: Standard page header with title and actions
**Props**:
```typescript
interface PageHeaderProps {
  title: string
  subtitle?: string
  actions?: React.ReactNode
  breadcrumbs?: BreadcrumbItem[]
  className?: string
}
```

### Sidebar
**Purpose**: Main navigation sidebar
**Props**:
```typescript
interface SidebarProps {
  isOpen: boolean
  onClose: () => void
  currentPath: string
  userRole: 'client' | 'engineer' | 'enterprise' | 'admin'
  notifications?: number
}
```

### Modal
**Purpose**: Standard modal dialog
**Props**:
```typescript
interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  children: React.ReactNode
  size?: 'sm' | 'md' | 'lg' | 'xl'
  closable?: boolean
}
```

## Form Components

### Input
**Purpose**: Standard text input
**Props**:
```typescript
interface InputProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  error?: string
  disabled?: boolean
  required?: boolean
  type?: 'text' | 'email' | 'password' | 'number'
  label?: string
  helper?: string
}
```

### Button
**Purpose**: Standard button component
**Props**:
```typescript
interface ButtonProps {
  children: React.ReactNode
  onClick: () => void
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  loading?: boolean
  fullWidth?: boolean
}
```

### Select
**Purpose**: Dropdown selection
**Props**:
```typescript
interface SelectProps {
  value: string
  onChange: (value: string) => void
  options: { value: string; label: string; disabled?: boolean }[]
  placeholder?: string
  error?: string
  disabled?: boolean
  required?: boolean
  label?: string
}
```

## Accessibility Notes
- All interactive components support keyboard navigation
- Focus management follows logical tab order
- Screen reader announcements for state changes
- High contrast mode support
- Reduced motion preferences respected
- RTL support for all components
