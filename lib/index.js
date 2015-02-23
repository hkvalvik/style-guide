(function($, document){

    function initComponent(i, el){
        var element = $(el);
        var options = element.data('sg-component') || element.data('sg-overlay');
        new Geta.SG.Component(element, {responsive: options});
    }

    function init(){
        $('[data-sg-component], [data-sg-overlay]').each(initComponent);
    }

    $(document).ready(init);

}(window.jQuery, document));
