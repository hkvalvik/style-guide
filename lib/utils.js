var path = require('path');

module.exports = {

    // Error handlers

    onWalkError: function(root, nodeStatsArray, next){
        console.error(arguments);
        next();
    },

    // Files

    fixSrc: function(src){
        return src.split('/').join(path.sep); // Looks like there's a problem with Windows paths in node-walk
    },

    fileIsImage: function(fileName){
        var ext = fileName.split('.').pop();
        return ['jpg', 'png', 'gif'].indexOf(ext) > -1;
    },

    fileIsMarkdown: function(fileName){
        var ext = fileName.split('.').pop();
        return ['md', 'markdown'].indexOf(ext) > -1;
    },

    fileIsHtml: function(fileName){
        var ext = fileName.split('.').pop();
        return ['html'].indexOf(ext) > -1;
    }
};