function IndexController(){
	
}

function IndexConfig($stateProvider){
	$stateProvider.state('home',{
		url: '/',
		templateUrl: 'pages/index/index.tpl.html',
		controller: IndexController,
		controllerAs: 'ctrl'
	});
}

angular.module('styleApp.index', ['ui.router'])
	.config(['$stateProvider', IndexConfig])

;