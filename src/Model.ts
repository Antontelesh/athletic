import EventEmitter from './EventEmitter';
import {
  get as _get,
  set as _set,
  assign
} from 'lodash';
import {IModel} from './interfaces';

/**
 * A factory to instantiate application model
 * @param  {any = {}}          data initial state
 * @return {IModel}
 */
export default function Model (data: any = {}): IModel {

  let params = data;
  let emitter = EventEmitter();
  let model: IModel = assign(emitter, {
    reset,
    get,
    set,
    getState
  }) as IModel;


  /**
   * Gets a deep value from the current state
   * @param  {string} path         path to value
   * @param  {any}    defaultValue
   * @return {any}
   */
  function get (path: string, defaultValue?: any): any {
    return _get(params, path, defaultValue);
  }

  /**
   * Sets a deep value to the current state. Triggers application update.
   * @param  {string} path  path to value
   * @param  {any}    value
   * @return {IModel}
   */
  function set (path: string, value: any): IModel {
    _set(params, path, value);
    model.emit();
    return model;
  }

  /**
   * Resets the whole state. Triggers application update.
   * @param  {any}    data new state
   * @return {IModel}
   */
  function reset (data: any): IModel {
    params = data;
    model.emit();
    return model;
  }

  /**
   * Returns current state
   * @return {any}
   */
  function getState() {
    return params;
  }

  return model;

}
