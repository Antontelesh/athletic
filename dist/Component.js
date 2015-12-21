"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Component = undefined;

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Provides class to extend all components from
 */

var Component = exports.Component = (function () {
  function Component(element) {
    (0, _classCallCheck3.default)(this, Component);

    this.element = element;
  }

  (0, _createClass3.default)(Component, [{
    key: "update",
    value: function update() {
      // implemented in concrete classes
    }
  }]);
  return Component;
})();