import {isObject, isFunction, every} from 'lodash';

export default function isModel (model: any): boolean {
  let object = isObject(model);
  let methods = every(['get', 'set', 'reset'], key => isFunction(model[key]))
  return object && methods;
}
