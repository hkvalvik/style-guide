window.Geta.SG.DesignUi = function(element, options){
    return {

        //
        // Attributes
        //

        options: $.extend(
            {
                cssClass: 'sg-design-ui',
                name: null,
                images: [],
                documentation: null,
                onSelect: $.noop,
                onCancel: $.noop
            },
            options
        ),

        element: element,

        _buttonContainer: null,

        //
        // Initialize
        //

        _init: function(){
            this._initView();
            this._buttonContainer = this.element.find('[data-buttons]');
            this._buttonContainer.find('button').click($.proxy(this._onSelect, this));
            this.element.find('[data-buttons-toggle]').click($.proxy(this._toggle, this));
            return this;
        },

        _initView: function(){
            var html = window['JST']['client/views/design-ui.handlebars'](this._getViewData());
            this.element.html(html);
            this.element.addClass(this.options.cssClass);
        },

        //
        // Events
        //

        _toggle: function(event){
            event.preventDefault();
            this._buttonContainer.toggleClass('on');
            var on = this._buttonContainer.find('button.on');
            if(on.length){
                on.trigger('click');
            }
            else{
                this._buttonContainer.find('button').first().trigger('click');
            }
        },

        _onSelect: function(event){
            event.preventDefault();
            var button = $(event.currentTarget);
            var on = this.element.find('.on');
            if(on.length && button[0] == on[0]){
                this.options.onCancel();
                button.removeClass('on');
            }
            else {
                var imageData = $(event.currentTarget).val();
                imageData = JSON.parse(imageData);
                this.options.onSelect(imageData);
                button.siblings().removeClass('on');
                button.addClass('on');
            }
        },

        //
        // Helpers
        //

        _getViewData: function(){
            var images = this.options.images;
            images.sort(this._sortImages);
            return {
                name: this.options.name,
                documentation: this.options.documentation,
                images: images
            };
        },

        _sortImages: function(a, b){
            if(a.width < b.width){
                return -1;
            }
            if(a.width > b.width){
                return 1;
            }
            return 0;
        }

    }._init();
};