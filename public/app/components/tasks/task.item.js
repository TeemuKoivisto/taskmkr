TaskMkrApp.directive("taskItem", function() {
	return {
		restrict: "E",
		template:
					'<div class="task-item">'+
						'<p class="flex-row-sb">'+
							'<span>#{{ task.task_id }} {{ task.title }}</span>'+
							'<button class="btn" ng-click="toggle()">Done</button>'+
						'</p>'+
						'<p ng-if="task.description">DESCRIPTION: {{ task.description }}</p>'+
						'<p ng-if="task.priority">PRIORITY: {{ task.priority }}</p>'+
						'<p ng-if="task.tags">TAGS: {{ task.tags }}</p>'+
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
				console.log("hei");
			}
		}
	}
})