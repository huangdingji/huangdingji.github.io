(function () {
  var directory = document.querySelector('.markets-directory');
  if (!directory) return;

  var cards = Array.prototype.slice.call(directory.querySelectorAll('.market-card'));
  var groups = Array.prototype.slice.call(directory.querySelectorAll('[data-market-group]'));
  var more = directory.querySelector('.markets-more');
  var pageSize = 12;
  var visibleLimit = pageSize;

  function renderDirectory() {
    cards.forEach(function (card, index) {
      card.hidden = index >= visibleLimit;
    });

    groups.forEach(function (group) {
      group.hidden = !group.querySelector('.market-card:not([hidden])');
    });

    more.hidden = visibleLimit >= cards.length;
    more.textContent = 'Show more market guides';
  }

  more.addEventListener('click', function () {
    visibleLimit += pageSize;
    renderDirectory();
  });

  renderDirectory();
}());
