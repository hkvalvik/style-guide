window.Geta.SG.Layout = function(element, options){
    return {

        //
        // Attributes
        //

        options: $.extend(
            {
                heading: 'Style guide'
            },
            options
        ),

        element: element,

        _nav: null,

        //
        // Initialize
        //

        _init: function(){
            var html = window['JST']['client/views/layout.handlebars']({
                heading: this.options.heading
            });
            this.element.append(html);
            this._nav = this.element.find('[data-sg-layout-nav]');
            this.element.find('[data-sg-layout-toggle-nav]').click($.proxy(this._toggleNav, this));
            return this;
        },

        _toggleNav: function(event){
            event.preventDefault();
            this._nav.toggleClass('on');
        }

    }._init();
};