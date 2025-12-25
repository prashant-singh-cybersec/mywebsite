(() => {
  console.log('[poc] loaded');

  const FORM_ID = 'add-new-card';
  const STREET_ID = 'street-address';
  const SAVE_SELECTOR = 'button.hds-a-button--primary[aria-label="Save"]';

  function tryHook() {
    const form = document.getElementById(FORM_ID);
    const street = document.getElementById(STREET_ID);
    const saveBtn = document.querySelector(SAVE_SELECTOR);

    console.log('[poc] tryHook:', {
      form: !!form,
      street: !!street,
      saveBtn: !!saveBtn
    });

    // If form isn't present yet, keep waiting
    if (!form || !street || !saveBtn) return false;

    // Avoid double-binding if the modal re-renders
    if (saveBtn.dataset.pocHooked === '1') return true;
    saveBtn.dataset.pocHooked = '1';

    // Capture-phase to run before most app handlers
    saveBtn.addEventListener(
      'click',
      (e) => {
        const streetVal = (document.getElementById(STREET_ID)?.value || '').trim();
        console.log('[poc] Save clicked. street=', streetVal);

        // Do NOT block the app’s normal flow here.
        // Just observe for now.
      },
      true
    );

    console.log('[poc] Hooked Save button successfully ✅');
    return true;
  }

  // 1) Try immediately (in case already present)
  if (tryHook()) return;

  // 2) Watch DOM changes until the form shows up (modal open, SPA route, etc.)
  const obs = new MutationObserver(() => {
    if (tryHook()) {
      // Once hooked, you can keep observing (if modal re-renders),
      // or disconnect to reduce noise. I’ll keep it connected lightly:
      // obs.disconnect();
    }
  });

  obs.observe(document.documentElement, { childList: true, subtree: true });
  console.log('[poc] Waiting for form to appear (MutationObserver armed)…');
})();
