export default selector =>
  selector.trim().replace(/ +(?= )/g,'').replace(/, /g, ',').replace(/ ,/g, ',');
