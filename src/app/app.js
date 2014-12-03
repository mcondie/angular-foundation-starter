function AppConfig($urlRouterProvider){
	$urlRouterProvider.otherwise("/");
}

angular.module('styleApp', ['ui.router', 'mm.foundation', 'styleApp.index', 'styleApp.sink'])
	.config(['$urlRouterProvider', AppConfig])
;