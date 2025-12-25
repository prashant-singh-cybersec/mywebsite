
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('add-new-card');
  if (!form) return;

  // Your Save button is type="button", so we hook it directly
  const saveBtn = form.querySelector('button.hds-a-button--primary[aria-label="Save"]')
               || document.querySelector('button.hds-a-button--primary[aria-label="Save"]');

  if (!saveBtn) {
    console.warn('[address-hook] Save button not found');
    return;
  }

  saveBtn.addEventListener('click', async (e) => {
    // Capture the value right before your normal flow proceeds
    const street = (document.getElementById('street-address')?.value || '').trim();

    try {
      // Same-origin dev endpoint you control (safe + easy to test)
      await fetch('/dev/webhook', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'same-origin',
        body: JSON.stringify({
          street,
          at: new Date().toISOString(),
          path: location.pathname
        })
      });
    } catch (err) {
      console.warn('[address-hook] dev webhook failed:', err);
      // Do not block the Save flow if logging fails
    }

    // Let the app's normal Save logic run.
    // If your app expects a form submit and isn't doing it, you can do:
    // form.requestSubmit?.() || form.submit();
  }, true); // capture phase
});

