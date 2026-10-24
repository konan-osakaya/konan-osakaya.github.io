// Reset reloads before the browser restores the previous scroll or fragment.
(() => {
  const navigation = performance.getEntriesByType('navigation')[0];
  if (navigation?.type !== 'reload') return;
  const previousRestoration = history.scrollRestoration;
  history.scrollRestoration = 'manual';
  if (location.hash) history.replaceState(history.state, '', location.pathname + location.search);
  function resetScroll() { window.scrollTo({top: 0, left: 0, behavior: 'instant'}); }
  document.addEventListener('DOMContentLoaded', resetScroll, {once: true});
  window.addEventListener('pageshow', (event) => {
    if (event.persisted) return;
    resetScroll();
    requestAnimationFrame(() => {
      resetScroll();
      history.scrollRestoration = previousRestoration;
    });
  }, {once: true});
})();
