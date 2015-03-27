window.Geta.SG.Component = function(element, options) {
    return {

        //
        // Attributes
        //

        element: element,

        options: $.extend(
            {
                cssClass: 'sg-component',
                name: null,
                images: [],
                iframeHtml: function(html){ return html; },
                iframeReady: function(iframe){}
            },
            options
        ),

        _container: null,

        _designUi: {},

        _designComparator: {},

        //
        // Initialize
        //

        _init: function(){
            this._createContainer();
            this._initDesignUi();
            this._initDesignComparator();
            this._initElementContainer();
            return this;
        },

        //
        // Dom
        //

        _createContainer: function() {
            this._container = $('<div></div>')
                .addClass(this.options.cssClass)
                .insertAfter(this.element);
        },

        _initDesignUi: function(){
            var element = $('<div></div>').appendTo(this._container);
            this._designUi = new Geta.SG.DesignUi(
                element,
                {
                    name: this.options.name,
                    images: this.options.images,
                    onSelect: $.proxy(this._compare, this),
                    onCancel: $.proxy(this._cancelCompare, this)
                }
            );
        },

        _initDesignComparator: function(){
            var element = $('<div></div>').appendTo(this._container);
            this._designComparator = new Geta.SG.DesignComparator(element, {
                iframeHtml: this.options.iframeHtml,
                iframeReady: this.options.iframeReady
            });
        },

        _initElementContainer: function(){
            var element = $('<div></div>').appendTo(this._container);
            this.element.appendTo(element);
            new window.Geta.SG.Element(element);
        },

        //
        // Callbacks
        //

        _compare: function(imageData){
            this._designComparator.compare(this.element, imageData);
        },

        _cancelCompare: function(){
            this._designComparator.cancelCompare();
        }

    }._init();
};