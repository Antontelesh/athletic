'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initComponent = initComponent;

var _symbols = require('../symbols');

function initComponent(ctor, elements, app) {
  Array.prototype.forEach.call(elements, function (element) {
    if (!app[_symbols.ELEMENTS].has(element)) {
      var instance = new ctor(element);
      app.register(instance);
      instance.update();
    }
  });
}