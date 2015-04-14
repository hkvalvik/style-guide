var StyleGuide = require('../index.js');

var styleGuide = new StyleGuide('tests/fixtures');
//var styleGuide = new StyleGuide('tests/design');

styleGuide.saveJson('tests/result/result.json');