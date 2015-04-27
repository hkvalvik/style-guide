var fs = require('fs');
var path = require('path');
var walk = require('walk');
var sizeOf = require('image-size');
var extend = require('util')._extend;
var MarkdownIt = require('markdown-it');
var sortObj = require('sort-object');

var Utils = require('./utils');
var models = require('./models');

module.exports = function(src){

    return {

        _src: src,

        _components: {},

        _init: function(){
            walk.walkSync(
                Utils.fixSrc(src),
                {
                    listeners: {
                        file: this._addFile.bind(this),
                        errors: Utils.onWalkError.bind(this)
                    }
                }
            );
            return this;
        },

        _addComponent: function(directoryName){
            var name = directoryName.split(path.sep).pop();
            if(!this._components[name]){
                this._components[name] = new models.Component({
                    name: name
                });
            }
        },

        _addFile: function(root, fileStats, next) {
            var directoryName = root.split(path.sep).pop();
            this._addComponent(root);
            var fileName = path.join(root, fileStats.name);
            fileName = fileName.replace(/\\/g, '/');
            if(Utils.fileIsImage(fileName)){
                var label = fileStats.name.split('.').shift();
                var dimensions = sizeOf(fileName);
                this._components[directoryName].images.push(
                    new models.Image({
                        label: label,
                        file: fileName,
                        width: dimensions.width,
                        height: dimensions.height
                    })
                );
            }
            else if(Utils.fileIsMarkdown(fileName)){
                var md = new MarkdownIt();
                var content = fs.readFileSync(fileName, 'utf-8');
                this._components[directoryName].documentation = new models.Documentation({
                    html: md.render(content)
                })
            }
            else if(Utils.fileIsHtml(fileName)){
                this._components[directoryName].html += fs.readFileSync(fileName, 'utf-8');
            }
            next();
        },

        getComponents: function(){
            return sortObj(this._components);
        }

    }._init();
};