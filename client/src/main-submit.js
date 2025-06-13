import '@kameo/core/style/theme.css';
import './assets/styles/main.css';

import { Kameo } from '@kameo/core';
import { StarterKit } from '@kameo/starter-kit';
import { FormKit } from '@kameo/form-kit';
import { TextStyleKit } from '@kameo/extension-text-style';
import { createBaseForm } from './helpers/createBaseForm.js';
import ky from 'ky';

const documentMode = 'view';

const initKameo = () => {
  const kameo = new Kameo({
    element: document.querySelector('#kameo'),
    extensions: [
      StarterKit,
      FormKit,
      TextStyleKit,
    ],
    documentMode,
  });
  return kameo;
};

const init = () => {
  const kameo = initKameo();
  window.kameo = kameo;

  createBaseForm(kameo);

  kameo.on('submit', async (event) => {
    console.log(`on 'submit' event`, { event });

    try {
      const data = Object.fromEntries(
        Object.entries(event.formData).map(([_key, data]) => [data.name, data.value])
      );
      const respData = await ky.post('/api/form/submit', { json: [data] }).json();

      if (respData.status !== 'ok') {
        throw new Error('Server error'); 
      }

      event.setSubmitResult({
        success: true,
        message: 'Form is submitted',
      });
    } catch (err) {
      event.setSubmitResult({
        success: false,
        message: err.message,
      });
    }
  });

  kameo.on('submitted', (event) => {
    console.log(`on 'submitted' event`, { event });

    const data = Object.fromEntries(
      Object.entries(event.formData).map(([_key, data]) => [data.name, data.value])
    );

    if (event.success) {
      window.alert(`${event.message} \n ${JSON.stringify(data)}`);
    } else {
      window.alert(`${event.message}`);
    }
  });
};

init();
