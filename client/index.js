window.Geta.SG.Main = function(element, options){
    return {

        //
        // Attributes
        //

        options: $.extend(
            {
                data: null,
                imageResolver: function(path){ return path; },
                ready: $.noop,
                iframeHtml: function(html){ return html; },
                iframeReady: function(iframe){}
            },
            options
        ),

        element: element,

        _data: null,

        _search: null,

        //
        // Initialize
        //

        _init: function(){
            this._search = new window.Geta.SG.Search(this.element);
            this._initComponentNavigation(this.options.data);
            $.each(this.options.data, $.proxy(this._initComponent, this));
            this._search.filterByUrlParameters();
            this.options.ready();
            return this;
        },

        //
        // Events
        //

        _onComponentSelect: function(id){
            var target = this.element.find('#component-' + id);
            $('html, body').animate({
                scrollTop: target.offset().top
            }, 500);
        },

        //
        // Helpers
        //

        _initComponentNavigation: function(data){
            var element = this.element.find('[data-sg-component-nav]');
            new window.Geta.SG.ComponentNav(element, {
                components: data,
                onSelect: $.proxy(this._onComponentSelect, this),
                toggle: this.element.find('[data-sg-component-nav-toggle]')
            });
        },

        _initComponent: function(i, componentData){
            componentData = this._resolveImages(componentData);

            // Find static, inline elements
            var elements = this.element.find('[data-sg-component="'+componentData.name+'"], [data-sg-overlay="'+componentData.name+'"]');

            if(componentData.html){
                var raw = $(componentData.html);

                // Make sure the element is only one node
                if(raw.length > 0){
                    raw = $('<div></div>').html(raw);
                }
                elements = raw;
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