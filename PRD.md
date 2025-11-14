# Planning Guide

A back-office corporate action lookup engine that provides securities master registry management, identifier resolution, corporate action event tracking, multi-source data reconciliation, and real-time system monitoring for financial operations teams.

**Experience Qualities**:
1. **Precise** - Data accuracy is paramount; every identifier, date, and amount must be traceable and verifiable with clear confidence indicators
2. **Efficient** - Fast lookups, batch operations, and keyboard shortcuts enable high-volume processing with minimal clicks
3. **Trustworthy** - Comprehensive audit trails, conflict detection, and multi-source validation ensure operational integrity and regulatory compliance

**Complexity Level**: Complex Application (advanced functionality, accounts)
  - Multi-page enterprise application with role-based access control, real-time data synchronization, conflict resolution workflows, batch processing, comprehensive audit trails, and integration with external data sources requiring sophisticated state management and data validation.

## Essential Features

### 1. Dashboard Overview
- **Functionality**: Real-time system health monitoring, activity metrics, and quick access to common operations
- **Purpose**: Enables operations teams to assess system status at a glance and quickly respond to issues
- **Trigger**: User logs in or navigates to home page
- **Progression**: Load dashboard → Display system health cards (lookup engine, database, cache) → Show today's activity metrics → Render recent activity feed → Present quick action buttons
- **Success criteria**: All metrics load within 2 seconds; health status accurately reflects system state; activity feed shows last 10 events

### 2. Securities Master Registry
- **Functionality**: Browse, search, filter, view, and edit securities with multiple identifier types (ISIN, RIC, CUSIP, stock code)
- **Purpose**: Centralized source of truth for all securities with cross-reference capability across identifier systems
- **Trigger**: User clicks "Securities Master Registry" in navigation
- **Progression**: Navigate to registry → Apply filters (asset class, exchange, status) → Search by name/identifier → View results table → Click security → View detail page with identifiers, corporate actions, edit history
- **Success criteria**: Search returns results in <500ms; all identifier mappings displayed; edit history shows complete audit trail

### 3. Identifier Lookup Tool
- **Functionality**: Resolve any identifier (ISIN, RIC, CUSIP, stock code) to canonical security record with confidence scoring
- **Purpose**: Enables quick identifier translation and validation for trade processing and reconciliation
- **Trigger**: User enters identifier in lookup form
- **Progression**: Enter identifier → Optional: select as-of date → Click resolve → Display matched security with confidence score → Show all mapped identifiers → Display data source timestamps → If not found: show fuzzy match suggestions
- **Success criteria**: Lookup completes in <200ms; confidence score accurately reflects match quality; fuzzy matching suggests relevant alternatives

### 4. Corporate Action Events Management
- **Functionality**: View, search, filter, ingest, and manage corporate action events (dividends, splits, mergers, rights offerings)
- **Purpose**: Track all corporate actions affecting securities for accurate position and valuation calculations
- **Trigger**: User navigates to Corporate Action Events or clicks "Ingest Corporate Action"
- **Progression**: Browse events table → Filter by type/status/date → Click event → View full details (dates, amounts, tax treatment) → Ingest new event: enter identifier → validate resolution → enter event details → submit with source attribution
- **Success criteria**: All events searchable and filterable; ingestion validates identifier resolution; validation prevents invalid date sequences

### 5. Reconciliation & Conflict Resolution
- **Functionality**: Detect, display, and resolve conflicts when multiple data sources provide different values for the same corporate action
- **Purpose**: Ensures data accuracy by flagging discrepancies and enabling expert review before accepting data
- **Trigger**: System detects conflicting data during sync, or user navigates to Reconciliation page
- **Progression**: View conflicts queue → Filter unresolved → Click conflict → View side-by-side comparison of sources → Review difference analysis → Select resolution (accept source A/B, manual override, escalate) → Add reasoning notes → Apply decision
- **Success criteria**: All conflicts flagged within 1 minute of detection; resolution applies to event record; audit trail captures decision and reasoning

### 6. Data Sync & Source Management
- **Functionality**: Monitor and manage automated data ingestion from Bloomberg, exchanges (SGX, HKEX, Bursa), and custodians
- **Purpose**: Automates data collection while providing visibility and control over synchronization processes
- **Trigger**: Automated on schedule, or user clicks "Manual Sync"
- **Progression**: View data sources dashboard → Check status (connected, last sync, records synced) → Optionally trigger manual sync → View sync logs → If admin: adjust sync frequency or pause/resume
- **Success criteria**: Status updates in real-time; manual sync triggers immediately; logs show detailed error messages for failures

### 7. Reporting & Analytics
- **Functionality**: Display system performance metrics, data quality scores, lookup patterns, and conflict trends
- **Purpose**: Enables performance monitoring, capacity planning, and identification of data quality issues
- **Trigger**: User navigates to Reporting & Analytics
- **Progression**: Load analytics page → Display metric cards (success rate, latency, data quality) → Render time-series charts → Show top securities table → Highlight data quality issues → Export custom report
- **Success criteria**: Charts render with smooth animations; metrics update every 30 seconds; export generates complete report

### 8. Admin & Settings
- **Functionality**: Configure system parameters, manage user access and roles, set notification preferences, backup/restore data
- **Purpose**: Provides administrative control over system behavior and user permissions
- **Trigger**: Admin user navigates to Admin & Settings
- **Progression**: Navigate to settings → Switch between tabs (Settings, Access Control, Data Management) → Modify configuration values → Add/edit users and roles → Trigger backup or cleanup operations → Save changes
- **Success criteria**: Only admin users can access; all configuration changes logged; role changes apply immediately

## Edge Case Handling

- **Invalid Identifier Lookup** - Show fuzzy match suggestions with similarity scores; provide troubleshooting guidance
- **Concurrent Edits** - Detect conflicts using optimistic locking; prompt user to refresh and retry
- **Data Source Timeout** - Show degraded status; retry with exponential backoff; log for admin review
- **Duplicate Corporate Actions** - Detect by security + event type + ex-date; flag as potential duplicate before ingestion
- **Missing Required Fields** - Validate on form submission; highlight missing fields; prevent submission until complete
- **Bulk Upload Errors** - Show row-by-row validation results; allow user to fix and re-upload failed rows
- **Stale Cache Data** - Display cache age; provide manual refresh button; auto-invalidate after TTL
- **Unauthorized Access Attempt** - Redirect to dashboard; show permission denied message; log security event

## Design Direction

The design should feel authoritative, precise, and efficient—evoking the aesthetic of professional trading terminals and enterprise financial software. A minimal interface emphasizes data density and information hierarchy, allowing operations staff to process high volumes quickly while maintaining confidence in data accuracy through clear visual indicators for status, confidence levels, and data freshness.

## Color Selection

Custom palette - A professional financial services color scheme that communicates trust, precision, and clarity with strong contrast for data readability.

- **Primary Color**: Deep Navy Blue (oklch(0.25 0.05 250)) - Conveys authority, stability, and professionalism; used for primary actions and navigation
- **Secondary Colors**: Cool Gray (oklch(0.55 0.01 240)) for supporting UI elements; Light Blue (oklch(0.72 0.08 240)) for hover states and secondary actions
- **Accent Color**: Electric Blue (oklch(0.60 0.18 240)) - Draws attention to critical actions, active states, and important metrics
- **Foreground/Background Pairings**: 
  - Background (White oklch(0.98 0 0)): Dark Navy text (oklch(0.20 0.02 250)) - Ratio 11.2:1 ✓
  - Card (Light Gray oklch(0.97 0.005 240)): Dark Navy text (oklch(0.20 0.02 250)) - Ratio 10.8:1 ✓
  - Primary (Deep Navy oklch(0.25 0.05 250)): White text (oklch(0.98 0 0)) - Ratio 11.5:1 ✓
  - Secondary (Cool Gray oklch(0.55 0.01 240)): White text (oklch(0.98 0 0)) - Ratio 6.2:1 ✓
  - Accent (Electric Blue oklch(0.60 0.18 240)): White text (oklch(0.98 0 0)) - Ratio 5.1:1 ✓
  - Muted (Light Gray oklch(0.93 0.005 240)): Medium Gray text (oklch(0.45 0.01 240)) - Ratio 7.8:1 ✓
  - Success (Green oklch(0.55 0.15 145)): White text (oklch(0.98 0 0)) - Ratio 4.9:1 ✓
  - Destructive (Red oklch(0.55 0.22 25)): White text (oklch(0.98 0 0)) - Ratio 5.3:1 ✓

## Font Selection

Typography should emphasize legibility, data clarity, and professional presentation with monospace numerics for financial values and dates. Use Inter for UI and SF Mono for tabular data.

- **Typographic Hierarchy**:
  - H1 (Page Title): Inter SemiBold/32px/tight letter spacing (-0.02em)
  - H2 (Section Title): Inter SemiBold/24px/tight letter spacing (-0.01em)
  - H3 (Card Title): Inter Medium/18px/normal letter spacing
  - Body (Default Text): Inter Regular/14px/normal letter spacing/1.5 line height
  - Small (Metadata): Inter Regular/12px/normal letter spacing/1.4 line height
  - Data (Numeric Values): SF Mono Regular/14px/tabular numerics

## Animations

Animations should be purposeful and minimal, reinforcing data updates and state transitions without distracting from critical information processing.

- **Purposeful Meaning**: Subtle pulse animations on real-time metrics communicate "live data"; smooth transitions between table filters prevent jarring content shifts; skeleton loaders indicate loading states
- **Hierarchy of Movement**: High priority: health status changes, conflict alerts; Medium priority: table sorting, page transitions; Low priority: hover states, tooltip reveals

## Component Selection

- **Components**: 
  - Navigation: Horizontal nav bar with dropdown menus for section navigation
  - Dashboard: Card components for metrics, Badge for status indicators, Separator for visual grouping
  - Tables: Table with sortable columns, sticky headers, horizontal scroll on overflow, Skeleton loaders
  - Forms: Input with validation states, Select dropdowns, Calendar date pickers, Textarea for notes
  - Modals: Dialog for quick actions (resolve identifier, ingest event), AlertDialog for destructive actions
  - Alerts: Alert component for system notifications, Badge for status pills (Active/Pending/Resolved)
  - Data Display: Tabs for multi-view pages (Admin settings), Progress for sync status, Tooltip for help text
  - Icons: Phosphor icons for actions (MagnifyingGlass for search, CloudArrowDown for sync, WarningCircle for conflicts)

- **Customizations**: 
  - Data table with virtualization for 1000+ row performance
  - Status indicator component with animated pulse for real-time data
  - Confidence score visual (progress bar with color gradient: green=high, yellow=medium, red=low)
  - Source comparison component for conflict resolution (side-by-side card layout)
  - Metric card with trend indicator (up/down arrow with percentage change)

- **States**: 
  - Buttons: Default (navy), Hover (lighter navy + subtle elevation), Active (pressed state), Disabled (gray + reduced opacity), Loading (spinner + disabled)
  - Inputs: Default (gray border), Focus (blue ring + border), Error (red border + error message below), Success (green border + checkmark icon), Disabled (gray background)
  - Tables: Row hover (light gray background), Selected row (blue tint), Loading row (skeleton animation)

- **Icon Selection**: 
  - MagnifyingGlass (search), Funnel (filter), ArrowsDownUp (sort), Eye (view), PencilSimple (edit), TrashSimple (delete), CloudArrowDown (sync), Check (success), X (close/error), Warning (conflict), ChartLine (analytics), GearSix (settings), Users (access control)

- **Spacing**: 
  - Card padding: p-6
  - Section gaps: gap-6 or gap-8
  - Form field spacing: space-y-4
  - Table cell padding: px-4 py-3
  - Page margins: max-w-7xl mx-auto px-6

- **Mobile**: 
  - Desktop-first design optimized for 1920x1080+ monitors
  - Tablet (768px+): Collapse side-by-side layouts to stacked; show hamburger menu for navigation
  - Tables: Horizontal scroll with sticky first column; reduce font sizes slightly
  - Forms: Full-width inputs; stack label above input
  - Cards: Single column grid on mobile; maintain data density with slightly reduced padding
