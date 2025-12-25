(() => {
  console.log('[poc] loaded (log all fields)');

  const FORM_ID = 'add-new-card';
  const SAVE_SELECTOR = 'button.hds-a-button--primary[aria-label="Save"]';

  if (window.__pocAllFieldsHooked) return;
  window.__pocAllFieldsHooked = true;

  document.addEventListener(
    'click',
    (e) => {
      const saveBtn = e.target.closest?.(SAVE_SELECTOR);
      if (!saveBtn) return;

      const form = document.getElementById(FORM_ID);
      if (!form) {
        console.warn('[poc] form not found');
        return;
      }

      const data = {};

      // Grab all relevant form controls
      form.querySelectorAll('input, select, textarea').forEach((el) => {
        if (!el.name && !el.id) return;

        const key = el.name || el.id;

        // Handle different input types safely
        if (el.type === 'checkbox') {
          data[key] = el.checked;
        } else if (el.type === 'radio') {
          if (el.checked) data[key] = el.value;
        } else {
          data[key] = el.value;
        }
      });

      console.log('[poc] Save clicked → form data:');
      console.table(data);
      console.log('[poc] raw object:', data);

      // ⚠️ Do NOT block normal Save behavior
    },
    true // capture phase
  );

  console.log('[poc] delegated form logger active ✅');
})();
