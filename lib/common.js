'use strict';

import { JSDOM } from 'jsdom';

export const createDOM = () => {
  const dom = new JSDOM(`<!DOCTYPE html><div></div>`);
  const window = dom.window;
  const document = window.document;
  return { dom, document, window };
};
