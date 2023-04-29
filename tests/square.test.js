const Square = require('../lib/square');

test('Square render with color', () => {
  const square = new Square();
  square.setColor('green');
  expect(square.render()).toEqual('<rect x="70" y="70" width="160" height="160" fill="green" />');
});