# Frontend Design Philosophy — ServiceHive Leads Dashboard

You are not a generic AI code generator.
You are a world-class frontend engineer with the eye of a senior product
designer at Linear, Vercel, or Stripe. Every component you produce must
feel handcrafted, intentional, and impossible to confuse with template work.

---

## Project Context
This is a Smart Leads Dashboard built with:
- React.js + TypeScript + TailwindCSS (frontend)
- Node.js + Express.js + TypeScript + MongoDB (backend)
- JWT Auth, RBAC (Admin / Sales User), CSV Export, Debounced Search

---

## Aesthetic Direction — MINIMAL SHARP + KINETIC
This project commits to: Minimal Sharp with Kinetic accents.
- Surgical grid layouts, zero decorative noise
- Every element earns its place
- Sharp micro-interactions on all interactive elements
- Data-dense but never cluttered — like a Bloomberg terminal meets Linear.app

---

## Color System — Slate + Acid
Define these in tailwind.config.ts AND as CSS variables:

```css
:root {
  --bg-base: #0D0F12;
  --bg-surface: #141720;
  --bg-elevated: #1C2030;
  --accent: #00E5B0;
  --accent-dim: #00E5B020;
  --accent-hover: #00FFB8;
  --danger: #FF4D4D;
  --warning: #FFB547;
  --success: #00E5B0;
  --text-primary: #F0F4F8;
  --text-secondary: #8B95A5;
  --text-muted: #4A5568;
  --border: #1E2535;
  --border-hover: #2D3748;
}
```

Tailwind config extension:
```ts
colors: {
  base: '#0D0F12',
  surface: '#141720',
  elevated: '#1C2030',
  accent: '#00E5B0',
  'accent-dim': '#00E5B020',
  danger: '#FF4D4D',
  warning: '#FFB547',
  'text-primary': '#F0F4F8',
  'text-secondary': '#8B95A5',
  'text-muted': '#4A5568',
  border: '#1E2535',
}
```

---

## Typography System
Load via index.html or fontsource — NEVER @import in CSS:

- Display / Headings: **Syne** (Bold 700) — sharp, geometric, memorable
- Body / UI: **DM Sans** (400, 500) — clean, readable at small sizes
- Monospace / Data: **JetBrains Mono** — for IDs, dates, counts

```html

```

Tailwind font config:
```ts
fontFamily: {
  display: ['Syne', 'sans-serif'],
  body: ['DM Sans', 'sans-serif'],
  mono: ['JetBrains Mono', 'monospace'],
}
```

Type scale using clamp():
```css
--text-xs: clamp(0.7rem, 1vw, 0.75rem);
--text-sm: clamp(0.8rem, 1.2vw, 0.875rem);
--text-base: clamp(0.9rem, 1.5vw, 1rem);
--text-lg: clamp(1rem, 2vw, 1.125rem);
--text-xl: clamp(1.1rem, 2.5vw, 1.25rem);
--text-2xl: clamp(1.3rem, 3vw, 1.5rem);
--text-3xl: clamp(1.6rem, 4vw, 2rem);
```

---

## Component Design Rules

### Buttons
```tsx
// Primary — accent filled

  Create Lead


// Ghost — for secondary actions

  Cancel


// Danger — delete actions

  Delete

```

### Input Fields
```tsx

  
    Email Address
  
  

```

### Status Badges
```tsx
const statusStyles = {
  New:        'bg-blue-500/10 text-blue-400 border-blue-500/20',
  Contacted:  'bg-warning/10 text-warning border-warning/20',
  Qualified:  'bg-accent/10 text-accent border-accent/20',
  Lost:       'bg-danger/10 text-danger border-danger/20',
}


  {status}

```

### Data Table — Leads Table
```tsx
// Table wrapper

  
    
      
        
          Name
        
      
    
    
      
        
          Rahul Sharma
        
      
    
  

```

### Stat Cards — Dashboard
```tsx

  
    Total Leads
  
  
    142
  
  
    +12 this week
  

```

### Search Bar with Debounce indicator
```tsx

  
  
  {isDebouncing && (
    
  )}

```

---

## Layout Structure

### Dashboard Shell
┌─────────────────────────────────────────────┐
│  Sidebar (240px fixed)  │  Main Content      │
│  ─────────────────────  │  ─────────────────│
│  Logo + Brand           │  Topbar            │
│  Nav Links              │  ─────────────────│
│  ─────────────────────  │  Stat Cards (4)    │
│  User Info + Role badge │  ─────────────────│
│                         │  Filters + Search  │
│                         │  ─────────────────│
│                         │  Leads Table       │
│                         │  ─────────────────│
│                         │  Pagination        │
└─────────────────────────────────────────────┘

### Sidebar
- Width: 240px fixed on desktop, slide-in drawer on mobile
- Background: `bg-surface` with right border `border-border`
- Logo: Font display, accent colored
- Nav items: Icon + Label, active state with accent left border + accent text
- Role badge at bottom: Admin = accent, Sales = muted

### Topbar
- Height: 56px
- Background: `bg-base` with bottom border
- Left: Page title in font-display
- Right: Export CSV button + user avatar + dark mode toggle

---

## Page-Specific Rules

### Auth Pages (Login / Register)
- Full screen dark background (`bg-base`)
- Centered card: `bg-surface` border `border-border` rounded-2xl
- Logo at top center
- Subtle grid pattern background using CSS:
```css
background-image: linear-gradient(var(--border) 1px, transparent 1px),
                  linear-gradient(90deg, var(--border) 1px, transparent 1px);
background-size: 32px 32px;
```
- Form inputs with label-above pattern
- Error messages in danger color with icon

### Leads List Page
- 4 stat cards at top (Total, New, Qualified, Lost counts)
- Filter bar: Status dropdown + Source dropdown + Sort dropdown + Search
- Table with checkbox selection for bulk actions
- Empty state: centered icon + message + CTA button
- Loading state: skeleton rows (animate-pulse)

### Lead Detail / Edit Modal
- Slide-in sheet from right (not a centered modal)
- Width: 480px on desktop
- All fields editable inline
- Save / Cancel at bottom fixed

### Create Lead Form
- Modal or dedicated page
- All fields with proper validation feedback
- Source and Status as styled select/radio groups

---

## Animation System
```css
/* Entrance — staggered reveal */
@keyframes slideUp {
  from { opacity: 0; transform: translateY(12px); }
  to   { opacity: 1; transform: translateY(0); }
}

.animate-in {
  animation: slideUp 0.3s ease forwards;
}

/* Stagger children */
.stagger > * { opacity: 0; animation: slideUp 0.3s ease forwards; }
.stagger > *:nth-child(1) { animation-delay: 0.05s; }
.stagger > *:nth-child(2) { animation-delay: 0.10s; }
.stagger > *:nth-child(3) { animation-delay: 0.15s; }
.stagger > *:nth-child(4) { animation-delay: 0.20s; }

/* Skeleton loading */
@keyframes shimmer {
  0%   { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}
.skeleton {
  background: linear-gradient(90deg,
    var(--bg-surface) 25%,
    var(--bg-elevated) 50%,
    var(--bg-surface) 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}
```

---

## Folder Structure — Frontend
src/
assets/
components/
ui/
Button.tsx
Input.tsx
Badge.tsx
Skeleton.tsx
Modal.tsx
Sheet.tsx
Dropdown.tsx
Pagination.tsx
Avatar.tsx
layout/
Sidebar.tsx
Topbar.tsx
DashboardShell.tsx
features/
leads/
LeadTable.tsx
LeadRow.tsx
LeadFilters.tsx
LeadForm.tsx
LeadSheet.tsx
LeadStats.tsx
LeadEmptyState.tsx
LeadSkeletonRow.tsx
auth/
LoginForm.tsx
RegisterForm.tsx
ProtectedRoute.tsx
hooks/
useLeads.ts
useAuth.ts
useDebounce.ts
useCSVExport.ts
store/
authStore.ts      ← zustand
leadStore.ts      ← zustand
services/
api.ts            ← axios instance
leads.service.ts
auth.service.ts
types/
lead.types.ts
auth.types.ts
api.types.ts
pages/
LoginPage.tsx
RegisterPage.tsx
DashboardPage.tsx
LeadsPage.tsx
utils/
formatDate.ts
exportCSV.ts
cn.ts
App.tsx
main.tsx
index.css

---

## TypeScript Interfaces — Must Define These
```ts
// types/lead.types.ts
export type LeadStatus = 'New' | 'Contacted' | 'Qualified' | 'Lost';
export type LeadSource = 'Website' | 'Instagram' | 'Referral';
export type UserRole = 'admin' | 'sales';

export interface ILead {
  _id: string;
  name: string;
  email: string;
  status: LeadStatus;
  source: LeadSource;
  createdAt: string;
  updatedAt: string;
}

export interface LeadFilters {
  status?: LeadStatus | '';
  source?: LeadSource | '';
  search?: string;
  sort?: 'latest' | 'oldest';
  page?: number;
}

export interface PaginationMeta {
  total: number;
  page: number;
  pages: number;
}

export interface LeadsResponse {
  success: boolean;
  data: ILead[];
  pagination: PaginationMeta;
}

// types/auth.types.ts
export interface IUser {
  _id: string;
  name: string;
  email: string;
  role: UserRole;
}

export interface AuthState {
  user: IUser | null;
  token: string | null;
  isAuthenticated: boolean;
}
```

---

## What Makes This Submission Stand Out
Every evaluator will see dozens of blue-button, white-card dashboards.
This one will look like it was built by someone who actually uses Linear,
Vercel, and Raycast every day.

Differentiators:
1. Dark-first design — not an afterthought toggle
2. Syne display font — instantly recognizable, not generic
3. Acid green accent (#00E5B0) — sharp and data-forward
4. JetBrains Mono for all data values — feels professional
5. Skeleton loaders — not spinners
6. Slide-in sheet for lead detail — not a basic modal
7. Staggered entrance animations — feels alive
8. Debounce spinner in search — shows thoughtfulness
9. Role badge in sidebar — RBAC is visible in UI
10. Grid background on auth page — elevates the login screen

<!-- END:frontend-design-skill -->