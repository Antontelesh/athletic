# CHANGELOG

## 3.0.1

* Fixed docs (issue #13)

## 3.0.0

This release is a full rewrite.
The library has been totally rewritten in TypeScript.
It means, that it's now can be used in other TypeScript projects with full typings support, including IDE intellisence.

The inner architecture has been rethought and changed dramatically while external API remained almost the same.
Here is the full list of API changes:

#### API changes (breaking)

* `App` is no more a constructor function, but a factory. Now it should be called without the `new` keyword.
* The return value of `App()` is not the real application object, but simply an interface to register components and model.
* `App#bootstrap` now returns a destroy function. You can store it somewhere and then call it to clean-up listeners of your model.
  This unsubscription function also calls `onDestroy` method on every registered component instance.
  This lifecycle hook can be used to remove all event listeners registered in a component.
* `App#model` now accepts not an actual data object, but an instance of `Model`.
  `Model` is another factory exported from `athletic`.
  It's intended to being called without the `new` keyword.
  You can pass your data to the factory function when creating an instance of `Model`:

  ```typescript
  import {App, Model} from 'athletic';

  let model = Model({prop: 'value'});

  App()
    .model(model)
  ```

  This change allows you to store reference to your model instance to mutate application state from outside of it:

  ```typescript

  let model = Model();

  // ...somewhere later
  model.set('prop', 'value'); // => this will also trigger `update` methods in all components
  ```

  It means now you can use [redux](https://github.com/reactjs/redux) or another library for state management.
* `Component` constructor now accepts only two arguments: `element` and `model`.
  Previously it was accepting also `app`.
  Now there is no such thing as `app` at all.
  This change also means that there is no `this.app` in components.
  This property wasn't very usable, so I think we can delete it safely.
  Be careful to remove it from your component constructors.

#### Other changes (non-breaking)

* `athletic` now is bundled with [rollup](http://rollupjs.org/).
  This dramatically decreases the size of the library.

## 2.1.0

* Fixed #4. `App` and `Model` instances now available in `Component` constructor.
* Updated lodash package to 4.6.1
* Fixed component update event trigger

## 2.0.1

* Fixed `lodash/array/remove` dependency.

## 2.0.0

* Now module is prebuilt with babel and ready to use
