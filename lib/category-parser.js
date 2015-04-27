var fs = require('fs');
var path = require('path');
var walk = require('walk');
var sizeOf = require('image-size');
var extend = require('util')._extend;
var MarkdownIt = require('markdown-it');
var sortObj = require('sort-object');

var Utils = require('./utils');
var models = require('./models');
var ComponentParser = require('./component-parser');

module.exports = function(src){

    src = Utils.fixSrc(src);

    return {

        _categories: {},

        _init: function(){
            walk.walkSync(
                Utils.fixSrc(src),
                {
                    listeners: {
                        directories: this._addCategories.bind(this),
                        errors: Utils.onWalkError.bind(this)
                    }
                }
            );
            return this;
        },

        _addCategories: function(root, dirStatsArray, next) {
            root = Utils.fixSrc(root);
            for(var d=0; d<dirStatsArray.length; d++){

                if(root == src) {
                    var fileStats = dirStatsArray[d];
                    var categoryRoot = [root, fileStats.name].join(path.sep);
                    this._addCategory(categoryRoot, fileStats);
                }
            }

            next();
        },

        _addCategory: function(root, fileStats){
            var name = fileStats.name;
            var parser = new ComponentParser(root);

            this._categories[name] = new models.Category({
                name: name,
                components: parser.getComponents(),
                html: '' // TODO
            });
        },

        // Public

        getCategories: function(){
            return sortObj(this._categories);
        },

        toJson: function(){
            var categories = this.getCategories();
            return JSON.stringify(categories);
        },

        saveJson: function(dest){
            var json = this.toJson();
            fs.writeFileSync(dest, json);
        }

    }._init();
};