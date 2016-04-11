import { forEach } from 'lodash';
export default function EventEmitter() {
    let listeners = [];
    /**
     * Removes all listeners
     */
    function unsubscribe() {
        listeners = [];
    }
    /**
     * Adds a new listener
     * @param  {Function} listener
     * @return {Funcrion} function to unsubscribe
     */
    function subscribe(listener) {
        listeners.push(listener);
        return unsubscribe;
    }
    /**
     * Calls all listeners
     */
    function emit() {
        forEach(listeners, listener => listener());
    }
    return {
        subscribe,
        unsubscribe,
        emit
    };
}
