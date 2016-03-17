import invoke from 'lodash/collection/invoke';
import remove from 'lodash/array/remove';
import {Model} from './Model';
import {initComponent} from './utils/initComponent';
import {
  COMPONENTS,
  ELEMENTS
} from './symbols';



/**
 * Exposes the main public interface to manage application.
 */
export class App {

  constructor() {
    this[COMPONENTS] = {};
    this[ELEMENTS] = new Set();
    this.components = [];
    this.data = new Model();
    this.data.on('change', this.update.bind(this));
  }

  /**
   * Registers application model with some predefined data
   * @param  {any} data model data
   * @return {App}
   */
  model(data) {
    this.data.reset(data);
    return this;
  }

  /**
   * Registers component constructor bound to selector.
   * @param  {String} selector selector to bind component instance to
   * @param  {Function} ctor   component constructor
   * @return {App}
   */
  component(selector, ctor) {
    this[COMPONENTS][selector] = ctor;
    return this;
  }

  /**
   * Instantiates all registered components within element.
   * @param  {Element} root
   */
  bootstrap(root) {
    Object.keys(this[COMPONENTS]).forEach((selector) => {
      var elements = root.querySelectorAll(selector);
      initComponent(this[COMPONENTS][selector], elements, this);
    });
  }

  /**
   * Invokes all components' `update` function
   */
  update() {
    invoke(this.components, 'update');
  }

  /**
   * Registers component instance within application.
   * @param  {Component} component
   */
  register(component) {
    this.components.push(component);
    this[ELEMENTS].add(component.element);
  }

  /**
   * Removes component instance from application
   * @param  {Component} component
   */
  destroy(component) {
    remove(this.components, component);
  }

}
