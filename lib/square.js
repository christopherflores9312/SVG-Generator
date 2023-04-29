const Shape = require('./shape');

class Square extends Shape {
  render() {
    return `<rect x="70" y="70" width="160" height="160" fill="${this.color}" />`;
  }
}

module.exports = Square;