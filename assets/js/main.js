const button = document.querySelector('.menu-button');
const links = document.querySelector('.nav-links');
if (button && links) {
  button.addEventListener('click', () => {
    const open = links.classList.toggle('open');
    button.setAttribute('aria-expanded', String(open));
  });
}

document.querySelectorAll('[data-year]').forEach(el => {
  el.textContent = new Date().getFullYear();
});

const backToTop = document.querySelector('.back-to-top');
if (backToTop) {
  const updateBackToTop = () => backToTop.classList.toggle('is-visible', window.scrollY > 600);
  updateBackToTop();
  window.addEventListener('scroll', updateBackToTop, { passive: true });
}

document.querySelectorAll('[data-device-showcase]').forEach(showcase => {
  const tabs = showcase.querySelectorAll('[data-device-tab]');
  const panels = showcase.querySelectorAll('.device-panel');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(item => {
        const active = item === tab;
        item.classList.toggle('is-active', active);
        item.setAttribute('aria-selected', String(active));
      });
      const selectedPanelId = tab.getAttribute('aria-controls');
      panels.forEach(panel => {
        panel.hidden = panel.id !== selectedPanelId;
      });
    });
  });
});

// Max Photo Frames — the illustrated stage (T10.5).
// Each control group names the attribute it sets and the value it sets it to,
// so a new state needs markup only, not more JavaScript.
document.querySelectorAll('[data-mpf-block]').forEach(block => {
  const stage = block.querySelector('[data-mpf-stage]');
  if (!stage) return;

  block.querySelectorAll('[data-mpf-set]').forEach(button => {
    button.addEventListener('click', () => {
      const [attr, value] = button.dataset.mpfSet.split(':');
      stage.setAttribute('data-' + attr, value);
      block
        .querySelectorAll('[data-mpf-set^="' + attr + ':"]')
        .forEach(peer => peer.setAttribute('aria-pressed', String(peer === button)));
    });
  });
});

const tutorialLinks = document.querySelectorAll('[data-tutorial-link]');
const tutorialSections = document.querySelectorAll('.tutorial-content section[id]');
if (tutorialLinks.length && tutorialSections.length && 'IntersectionObserver' in window) {
  const tutorialObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      tutorialLinks.forEach(link => {
        link.setAttribute('aria-current', link.getAttribute('href') === '#' + entry.target.id ? 'true' : 'false');
      });
    });
  }, { rootMargin: '-18% 0px -65% 0px', threshold: 0 });
  tutorialSections.forEach(section => tutorialObserver.observe(section));
}

// Primary nav follows the reader: a link to a section on this page (Home's
// "Projects") takes the current state while that section is under the header,
// and hands it back to the page link above it.
(() => {
  const nav = document.querySelector('.nav-links');
  if (!nav) return;
  const here = location.pathname.replace(/\/index\.html$/, '/');
  const samePage = a => new URL(a.href).pathname.replace(/\/index\.html$/, '/') === here;
  const pageLink = [...nav.querySelectorAll('a')].find(a => samePage(a) && !new URL(a.href).hash);
  const spots = [...nav.querySelectorAll('a')]
    .filter(a => samePage(a) && new URL(a.href).hash)
    .map(a => ({ a, el: document.getElementById(new URL(a.href).hash.slice(1)) }))
    .filter(s => s.el);
  if (!pageLink || !spots.length) return;
  const header = document.querySelector('.site-header');
  const update = () => {
    const line = (header ? header.offsetHeight : 0) + 80;
    let current = pageLink;
    spots.forEach(({ a, el }) => {
      const r = el.getBoundingClientRect();
      if (r.top <= line && r.bottom > line) current = a;
    });
    nav.querySelectorAll('a').forEach(a => {
      if (a === current) a.setAttribute('aria-current', 'page');
      else a.removeAttribute('aria-current');
    });
  };
  update();
  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('hashchange', update);
})();

// Land on the linked step. A link such as tutorial.html#frame-print-and-shape
// (from the app or a search result) must open at that card, but smooth
// scrolling and late-loading images can leave the page at the top. Once the
// page has loaded, put the target under the sticky bars (scroll-margin-top).
window.addEventListener('load', () => {
  const id = decodeURIComponent(location.hash.slice(1));
  const target = id && document.getElementById(id);
  if (!target) return;
  const top = target.getBoundingClientRect().top;
  if (top < 60 || top > 260) target.scrollIntoView({ block: 'start', behavior: 'instant' });
});

// Process diagrams: open as an overview that fits the column, so the whole
// shape is visible, with a button to read them at full size (scrolling
// sideways). Without JavaScript they stay at full size, as before.
document.querySelectorAll('.bpmn-frame').forEach((frame, n) => {
  const svg = frame.querySelector('svg');
  if (!svg) return;
  frame.classList.add('is-fit');
  frame.id = frame.id || 'diagram-' + (n + 1);
  const next = frame.nextElementSibling;
  if (next && next.classList.contains('bpmn-hint')) next.hidden = true;

  const bar = document.createElement('div');
  bar.className = 'bpmn-bar';
  const note = document.createElement('span');
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'bpmn-toggle';
  btn.setAttribute('aria-controls', frame.id);
  bar.append(note, btn);
  frame.before(bar);

  const render = () => {
    const fit = frame.classList.contains('is-fit');
    note.textContent = fit ? 'The whole diagram, shrunk to fit.' : 'Full size. Scroll sideways to follow it.';
    btn.textContent = fit ? 'View full size' : 'Fit to screen';
    btn.setAttribute('aria-pressed', String(!fit));
  };
  const toggle = () => {
    frame.classList.toggle('is-fit');
    frame.scrollLeft = 0;
    render();
  };
  btn.addEventListener('click', toggle);
  svg.addEventListener('click', () => { if (frame.classList.contains('is-fit')) toggle(); });
  render();
});
