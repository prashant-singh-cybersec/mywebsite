(() => {
  console.log('[poc] loaded (delegated)');

  const STREET_ID = 'street-address';
  const SAVE_SELECTOR = 'button.hds-a-button--primary[aria-label="Save"]';

  // Avoid double-install
  if (window.__pocDelegatedSaveHooked) return;
  window.__pocDelegatedSaveHooked = true;

  document.addEventListener('click', (e) => {
    const saveBtn = e.target.closest?.(SAVE_SELECTOR);
    if (!saveBtn) return;

    const street = (document.getElementById(STREET_ID)?.value || '').trim();

    console.log('[poc] Save clicked on:', saveBtn);
    console.log('[poc] Street Address:', street);

    // Put your same-origin dev logging call here if needed.
    // Keep it non-blocking and don't prevent default unless required.
  }, true); // capture: run before app handlers

  console.log('[poc] delegated Save hook active ✅');
})();
