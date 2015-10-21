import isFunction from './isFunction';

export default obj =>
  Object.getOwnPropertyNames(Object.getPrototypeOf(obj))
    .filter(key => isFunction(obj[key]))
    .forEach(method => obj[method] = obj[method].bind(obj));
