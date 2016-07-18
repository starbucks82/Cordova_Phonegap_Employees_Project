// We use an "Immediate Function" to initialize the application to avoid leaving anything behind in the global scope
(function () {

    HomeView.prototype.template = Handlebars.compile($("#home-tpl").html());
    EmployeeListView.prototype.template = Handlebars.compile($("#employee-list-tpl").html());
    EmployeeView.prototype.template = Handlebars.compile($("#employee-tpl").html());

    /* ---------------------------------- Local Variables ---------------------------------- */
    var service = new EmployeeService();
    var slider = new PageSlider($('body'));

    service.initialize().done(function () {
        router.addRoute('', function() {
            slider.slidePage(new HomeView(service).render().$el);
        });

        router.addRoute('employees/:id', function(id) {
            service.findById(parseInt(id)).done(function(employee) {
                slider.slidePage(new EmployeeView(employee).render().$el);
            });
        });

        router.start();
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
