// We use an "Immediate Function" to initialize the application to avoid leaving anything behind in the global scope
(function () {

    var homeTpl = Handlebars.compile($("#home-tpl").html());
    var employeeListTpl = Handlebars.compile($("#employee-list-tpl").html());

    /* ---------------------------------- Local Variables ---------------------------------- */
    var service = new EmployeeService();
    service.initialize().done(function () {
        renderHomeView();
    });

    /* ---------------------------------- Local Functions ---------------------------------- */
    function findByName() {
        service.findByName($('.search-key').val()).done(function (employees) {
            $('.content').html(employeeListTpl(employees));
        });
    }

    StatusBar.overlaysWebView( false );
    StatusBar.backgroundColorByHexString('#fff');
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

    function renderHomeView() {

        $('body').html(homeTpl());
        $('.search-key').on('keyup', findByName);
    }

}());
