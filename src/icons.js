// Inline SVG ikonos (stroke = currentColor). Pridėti naują — papildyti šį objektą.
// Naudojamos trust badge'uose ir kituose smulkmenose.

const I = (paths) =>
  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths}</svg>`

export const ICONS = {
  shield: I('<path d="M12 3l7 3v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z"/><path d="M9 12l2 2 4-4"/>'),
  certificate: I('<circle cx="12" cy="9" r="5"/><path d="M9 13.5L8 21l4-2 4 2-1-7.5"/><path d="M10 9l1.3 1.3L14 7.5"/>'),
  clock: I('<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>'),
  thumb: I('<path d="M7 11v9H4v-9h3z"/><path d="M7 11l4-7c1.2 0 2 .9 2 2v3h4.5c1.2 0 2 1 1.8 2.2l-1.2 6c-.2 1-1 1.6-2 1.6H7"/>'),
  phone: I('<path d="M4 5c0 8 7 15 15 15l1.5-3.5-4-1.8-1.8 1.8c-2.5-1.2-4.8-3.5-6-6l1.8-1.8L8.7 5 5 5z"/>'),
  arrow: I('<path d="M5 12h14"/><path d="M13 6l6 6-6 6"/>'),
  leaf: I('<path d="M5 19c0-7 5-13 14-14 0 9-5 14-14 14z"/><path d="M5 19c2-5 5-8 9-10"/>'),
  message: I('<path d="M4 5h16v11H9l-4 3v-3H4z"/>'),
  truck: I('<path d="M3 6h11v9H3z"/><path d="M14 9h4l3 3v3h-7z"/><circle cx="7" cy="18" r="1.6"/><circle cx="17.5" cy="18" r="1.6"/>'),
  clipboard: I('<rect x="6" y="4" width="12" height="17" rx="2"/><path d="M9 4h6v3H9z"/><path d="M9 12l2 2 4-4"/>'),
  check: I('<path d="M5 12l4 4 10-10"/>'),
  mail: I('<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M4 7l8 6 8-6"/>'),
  pin: I('<path d="M12 21s7-6 7-11a7 7 0 10-14 0c0 5 7 11 7 11z"/><circle cx="12" cy="10" r="2.5"/>'),
  star: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2.5l2.9 5.9 6.5.9-4.7 4.6 1.1 6.5L12 17.8 6.2 20.9l1.1-6.5L2.6 9.3l6.5-.9L12 2.5z"/></svg>',
  facebook: I('<path d="M14 8h2V5h-2c-1.7 0-3 1.3-3 3v2H9v3h2v6h3v-6h2.2l.8-3H14v-2c0-.6.4-1 1-1z"/>'),
  instagram: I('<rect x="4" y="4" width="16" height="16" rx="4.5"/><circle cx="12" cy="12" r="3.5"/><circle cx="16.5" cy="7.5" r="0.6" fill="currentColor"/>'),
}

export const icon = (name) => ICONS[name] || ''
