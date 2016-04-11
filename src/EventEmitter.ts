import {forEach} from 'lodash';
import {IEventEmitter} from './interfaces';

export default function EventEmitter (): IEventEmitter {

  let listeners = [];

  /**
   * Removes all listeners
   */
  function unsubscribe () {
    listeners = [];
  }

  /**
   * Adds a new listener
   * @param  {Function} listener
   * @return {Funcrion} function to unsubscribe
   */
  function subscribe (listener: Function) {
    listeners.push(listener);
    return unsubscribe;
  }

  /**
   * Calls all listeners
   */
  function emit () {
    forEach(listeners, listener => listener());
  }

  return {
    subscribe,
    unsubscribe,
    emit
  };

}
