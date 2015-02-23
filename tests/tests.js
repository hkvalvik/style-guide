var StyleGuide = require('../index.js');

var styleGuide = new StyleGuide('fixtures');
console.log(styleGuide)
styleGuide.saveJson('results/result.json');