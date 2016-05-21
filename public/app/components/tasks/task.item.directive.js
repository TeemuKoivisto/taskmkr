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
            '<p ng-if="task.priority">PRIORITY: '+
              // {{ task.priority }}
              '<input class="priority-input" type="number" value="{{ task.priority }}"/>'+
            '</p>'+
            // '<p ng-if="task.tags">{{ task.tags }}</p>'+
            '<p ng-if="task.tags">TAGS: '+
              '<span class="task-item-tag" data-ng-repeat="tag in task.tags">'+
                '{{ tag }} <i class="icon ion-close clickable" ng-click="removeTag($index)"></i>'+
              '</span>'+
              '<button class="task-item-tag" ng-click="addTag()">Add new</button>'+
            '</p>'+
            '<p ng-if="task.requires && task.requires.length!==0">REQUIRES: {{ task.requires }}</p>'+
            '<p ng-if="task.time_estimate">TIME ESTIMATE: {{ task.time_estimate }}</p>'+
            '<p ng-if="task.assigned_to && task.assigned_to.length!==0">ASSIGNED TO: {{ task.assigned_to }}</p>'+
            '<p ng-if="task.dod && task.dod.length!==0">DoD: {{ task.dod }}</p>'+
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
      
      scope.removeTag = function(index) {
        console.log("remove tag: " + index);
      }
      
      scope.addTag = function() {
        console.log("add tag");
      }
    }
  }
})