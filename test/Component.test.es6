import test from 'tape';
import {App, Component} from '../src/index.es6';
import {Model} from '../src/Model.es6';

const rootElement = {
  querySelectorAll: (selector) => [selector]
};

test('Component', t => {
  t.ok(typeof Component === 'function', 'should be a function');
  t.end();
});

test('Component registration', t => {
  class TestComponent extends Component {

    constructor(element, app, model) {
      t.ok(element === '.test', 'should accept current element');
      t.ok(app instanceof App, 'should accept current `App` instance');
      t.ok(model instanceof Model, 'should accept current application model');

      super(element, app, model);

      t.ok(this.element === '.test', 'should contain current element at `this.element`');
      t.ok(this.app instanceof App, 'should contain current `App` instance at `this.app`');
      t.ok(this.model instanceof Model, 'should contain current application model at `this.model`');
      t.end();
    }

  }

  let app = new App();

  app
    .component('.test', TestComponent)
    .bootstrap(rootElement);
});

test('`Component#update`', t => {

  let results = [];

  class TestComponent extends Component {

    update() {
      results.push(this.model.get('prop'));
    }

  }

  let app = new App();

  app
    .model({prop: 'initial state'})
    .component('.test', TestComponent)
    .bootstrap(rootElement);

  t.ok(results.length === 1, 'should be called on bootstrap');
  t.ok(results[0] === 'initial state', 'should be called with initial state');

  app.data.set('prop', 'next state');

  t.ok(results.length === 2, 'should be called on model update');
  t.ok(results[1] === 'next state', 'should be called with new model state');
  t.end();
});