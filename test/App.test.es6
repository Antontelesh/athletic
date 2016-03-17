import test from 'tape';
import {App, Component} from '../src/index.es6';
import {Model} from '../src/Model.es6';

class MockComponent extends Component {}

test('App', t => {
  t.ok(typeof App === 'function', 'should be a function');

  let app = new App();

  t.ok(app.data instanceof Model, 'should have `data` property');

  t.test('App#model', t => {
    let app = new App();

    t.ok(typeof app.model === 'function', 'should be a function');
    t.ok(app.model.length === 1, 'should accept one argument');

    t.ok(app.model({prop: 'value'}) === app, 'should return `App` itself for chaining');

    t.end();
  });

  t.test('App#component', t => {
    let app = new App();

    t.ok(typeof app.component === 'function', 'should be a function');
    t.ok(app.component.length === 2, 'should accept two arguments');

    t.ok(app.component('.selector', MockComponent) === app, 'should return `App` itself for chaining')

    t.end();
  });

  t.test('App#bootstrap', t => {
    let app = new App();

    t.ok(typeof app.bootstrap === 'function', 'should be a function');
    t.ok(app.bootstrap.length === 1, 'should accept one argument');

    t.end();
  });

  t.end();
});