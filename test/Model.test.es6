import test from 'tape';
import {Model} from '../src/Model.es6';

test('Model', t => {
  t.ok(typeof Model === 'function', 'should be a function');

  t.test('Model#set', t => {
    let model = new Model();
    
    t.ok(typeof model.set === 'function', 'should be a function');
    t.ok(model.set.length === 2, 'should accept 2 arguments');

    t.end();
  });

  t.test('Model#get', t => {
    let model = new Model();

    t.ok(typeof model.get === 'function', 'should be a function');
    t.ok(model.get.length === 2, 'should accept 2 arguments');
    t.end();
  });

  t.end();
});

test('getting and setting model values', t => {

  let model = new Model();

  t.doesNotThrow(() => model.get('path.to.prop'), 'should not throw for getting undefined path');
  t.ok(model.get('path.to.prop') === undefined, 'should return undefined for undefined path');
  t.ok(model.get('path.to.prop', 'default value') === 'default value', 'should fallback to default value if no value found');

  model.set('prop', 'value');
  t.ok(model.get('prop', 'default value') === 'value', 'should return value if exists');

  t.end();
});