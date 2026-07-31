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
