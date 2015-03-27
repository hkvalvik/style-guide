window.Geta.SG.Element = function(element, options){
    return {

        //
        // Attributes
        //

        options: $.extend(
            {
                cssClass: 'sg-element'
            },
            options
        ),

        element: element,

        //
        // Initialize
        //

        _init: function(){
            this.element.addClass(this.options.cssClass);
        }

    }._init();
};