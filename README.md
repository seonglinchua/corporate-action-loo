# Corporate Action Lookup Engine

A sophisticated back-office application for financial operations teams to manage securities, identifiers, corporate actions, and multi-source data reconciliation with comprehensive audit trails and regulatory compliance.

## Overview

The Corporate Action Lookup Engine is a centralized platform designed for financial institutions to:

- Maintain a comprehensive **Securities Master Registry** with multiple identifier types (ISIN, RIC, CUSIP, Stock Codes)
- Resolve identifier conflicts and variations with confidence scoring
- Track and manage **Corporate Action Events** (dividends, stock splits, mergers, rights offerings, etc.)
- Detect and resolve **multi-source data conflicts** with audit trails
- Monitor **external data sources** (Bloomberg, exchanges, custodians)
- Provide real-time **system monitoring** and data quality assurance
- Generate **analytics and reporting** on data quality and performance metrics
- Support role-based access control with comprehensive admin features

## Key Features

| Feature | Purpose |
|---------|---------|
| **Dashboard** | System health overview, key metrics, activity feed, and quick actions |
| **Securities Master Registry** | Browse, search, and filter securities with full identifier visibility |
| **Identifier Lookup Tool** | Resolve identifiers across multiple systems with confidence scoring |
| **Corporate Action Events** | Ingest, view, and manage corporate action events |
| **Reconciliation & Conflicts** | Multi-source data comparison and conflict resolution workflow |
| **Data Source Management** | Monitor and manage external data sources and sync status |
| **Analytics & Reporting** | Performance metrics, data quality scores, and trend analysis |
| **Admin & Settings** | User access management, configuration, and system backup |
| **Security Details** | Detailed view of individual securities with all metadata |

## Technology Stack

### Frontend Framework
- **React 19.0.0** - Modern UI framework
- **TypeScript 5.7.2** - Type-safe development
- **Vite 6.3.5** - Lightning-fast build tool and dev server

### UI & Styling
- **Tailwind CSS 4.1.11** - Utility-first CSS framework
- **shadcn/ui** - 50+ pre-built, accessible components
- **Radix UI** - Accessible component primitives
- **Lucide React 0.484.0** - Comprehensive icon library
- **Phosphor Icons 2.1.7** - Alternative icon set

### State Management & Forms
- **TanStack React Query 5.83.1** - Server state management
- **React Hook Form 7.54.2** - Efficient form handling
- **Zod 3.25.76** - TypeScript-first schema validation

### Visualization & Charts
- **Recharts 2.15.1** - React charting library
- **D3 7.9.0** - Advanced data visualization
- **Three.js 0.175.0** - 3D graphics support

### Additional Libraries
- **Wouter 3.7.1** - Lightweight client-side routing
- **Framer Motion 12.6.2** - Animation library
- **date-fns 3.6.0** - Date utilities
- **Sonner 2.0.1** - Toast notifications
- **Marked 15.0.7** - Markdown parsing

### Development & Build
- **ESLint 9.28.0** - Code quality linting
- **PostCSS 4.1.8** - CSS transformations

## Project Structure

```
corporate-action-loo/
├── src/
│   ├── pages/                    # Page components (9 pages)
│   │   ├── Dashboard.tsx         # System overview and metrics
│   │   ├── SecuritiesRegistry.tsx    # Securities browsing
│   │   ├── SecurityDetail.tsx    # Individual security details
│   │   ├── IdentifierLookup.tsx  # Identifier resolution
│   │   ├── CorporateActionsEvents.tsx # Event management
│   │   ├── ReconciliationConflicts.tsx # Conflict detection & resolution
│   │   ├── DataSources.tsx       # Source monitoring
│   │   ├── Analytics.tsx         # Reporting & analytics
│   │   └── Admin.tsx             # Administration settings
│   ├── components/               # Reusable React components
│   │   ├── ui/                   # shadcn/ui components (50+)
│   │   ├── Navigation.tsx        # Main navigation component
│   │   ├── MetricCard.tsx        # Dashboard metric display
│   │   └── StatusBadge.tsx       # Status indicators
│   ├── lib/
│   │   ├── types.ts              # TypeScript interfaces and types
│   │   ├── mock-data.ts          # Demo data for development
│   │   └── utils.ts              # Utility functions
│   ├── hooks/                    # Custom React hooks
│   ├── styles/                   # CSS styling
│   ├── App.tsx                   # Main router and layout
│   └── main.tsx                  # React entry point
├── public/                       # Static assets
├── package.json                  # Dependencies and scripts
├── tsconfig.json                 # TypeScript configuration
├── vite.config.ts                # Vite configuration
├── tailwind.config.js            # Tailwind CSS theme
├── components.json               # shadcn/ui configuration
├── index.html                    # HTML entry point
├── PRD.md                        # Product Requirements Document
├── SECURITY.md                   # Security policies
├── LICENSE                       # MIT License
└── README.md                     # This file
```

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd corporate-action-loo
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

The application will open at `http://localhost:5000`

### Available Scripts

```bash
npm run dev       # Start development server
npm run build     # Build for production
npm run preview   # Preview production build
npm run lint      # Run ESLint
npm run optimize  # Optimize dependencies
npm run kill      # Kill port 5000 process
```

## Data Types & Core Entities

The application works with the following core data models (defined in `/src/lib/types.ts`):

- **User** - Role-based access control (analyst, senior_analyst, admin)
- **Security** - Securities with multiple identifiers (ISIN, RIC, CUSIP, stock_code)
- **CorporateAction** - Corporate events (dividend, stock_split, merger, rights_offering, spin_off, etc.)
- **Conflict** - Multi-source data conflicts with resolution workflow
- **DataSource** - External data source configuration and sync status
- **SystemHealth** - Real-time system monitoring metrics
- **ActivityFeed** - Audit trail and event logging

## Routing

The application uses client-side routing with the following structure:

```
/                    → Dashboard
/securities          → Securities Master Registry
/securities/:id      → Security Detail View
/lookup              → Identifier Lookup Tool
/events              → Corporate Action Events
/conflicts           → Reconciliation & Conflicts
/sources             → Data Source Management
/analytics           → Analytics & Reporting
/admin               → Admin & Settings
```

## Architecture

### Frontend Architecture
- **Component-based design** using React with reusable shadcn/ui components
- **Type-safe** with comprehensive TypeScript interfaces
- **Responsive layout** optimized for 1920x1080+ desktop displays
- **Professional styling** using Tailwind CSS with custom theme colors
- **Accessible** components following WCAG standards

### Design System
- **Color Palette**: Deep Navy Blue (primary), Cool Gray (supporting), Electric Blue (accents)
- **Typography**: Inter font for UI, monospace for financial data
- **Components**: 50+ pre-built shadcn/ui components
- **Icons**: Lucide and Phosphor icon libraries

### State Management
- Server state managed via TanStack React Query
- Form state managed via React Hook Form
- Schema validation with Zod
- No global state management required for current scope

## Security

See [SECURITY.md](SECURITY.md) for security policies and guidelines.

## Contributing

Contributions are welcome! Please refer to the [PRD.md](PRD.md) for detailed specifications and requirements.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

The Spark Template files and resources from GitHub are licensed under the terms of the MIT license, Copyright GitHub, Inc.
