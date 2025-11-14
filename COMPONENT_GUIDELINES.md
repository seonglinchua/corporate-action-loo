# Component Guidelines - Corporate Action Lookup Engine

Quick reference for implementing components following the design system.

---

## Button Component

### Primary Button (CTA)
Use for main actions and primary calls-to-action.

```tsx
<button className="bg-blue-600 text-white px-4 py-2.5 rounded text-sm font-semibold hover:bg-blue-700 active:bg-blue-800 disabled:bg-slate-200 disabled:text-slate-400">
  Primary Action
</button>
```

**Tailwind Classes:**
- Background: `bg-blue-600`
- Hover: `hover:bg-blue-700`
- Active: `active:bg-blue-800`
- Disabled: `disabled:bg-slate-200 disabled:text-slate-400`
- Text: `text-white text-sm font-semibold`
- Padding: `px-4 py-2.5`
- Min width: `min-w-30`

### Secondary Button
Use for less critical actions and alternatives.

```tsx
<button className="bg-slate-100 text-slate-700 border border-slate-200 px-4 py-2.5 rounded text-sm font-semibold hover:bg-slate-200 active:bg-slate-300">
  Secondary
</button>
```

### Danger Button
Use for destructive actions (delete, remove).

```tsx
<button className="bg-red-600 text-white px-4 py-2.5 rounded text-sm font-semibold hover:bg-red-700 active:bg-red-800">
  Delete
</button>
```

---

## Form Input

### Text Input Field
```tsx
<div className="mb-5">
  <label className="block text-xs font-medium text-slate-700 mb-2">Label</label>
  <input
    type="text"
    placeholder="Placeholder text"
    className="w-full px-3 py-2.5 border border-slate-200 rounded text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100 disabled:bg-slate-50 disabled:text-slate-400"
  />
</div>
```

**Key Points:**
- Height: `h-10` (40px)
- Label: `text-xs font-medium text-slate-700 mb-2`
- Focus state: `focus:border-blue-500 focus:ring-2 focus:ring-blue-100`
- Disabled: `disabled:bg-slate-50`

### Select Dropdown
```tsx
<div>
  <label className="block text-xs font-medium text-slate-700 mb-2">Select</label>
  <select className="w-full px-3 py-2.5 border border-slate-200 rounded text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100 disabled:bg-slate-50">
    <option>Option 1</option>
    <option>Option 2</option>
  </select>
</div>
```

### Checkbox
```tsx
<label className="flex items-center gap-2">
  <input
    type="checkbox"
    className="w-4 h-4 border border-slate-200 rounded checked:bg-blue-600 checked:border-blue-600 cursor-pointer"
  />
  <span className="text-sm text-slate-700">Checkbox label</span>
</label>
```

---

## Card Component

### Standard Card
```tsx
<div className="p-6 border border-slate-200 rounded-lg bg-white shadow-sm hover:shadow-md hover:bg-slate-50 transition-all">
  <h3 className="text-lg font-semibold text-slate-900 mb-2">Card Title</h3>
  <p className="text-sm text-slate-600">Card content goes here</p>
</div>
```

### Data Card (Metric)
```tsx
<div className="p-5 border border-slate-200 rounded-lg bg-white shadow-sm">
  <p className="text-xs font-medium text-slate-600 mb-2">Metric Label</p>
  <p className="text-4xl font-bold text-slate-900 mb-1">1,234</p>
  <p className="text-xs text-slate-500">+5.2% from last month</p>
</div>
```

---

## Table Component

### Table Structure
```tsx
<div className="border border-slate-200 rounded-lg overflow-hidden">
  <table className="w-full">
    <thead>
      <tr className="bg-slate-50 border-b border-slate-200">
        <th className="px-4 py-3 text-left text-xs font-semibold text-slate-700">Column 1</th>
        <th className="px-4 py-3 text-left text-xs font-semibold text-slate-700">Column 2</th>
        <th className="px-4 py-3 text-right text-xs font-semibold text-slate-700">Amount</th>
      </tr>
    </thead>
    <tbody>
      <tr className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
        <td className="px-4 py-3 text-sm text-slate-600">Row Data</td>
        <td className="px-4 py-3 text-sm text-slate-600">Row Data</td>
        <td className="px-4 py-3 text-sm text-slate-600 text-right font-mono">1,234.56</td>
      </tr>
    </tbody>
  </table>
</div>
```

---

## Badge/Status Component

### Success Badge
```tsx
<span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 rounded">
  ✓ Approved
</span>
```

### Warning Badge
```tsx
<span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-semibold text-amber-700 bg-amber-50 border border-amber-200 rounded">
  ⚠ Pending
</span>
```

### Error Badge
```tsx
<span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-semibold text-red-700 bg-red-50 border border-red-200 rounded">
  ✕ Error
</span>
```

### Info Badge
```tsx
<span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-semibold text-blue-700 bg-blue-50 border border-blue-200 rounded">
  ℹ Info
</span>
```

---

## Alert/Notification Component

### Alert Container
```tsx
<div className="p-4 border-l-4 border-emerald-600 bg-emerald-50 rounded text-sm text-emerald-900">
  <div className="flex gap-3">
    <span className="text-lg">✓</span>
    <div>
      <p className="font-semibold">Success!</p>
      <p className="text-emerald-800">Your action was completed successfully.</p>
    </div>
  </div>
</div>
```

**Color Classes by Type:**
- Success: `border-emerald-600 bg-emerald-50 text-emerald-900`
- Warning: `border-amber-600 bg-amber-50 text-amber-900`
- Error: `border-red-600 bg-red-50 text-red-900`
- Info: `border-blue-600 bg-blue-50 text-blue-900`

---

## Modal/Dialog Component

### Modal Wrapper
```tsx
{isOpen && (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
    <div className="bg-white rounded-lg shadow-2xl max-w-md w-full mx-4 p-7">
      <h2 className="text-xl font-semibold text-slate-900 mb-4">Dialog Title</h2>
      <p className="text-sm text-slate-600 mb-6">Dialog content and description</p>
      <div className="flex gap-3 justify-end">
        <button className="px-4 py-2.5 text-slate-700 bg-slate-100 hover:bg-slate-200 rounded text-sm font-semibold">
          Cancel
        </button>
        <button className="px-4 py-2.5 text-white bg-blue-600 hover:bg-blue-700 rounded text-sm font-semibold">
          Confirm
        </button>
      </div>
    </div>
  </div>
)}
```

---

## Typography Classes

### Headings
```tsx
<h1 className="text-3xl font-semibold text-slate-900">Display XL (48px)</h1>
<h2 className="text-2xl font-semibold text-slate-900">Heading 1 (24px)</h2>
<h3 className="text-xl font-semibold text-slate-900">Heading 2 (20px)</h3>
<h4 className="text-lg font-semibold text-slate-900">Heading 3 (18px)</h4>
```

### Body Text
```tsx
<p className="text-base text-slate-600">Body Large (16px)</p>
<p className="text-sm text-slate-600">Body (14px) - default</p>
<p className="text-xs text-slate-600">Body Small (13px)</p>
```

### Labels & Captions
```tsx
<label className="text-xs font-medium text-slate-700">Label (11px semi-bold)</label>
<p className="text-xs text-slate-500">Caption (12px)</p>
```

### Financial Data
```tsx
<span className="font-mono text-sm">ISIN1234567890</span>
<span className="font-mono text-xs">1,234,567.89</span>
```

---

## Spacing & Layout Utilities

### Padding Scales (4px multiples)
```
px-1 = 4px     | py-1 = 4px
px-2 = 8px     | py-2 = 8px
px-3 = 12px    | py-3 = 12px
px-4 = 16px    | py-4 = 16px
px-6 = 24px    | py-6 = 24px
px-8 = 32px    | py-8 = 32px
```

### Gap Scales
```
gap-1 = 4px
gap-2 = 8px
gap-3 = 12px
gap-4 = 16px
gap-6 = 24px
gap-8 = 32px
```

### Margin Scales
```
mb-2 = 8px     | mt-2 = 8px
mb-3 = 12px    | mt-3 = 12px
mb-4 = 16px    | mt-4 = 16px
mb-6 = 24px    | mt-6 = 24px
```

---

## Color Reference (Tailwind Classes)

### Primary Colors
```
Text:        text-slate-900, text-slate-700, text-slate-600
Background:  bg-slate-900, bg-slate-50
Borders:     border-slate-200, border-slate-300
```

### Interactive
```
Primary:     bg-blue-600, hover:bg-blue-700, text-white
Secondary:   bg-slate-100, hover:bg-slate-200, border border-slate-200
```

### Semantic
```
Success:     text-emerald-700, bg-emerald-50, border-emerald-200
Warning:     text-amber-700, bg-amber-50, border-amber-200
Error:       text-red-700, bg-red-50, border-red-200
Info:        text-blue-700, bg-blue-50, border-blue-200
```

---

## Responsive Breakpoints

```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
  {/* Single column on mobile, 2 on tablet, 4 on desktop */}
</div>
```

**Tailwind Breakpoints:**
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1536px

---

## Focus & Accessibility

### Focus States
```tsx
<button className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
  Focusable Element
</button>
```

### Skip to Content Link
```tsx
<a href="#main" className="absolute -top-full left-0 bg-blue-600 text-white px-4 py-2 focus:static">
  Skip to main content
</a>
```

### ARIA Labels
```tsx
<button aria-label="Close dialog" onClick={closeDialog}>
  ✕
</button>

<input
  aria-label="Search securities"
  placeholder="Search..."
/>

<div role="alert" className="p-4 bg-red-50 text-red-700">
  Error message here
</div>
```

---

## Common Patterns

### Search Bar
```tsx
<div className="flex items-center gap-2 px-3 py-2 border border-slate-200 rounded bg-white">
  <SearchIcon className="w-5 h-5 text-slate-400" />
  <input
    type="text"
    placeholder="Search..."
    className="flex-1 outline-none text-sm"
  />
</div>
```

### Pagination
```tsx
<div className="flex items-center gap-1 justify-center py-4">
  <button className="px-2 py-1 border rounded text-sm hover:bg-slate-50">← Previous</button>
  {Array.from({length: 5}).map((_, i) => (
    <button
      key={i}
      className={`px-3 py-1 rounded text-sm ${i === 0 ? 'bg-blue-600 text-white' : 'border hover:bg-slate-50'}`}
    >
      {i + 1}
    </button>
  ))}
  <button className="px-2 py-1 border rounded text-sm hover:bg-slate-50">Next →</button>
</div>
```

### Filter Bar
```tsx
<div className="flex gap-3 flex-wrap p-4 bg-slate-50 border-b border-slate-200">
  <select className="px-3 py-2 border border-slate-200 rounded text-sm">
    <option>Filter by Type</option>
  </select>
  <input type="date" className="px-3 py-2 border border-slate-200 rounded text-sm" />
  <button className="px-4 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700">
    Apply
  </button>
</div>
```

---

## Implementation Checklist

- [ ] Component uses correct spacing scale (multiples of 4px)
- [ ] Text has proper contrast ratio (4.5:1 minimum)
- [ ] Interactive elements are 44px+ in size
- [ ] Focus states are visible and keyboard accessible
- [ ] Colors follow semantic naming (success/warning/error)
- [ ] Typography matches the design scale
- [ ] Component is responsive if needed
- [ ] ARIA labels added for screen readers
- [ ] Hover/active states defined
- [ ] Component tested in light and dark modes (if applicable)

---

## Useful Tailwind Utilities

```
Flex utilities:    flex, flex-col, items-center, justify-between
Grid utilities:    grid, grid-cols-4, gap-4
Sizing:            w-full, h-10, max-w-md
Display:           hidden, md:block, lg:flex
Positioning:       absolute, fixed, relative
Overflow:          overflow-hidden, overflow-auto
```

---

**Last Updated:** 2025-11-14
**Design System Version:** 1.0
