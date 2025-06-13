'use strict';

import fsp from 'node:fs/promises';
import vm from 'node:vm';
import path from 'node:path';
import * as common from '../lib/common.js';
import { createDOM } from '../lib/common.js';

const dom = createDOM();

globalThis.document = dom.document;
globalThis.window = dom.window;

const OPTIONS = {
  timeout: 5000,
  displayErrors: false,
};

export const load = async (filePath, sandbox) => {
  const src = await fsp.readFile(filePath, 'utf8');
  const code = `'use strict';\n${src}\n`;
  const script = new vm.Script(code, { ...OPTIONS, lineOffset: -2 });
  const context = vm.createContext(Object.freeze({ ...sandbox }));
  const exported = script.runInContext(context, OPTIONS);
  return exported;
};

export const loadDir = async (dir, sandbox) => {
  const files = await fsp.readdir(dir, { withFileTypes: true });
  const container = {};
  for (const file of files) {
    const name = file.name;
    if (file.isFile() && !name.endsWith('.js')) continue;
    const location = path.join(dir, name);
    const key = path.basename(name, '.js');
    const loader = file.isFile() ? load : loadDir;
    container[key] = await loader(location, sandbox);
  }
  return container;
};

export const loadApp = async () => {
  const kameo = await import('../src/kameo.js');
  
  const sandbox = {
    console,
    common: Object.freeze({ ...common }),
    document: Object.freeze(dom.document),
    window: Object.freeze(dom.window),
    kameoModule: Object.freeze({ ...kameo }),
  };

  const configPath = path.join(process.cwd(), './config');
  const domainPath = path.join(process.cwd(), './domain');
  const apiPath = path.join(process.cwd(), './api');

  const config = await loadDir(configPath, sandbox);
  sandbox.config = Object.freeze(config);

  const domain = await loadDir(domainPath, sandbox);
  sandbox.domain = Object.freeze(domain);

  const api = await loadDir(apiPath, sandbox);
  sandbox.api = Object.freeze(api);
  
  return sandbox;
};
