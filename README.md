# style-guide (under development)

* Document front-end components with markdown.
* Visually compare (responsive) front-end components with design sketches.

## Installation

    npm install git://github.com/hkvalvik/style-guide.git --save

* The package has not yet published to NPM, hence the reference to GitHub.

### Usage

    var StyleGuide = require('style-guide');
    var styleGuide = new StyleGuide({src: 'my-components'});
    styleGuide.save('output/');

### Options

#### src

Should point to a directory with categories/components.

    <root>
    │
    └───<category>
        │
        └───<component>
        └───<component>
        └───<component>
    └───<category>
        │
        └───<component>
        └───<component>

For example, if you are creating two carousel components, the structure might look like this:

    my-components
    │
    └───carousels
        │
        └───my-carousel
            │   small.jpg
            │   medium.jpg
            │   large.jpg
            │   my-carousel.html
            │   my-carousel.md
        │
        └───another-carousel
            │   tiny.jpg
            │   giant.jpg
            │   my-carousel.html
            │   my-carousel.md


[Another example](https://github.com/hkvalvik/style-guide/tree/master/tests/fixtures)

### dest

Where to save the generated style guide. HTML files will be saved to this location.

### indexTemplate

Optional. A handlebars template for the style guide's index file.

### indexTemplate

Optional. A handlebars template for the category pages.

### headerTemplate

Optional. A handlebars template for the style guide header.

### heading

Optional. A custom title to be displayed in the header.

## Run tests

node tests/tests

## Credits

Icons from http://www.flaticon.com/packs/material-design