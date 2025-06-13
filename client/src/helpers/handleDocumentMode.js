export const handleDocumentMode = (kameo, defaultMode, selector = '.document-mode select') => {
  const select = document.querySelector(selector);
  if (select) {
    select.value = defaultMode;
    select.addEventListener('change', (event) => {
      kameo.setDocumentMode(event.target.value);
    });
  }
};
