import { createDownload } from './createDownload.js';

export const handleExportForm = (kameo, selector = '.export-form button') => {
  const button = document.querySelector(selector);
  button?.addEventListener('click', (event) => {
    const jsonStr = JSON.stringify(kameo.getJSON());
    const blob = new Blob([jsonStr], { type: 'application/json' });
    createDownload({
      name: 'exported-form',
      extension: 'json',
      blob,
    });
  });
};
