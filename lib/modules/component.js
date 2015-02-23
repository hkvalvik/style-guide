window.Geta.SG.Component = function(element, options) {
    return {

        //
        // Attributes
        //

        element: element,

        options: $.extend(
            {
                cssClass: 'sg-component',
                responsive: {
                    // Example:
                    // small: 'images/320',
                    // medium: 'images/768',
                    // large: 'images/1440'
                }
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
                    responsive: this.options.responsive,
                    onSelect: $.proxy(this._compare, this)
                }
            );
        },

        _initDesignComparator: function(){
            var element = $('<div></div>').appendTo(this._container);
            this._designComparator = new Geta.SG.DesignComparator(element);
        },

        _compare: function(imageSrc){
            this._designComparator.compare(this.element, imageSrc);
        }


        /*
        element: element,

        options: $.extend(
            {},
            options
        ),

        _container: null,

        _overlay: null,

        _buttonContainer: null,

        _iframe: null,

        _image: null,

        _init: function(){
            this._overlay = element.data('sg-overlay');
            this._createContainer();
            this._createButtonContainer();
            this._createImage();
            this._createIframe();
            this._createImageOpacitySlider();
            this._createToggleButtons();
            this._showTemplateInfo();
            return this;
        },

        _createContainer: function() {
            this._container = $('<div></div>')
                .addClass('sg-container')
                .insertAfter(this.element);
            this.element
                .appendTo(this._container);
        },

        _createButtonContainer: function() {
            this._buttonContainer = $('<div></div>')
                .addClass('sg-button-container')
                .appendTo(this._container)
        },

        _createIframe: function() {
            this._iframe = $('<iframe></iframe>')
                .addClass('sg-iframe')
                .hide()
                .appendTo(this._container);
        },

        _createImageOpacitySlider: function() {
            this._imageOpacitySlider = $('<input type="range" />')
                .addClass('sg-image-opacity-slider')
                .change($.proxy(this._changeImageOpacity, this))
                .appendTo(this._buttonContainer);
        },

        _createImage: function() {
            this._image = $('<img />')
                .addClass('sg-design-overlay-image')
                .hide()
                .appendTo(this._container);
        },

        _createToggleButtons: function() {
            for(var type in this._overlay){
                var image = this._overlay[type];
                this._createToggleButton(type, image);
            }
        },

        _createToggleButton: function(type, image){
            var toggle = $('<button></button>')
                .addClass('sg-design-overlay-button')
                .text(type.charAt(0).toUpperCase())
                .on('click', $.proxy(this._toggleOverlay, this, type))
                .appendTo(this._buttonContainer);
        },

        _showTemplateInfo: function() {
            // Shows info about the `data-template`
            var template_el = this.element.closest('[data-template]')
            var row_el = this.element.closest('[data-row-name]')
            var info_el = $('<div></div>').addClass('template-info')

            if (row_el.length) {
                var row_name = row_el.data('row-name')

                var toggle_row_el = $('<div class="toggle-row-name-filter">'+row_name+'</div>')
                toggle_row_el.click( $.proxy(this._toggleHashRowFilter, this, row_name ) )
                info_el.append(toggle_row_el)
            }

            if (template_el.length) {
                var template_name = template_el.data('template')
                var base_name = new String(template_name).substring(template_name.lastIndexOf('/') + 1);
                if(base_name.lastIndexOf(".") != -1) {
                    base_name = base_name.substring(0, base_name.lastIndexOf("."));
                }
                info_el.append( $('<div>'+base_name+'</div>') )
            }

            this._buttonContainer.append(info_el)
        },

        _toggleHashRowFilter: function(row_name) {
            // Toggles `row_name` using `SG.HashRowFilter`
            var row_names = document.location.hash
                .replace('#', '')
                .split(',')
                .map(function(row_name) {
                    return row_name.trim()
                })
                .filter(function(row_name) {
                    return row_name
                })

            var row_name_idx = row_names.indexOf(row_name)

            if (row_name_idx == -1) {
                // Add `row_name` to hash-location
                row_names.push(row_name)
            }
            else {
                // Remove `row_name` from hash-location
                row_names.splice(row_name_idx, 1)
            }

            var location_hash = '#'+row_names.join(',')
            //console.log(row_name, row_name_idx, location_hash, row_names)
            document.location.hash = location_hash
        },

        _toggleOverlay: function(type, event) {
            event.preventDefault();
            var button = $(event.currentTarget);
            this._buttonContainer.find('.on').removeClass('on');
            button.addClass('on');
            this._showImage(type);
        },

        _showImage: function(type){
            var size = this._overlay[type];
            var imageFile = $.isPlainObject(size) ? size.image : size;
            var iframeWidth = $.isPlainObject(size) ? size.iframeWidth : null;
            var image = this._image;
            var path = [this.options.overlayImagePath, imageFile].join('/') + '.' + this.options.ext;
            if(image.is(':visible') && this._image.attr('src') == path){
                image.hide();
                this._iframe.hide();
            }
            else {
                image.show();
                image.attr('src', path);
                image.on('load', $.proxy(this._showIframe, this, iframeWidth));
                this._iframe.show();
            }
        },

        _showIframe: function(iframeWidth, event){
            var html = '';
            html += '<head>';
            html += $('head').html();
            html += '</head>';
            html += '<body style="overflow: hidden; width: '+this._image.width()+'px; min-width: 0;">';

            //html += $('<div></div>').append(this.element.clone()).html();
            html += this.element.data('raw-html')

            html += '</body>';
            this._iframe.attr('srcdoc', html);
            this._iframe.width(iframeWidth ? iframeWidth : this._image.width());
            this._iframe.height(this._image.height());
        },

        _changeImageOpacity: function(event) {
            var opacity = $(event.currentTarget).val() / 100;
            this._image.css('opacity', opacity);
        }
        */

    }._init();
};