var TaskMkrApp = angular.module('TaskMkrApp', ['ui.router']);

TaskMkrApp.config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/tasks");
        
    $stateProvider
        .state('tasks', {
            url: '/tasks',
			resolve: {
				tasks: function(TasksService) {
					return TasksService.getTasks();
				}
			},
            templateUrl: 'app/components/tasks/tasks.html',
            controller: 'TasksController',
            controllerAs: 'tasks'
        })
        .state('tasks.child', {
            url: '/:childId',
            templateUrl: 'app/components/tasks/child.html',
            controller: 'TasksChildController',
            controllerAs: 'child'
        })
        .state('board', {
            url: '/board',
            templateUrl: 'app/components/board/board.html',
            controller: 'BoardController',
            controllerAs: 'board'
        })
		.state("keymap", {
			url: '/keymap',
            templateUrl: 'app/components/keymap/keymap.html',
            controller: 'KeymapController',
            controllerAs: 'keymapCtrl'
		})
		.state("guide", {
			url: '/guide',
            templateUrl: 'app/components/guide/guide.html',
            controller: 'GuideController',
            controllerAs: 'guideCtrl'
		})
});
