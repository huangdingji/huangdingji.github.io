(() => {
  'use strict';
  const controls = document.querySelector('.purifier-calculator-controls');
  if (!controls) return;
  const inputs = ['kitCount', 'kitRolls', 'kitSpares'].map(id => document.getElementById(id));
  const output = document.getElementById('kitTotal');
  const hint = document.getElementById('kitQuantityHint');
  const inquiry = document.getElementById('kitCalculationInquiry');
  const base = inquiry.getAttribute('href');
  const render = () => {
    const [kits, rolls, spares] = inputs.map(input => input.valueAsNumber);
    const complete = inputs.every(input => input.value !== '');
    const valid = complete && inputs.every(input => input.validity.valid && Number.isSafeInteger(input.valueAsNumber)) && kits > 0 && rolls > 0 && spares >= 0;
    const total = valid ? kits * rolls + spares : NaN;
    const usable = valid && Number.isSafeInteger(total) && total > 0;
    inquiry.hidden = !usable;
    inquiry.href = new URL(base, location.href).href;
    if (!usable) {
      output.textContent = '—';
      hint.textContent = !complete ? 'Enter kit count, rolls per kit and spare rolls to calculate.' : 'Use positive whole numbers for kits and rolls per kit, and zero or more spare rolls. Keep the total within the supported whole-number range.';
      return;
    }
    output.textContent = new Intl.NumberFormat('en').format(total) + ' rolls';
    hint.textContent = kits + ' kit(s) × ' + rolls + ' roll(s) per kit + ' + spares + ' spare roll(s). Confirm this parts-list plan before ordering.';
    const url = new URL(base, location.href);
    url.searchParams.set('quantity', total + ' rolls');
    url.searchParams.set('packing', 'Purifier kit plan: ' + kits + ' kit(s); ' + rolls + ' roll(s)/kit; ' + spares + ' additional spare roll(s). Tape option and unit-pack dimensions to confirm.');
    url.searchParams.set('message', [
      'Kit quantity planning inputs:',
      'Number of kits: ' + kits,
      'Rolls per kit: ' + rolls,
      'Additional spare rolls: ' + spares,
      'Calculated total physical rolls: ' + total,
      'This counts rolls only; tape length per installation, kit fit, selected SKU and required documents are to confirm.',
      url.searchParams.get('message')
    ].filter(Boolean).join('\n'));
    inquiry.href = url.href;
  };
  inputs.forEach(input => input.addEventListener('input', render));
  document.getElementById('clearKitQuantities').addEventListener('click', () => {
    inputs[0].value = '';
    inputs[1].value = '';
    inputs[2].value = '0';
    render();
    inputs[0].focus();
  });
  controls.hidden = false;
  render();
})();
