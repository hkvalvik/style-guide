window.Geta.SG.DesignComparator = function(element, options){
    return {

        //
        // Attributes
        //

        options: $.extend(
            {
                cssClass: 'sg-design-comparator'
            },
            options
        ),

        element: element,

        _iframe: null,

        _image: null,

        //
        // Initialize
        //

        _init: function(){
            $.get('../../views/design-comparator.handlebars', $.proxy(this._initView, this));
            return this;
        },

        _initView: function(template){
            var html = Handlebars.compile(template)({});
            this.element.html(html);
            this._iframe = this.element.find('iframe');
            this._image = this.element.find('img');
            this.element.addClass(this.options.cssClass);
        },

        compare: function(element, imageSrc){
            var html = $('<div></div>').append(element.clone()).html();
            this._iframe.attr('srcdoc', html);
            this._image.attr('src', imageSrc);
        }
    }._init();
};

