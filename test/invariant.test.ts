declare var require;
import invariant from '../src/utils/invariant';
var test = require('tape');


test('invariant', t => {

  t.throws(() => {
    invariant(false, 'message');
  });

  t.doesNotThrow(() => {
    invariant(true, 'message');
  });

  t.end();
});
