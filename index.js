var fs = require('fs');
var path = require('path');
var extend = require('util')._extend;
var Handlebars = require('handlebars');
var CategoryParser = require('./lib/category-parser');

Handlebars.registerHelper('json', function(object) {
    var string = JSON.stringify(object);
    string = string.replace(/(?:\r\n|\r|\n)/g, ''); // Remove white space
    return string;
});

Handlebars.registerHelper('selected-class', function(a, b) {
    return a == b ? 'selected' : '';
});

module.exports = function(options){

    return {

        options: extend(
            {
                src: null,
                dest: null,
                template: null, // Path to handlebars template
                heading: null
            },
            options
        ),

        _categories: {},

        _menuItems: [],

        _template: null,

        _head: '',

        _init: function(){
            var parser = new CategoryParser(this.options.src);
            this._categories = parser.getCategories();
            this._menuItems = this._getMenuItems();
            this._template = Handlebars.compile(fs.readFileSync(this.options.template, 'utf-8'));
            this._createHead();
            return this;
        },

        _createHead: function(){
            this._head += '<style>';
            this._head += fs.readFileSync('./node_modules/jquery/dist/jquery.min.js', 'utf-8');
            this._head += '</style>';
            this._head += '<script>';
            this._head += fs.readFileSync('./node_modules/jquery/dist/jquery.min.js', 'utf-8');
            this._head += fs.readFileSync('./client.min.js', 'utf-8');
            this._head += '</script>';
        },

        save: function(dest, templatePath){
            for(var category in this._categories){
                this._saveHtml(dest, this._categories[category]);
            }
        },

        _getMenuItems: function(){
            var items = [];
            for(var category in this._categories){
                items.push({
                    href: category + '.html',
                    label: category
                });
            }
            return items;
        },

        _saveHtml: function(dest, category){
            var fileName = [dest, category.name + '.html'].join(path.sep);
            var viewData = extend(
                {
                    category: category,
                    menuItems: this._menuItems
                },
                this.options
            );
            var html = this._template(viewData);
            fs.writeFileSync(fileName, html);
        }

    }._init();
};
