// We use an "Immediate Function" to initialize the application to avoid leaving anything behind in the global scope
(function () {

    HomeView.prototype.template = Handlebars.compile($("#home-tpl").html());
    EmployeeListView.prototype.template = Handlebars.compile($("#employee-list-tpl").html());

    /* ---------------------------------- Local Variables ---------------------------------- */
    var service = new EmployeeService();
    service.initialize().done(function () {
        $('body').html(new HomeView(service).render().$el);
    });

    /* ---------------------------------- Local Functions ---------------------------------- */
    
    StatusBar.overlaysWebView( false );
    StatusBar.backgroundColorByHexString('#ffffff');
    StatusBar.styleDefault();

    document.addEventListener('deviceready', function() {
        if (navigator.notification) {
            window.alert = function ( message ) {
                navigator.notification.alert(
                    message, 
                    null,
                    "Workshop", 
                    "Ok"
                );
            };
        }
        FastClick.attach(document.body);
    }, false);

}());
