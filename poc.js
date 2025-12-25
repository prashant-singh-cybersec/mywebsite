(() => {
  const form = document.getElementById('add-new-card');
  console.log('form:', form);

  const street = document.getElementById('street-address');
  console.log('street input:', street, 'value:', street?.value);

  const saveBtn = document.querySelector('button.hds-a-button--primary[aria-label="Save"]');
  console.log('saveBtn:', saveBtn);
})();
