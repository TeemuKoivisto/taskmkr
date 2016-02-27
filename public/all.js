var TaskMkrApp = angular.module('TaskMkrApp', ['ui.router']);

TaskMkrApp.config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/tasks");
        
    $stateProvider
        .state('tasks', {
            url: '/tasks',
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
});


TaskMkrApp.controller('TasksChildController', function($stateParams) {
    var vm = this;
    
    vm.childId = parseInt($stateParams.childId);

    vm.childstuff = [
        {
            name: 'children',
            priority: 666
        },
        {
            name: 'rulez',
            priority: 2
        }
    ];
})
TaskMkrApp.controller('TasksController', function(TasksService) {
    var vm = this;
    
	TasksService.getTasks()
	.then(function(tasks) {
		vm.taskit = tasks;
	})
	
	vm.parseNewTask = function(body) {
		var line = '';
		for(var i = 0; i < body.length; i++) {
			if (body.charAt(i) === '\n') {
				
			}
		}
	}
	
	vm.createTask = function() {
		console.log('', vm.newTask);
	}
})
TaskMkrApp.service('TasksService', function() {
	var nextId = 8;
    var tasks = [
        {
			id: 1,
			title: 'yo',
            priority: 666,
			description: 'yo yo',
			tags: ['feature', 'directive'],
			time_estimate: { min: 2, max: 4, unit: 'hour'},
			assigned: ['teemu'],
			dod: ['shit is done']
        },
        {
            id: 2,
			title: 'toka',
            priority: 5,
			description: 'toka',
			tags: ['feature', 'directive'],
			requires: [1],
			time_estimate: { min: 2, max: 4, unit: 'hour'},
			assigned: ['teemu'],
			dod: ['shit is done']
        },
        {
            id: 3,
			title: 'kolmas',
            priority: 5,
			description: 'kolmas',
			tags: ['feature', 'directive'],
			requires: [1],
			time_estimate: { min: 2, max: 4, unit: 'hour'},
			assigned: ['teemu'],
			dod: ['shit is done']
        },
        {
            id: 4,
			title: 'filleri',
            priority: 5,
			description: 'stuff',
			tags: ['feature', 'directive'],
			requires: [1],
			time_estimate: { min: 2, max: 4, unit: 'hour'},
			assigned: ['teemu'],
			dod: ['shit is done']
        },
        {
            id: 5,
			title: 'filleri',
            priority: 5,
			description: 'stuff',
			tags: ['feature', 'directive'],
			requires: [1],
			time_estimate: { min: 2, max: 4, unit: 'hour'},
			assigned: ['teemu'],
			dod: ['shit is done']
        },
        {
            id: 6,
			title: 'filleri',
            priority: 5,
			description: 'stuff',
			tags: ['feature', 'directive'],
			requires: [1],
			time_estimate: { min: 2, max: 4, unit: 'hour'},
			assigned: ['teemu'],
			dod: ['shit is done']
        },
        {
            id: 7,
			title: 'filleri',
            priority: 5,
			description: 'stuff',
			tags: ['feature', 'directive'],
			requires: [1],
			time_estimate: { min: 2, max: 4, unit: 'hour'},
			assigned: ['teemu'],
			dod: ['shit is done']
        }
    ];
	
	this.getNextId = function() {
		return nextId++;
	}
	
	this.getTasks = function() {
		return Promise.resolve(tasks);
	}
})
TaskMkrApp.directive('taskCreator', function(TasksService) {
	return {
		restrict: 'E',
		template: "<div>"+
					"<p>Start with #id/'new' or have it generated automatically. Right after that write your title and then every property of your task separating keys with colon (:). End property with linebreak (enter).</p>"+
					'<textarea class="task-creator-input" ng-model="body">'+
					'</textarea>'+
					'<button ng-click="createTask()">Create</button>'+
					'<button ng-click="updateTask()">Update</button>'+
					'<button ng-click="log()">Log</button>'+
				  "</div>",
		scope: {
			tasks: '='
		},
		link: function(scope, element, attrs) {
			var newTask = {}, index = 0;
            
			var keyTypeMap = [
				{
					keys: ['tags'],
					type: 'array'
				},
				{
					keys: ['assigned to'],
					type: 'array'
				},
				{
					keys: ['requires'],
					type: 'array'
				},
				{
					keys: ['dod'],
					type: 'array'
				},
				{
					keys: ['description'],
					type: 'string'
				},
				{
					keys: ['priority'],
					type: 'number'
				},
				{
					keys: ['time estimate'],
					type: 'number-number'
				},
			];
			
			var findKey = function(key) {
				//Logtask.append('findKey: key ' + key);
				for(var i = 0; i < keyTypeMap.length; i++) {
					if (keyTypeMap[i].keys.indexOf(key) !== -1) {
						return keyTypeMap[i];
					}
				}
				return '';
			}
			
			var parseKeyContent = function(key) {
				//Logtask.start('parseKeyContent: key ' + key);
				//Logtask.append('index ' + index);
				//Logtask.append('key ' + JSON.stringify(key));
				// var key = findKey(key);
				var content = '';
				if (key.type === 'string' || key.type === 'number') {
					while(index !== scope.body.length) {
						var character = scope.body.charAt(index++);
						if (character === '\n') {
							content = key.type === 'number' ? parseFloat(content) : content;
							break;
						} else {
							content += character;
						}
					}
				} else if (key.type === 'array') {
					var current = '', content = [];
					while(index !== scope.body.length) {
						var character = scope.body.charAt(index++);
						// skip whitespaces?
						if (character === ',' || index === scope.body.length) {
							current += character === ',' ? '' : character;
							content.push(current)
							current = '';
						} else if (character === '\n') {
							content.push(current)
							break;
						} else if (character === " " && current === "") {
							// pass the first whitespace
						} else {
							current += character;
						}
					}
				} else if (key.type === 'number-number') {
					var current = '', content = [];
					for(; index < scope.body.length; index++) {
						var character = scope.body.charAt(index);
						if (character === '\n') {
							index++;
							current = parseFloat(current)
							content.push(current)
							break;
						} else if (character === '-') {
							current = parseFloat(current)
							content.push(current)
							current = '';
						} else {
							content += character;
						}
					}
				}
				console.log('content ' + content)
				//Logtask.end('FROM parseKeyContent: content ' + content);
				return content;
            }
			
            var checkForKey = function() {
				//Logtask.start('checkForKey: ');
				//Logtask.append('index ' + index);
				var key = '';
				for(; index < scope.body.length; index++) {
					var character = scope.body.charAt(index);
					if (character !== ':') {
						key += character;
					} else {
						index++;
						break;
					}
				}
				//Logtask.append('index ' + index);
				//Logtask.end('FROM checkForKey: ' + key.toLowerCase());
				return key.toLowerCase();
            }
            
			// var readLine = function(index) {
				// var line = '';
				// while(scope.body[index] !== '\n') {
					// line += scope.body[index++];
				// }
				// return line;
			// }
			
			var readFirstLine = function() {
				var now = scope.body[index++], id = '', iding = false, title = '';
				while(now !== '\n') {
					if (now === '#' && index === 0) {
						iding = true;
					} else if (iding) {
						if (now === ' ') {
							// title = '';
							iding = false;
						} else {
							id += now;
						}
					} else {
						title += now;
					}
					now = scope.body[index++];
				}
				if (id === "") {
					id = TasksService.getNextId();
				} else {
					id = parseInt(id);
				}
				return { id: id, title: title };
			}
			
			scope.updateTask = function() {}
			
            scope.createTask = function() {
				//Logtask.start('createTask: ');
                if (typeof scope.body === 'undefined') {
                    return;
                }
                index = 0;
                newTask = {}, counter = 0;
				newTask = readFirstLine();
				// index = firstline.index;
				debugger;
				while(counter !== 250 && index !== scope.body.length) {
					// console.log('index ' + index + ' body len ' + scope.body.length)
					counter++;
					var key = checkForKey();
					key = findKey(key);
					if (key) {
						debugger;
						var content = parseKeyContent(key);
						var whitespaceRemoved = key.keys[0].replace(" ", "_");
						newTask[whitespaceRemoved] = content;
					}
				}
                scope.tasks.push(newTask);
				console.log('newTask ', newTask);
				//Logtask.end('FROM createTask: newTask ' + newTask);
            }
			
			scope.log = function() {
				console.log('', scope.tasks)
			}
		}
	}
})