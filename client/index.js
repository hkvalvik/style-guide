window.Geta.SG.Main = function(element, options){
    return {

        //
        // Attributes
        //

        options: $.extend(
            {
                heading: undefined,
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
            this._initLayout();
            $.get(this.options.dataFile, $.proxy(this._onDataLoaded, this));
            return this;
        },

        _initLayout: function(){
            var element = this.element.find('[data-sg-layout]');
            if(element.length == 0){
                element = $('<div></div>').appendTo(this.element);
            }
            new window.Geta.SG.Layout(element, {heading: this.options.heading});
        },

        //
        // Events
        //

        _onDataLoaded: function(data){
            this._data = data;
            this._initNav(data);
            $.each(this._data, $.proxy(this._initComponent, this));
            this.options.ready();
        },

        _onComponentSelect: function(id){
            var target = this.element.find('#component-' + id);
            $('html, body').animate({
                scrollTop: target.offset().top
            }, 500);
        },

        //
        // Helpers
        //

        _initNav: function(data){
            var element = this.element.find('[data-sg-layout-nav]');
            new window.Geta.SG.Nav(element, {
                components: data,
                onSelect: $.proxy(this._onComponentSelect, this)
            });
        },

        _initComponent: function(i, componentData){
            componentData = this._resolveImages(componentData);

            // Find static, inline elements
            var elements = this.element.find('[data-sg-component="'+componentData.name+'"], [data-sg-overlay="'+componentData.name+'"]');

            if(componentData.html){
                elements = $(componentData.html);
            }

            elements.each($.proxy(this._initComponentElement, this, componentData));
        },

        _initComponentElement: function(componentData, i, el){
            var element = $(el);

            var componentContainer = this.element.find('[data-sg-layout-components]');
            element.appendTo(componentContainer);

            new Geta.SG.Component(element, {
                id: componentData.id,
                name: componentData.name,
                images: componentData.images,
                documentation: componentData.documentation,
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