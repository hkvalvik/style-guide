var extend = require('util')._extend;

var categoryId = 0;
var componentId = 0;

module.exports = {
    Category: function(options){
        return extend(
            {
                id: categoryId++,
                name: null,
                components: [],
                html: ''
            },
            options
        );
    },

    Component: function(options){
        return extend(
            {
                id: componentId++,
                name: null,
                images: [],
                documentation: null,
                html: ''
            },
            options
        );
    },

    Image: function(options){
        return extend(
            {
                label: null,
                file: null,
                width: null,
                height: null
            },
            options
        );
    },

    Documentation: function(html){
        return html;
    }
};