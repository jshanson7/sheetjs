import normalizeSelector from './normalizeSelector';

export default (first, second) =>
  normalizeSelector(first) === normalizeSelector(second);
