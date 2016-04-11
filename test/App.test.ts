declare var require;
var test = require('tape');
import {App, Component, Model} from '../src/index';
import isModel from '../src/utils/isModel';

const fakeRoot = {
  querySelectorAll: (selector) => [selector]
};

test('athletic', t => {

  let updates = [];
  let constructors = [];
  let destroyHooks = [];
  let model = Model({test_prop: 'test_value'});

  class FakeComponent extends Component {

    constructor(element, model) {
      super(element, model);
      constructors.push([this.element, this.model]);
    }

    update() {
      updates.push([this.element, this.model]);
    }

    onDestroy() {
      destroyHooks.push([this.element, this.model]);
    }

  }

  let unsubscribe = App()
    .model(model)
    .component('.fake', FakeComponent)
    .bootstrap(fakeRoot as any as HTMLElement);


  t.test('on init', t => {

    t.test('component constructor', t => {
      t.ok(constructors.length === 1, 'component constructor should be called');

      let [element, model] = constructors[0];
      t.ok(element === '.fake', '`this.element` should be reachable in component constructor');
      t.ok(isModel(model), '`this.model` should be reachable in component constructor');
      t.ok(model.get('test_prop') === 'test_value', 'initial state should be passed');

      t.end();
    });

    t.test('component `update` method ', t => {
      t.ok(updates.length === 1, '`udpate` should be called');

      let [element, model] = updates[0];
      t.ok(element === '.fake', '`this.element` should be reachable in component constructor');
      t.ok(isModel(model), '`this.model` should be reachable in component constructor');
      t.ok(model.get('test_prop') === 'test_value', 'initial state should be passed');

      t.end();
    });

    t.test('component `onDestroy` hook', t => {
      t.ok(destroyHooks.length === 0, 'should not be called');
      t.end();
    });

    t.end();
  });

  t.test('on update', t => {

    model.set('test_prop', 'updated value');

    t.test('component constructor', t => {
      t.ok(constructors.length === 1, 'should not be called');
      t.end();
    });

    t.test('component `update` method', t => {
      t.ok(updates.length === 2, 'should be called one time');

      let [element, model] = updates[1];
      t.ok(element === '.fake', '`this.element` should be reachable');
      t.ok(isModel(model), '`this.model` should be reachable');
      t.ok(model.get('test_prop') === 'updated value', 'updated state should be passed');

      t.end();
    });

    t.test('component `onDestroy` hook', t => {
      t.ok(destroyHooks.length === 0, 'should not be called');
      t.end();
    });

    t.end();
  });

  t.test('on destroy', t => {
    unsubscribe();

    t.test('component constructor', t => {
      t.ok(constructors.length === 1, 'should not be called');
      t.end();
    });

    t.test('component `update` method', t => {
      t.ok(updates.length === 2, 'should not be called');
      t.end();
    });

    t.test('component `onDestroy` hook', t => {
      t.ok(destroyHooks.length === 1, 'should be called one time');
      t.end();
    });

    t.end();
  });

  t.end();
});
