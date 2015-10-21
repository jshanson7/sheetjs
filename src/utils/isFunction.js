export default obj =>
  !!(obj && obj.constructor && obj.call && obj.apply);
