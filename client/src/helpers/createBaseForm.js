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
};
