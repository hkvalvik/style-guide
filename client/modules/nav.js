window.Geta.SG.Nav = function(element, options){
    return {

        //
        // Attributes
        //

        options: $.extend(
            {
                cssClass: 'sg-nav',
                components: {},
                onSelect: function(id){}
            },
            options
        ),

        element: element,

        //
        // Initialize
        //

        _init: function(){
            this._initView();
            return this;
        },

        _initView: function(){
            var html = window['JST']['client/views/nav.handlebars'](this.options.components);
            this.element.html(html);
            this.element.addClass(this.options.cssClass);
            this.element.find('a').click($.proxy(this._onSelect, this));
        },

        _onSelect: function(event){
            event.preventDefault();
            var id = $(event.currentTarget).attr('href').replace('#!', '');
            this.options.onSelect(id);

        }

    }._init();
};