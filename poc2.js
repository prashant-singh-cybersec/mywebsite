(() => {
  console.log('[poc] loaded');

  const FORM_ID = 'add-new-card';
  const STREET_ID = 'street-address';
  const SAVE_SELECTOR = 'button.hds-a-button--primary[aria-label="Save"]';

  function hook() {
    const form = document.getElementById(FORM_ID);
    const streetInput = document.getElementById(STREET_ID);
    const saveBtn = document.querySelector(SAVE_SELECTOR);

    if (!form || !streetInput || !saveBtn) return false;

    if (saveBtn.dataset.pocHooked === '1') return true;
    saveBtn.dataset.pocHooked = '1';

    saveBtn.addEventListener(
      'click',
      () => {
        const streetValue = streetInput.value.trim();

        console.log('[poc] Save clicked');
        console.log('[poc] Street Address:', streetValue);

        // ✅ Place your dev webhook call here if needed
        // fetch('/dev/webhook', { ... })
      },
      true // capture → runs before framework handler
    );

    console.log('[poc] Save hook active');
    return true;
  }

  if (hook()) return;

  const observer = new MutationObserver(() => hook());
  observer.observe(document.documentElement, {
    childList: true,
    subtree: true
  });
})();
