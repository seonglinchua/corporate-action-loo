# Corporate Action Lookup Engine - Design System

**Version:** 1.0
**Inspired by:** Maybank2u.com.sg Aesthetic
**Last Updated:** 2025-11-14

---

## Table of Contents

1. [Design Philosophy](#design-philosophy)
2. [Design Tokens](#design-tokens)
3. [Color Palette](#color-palette)
4. [Typography](#typography)
5. [Spacing & Layout](#spacing--layout)
6. [Shadows & Elevations](#shadows--elevations)
7. [Component Guidelines](#component-guidelines)
8. [Layout Patterns](#layout-patterns)
9. [Interaction Patterns](#interaction-patterns)
10. [Best Practices](#best-practices)

---

## Design Philosophy

The Corporate Action Lookup Engine design system embodies principles of **trust, clarity, and precision** inspired by Maybank2u.com.sg—a leading financial institution's digital platform known for:

- **Professional Credibility**: Conservative color palette emphasizing stability and trust
- **Crystal Clear Hierarchy**: Distinct visual separation between information levels
- **Accessibility First**: WCAG AA compliant with high contrast ratios
- **Data Clarity**: Optimized visualization for financial data and complex reconciliation workflows
- **Responsive & Performant**: Built for both desktop and tablet enterprise environments
- **Dark Mode Ready**: Seamless theming support for extended work sessions

### Core Principles

1. **Trust Through Simplicity** - Remove unnecessary complexity while maintaining sophistication
2. **Precision Over Decoration** - Every visual element serves a functional purpose
3. **Consistent Interactions** - Predictable patterns across all features
4. **Financial Data First** - Design optimized for numbers, tables, and data visualization
5. **Enterprise Focus** - Designed for 1920x1080+ displays with professional workflows

---

## Design Tokens

Design tokens are the atomic units of our design system, defining consistent values across the application.

### Token Structure

```
Category: token-name
Value: [actual value]
Tailwind Class: [if applicable]
CSS Variable: --[category]-[name]
```

---

## Color Palette

### Primary Colors

**Deep Navy Blue** (Primary - Trust & Stability)
- Used for headers, primary actions, and key information
- Conveys financial security and professional authority

```
Neutral 900: #0F172A
RGB: (15, 23, 42)
Tailwind: slate-900
CSS Variable: --color-primary
Usage: Page headers, primary buttons, active navigation
Contrast Ratio: 21:1 (WCAG AAA with white)
```

**Deep Blue** (Secondary Primary)
```
Neutral 950: #020617
RGB: (2, 6, 23)
Tailwind: slate-950
CSS Variable: --color-primary-dark
Usage: Dark mode primary, emphasis text
Contrast Ratio: 24:1 (WCAG AAA with white)
```

### Accent Colors

**Professional Blue** (Action & Interactive)
- Used for links, interactive elements, and call-to-action buttons
- Conveys confidence and forward movement

```
Blue 600: #2563EB
RGB: (37, 99, 235)
Tailwind: blue-600
CSS Variable: --color-accent
Usage: Links, primary CTA buttons, active states
Contrast Ratio: 7.7:1 (WCAG AA with white)
Hover: Blue 700 (#1D4ED8)
Active: Blue 800 (#1E40AF)
```

**Emerald Green** (Success & Confirmation)
```
Emerald 600: #059669
RGB: (5, 150, 105)
Tailwind: emerald-600
CSS Variable: --color-success
Usage: Success states, approved status, positive indicators
Contrast Ratio: 5.8:1 (WCAG AA with white)
```

**Amber** (Warning & Caution)
```
Amber 500: #F59E0B
RGB: (245, 158, 11)
Tailwind: amber-500
CSS Variable: --color-warning
Usage: Warnings, pending status, attention required
Contrast Ratio: 4.1:1 (WCAG AA with black)
```

**Red** (Error & Critical)
```
Red 600: #DC2626
RGB: (220, 38, 38)
Tailwind: red-600
CSS Variable: --color-error
Usage: Errors, conflicts, critical alerts
Contrast Ratio: 5.9:1 (WCAG AA with white)
```

### Neutral/Gray Colors (Supporting)

**Cool Gray Palette** (Professional Background)
```
Slate 50:   #F8FAFC (Background - Light)
Slate 100:  #F1F5F9 (Subtle background)
Slate 200:  #E2E8F0 (Borders, dividers)
Slate 300:  #CBD5E1 (Secondary borders)
Slate 400:  #94A3B8 (Disabled text, placeholders)
Slate 500:  #64748B (Secondary text)
Slate 600:  #475569 (Body text)
Slate 700:  #334155 (Strong text)
Slate 800:  #1E293B (Headings)
```

### Semantic Colors

| Semantic | Color | Use Case |
|----------|-------|----------|
| **Success** | Emerald 600 | Approved, reconciled, synced |
| **Warning** | Amber 500 | Pending, requires review, attention |
| **Error** | Red 600 | Conflict, failure, critical issue |
| **Info** | Blue 500 | Information, help, neutral status |
| **Neutral** | Slate 500 | Inactive, disabled, placeholder |

### Color Accessibility

- **All interactive elements** have 7:1+ contrast ratio (WCAG AAA)
- **Text and backgrounds** have 4.5:1+ contrast ratio (WCAG AA)
- **No color-only information** - all colored states include icons or text labels
- **Colorblind-friendly** - status indicators use patterns in addition to color

---

## Typography

### Font Families

**Primary Font Stack**
```css
font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
```
- System fonts for performance and familiarity
- Fallback chain ensures consistent rendering across platforms

**Monospace Font Stack** (Financial Data)
```css
font-family: 'Menlo', 'Monaco', 'Courier New', monospace;
```
- Used for identifiers, ISINs, codes, numerical tables
- Ensures proper alignment of financial figures

### Font Sizes & Scales

**Type Scale** (Modular scale 1.25 ratio)

```
Display XL:  48px / 3rem  (line-height: 1.1)   - Page titles, large headers
Display LG:  40px / 2.5rem (line-height: 1.1)  - Major section headings
Display MD:  32px / 2rem   (line-height: 1.2)  - Section headers
Display SM:  28px / 1.75rem (line-height: 1.2)

Heading 1:   24px / 1.5rem (line-height: 1.3)  - Page section headers
Heading 2:   20px / 1.25rem (line-height: 1.4)
Heading 3:   18px / 1.125rem (line-height: 1.4)
Heading 4:   16px / 1rem   (line-height: 1.5)

Body Large:  16px / 1rem   (line-height: 1.5)  - Primary body text
Body Base:   14px / 0.875rem (line-height: 1.5)
Body Small:  13px / 0.8125rem (line-height: 1.6)

Caption:     12px / 0.75rem (line-height: 1.6)  - Labels, captions
Label:       11px / 0.6875rem (line-height: 1.6)
```

### Font Weights

```
Thin:       100  (rarely used, accessibility concern)
Extra Light: 200
Light:      300  (secondary text, descriptions)
Normal:     400  (body text, default)
Medium:     500  (labels, emphasis)
Semi Bold:  600  (headings, strong emphasis)
Bold:       700  (headings, key information)
Extra Bold: 800  (display text, high emphasis)
Black:      900  (rare, maximum emphasis)
```

### Typography Guidelines

**Headings**
- Use `font-weight: 600` (semi-bold) for clean hierarchy
- Maintain consistent line-height for readability: 1.2-1.3

**Body Text**
- Default size: 14px (smaller for financial data density)
- Line-height: 1.5 for readability
- Color: Slate 600 (#475569)
- Max line length: 65-75 characters for readability

**Data/Code**
- Monospace font for identifiers and codes
- Size: 13px or 12px depending on density
- Color: Slate 700 for better contrast

**Interactive Elements**
- Button text: 14px, semi-bold (600)
- Link text: Underline on hover
- Form labels: 13px, medium (500), above input

---

## Spacing & Layout

### Spacing Scale

Built on an 8px base unit for consistency (inspired by Material Design):

```
Spacing Scale:
xs:   4px  / 0.25rem
sm:   8px  / 0.5rem
md:   12px / 0.75rem
base: 16px / 1rem
lg:   24px / 1.5rem
xl:   32px / 2rem
2xl:  48px / 3rem
3xl:  64px / 4rem
4xl:  96px / 6rem
```

### Component Spacing

**Button Padding**
```
Padding: 10px 16px (vertical x horizontal)
Font: 14px, semi-bold
Minimum touch target: 44px height
```

**Card Padding**
```
Padding: 24px (1.5rem)
Border Radius: 8px
Gap between cards: 16px
```

**Form Fields**
```
Padding: 10px 12px
Height: 40px
Border: 1px, Slate 200
Focus: 2px solid Blue 500
Border Radius: 6px
```

**List Items**
```
Padding: 12px 16px (vertical x horizontal)
Gap: 0px
Min height: 48px (accessibility)
Hover background: Slate 50
```

### Grid & Layout

**Desktop Layout** (1920px+)
```
Max Content Width: 1600px
Margin: auto (horizontal centering)
Padding: 0 32px (outer gutter)
Column Gap: 24px
Row Gap: 24px
```

**Tablet Layout** (768px - 1919px)
```
Max Content Width: 100% - 64px
Padding: 0 24px
Column Gap: 16px
Row Gap: 16px
```

**Sidebar Navigation**
```
Width: 280px (fixed)
Collapse to mobile menu at 768px
Mobile sidebar: 100% width, overlay
```

---

## Shadows & Elevations

### Shadow System

Shadows create depth and visual hierarchy. Use sparingly for financial data clarity.

```css
/* Elevation 1: Subtle elevation (cards) */
box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1),
            0 1px 2px 0 rgba(0, 0, 0, 0.06);

/* Elevation 2: Card hover, dropdowns */
box-shadow: 0 4px 6px 0 rgba(0, 0, 0, 0.1),
            0 2px 4px 0 rgba(0, 0, 0, 0.06);

/* Elevation 3: Modals, popover */
box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
            0 4px 6px 0 rgba(0, 0, 0, 0.05);

/* Elevation 4: Important modals, floating elements */
box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
            0 10px 10px 0 rgba(0, 0, 0, 0.04);
```

### Border System

**Default Borders**
```
Border Width: 1px
Color: Slate 200 (#E2E8F0)
Radius: 6px (input, button) | 8px (card)
```

**Focus Borders** (Accessibility)
```
Border Width: 2px
Color: Blue 500 (#3B82F6)
Outline: none (handled by border)
```

---

## Component Guidelines

### Buttons

**Primary Button**
- Background: Blue 600
- Text: White, 14px semi-bold
- Padding: 10px 16px
- Border Radius: 6px
- Hover: Blue 700
- Active: Blue 800
- Disabled: Slate 200 background, Slate 400 text
- Min width: 120px

**Secondary Button**
- Background: Slate 100
- Text: Slate 700, 14px semi-bold
- Border: 1px Slate 200
- Padding: 10px 16px
- Border Radius: 6px
- Hover: Slate 200 background
- Active: Slate 300 background

**Danger Button**
- Background: Red 600
- Text: White
- Hover: Red 700
- Usage: Delete, major destructive actions

### Form Inputs

**Text Input**
- Height: 40px
- Padding: 10px 12px
- Border: 1px Slate 200
- Border Radius: 6px
- Focus: 2px Blue 500 border
- Placeholder: Slate 400
- Disabled: Slate 50 background

**Select Dropdown**
- Height: 40px
- Same styling as text input
- Icon: Chevron down (Slate 400)

**Checkbox & Radio**
- Size: 16x16px
- Border: 1px Slate 200
- Checked: Blue 600 background
- Border Radius: 2px (checkbox), 50% (radio)

**Textarea**
- Min Height: 100px
- Resize: Vertical only
- Same border/focus styling as text input

### Cards

**Standard Card**
- Padding: 24px
- Border: 1px Slate 200
- Border Radius: 8px
- Shadow: Elevation 1
- Hover: Slate 50 background, Elevation 2 shadow
- Gap between cards: 16px

**Data Card** (for numbers, metrics)
- Padding: 20px
- Heading: 13px semi-bold, Slate 600
- Value: 32px bold, Slate 900
- Subtext: 12px, Slate 500

### Tables

**Header Row**
- Background: Slate 50
- Text: 12px semi-bold, Slate 700
- Padding: 12px 16px
- Border bottom: 1px Slate 200

**Body Row**
- Padding: 12px 16px
- Border bottom: 1px Slate 100
- Text: 14px, Slate 600
- Min height: 48px

**Hover Row**
- Background: Slate 50
- Smooth transition (200ms)

**Striped Rows** (optional)
- Alternate Slate 50 background

### Badges & Status Indicators

**Success Badge**
- Background: Emerald 50 (#F0FDF4)
- Text: Emerald 700, 12px semi-bold
- Border: 1px Emerald 200
- Padding: 4px 8px
- Border Radius: 4px
- Icon: Check circle

**Warning Badge**
- Background: Amber 50
- Text: Amber 700, 12px semi-bold
- Border: 1px Amber 200
- Padding: 4px 8px

**Error Badge**
- Background: Red 50
- Text: Red 700, 12px semi-bold
- Border: 1px Red 200
- Padding: 4px 8px

**Neutral Badge**
- Background: Slate 100
- Text: Slate 700, 12px semi-bold
- Border: 1px Slate 200
- Padding: 4px 8px

### Navigation

**Sidebar Navigation**
- Width: 280px
- Item height: 44px
- Item padding: 12px 16px
- Active item: Blue 600 background, White text
- Hover item: Slate 100 background
- Text: 14px semi-bold
- Icon: 20x20px, leading

**Breadcrumbs**
- Text: 13px, Slate 600
- Separator: "/" (Slate 400)
- Last item: Bold, Slate 900
- Spacing: 4px around separator

### Modals & Dialogs

**Modal Container**
- Max width: 500px (standard), 600px (large)
- Backdrop: rgba(0, 0, 0, 0.5)
- Border Radius: 8px
- Shadow: Elevation 4
- Padding: 28px
- Gap between button: 12px

**Modal Header**
- Font: 20px semi-bold
- Color: Slate 900
- Margin bottom: 16px
- Close button: top-right, X icon

**Modal Footer**
- Margin top: 24px
- Button gap: 12px
- Primary button on right

### Alerts & Notifications

**Alert Container**
- Padding: 16px
- Border left: 4px colored border
- Border radius: 6px
- Icon: 20x20px
- Gap icon-text: 12px

**Alert Variants**
```
Success: Emerald 50 bg, Emerald 800 left border, Emerald icon
Warning: Amber 50 bg, Amber 600 left border, Amber icon
Error:   Red 50 bg, Red 600 left border, Red icon
Info:    Blue 50 bg, Blue 600 left border, Blue icon
```

---

## Layout Patterns

### Page Layout

**Standard Page Structure**
```
┌─────────────────────────────────────────┐
│  Header (Navigation Bar)                │ 40px
├──────┬──────────────────────────────────┤
│      │                                  │
│ Side │  Main Content Area               │
│ Nav  │  (max 1600px, centered)         │
│ 280px│                                  │
│      │                                  │
└──────┴──────────────────────────────────┘
```

**Content Grid**
- Main content area: max 1600px
- Horizontal padding: 32px on desktop, 24px on tablet
- Sidebar stays fixed at 280px

### Dashboard Layout Pattern

```
┌────────────────────────────────┐
│ Page Title & Actions           │ 24px padding
├────────────────────────────────┤
│ KPI Cards (4 columns)          │ 16px gap
├────────────────────────────────┤
│ Charts Section (2 columns)     │ 16px gap
├────────────────────────────────┤
│ Table / Data Grid              │ Full width
└────────────────────────────────┘
```

### Form Layout Pattern

```
┌──────────────────────────────────┐
│ Form Title                       │ 20px semi-bold
├──────────────────────────────────┤
│ [Label]                          │ 13px semi-bold, margin-bottom: 8px
│ [Input Field]                    │ 40px height, full width
│                                  │ margin-bottom: 20px
├──────────────────────────────────┤
│ [Primary Button] [Secondary]     │ Right-aligned, 12px gap
└──────────────────────────────────┘
```

### Data List Pattern

```
┌──────────────────────────────────┐
│ [Search] [Filters] [Actions]     │ 16px padding
├──────────────────────────────────┤
│ Column Header | Column Header     │ 12px semi-bold, Slate 700
├──────────────────────────────────┤
│ Data Row                         │ 48px min height
│ Data Row                         │
│ Data Row                         │
├──────────────────────────────────┤
│ Pagination / Load More           │
└──────────────────────────────────┘
```

---

## Interaction Patterns

### Hover States

**Interactive Elements**
- Duration: 200ms ease-in-out
- Button: Change background color
- Card: Lift shadow + slight background shift
- Link: Underline appears (if not already present)
- Table row: Subtle background color

### Focus States

**Keyboard Navigation**
- Focus outline: 2px Blue 500
- Outline offset: 2px
- All interactive elements must be focusable
- Tab order: logical, top-to-bottom

### Active/Selected States

**Buttons**
- Background: Darker shade of button color
- Slight inset shadow for depth

**Sidebar Navigation**
- Selected item: Blue 600 background, White text
- Active indicator line: Left border (4px Blue 600)

**Table Rows**
- Selectable rows: Checkbox on left
- Selected row: Light blue background
- Hover: Darker shade of background

### Loading States

**Skeleton Loaders**
- Color: Slate 200
- Animation: Pulse (opacity 0.5 → 1 → 0.5)
- Duration: 2s infinite

**Spinners**
- Color: Blue 600
- Size: 24px (standard), 32px (large)
- Animation: Smooth rotation (1s linear infinite)

### Error States

**Invalid Form Fields**
- Border: 2px Red 600
- Helper text: 12px Red 700 (below input)
- Icon: Alert circle (Red 600) inside input

**Data Errors**
- Alert banner: Red 50 background, Red 600 text
- Icon: Alert icon
- Action button: "Retry" or "Dismiss"

---

## Best Practices

### General Principles

1. **Hierarchy First**
   - Use size, weight, and color to establish clear visual hierarchy
   - Most important information should be most visually prominent

2. **Whitespace is Content**
   - Use spacing to group related information
   - Don't cram information to save space

3. **Consistent Interactions**
   - Same elements behave identically across pages
   - Users should predict interactions based on patterns

4. **Accessibility Always**
   - Test with keyboard navigation
   - Check color contrast with WCAG AA minimum 4.5:1
   - Provide text labels for all icons

5. **Financial Data Clarity**
   - Use monospace fonts for codes and numbers
   - Use tables for multi-column comparisons
   - Highlight key metrics visually

### Typography Best Practices

- **Don't mix too many font sizes** - stick to the scale
- **Keep line length 65-75 characters** for body text
- **Use semi-bold for headings**, not all caps
- **Monospace for codes, ISINs, ticker symbols**
- **Sufficient line-height** (1.5) for readability

### Color Best Practices

- **Color is not the only indicator** - use icons and text too
- **Test color contrast** with browser tools
- **Dark mode consideration** - ensure colors work in both modes
- **Limit primary colors** to 1-2, use accents sparingly
- **Respect user preferences** - honor prefers-color-scheme

### Layout Best Practices

- **Mobile-first thinking** - even for desktop-focused apps
- **Consistent gutters** - use spacing scale consistently
- **Clear focus order** - logical tab order for keyboard navigation
- **Sufficient touch targets** - minimum 44px for interactive elements
- **Responsive images** - use srcset and appropriate sizing

### Component Best Practices

- **Progressive disclosure** - hide advanced options by default
- **Consistent button placement** - Primary on right, Secondary on left
- **Meaningful button text** - "Delete Conflict" not just "Delete"
- **Form field grouping** - related fields close together
- **Error prevention** - confirmations for destructive actions

### Performance Considerations

- **Minimize shadows** - use elevation 1-2 for most elements
- **System fonts** - load faster than custom fonts
- **CSS classes** - reuse Tailwind classes instead of custom CSS
- **Icon optimization** - use SVG and minimal file sizes
- **Animation timing** - keep transitions under 300ms

---

## Implementation Checklist

When implementing components, ensure:

- [ ] Color contrast meets WCAG AA (4.5:1 minimum)
- [ ] Component uses consistent spacing scale
- [ ] Interactive elements have hover/focus/active states
- [ ] Keyboard navigation works (Tab, Enter, Escape)
- [ ] Mobile/tablet responsive (if applicable)
- [ ] Dark mode styling tested
- [ ] Component matches typography scale
- [ ] Icons are 20x20px or 24x24px standard
- [ ] Padding uses 8px scale multiples
- [ ] Loading/error states defined

---

## Design System Tokens Reference

### Tailwind Configuration

See `tailwind.config.js` for Tailwind class mappings:

```javascript
// Primary colors
slate-50 through slate-950
blue-500, blue-600, blue-700, blue-800

// Semantic colors
emerald-600 (success)
amber-500 (warning)
red-600 (error)
blue-600 (info/primary)

// Spacing
px-3 through px-8 (4px increments)
py-2 through py-6 (4px increments)

// Typography
text-xs through text-2xl
font-normal, font-medium, font-semibold, font-bold

// Shadows
shadow (elevation 1)
shadow-md (elevation 2)
shadow-lg (elevation 3)
shadow-xl (elevation 4)
```

### CSS Variables

Available CSS variables (for dynamic theming):

```css
--color-primary: #0F172A
--color-primary-dark: #020617
--color-accent: #2563EB
--color-success: #059669
--color-warning: #F59E0B
--color-error: #DC2626
--color-text-primary: #0F172A
--color-text-secondary: #475569
--color-bg-primary: #FFFFFF
--color-bg-secondary: #F8FAFC
--color-border: #E2E8F0
```

---

## Future Enhancements

- [ ] Dark mode color variations
- [ ] Animated transitions library
- [ ] Motion guidelines for Framer Motion
- [ ] Chart styling standards (Recharts)
- [ ] Data visualization patterns
- [ ] Accessibility audit checklist
- [ ] Component Storybook documentation
- [ ] Icon naming and usage guidelines
- [ ] Responsive breakpoint details
- [ ] Print styles for reports

---

## References & Resources

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Tailwind CSS Documentation](https://tailwindcss.com)
- [Radix UI Accessibility](https://www.radix-ui.com/docs/primitives/overview/accessibility)
- [shadcn/ui Components](https://ui.shadcn.com)
- [Material Design Spacing](https://material.io/design/layout/spacing-methods.html)
- [Maybank2u.com.sg](https://www.maybank2u.com.sg) - Inspiration

---

## Questions & Support

For design system questions or contributions, please:

1. Check existing components in `/src/components/ui/`
2. Review component examples in pages
3. Test accessibility with keyboard navigation
4. Verify Tailwind classes match the design tokens

**Last Updated:** 2025-11-14
**Maintained By:** Corporate Action Lookup Team
