import '@awesome.me/webawesome/dist/styles/themes/default.css';
import '@kameo/core/style/theme.css';
import './assets/styles/main.css';
import '@kameo/core/webawesome.js';

import { Kameo } from '@kameo/core';
import { StarterKit } from '@kameo/starter-kit';
import { FormKit } from '@kameo/form-kit';
import { SlashCommand, suggestion } from '@kameo/extension-slash-command';
import { Placeholder } from '@kameo/extensions';

import { handleBaseForm } from './helpers/handleBaseForm.js';
import { handleDocumentMode } from './helpers/handleDocumentMode.js';
import { handleImportForm } from './helpers/handleImportForm.js';
import { handleExportForm } from './helpers/handleExportForm.js';
import { handleClearContent } from './helpers/handleClearContent.js';

const documentMode = 'edit';

const initKameo = () => {
  const kameo = new Kameo({
    element: document.querySelector('#kameo'),
    extensions: [
      StarterKit,
      FormKit,
      SlashCommand.configure({ suggestion }),
      Placeholder.configure({ placeholder: 'Press / for commands...' }),
    ],
    documentMode,
  });
  return kameo;
};

const handleActions = (kameo) => {
  handleBaseForm(kameo);
  handleDocumentMode(kameo, documentMode);
  handleExportForm(kameo);
  handleImportForm(kameo);
  handleClearContent(kameo);
};

const init = () => {
  const kameo = initKameo();
  window.kameo = kameo;

  kameo.on('submit', async (event) => {
    console.log(`on 'submit' event`, { event, formData: event.formData });
    await new Promise((resolve) => setTimeout(resolve, 3000));
    event.setSubmitResult({
      success: true,
      message: 'Form is submitted',
    });
  });

  kameo.on('submitted', (event) => {
    console.log(`on 'submitted' event`, { event });
  });

  handleActions(kameo);
};

init();
