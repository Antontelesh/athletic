declare var require;
import {Model} from '../src/index';
import isModel from '../src/utils/isModel';
var test = require('tape');


test('Model', t => {

  t.test('factory', t => {

    t.ok(typeof Model === 'function', 'should be a function');
    t.ok(Model.length === 1, 'should accept one argument');

    let model = Model({key: 'value'});

    t.ok(isModel(model), 'should return an instance of model');

    t.end();
  });

  t.test('get', t => {
    let model = Model({key: 'value', some: {deep: {property: '1'}}});

    t.ok(model.get('key') === 'value', 'should return found value');
    t.ok(model.get('some.deep.property') === '1', 'should resolve deep path');
    t.ok(model.get('unknown_property') === undefined, 'should return undefined if value not resolved');
    t.ok(model.get('deep.path.to[0].property') === undefined, 'should return undefined for unresolved deep path');
    t.ok(model.get('deep.path.to[0].property', 'default') === 'default', 'should return default value if path not resolved');
    t.end();
  });

  t.test('set', t => {

    let model = Model();
    let result = model.set('prop', 'value');

    t.ok(isModel(result), 'should return itself');
    t.ok(result.get('prop') === 'value', 'should set value');

    t.end();
  });

  t.test('reset', t => {

    let model = Model({test: 'test_value'});

    model.reset({prop: 'value'});

    t.ok(model.get('test') === undefined, 'should remove old data');
    t.ok(model.get('prop') === 'value', 'should set new data');

    t.end();
  });

  t.test('getState()', t => {

    let model = Model({prop: 'value'});

    t.deepEqual(model.getState(), {prop: 'value'});

    model.set('prop', 'value1');

    t.deepEqual(model.getState(), {prop: 'value1'});

    t.end();
  });

  t.end();
});
