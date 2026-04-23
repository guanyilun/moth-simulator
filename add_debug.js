// Read the file
const fs = require('fs');
let content = fs.readFileSync('index.html', 'utf8');

// Add debug output to updateDisplay function
content = content.replace(
  'function updateDisplay(eaten) {',
  `function updateDisplay(eaten) {
  // Debug output
  document.getElementById('debug').textContent = \`Last: \${eaten} eaten\`;`
);

fs.writeFileSync('index.html', content);
console.log('Added debug output');
