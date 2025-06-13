import { getFileOpener } from './getFileOpener.js';

export const handleImportForm = (kameo, selector = '.import-form button') => {
  const button = document.querySelector(selector);
  button?.addEventListener('click', async (event) => {
    const open = getFileOpener();
    const result = await open();
    if (!result) return;
    try {
      const doc = JSON.parse(result.text);
      kameo.commands.setContent(doc);
    } catch (err) {
      console.error(err);
    }
  });
};
