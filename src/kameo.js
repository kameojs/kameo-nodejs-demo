import { Kameo } from '@kameo/core';
import { StarterKit } from '@kameo/starter-kit';
import { FormKit } from '@kameo/form-kit';
import { TextStyleKit } from '@kameo/extension-text-style';

export const createKameo = () => {
  const kameo = new Kameo({
    extensions: [
      StarterKit,
      FormKit,
      TextStyleKit,
    ],
    isHeadless: true,
  });
  return kameo;
};

export const createBaseForm = (kameo) => {
  const pos = kameo.state.doc.content.size;
  kameo
    .chain()
    .insertContentAt(pos, '<h1>Basic form</h1><p>This is a <b>basic</b> form</p>')
    .insertFormInputName(pos)
    .insertFormInputEmail(pos)
    .insertFormTextarea(pos)
    .insertFormRating(pos)
    .insertFormSubmit(pos)
    .run();
  return kameo.getJSON();
};
