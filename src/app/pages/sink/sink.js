function SinkController(){
	
}

function SinkConfig($stateProvider){
	$stateProvider.state('sink',{
		url: '/sink',
		templateUrl: 'pages/sink/sink.tpl.html',
		controller: SinkController,
		controllerAs: 'ctrl'
	});
}

angular.module('styleApp.sink', ['ui.router'])
	.config(['$stateProvider', SinkConfig])

;