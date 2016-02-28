TaskMkrApp.directive("taskItem", function() {
	return {
		restrict: "E",
		template:
					'<div class="task-item">'+
						'<p class="flex-row-sb">'+
							'<span>#{{ task.task_id }} {{ task.title }}</span>'+
							'<span>'+
								'<button class="" ng-click="toggle()">Done</button>'+
								'<button class="" ng-click="edit()">Edit</button>'+
							'</span>'+
						'</p>'+
						'<p ng-if="task.description">DESCRIPTION: {{ task.description }}</p>'+
						'<p ng-if="task.priority">PRIORITY: {{ task.priority }}</p>'+
						// '<p ng-if="task.tags">{{ task.tags }}</p>'+
						'<p ng-if="task.tags">TAGS: '+
							'<span class="task-item-tag" data-ng-repeat="tag in task.tags">'+
								'{{ tag }}'+
							'</span>'+
							'<button class="task-item-tag">Add new</button>'+
						'</p>'+
						'<p ng-if="task.requires">REQUIRES: {{ task.requires }}</p>'+
						'<p ng-if="task.time_estimate">TIME ESTIMATE: {{ task.time_estimate }}</p>'+
						'<p ng-if="task.assigned_to">ASSIGNED TO: {{ task.assigned_to }}</p>'+
						'<p ng-if="task.dod">DoD: {{ task.dod }}</p>'+
					'</div>',
		scope: {
			task: "="
		},
		link: function(scope, element, attrs) {
			
			scope.toggle = function() {
				console.log("done");
			}
			
			scope.edit = function() {
				console.log("edit");
			}
		}
	}
})