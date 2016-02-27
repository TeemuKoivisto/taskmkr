TaskMkrApp.controller('TasksController', function(TasksService) {
    var vm = this;
    
	TasksService.getTasks()
	.then(function(tasks) {
		vm.taskit = tasks;
		vm.top_priority = TasksService.getTopPriority();
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