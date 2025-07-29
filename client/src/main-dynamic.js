import '@awesome.me/webawesome/dist/styles/themes/default.css';
import '@kameo/core/style/theme.css';
import './assets/styles/main.css';
import '@kameo/core/webawesome.js';

import { Kameo } from '@kameo/core';
import { StarterKit } from '@kameo/starter-kit';
import { FormKit } from '@kameo/form-kit';
import { TextStyleKit } from '@kameo/extension-text-style';
import ky from 'ky';

const documentMode = 'view';

const getDynamicForm = async () => {
  let content = null;
  try {
    const respData = await ky.post('/api/form/dynamic', { json: [] }).json();
    content = respData.data;
  } catch(err) {
    content = null;
  }
  return content;
};

const initKameo = async () => {
  const content = await getDynamicForm();
  const kameo = new Kameo({
    element: document.querySelector('#kameo'),
    extensions: [
      StarterKit,
      FormKit,
      TextStyleKit,
    ],
    documentMode,
    content,
  });
  return kameo;
};

const init = async () => {
  const kameo = await initKameo();
  window.kameo = kameo;

  kameo.on('submit', async (event) => {
    console.log(`on 'submit' event`, { event });
    await new Promise((resolve) => setTimeout(resolve, 3000));
    event.setResult({
      success: true,
      message: 'Form is submitted',
    });
  });

  kameo.on('submit:result', (event) => {
    console.log(`on 'submit:result' event`, { event });
  });
};

init();
