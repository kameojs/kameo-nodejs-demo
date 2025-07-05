import '@awesome.me/webawesome/dist/styles/themes/default.css';
import '@kameo/core/style/theme.css';
import './assets/styles/main.css';
import '@kameo/core/webawesome.js';

import { Kameo } from '@kameo/core';
import { StarterKit } from '@kameo/starter-kit';
import { TextStyleKit } from '@kameo/extension-text-style';

const documentMode = 'edit';

const initKameo = () => {
  const kameo = new Kameo({
    element: document.querySelector('#kameo'),
    extensions: [
      StarterKit,
      TextStyleKit,
    ],
    documentMode,
    content: '<b>Lorem</b> <i>ipsum</i> text.',
  });
  return kameo;
};

const init = () => {
  const kameo = initKameo();
  window.kameo = kameo;
};

init();
