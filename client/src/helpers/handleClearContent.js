export const handleClearContent = (kameo, selector = '.clear-content button') => {
  const button = document.querySelector(selector);
  button?.addEventListener('click', (event) => {
    kameo.commands.clearContent();
  });
};
