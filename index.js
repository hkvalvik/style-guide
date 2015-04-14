var fs = require('fs');
var path = require('path');
var walk = require('walk');
var sizeOf = require('image-size');
var extend = require('util')._extend;
var MarkdownIt = require('markdown-it');

var componentId = 0;

function Component(options){
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
}

function Image(options){
    return extend(
        {
            label: null,
            file: null,
            width: null,
            height: null
        },
        options
    );
}

function Documentation(html){
    return html;
}

var StyleGuide = function(src){

    return {

        _src: src,

        _components: {},

        _init: function(){
            walk.walkSync(
                this._fixSrc(src),
                {
                    listeners: {
                        directories: this._addComponent.bind(this),
                        file: this._addFile.bind(this),
                        errors: this._onError.bind(this)
                    }
                }
            );
            return this;
        },

        // Looks like there's a problem with Windows paths in node-walk
        _fixSrc: function(src){
            return src.split('/').join(path.sep);
        },

        _addComponent: function (root, dirStatsArray, next) {
            var name = dirStatsArray[0].name;
            this._addComponentByName(name);
            next();
        },

        _addComponentByName: function(name){
            if(!this._components[name]){
                this._components[name] = new Component({
                    name: name
                });
            }
        },

        _addFile: function(root, fileStats, next) {
            var directoryName = root.split(path.sep).pop();
            this._addComponentByName(directoryName);
            var fileName = path.join(root, fileStats.name);
            fileName = fileName.replace(/\\/g, '/');
            if(this._fileIsImage(fileName)){
                var label = fileStats.name.split('.').shift();
                var dimensions = sizeOf(fileName);
                this._components[directoryName].images.push(
                    new Image({
                        label: label,
                        file: fileName,
                        width: dimensions.width,
                        height: dimensions.height
                    })
                );
            }
            else if(this._fileIsMarkdown(fileName)){
                var md = new MarkdownIt();
                var content = fs.readFileSync(fileName, 'utf-8');
                this._components[directoryName].documentation = new Documentation({
                    html: md.render(content)
                })
            }
            else if(this._fileIsHtml(fileName)){
                this._components[directoryName].html += fs.readFileSync(fileName, 'utf-8');
            }
            next();
        },

        _onError: function(root, nodeStatsArray, next) {
            console.error(arguments);
            next();
        },

        toJson: function(){
            return JSON.stringify(this._components);
        },

        saveJson: function(dest){
            var json = this.toJson();
            fs.writeFileSync(dest, json);
        },

        _fileIsImage: function(fileName){
            var ext = fileName.split('.').pop();
            return ['jpg', 'png', 'gif'].indexOf(ext) > -1;
        },

        _fileIsMarkdown: function(fileName){
            var ext = fileName.split('.').pop();
            return ['md', 'markdown'].indexOf(ext) > -1;
        },

        _fileIsHtml: function(fileName){
            var ext = fileName.split('.').pop();
            return ['html'].indexOf(ext) > -1;
        }

    }._init();
};

module.exports = StyleGuide;