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
                images: []
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
            this.element.appendTo(this._container);
            return this;
        },

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
            this._designComparator = new Geta.SG.DesignComparator(element);
        },

        _compare: function(imageData){
            this._designComparator.compare(this.element, imageData);
        },

        _cancelCompare: function(){
            this._designComparator.cancelCompare();
        }

    }._init();
};