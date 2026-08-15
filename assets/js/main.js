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
