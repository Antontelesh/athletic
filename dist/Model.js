'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Model = undefined;

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _events = require('events');

var _get2 = require('lodash/object/get');

var _get3 = _interopRequireDefault(_get2);

var _set2 = require('lodash/object/set');

var _set3 = _interopRequireDefault(_set2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Exposes application model interface
 */

var Model = exports.Model = (function (_EventEmitter) {
  (0, _inherits3.default)(Model, _EventEmitter);

  function Model() {
    (0, _classCallCheck3.default)(this, Model);

    var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Model).call(this));

    _this.params = {};
    return _this;
  }

  /**
   * Resets all the model data and fires change event
   * @param  {any} data
   * @return {Model}
   */

  (0, _createClass3.default)(Model, [{
    key: 'reset',
    value: function reset(data) {
      this.params = data;
      this.emit('change');
      return this;
    }

    /**
     * Sets some value.
     * @param {String} path  deep path to place value in
     * @param {any} value
     * @return {Model}
     */

  }, {
    key: 'set',
    value: function set(path, value) {
      (0, _set3.default)(this.params, path, value);
      this.emit('change');
      return this;
    }

    /**
     * Returns deep nested value from Model.
     * @param  {String} path path to value
     * @param  {any}    [defaultValue] optional default value
     * @return {any}
     */

  }, {
    key: 'get',
    value: function get(path, defaultValue) {
      return (0, _get3.default)(this.params, path, defaultValue);
    }
  }]);
  return Model;
})(_events.EventEmitter);