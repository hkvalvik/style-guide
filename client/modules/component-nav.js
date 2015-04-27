window.Geta.SG.ComponentNav = function(element, options){
    return {

        //
        // Attributes
        //

        options: $.extend(
            {
                cssClass: 'sg-nav',
                components: {},
                onSelect: function(id){},
                toggle: null
            },
            options
        ),

        element: element,

        //
        // Initialize
        //

        _init: function(){
            this._initView();
            this.options.toggle.click($.proxy(this._toggleNav, this));
            return this;
        },

        _initView: function(){
            this.element.addClass(this.options.cssClass);
            this.element.find('a').click($.proxy(this._onSelect, this));
        },

        //
        // Events
        //

        _toggleNav: function(event){
            event.preventDefault();
            this.element.toggleClass('on');
        },

        _onSelect: function(event){
            event.preventDefault();
            var button = $(event.currentTarget);
            button.parent().addClass('selected').siblings().removeClass('selected');
            var id = button.attr('href').replace('#!', '');
            this.options.onSelect(id);
        }

    }._init();
};