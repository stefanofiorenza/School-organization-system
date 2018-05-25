!
function () {
    "use strict";

    function routeConfig($urlRouterProvider, baSidebarServiceProvider) {
        $urlRouterProvider.otherwise("/home")
    }
    angular.module("BlurAdmin.pages", ["ui.router",
            'BlurAdmin.pages.home',
            "BlurAdmin.pages.users",
            "BlurAdmin.pages.device",
            "BlurAdmin.pages.resource",
            "BlurAdmin.pages.recode",
            "BlurAdmin.pages.roles",
            "BlurAdmin.pages.message",
            "BlurAdmin.pages.system",
            "BlurAdmin.pages.teaching",
            "BlurAdmin.pages.tables",
            // "BlurAdmin.pages.classTables",
            // "BlurAdmin.pages.class",
            // "BlurAdmin.pages.directory"


        ])
        .config(routeConfig)
}();