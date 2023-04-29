const inquirer = require('inquirer');
const fs = require('fs');
const Triangle = require('./lib/triangle');
const Circle = require('./lib/circle');
const Square = require('./lib/square');

const promptQuestions = [
  {
    type: 'input',
    name: 'userText',
    message: 'Enter text (up to 3 characters): ',
    validate: (input) => input.length <= 3 || 'Text must be up to 3 characters.',
    filter: (input) => input.slice(0, 3)
  },
  {
    type: 'input',
    name: 'textColor',
    message: 'Enter text color (keyword or hexadecimal): ',
    validate: (input) => /^#(?:[0-9a-fA-F]{3}){1,2}$/.test(input) || /^[a-zA-Z]+$/.test(input) || 'Invalid color format.'
  },
  {
    type: 'list',
    name: 'shape',
    message: 'Choose a shape: ',
    choices: ['Circle', 'Triangle', 'Square']
  },
  {
    type: 'input',
    name: 'shapeColor',
    message: 'Enter shape color (keyword or hexadecimal): ',
    validate: (input) => /^#(?:[0-9a-fA-F]{3}){1,2}$/.test(input) || /^[a-zA-Z]+$/.test(input) || 'Invalid color format.'
  }
];

inquirer.prompt(promptQuestions).then((answers) => {
  const { userText, textColor, shape, shapeColor } = answers;
  let shapeInstance;

  switch (shape) {
    case 'Circle':
      shapeInstance = new Circle();
      break;
    case 'Triangle':
      shapeInstance = new Triangle();
      break;
    case 'Square':
      shapeInstance = new Square();
      break;
  }

  shapeInstance.setColor(shapeColor);

  // Generate the SVG content
  let svgContent = `<svg xmlns="http://www.w3.org/2000/svg" width="300" height="200" viewBox="0 0 300 200">`;
  svgContent += shapeInstance.render();
  svgContent += `<text x="150" y="120" text-anchor="middle" font-size="50" fill="${textColor}">${userText}</text>`;
  svgContent += `</svg>`;

  // Save the SVG content to a file named "logo.svg".
  fs.writeFileSync('./examples/logo.svg', svgContent);

  // Output the success message
  console.log('Generated logo.svg');
});
