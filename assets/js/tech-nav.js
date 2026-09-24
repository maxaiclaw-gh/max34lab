/* Technology pages: the tutorial's navigation. One full-width strip under the site header holds the
   topic pills; on pages with three or more sections an "On this page" button at the end of the same
   row opens a menu of the page's sections by their full names, with the one being read marked. */
(function () {
  var sub = document.querySelector('.pt-subnav');
  if (!sub) return;
  var shell = sub.closest('.pt-shell');
  var bar = document.createElement('div');
  bar.className = 'pt-bar';
  var row = document.createElement('div');
  row.className = 'container pt-bar-row';
  bar.appendChild(row);
  shell.parentNode.insertBefore(bar, shell);
  row.appendChild(sub);
  var cur = sub.querySelector('[aria-current="page"]');
  // Bring the current topic into view. Measured from the rendered boxes (offsetLeft is relative
  // to the bar, not the scroller), and repeated once the page has loaded, since the fonts and the
  // "On this page" button change the row's width after this first pass.
  function showCurrent() {
    if (!cur) return;
    var d = cur.getBoundingClientRect().left - sub.getBoundingClientRect().left - 40;
    sub.scrollTo({ left: sub.scrollLeft + d, behavior: 'instant' });
  }
  showCurrent();
  window.addEventListener('load', showCurrent);

  var heads = [].slice.call(shell.querySelectorAll('h2')).filter(function (h) {
    return !h.closest('.pt-card, .pt-cta, .pt-faq, article, .journey-visual-card') && h.textContent.trim().length;
  });
  if (heads.length < 3) return;

  var jump = document.createElement('details');
  jump.className = 'pt-jump';
  jump.innerHTML = '<summary>On this page</summary><div class="pt-jump-menu" role="list"></div>';
  var menu = jump.querySelector('.pt-jump-menu');
  var links = heads.map(function (h) {
    var target = h.closest('section[id]') || h;
    if (!target.id) target.id = h.textContent.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    var a = document.createElement('a');
    a.href = '#' + target.id;
    a.setAttribute('role', 'listitem');
    a.textContent = h.textContent.trim();
    a.addEventListener('click', function () { jump.open = false; });
    menu.appendChild(a);
    return { a: a, el: target };
  });
  row.appendChild(jump);
  document.addEventListener('click', function (e) { if (jump.open && !jump.contains(e.target)) jump.open = false; });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') jump.open = false; });

  if (!('IntersectionObserver' in window)) return;
  var obs = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (!e.isIntersecting) return;
      links.forEach(function (l) { l.a.setAttribute('aria-current', l.el === e.target ? 'true' : 'false'); });
    });
  }, { rootMargin: '-35% 0px -55% 0px' });
  links.forEach(function (l) { obs.observe(l.el); });
})();
