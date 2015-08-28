import {EventEmitter} from 'events';
import get from 'lodash/object/get';
import set from 'lodash/object/set';


/**
 * Exposes application model interface
 */
export class Model extends EventEmitter {

  constructor() {
    this.params = {};
  }

  /**
   * Resets all the model data and fires change event
   * @param  {any} data
   * @return {Model}
   */
  reset(data) {
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
  set(path, value) {
    set(this.params, path, value);
    this.emit('change');
    return this;
  }

  /**
   * Returns deep nested value from Model.
   * @param  {String} path path to value
   * @param  {any}    [defaultValue] optional default value
   * @return {any}
   */
  get(path, defaultValue) {
    return get(this.params, path, defaultValue);
  }

}
