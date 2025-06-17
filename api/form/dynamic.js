const { createKameo, createBaseForm } = kameoModule;

async () => {
  const data = createBaseForm(createKameo());
  return { status: 'ok', data };
};
