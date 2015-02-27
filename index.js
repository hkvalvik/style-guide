var fs = require('fs');
var path = require('path');
var walk = require('walk');
var sizeOf = require('image-size');
var extend = require('util')._extend;

function Component(options){
    return extend(
        {
            name: null,
            images: []
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
                        file: this._addImage.bind(this),
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

        _addImage: function(root, fileStats, next) {
            var fileName = path.join(root, fileStats.name);
            fileName = fileName.replace(/\\/g, '/');
            var label = fileStats.name.split('.').shift();
            var dimensions = sizeOf(fileName);
            var directoryName = root.split(path.sep).pop();
            this._addComponentByName(directoryName);
            this._components[directoryName].images.push(
                new Image({
                    label: label,
                    file: fileName,
                    width: dimensions.width,
                    height: dimensions.height
                })
            );
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
        }

    }._init();
};

module.exports = StyleGuide;