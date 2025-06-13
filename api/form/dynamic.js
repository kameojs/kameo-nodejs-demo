const { createKameo, createBaseForm } = kameoModule;

async () => {
  const kameo = createKameo();
  const data = createBaseForm(kameo);
  return { status: 'ok', data };
};
