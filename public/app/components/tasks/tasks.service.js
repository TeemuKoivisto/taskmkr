TaskMkrApp.service('TasksService', function() {
	var nextId = 8;
    var tasks = [
        {
			task_id: 1,
			title: 'yo',
            priority: 666,
			description: 'yo yo',
			tags: ['feature', 'directive'],
			time_estimate: { min: 2, max: 4, unit: 'hour'},
			assigned: ['teemu'],
			dod: ['shit is done']
        },
        {
            task_id: 2,
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
            task_id: 3,
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
            task_id: 4,
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
            task_id: 5,
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
            task_id: 6,
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
            task_id: 7,
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