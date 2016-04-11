'use strict';

var lodash = require('lodash');

var babelHelpers = {};

babelHelpers.classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

babelHelpers.createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

babelHelpers;

function RegistryConfigurator() {
    var registry = {
        components: {}
    };
    var configurator = {
        setModel: setModel,
        registerComponent: registerComponent,
        getRegistry: getRegistry
    };
    function setModel(model) {
        registry.model = model;
        return configurator;
    }
    function registerComponent(selector, component) {
        registry.components[selector] = component;
        return configurator;
    }
    function getRegistry() {
        return registry;
    }
    return configurator;
}

function invariant(assertion, msg) {
    if (!assertion) throw new Error(msg);
}

function isModel(model) {
    var object = lodash.isObject(model);
    var methods = lodash.every(['get', 'set', 'reset'], function (key) {
        return lodash.isFunction(model[key]);
    });
    return object && methods;
}

function Bootstrapper() {
    /**
     * Bootstraps an application on a DOM element.
     * @param  {IBootstrapRegistry} registry registry that contains all registered components and model
     * @param  {Element}            root     host element
     * @return {IDestroyFn}                  function to unsubscribe from model changes
     */
    function bootstrap(registry, root) {
        invariant(isModel(registry.model), 'Please specify application model using the `Model` factory: `App().model(Model(...))`');
        var components = initComponents(registry.components, root, registry.model);
        var unsubscribe = registry.model.subscribe(function () {
            return update(components);
        });
        registry.model.emit();
        return function () {
            unsubscribe();
            lodash.invokeMap(components, 'onDestroy');
        };
    }
    /**
     * Calls `update` on all components
     * @param {IComponent[]} components registered components
     */
    function update(components) {
        lodash.invokeMap(components, 'update');
    }
    /**
     * Initializes components
     * @param  {IDictionary<IComponentStatic>} source component registry
     * @param  {Element}                       root   host element
     * @param  {IModel}                        model  application model
     * @return {IComponent[]}                         initialized components
     */
    function initComponents(source, root, model) {
        return lodash.reduce(source, function (acc, ctor, selector) {
            var elements = root.querySelectorAll(selector);
            var instances = lodash.map(elements, function (element) {
                return new ctor(element, model);
            });
            return acc.concat(instances);
        }, []);
    }
    return { bootstrap: bootstrap };
}

function Setup(configurator, bootstrapper) {
    var setup = {
        model: model,
        component: component,
        bootstrap: bootstrap
    };
    function model(instance) {
        configurator.setModel(instance);
        return setup;
    }
    function component(selector, component) {
        configurator.registerComponent(selector, component);
        return setup;
    }
    function bootstrap(root) {
        var registry = configurator.getRegistry();
        return bootstrapper.bootstrap(registry, root);
    }
    return setup;
}

function App() {
    var configurator = RegistryConfigurator();
    var bootstrapper = Bootstrapper();
    return Setup(configurator, bootstrapper);
}

/**
 * Provides class to extend all components from
 */

var Component = function () {
    function Component(element, model) {
        babelHelpers.classCallCheck(this, Component);

        this.element = element;
        this.model = model;
    }

    babelHelpers.createClass(Component, [{
        key: "update",
        value: function update() {
            // implemented in concrete classes
        }
    }, {
        key: "onDestroy",
        value: function onDestroy() {
            // implemented in concrete classes
        }
    }]);
    return Component;
}();

function EventEmitter() {
    var listeners = [];
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
        lodash.forEach(listeners, function (listener) {
            return listener();
        });
    }
    return {
        subscribe: subscribe,
        unsubscribe: unsubscribe,
        emit: emit
    };
}

/**
 * A factory to instantiate application model
 * @param  {any = {}}          data initial state
 * @return {IModel}
 */
function Model() {
    var data = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    var params = data;
    var emitter = EventEmitter();
    var model = lodash.assign(emitter, {
        reset: reset,
        get: get,
        set: set,
        getState: getState
    });
    /**
     * Gets a deep value from the current state
     * @param  {string} path         path to value
     * @param  {any}    defaultValue
     * @return {any}
     */
    function get(path, defaultValue) {
        return lodash.get(params, path, defaultValue);
    }
    /**
     * Sets a deep value to the current state. Triggers application update.
     * @param  {string} path  path to value
     * @param  {any}    value
     * @return {IModel}
     */
    function set(path, value) {
        lodash.set(params, path, value);
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

exports.App = App;
exports.Component = Component;
exports.Model = Model;