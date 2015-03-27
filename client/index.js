window.Geta.SG.Main = function(element, options){
    return {

        //
        // Attributes
        //

        options: $.extend(
            {
                dataFile: null,
                imageResolver: function(path){ return path; },
                ready: $.noop,
                iframeHtml: function(html){ return html; },
                iframeReady: function(iframe){}
            },
            options
        ),

        element: element,

        _data: null,

        //
        // Initialize
        //

        _init: function(){
            $.get(this.options.dataFile, $.proxy(this._onDataLoaded, this));
            return this;
        },

        //
        // Events
        //

        _onDataLoaded: function(data){
            this._data = data;
            $.each(this._data, $.proxy(this._initComponent, this));
            this.options.ready();
        },

        //
        // Helpers
        //

        _initComponent: function(i, componentData){
            var elements = this.element.find('[data-sg-component="'+componentData.name+'"], [data-sg-overlay="'+componentData.name+'"]');
            componentData = this._resolveImages(componentData);
            elements.each($.proxy(this._initComponentElement, this, componentData));
        },

        _initComponentElement: function(componentData, i, el){
            var element = $(el);
            new Geta.SG.Component(element, {
                name: componentData.name,
                images: componentData.images,
                iframeHtml: this.options.iframeHtml,
                iframeReady: this.options.iframeReady
            });
        },

        _resolveImages: function(componentData){
            for(var i=0; i<componentData.images.length; i++){
                componentData.images[i].file = this.options.imageResolver(componentData.images[i].file);
            }
            return componentData;
        }

    }._init();
};