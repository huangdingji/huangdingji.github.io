(() => {
  'use strict';
  const controls = document.querySelector('.carton-calculator-controls');
  if (!controls) return;
  const dimensions = ['cartonLength', 'cartonWidth', 'cartonHeight'].map(id => document.getElementById(id));
  const count = document.getElementById('cartonCount');
  const volumeOutput = document.getElementById('cartonVolume');
  const totalOutput = document.getElementById('cartonTotalVolume');
  const hint = document.getElementById('cartonVolumeHint');
  const inquiry = document.getElementById('cartonCalculationInquiry');
  const baseInquiry = inquiry.getAttribute('href');
  const format = value => new Intl.NumberFormat('en', { maximumFractionDigits: 9 }).format(value);
  const render = () => {
    const values = dimensions.map(input => input.valueAsNumber);
    const cartons = count.valueAsNumber;
    const complete = dimensions.every(input => input.value !== '');
    const valid = complete && dimensions.every(input => input.validity.valid && Number.isFinite(input.valueAsNumber) && input.valueAsNumber > 0)
      && count.validity.valid && Number.isSafeInteger(cartons) && cartons > 0;
    const perCarton = valid ? values.reduce((product, value) => product * value, 1) / 1000000 : NaN;
    const total = perCarton * cartons;
    const usable = valid && Number.isFinite(perCarton) && Number.isFinite(total) && perCarton > 0 && total > 0;
    inquiry.hidden = !usable;
    inquiry.href = new URL(baseInquiry, location.href).href;
    if (!usable) {
      volumeOutput.textContent = '—';
      totalOutput.textContent = '—';
      hint.textContent = !complete ? 'Enter all three dimensions to calculate.' : 'Use positive dimensions and a whole number of cartons.';
      return;
    }
    volumeOutput.textContent = format(perCarton) + ' m³';
    totalOutput.textContent = format(total) + ' m³';
    hint.textContent = 'Geometric outer-carton volume for the entered dimensions; shipping terms are confirmed separately.';
    const size = values.map(String).join(' × ') + ' cm';
    const url = new URL(baseInquiry, location.href);
    url.searchParams.set('packing', 'Outer carton ' + size + '; ' + cartons + ' carton(s); SKU and inner packing to confirm.');
    url.searchParams.set('message', [
      'Buyer-entered outer dimensions: ' + size,
      'Cartons of this size: ' + cartons,
      'Calculated geometric volume per carton: ' + format(perCarton) + ' m³',
      'Calculated total outer-carton volume: ' + format(total) + ' m³',
      url.searchParams.get('message')
    ].filter(Boolean).join('\n'));
    inquiry.href = url.href;
  };
  [...dimensions, count].forEach(input => input.addEventListener('input', render));
  document.getElementById('clearCartonDimensions').addEventListener('click', () => {
    dimensions.forEach(input => { input.value = ''; });
    count.value = '1';
    render();
    dimensions[0].focus();
  });
  controls.hidden = false;
  render();
})();
