TaskMkrApp.controller('TasksController', function() {
    var vm = this;
    
    vm.taskit = [
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