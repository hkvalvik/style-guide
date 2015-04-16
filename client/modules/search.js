window.Geta.SG.Search = function(element, options){
    return {

        //
        // Attributes
        //

        options: $.extend(
            {
            },
            options
        ),

        element: element,

        //
        // Initialize
        //

        _init: function(){
            return this;
        },

        _getUrlParameter: function(name) {
            var url = location.href
            name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
            var regexS = "[\\?&]"+name+"=([^&#]*)";
            var regex = new RegExp( regexS );
            var results = regex.exec( url );
            return results == null ? null : results[1];
        },

        // For example, adding ?components=my-nav,html-only to the url will hide all components except my-nav and html-only
        filterByUrlParameters: function(){
            var param = this._getUrlParameter('components');
            if(param){
                var filter = param.split(',');
                var componentElements = $('[data-component]');
                var elements = componentElements.filter(function(){
                    return $.inArray($(this).data('component'), filter) !== -1;
                });
                componentElements.not(elements).hide();
            }
        }

    }._init();
};