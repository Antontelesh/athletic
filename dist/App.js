'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.App = undefined;

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _set = require('babel-runtime/core-js/set');

var _set2 = _interopRequireDefault(_set);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _invokeMap = require('lodash/invokeMap');

var _invokeMap2 = _interopRequireDefault(_invokeMap);

var _remove = require('lodash/remove');

var _remove2 = _interopRequireDefault(_remove);

var _Model = require('./Model');

var _initComponent = require('./utils/initComponent');

var _symbols = require('./symbols');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Exposes the main public interface to manage application.
 */

var App = exports.App = function () {
  function App() {
    (0, _classCallCheck3.default)(this, App);

    this[_symbols.COMPONENTS] = {};
    this[_symbols.ELEMENTS] = new _set2.default();
    this.components = [];
    this.data = new _Model.Model();
    this.data.on('change', this.update.bind(this));
  }

  /**
   * Registers application model with some predefined data
   * @param  {any} data model data
   * @return {App}
   */


  (0, _createClass3.default)(App, [{
    key: 'model',
    value: function model(data) {
      this.data.reset(data);
      return this;
    }

    /**
     * Registers component constructor bound to selector.
     * @param  {String} selector selector to bind component instance to
     * @param  {Function} ctor   component constructor
     * @return {App}
     */

  }, {
    key: 'component',
    value: function component(selector, ctor) {
      this[_symbols.COMPONENTS][selector] = ctor;
      return this;
    }

    /**
     * Instantiates all registered components within element.
     * @param  {Element} root
     */

  }, {
    key: 'bootstrap',
    value: function bootstrap(root) {
      var _this = this;

      (0, _keys2.default)(this[_symbols.COMPONENTS]).forEach(function (selector) {
        var elements = root.querySelectorAll(selector);
        (0, _initComponent.initComponent)(_this[_symbols.COMPONENTS][selector], elements, _this);
      });
    }

    /**
     * Invokes all components' `update` function
     */

  }, {
    key: 'update',
    value: function update() {
      (0, _invokeMap2.default)(this.components, 'update');
    }

    /**
     * Registers component instance within application.
     * @param  {Component} component
     */

  }, {
    key: 'register',
    value: function register(component) {
      this.components.push(component);
      this[_symbols.ELEMENTS].add(component.element);
    }

    /**
     * Removes component instance from application
     * @param  {Component} component
     */

  }, {
    key: 'destroy',
    value: function destroy(component) {
      (0, _remove2.default)(this.components, component);
    }
  }]);
  return App;
}();