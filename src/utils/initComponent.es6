import {ELEMENTS} from '../symbols';

export function initComponent (ctor, elements, app) {
  Array.prototype.forEach.call(elements, element => {
    if (!app[ELEMENTS].has(element)) {
      var instance = new ctor(element, app, app.data);
      app.register(instance);
      instance.update();
    }
  });
}
