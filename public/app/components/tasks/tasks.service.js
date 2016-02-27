TaskMkrApp.service('TasksService', function($http) {
    this.tasks = [
        // {
			// task_id: 1,
			// title: 'yo',
            // priority: 666,
			// description: 'yo yo',
			// tags: ['feature', 'directive'],
			// time_estimate: { min: 2, max: 4, unit: 'hour'},
			// assigned_to: ['teemu'],
			// dod: ['shit is done']
        // },
        // {
            // task_id: 2,
			// title: 'toka',
            // priority: 5,
			// description: 'toka',
			// tags: ['feature', 'directive'],
			// requires: [1],
			// time_estimate: { min: 2, max: 4, unit: 'hour'},
			// assigned_to: ['teemu'],
			// dod: ['shit is done']
        // },
        // {
            // task_id: 3,
			// title: 'kolmas',
            // priority: 5,
			// description: 'kolmas',
			// tags: ['feature', 'directive'],
			// requires: [1],
			// time_estimate: { min: 2, max: 4, unit: 'hour'},
			// assigned_to: ['teemu'],
			// dod: ['shit is done']
        // },
        // {
            // task_id: 4,
			// title: 'filleri',
            // priority: 5,
			// description: 'stuff',
			// tags: ['feature', 'directive'],
			// requires: [1],
			// time_estimate: { min: 2, max: 4, unit: 'hour'},
			// assigned_to: ['teemu'],
			// dod: ['shit is done']
        // },
        // {
            // task_id: 5,
			// title: 'filleri',
            // priority: 5,
			// description: 'stuff',
			// tags: ['feature', 'directive'],
			// requires: [1],
			// time_estimate: { min: 2, max: 4, unit: 'hour'},
			// assigned_to: ['teemu'],
			// dod: ['shit is done']
        // },
        // {
            // task_id: 6,
			// title: 'filleri',
            // priority: 5,
			// description: 'stuff',
			// tags: ['feature', 'directive'],
			// requires: [1],
			// time_estimate: { min: 2, max: 4, unit: 'hour'},
			// assigned_to: ['teemu'],
			// dod: ['shit is done']
        // },
        // {
            // task_id: 7,
			// title: 'filleri',
            // priority: 5,
			// description: 'stuff',
			// tags: ['feature', 'directive'],
			// requires: [1],
			// time_estimate: { min: 2, max: 4, unit: 'hour'},
			// assigned_to: ['teemu'],
			// dod: ['shit is done']
        // }
    ];
	
	this.getTopPriority = function() {
		// if (this.tasks.length === 0) {
			// return 1;
		// }
		var top = this.tasks[0];
		for(var t = 0; t < this.tasks.length; t++) {
			if (this.tasks[t].priority > top.priority) {
				top = this.tasks[t];
			}
		}
		// console.log
		return top;
	}
	
	this.getNextId = function() {
		function compare(a, b) {
			if (a.task_id > b.task_id) {
				return 1;
			} else if (b.task_id > a.task_id) {
				return -1;
			} else {
				return 0;
			}
		}
		this.tasks.sort(compare);
		if (this.tasks.length === 0) {
			return 1;
		} else {
			return this.tasks[this.tasks.length-1].task_id+1;
		}
	}
	
	// this.getNextId = function() {
		// return $http.get("/task/lastid")
		// .then(function(task) {
			// console.log("got task ", task);
			// return task.data.task_id+1;
		// })
		// .catch(function(err) {
			// console.log("Error in TasksService getNextId " + err);
			// return [];
		// })
	// }
	
	// this.getTasks = function() {
		// return Promise.resolve(tasks);
	// }
	
	this.getTasks = function() {
		var context = this;
		return $http.get("/task/all")
		.then(function(tasks) {
			console.log("got tasks ", tasks);
			context.tasks = tasks.data;
			return tasks.data;
		})
		.catch(function(err) {
			console.log("Error in TasksService getTasks " + err);
			return [];
		})
	}
	
	this.saveTasks = function(tasks) {
		
	}
	
	this.saveTask = function(task) {
		$http.post("/task", task)
		.then(function(res) {
			console.log("saveTask was success ", res);
		})
		.catch(function(err) {
			console.log("Error in TaskService saveTask " + err);
		})
	}
})
