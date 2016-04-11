import EventEmitter from './EventEmitter';
import { get as _get, set as _set, assign } from 'lodash';
/**
 * A factory to instantiate application model
 * @param  {any = {}}          data initial state
 * @return {IModel}
 */
export default function Model(data = {}) {
    let params = data;
    let emitter = EventEmitter();
    let model = assign(emitter, {
        reset,
        get,
        set,
        getState
    });
    /**
     * Gets a deep value from the current state
     * @param  {string} path         path to value
     * @param  {any}    defaultValue
     * @return {any}
     */
    function get(path, defaultValue) {
        return _get(params, path, defaultValue);
    }
    /**
     * Sets a deep value to the current state. Triggers application update.
     * @param  {string} path  path to value
     * @param  {any}    value
     * @return {IModel}
     */
    function set(path, value) {
        _set(params, path, value);
        model.emit();
        return model;
    }
    /**
     * Resets the whole state. Triggers application update.
     * @param  {any}    data new state
     * @return {IModel}
     */
    function reset(data) {
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
