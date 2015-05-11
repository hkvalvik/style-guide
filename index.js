var fs = require('fs');
var path = require('path');
var extend = require('util')._extend;
var Handlebars = require('handlebars');
var CategoryParser = require('./lib/category-parser');

Handlebars.registerHelper('json', function(object) {
    var string = JSON.stringify(object);
    string = string.replace(/(?:\r\n|\r|\n)/g, ''); // Remove white space
    string = string.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
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
                indexTemplate: __dirname +  '/views/index.handlebars',
                template: __dirname +  '/views/template.handlebars',
                headerTemplate: __dirname +  '/views/partials/header.handlebars',
                heading: null
            },
            options
        ),

        _categories: {},

        _template: null,

        _indexTemplate: null,

        _headerTemplate: null,

        _viewData: null,

        _init: function(){
            var parser = new CategoryParser(this.options.src);
            this._categories = parser.getCategories();
            this._template = Handlebars.compile(fs.readFileSync(this.options.template, 'utf-8'));
            this._indexTemplate = Handlebars.compile(fs.readFileSync(this.options.indexTemplate, 'utf-8'));
            this._headerTemplate = Handlebars.compile(fs.readFileSync(this.options.headerTemplate, 'utf-8'));
            this._viewData = this._getViewData();
            return this;
        },

        _getViewData: function(){
            return extend(
                {
                    head: this._getHead(),
                    header: this._getHeader()
                },
                this.options
            );
        },

        _getHead: function(){
            var head = '';
            head += '<style>';
            head += fs.readFileSync(__dirname +  '/.woff.css', 'utf-8');
            head += fs.readFileSync(__dirname +  '/client.min.css', 'utf-8');
            head += '</style>';
            head += '<script>';
            head += fs.readFileSync(require.resolve('jquery'), 'utf-8');
            head += fs.readFileSync(__dirname + '/client.min.js', 'utf-8');
            head += '</script>';
            return head;
        },

        _getHeader: function(){
            return this._headerTemplate({
                heading: this.options.heading,
                menuItems: this._getMenuItems()
            });
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

        save: function(dest){
            this._clean();
            this._saveIndexPage(dest);
            for(var category in this._categories){
                this._saveCategoryPage(dest, this._categories[category]);
            }
        },

        _clean: function(){
            var dest = this.options.dest;
            fs.existsSync(dest) || fs.mkdirSync(dest);
            var files = fs.readdirSync(dest);
            files.forEach(function(file){
                fs.unlinkSync([dest, file].join(path.sep));
            });
        },

        _saveIndexPage: function(dest){
            var fileName = [dest, 'index' + '.html'].join(path.sep);
            var html = this._indexTemplate(this._viewData);
            fs.writeFileSync(fileName, html);
        },

        _saveCategoryPage: function(dest, category){
            var fileName = [dest, category.name + '.html'].join(path.sep);
            var viewData = extend(
                {
                    category: category
                },
                this._viewData
            );
            var html = this._template(viewData);
            fs.writeFileSync(fileName, html);
        }

    }._init();
};
