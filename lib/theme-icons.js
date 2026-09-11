export function themeIcon(name) {
    const key = String(name).toLowerCase();
    const icons = {
      all: '<path d="M12 3 3 8l9 5 9-5-9-5Z"/><path d="M3 13l9 5 9-5"/><path d="M3 18l9 5 9-5"/>',
      "science fiction": '<path d="M12 2c3.5 3 5 6.5 5 10a5 5 0 0 1-10 0c0-3.5 1.5-7 5-10Z"/><circle cx="12" cy="11" r="1.6"/><path d="M8.5 17c-2 1-3 2.5-3 4 1.5 0 3-.7 4-2M15.5 17c2 1 3 2.5 3 4-1.5 0-3-.7-4-2"/>',
      fantasy: '<path d="m5 19 8-8"/><path d="M15 5.5 18.5 9"/><path d="M13 3.5 15 6l-2 2-2.5-2Z"/><path d="M19 13l.6 1.7L21 15l-1.4.8L19 17l-.6-1.7L17 15l1.4-.3Z"/><path d="M6 5l.5 1.4L8 7l-1.4.6L6 9l-.5-1.4L4 7l1.4-.3Z"/>',
      "literary fiction": '<path d="M20 4c-6 0-11 4-13 11l-2 5 5-2C17 16 20 11 20 4Z"/><path d="M12 12 5 19"/>',
      "historical fiction": '<path d="M6 3h12"/><path d="M6 21h12"/><path d="M8 3c0 5 8 5 8 9s-8 4-8 9"/><path d="M16 3c0 5-8 5-8 9s8 4 8 9"/>',
      fiction: '<path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H19a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H6.5A2.5 2.5 0 0 0 4 21.5V5.5Z"/><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>',
      novel: '<path d="M6 3h11a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z"/><path d="M11 3v8l2.5-1.9L16 11V3"/>',
      history: '<path d="M12 3 3 8h18L12 3Z"/><path d="M4 21h16"/><path d="M3 21v-2h18v2"/><path d="M6 19v-9M10 19v-9M14 19v-9M18 19v-9"/>',
      "short stories": '<path d="M9 4h8a1 1 0 0 1 1 1v10"/><rect x="4" y="7" width="12" height="14" rx="1"/><path d="M7 12h6M7 16h6"/>',
      memoir: '<rect x="4" y="3" width="16" height="18" rx="1.5"/><circle cx="12" cy="10" r="2.6"/><path d="M7.5 18c.7-2.3 2.5-3.5 4.5-3.5s3.8 1.2 4.5 3.5"/>',
      "islamic fiqh": '<path d="M2 21h20"/><path d="M3.5 21V10"/><path d="M2.7 10a.8.8 0 0 1 1.6 0"/><path d="M20.5 21V10"/><path d="M19.7 10a.8.8 0 0 1 1.6 0"/><path d="M6 21V12h12v9"/><path d="M8 12c0-2.2 1.8-4 4-4s4 1.8 4 4"/><path d="M12 8V5.2"/><path d="M10.9 4.1a1.15 1.15 0 1 0 1.7 1.7"/><path d="M10.4 21v-4a1.6 1.6 0 0 1 3.2 0v4"/>',
    };
    const path = icons[key] || icons.fiction;
    return '<svg viewBox="0 0 24 24" aria-hidden="true">' + path + "</svg>";
  }
