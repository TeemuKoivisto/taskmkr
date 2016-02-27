TaskMkrApp.directive("taskNav", function() {
	return {
		restrict: "E",
		template:
					'<div class="task-nav flex-row">'+
						'<button>SHOW UNDONE</button>'+
						'<button>SHOW DONE</button>'+
						'<button>SHOW TOP10</button>'+
						'<button>SHOW LATEST10</button>'+
					'</div>',
		scope: {
			task: "="
		},
		link: function(scope, element, attrs) {
			
			scope.toggle = function() {
				console.log("hei");
			}
			
			// TODO
			// add filter_by <dropdown> <input>
		}
	}
})