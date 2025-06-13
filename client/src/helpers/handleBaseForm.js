import { createBaseForm } from './createBaseForm.js';

export const handleBaseForm = (kameo, selector = '.base-form button') => {
  const button = document.querySelector(selector);
  button?.addEventListener('click', (event) => {
    createBaseForm(kameo);
  });
};
