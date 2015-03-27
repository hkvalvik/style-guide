window.Geta.SG.DesignComparator = function(element, options){
    return {

        //
        // Attributes
        //

        options: $.extend(
            {
                cssClass: 'sg-design-comparator',
                iframeHtml: function(html){ return html; },
                iframeReady: function(iframe){}
            },
            options
        ),

        element: element,

        _iframe: null,

        _image: null,

        _iframeIsPopulated: false,

        _imageOpacityRange: null,

        //
        // Initialize
        //

        _init: function(){
            this._initView();
            this._iframe = this.element.find('iframe');
            this._image = this.element.find('img');
            this._imageOpacityRange = this.element.find('input[data-image-opacity]');
            this.element.addClass(this.options.cssClass);
            this._imageOpacityRange
                .change($.proxy(this._changeImageOpacity, this))
                .trigger('change');
            this.element.find('button[data-image-opacity]')
                .click($.proxy(this._setImageOpacity, this));
            return this;
        },

        _initView: function(){
            var html = window['JST']['client/views/design-comparator.handlebars']({
                opacity: 50
            });
            this.element.html(html);
        },

        compare: function(element, imageData){
            if(!this._iframeIsPopulated) {
                var html = $('<div></div>').append(element.clone()).html();
                html += this._getDocumentStyles();
                this._iframe.attr('srcdoc', this.options.iframeHtml(html));
                this._iframeIsPopulated = true;
                this.options.iframeReady(this._iframe);
            }

            this._iframe.width(imageData.width);
            this._iframe.height(imageData.height);

            this._image.attr('src', imageData.file);
            this._image.width(imageData.width);
            this._image.height(imageData.height);

            this.element.addClass('on');
            this.element.height(imageData.height);
        },

        cancelCompare: function(){
            this.element.removeClass('on');
            this.element.css('height', '');
        },

        //
        // Events
        //

        _setImageOpacity: function(event){
            var value = $(event.currentTarget).val();
            console.log(value)
            this._imageOpacityRange.val(value);
            this._image.css('opacity', value / 100);
        },

        _changeImageOpacity: function(event) {
            var value = $(event.currentTarget).val() / 100;
            this._image.css('opacity', value);
        },

        //
        // Helpers
        //

        _getDocumentStyles: function(){
            var styles = '';
            $('[rel="stylesheet"]').each(function(i, el){
                styles += $('<div></div>').append($(el).clone()).html();
            });
            $('style').each(function(i, el){
                styles += $('<div></div>').append($(el).clone()).html();
            });
            return styles;
        }

    }._init();
};

