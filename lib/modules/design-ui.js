window.Geta.SG.DesignUi = function(element, options){
    return {

        //
        // Attributes
        //

        options: $.extend(
            {
                cssClass: 'sg-design-ui',
                responsive: {},
                onSelect: $.noop
            },
            options
        ),

        element: element,

        //
        // Initialize
        //

        _init: function(){
            $.get('../../views/design-ui.handlebars', $.proxy(this._initView, this));
            return this;
        },

        _initView: function(template){
            var html = Handlebars.compile(template)({
                buttons: this.options.responsive
            });
            this.element.html(html);
            this.element.find('button').click($.proxy(this._onSelect, this));
            this.element.addClass(this.options.cssClass);
        },

        _onSelect: function(event){
            event.preventDefault();
            var imageSrc = $(event.currentTarget).val();
            this.options.onSelect(imageSrc);
        }

    }._init();
};