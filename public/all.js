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

TaskMkrApp.controller("BoardController", function() {
  
})
TaskMkrApp.controller("GuideController", function() {
  var vm = this;
})
TaskMkrApp.controller("KeymapController", function(KeymapService) {
  var vm = this;
  
  KeymapService.getKeymaps()
  .then(function(keymaps) {
    vm.keymaps = keymaps;
  })
})
TaskMkrApp.service("KeymapService", function($http) {
  this.keymaps = [
    {
      name: "task_id",
      type: "Number"
    },
    {
      name: "title",
      type: "String"
    },
    {
      name: "description",
      type: "String"
    },
    {
      name: "priority",
      type: "Number"
    },
    {
      name: "tags",
      type: "Array<String>"
    },
  ];
  
  this.getKeymaps = function() {
    return Promise.resolve(this.keymaps);
  }
})
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
TaskMkrApp.controller('TasksController', function(TasksService, tasks) {
    var vm = this;
    
  vm.taskit = tasks;
  vm.top_priority = TasksService.getTopPriority();
  
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

TaskMkrApp.directive("taskCreator", function(TasksService) {
  return {
    restrict: "E",
    template: "<div>"+
          "<p>Start with #id/'new' or have it generated automatically. Right after that write your title and then every property of your task separating keys with colon (:). End property with linebreak (enter).</p>"+
          "<textarea class='task-creator-input' ng-model='body'>"+
          "</textarea>"+
          "<button ng-click='createTask()'>Create</button>"+
          "<button ng-click='updateTask()'>Update</button>"+
          "<button ng-click='log()'>Log</button>"+
          "</div>",
    scope: {
      tasks: "="
    },
    link: function(scope, element, attrs) {
      var newTask = {}, index = 0;
            
      var keyTypeMap = [
        {
          keys: ["tags"],
          type: "array"
        },
        {
          keys: ["assigned to"],
          type: "array"
        },
        {
          keys: ["requires"],
          type: "array"
        },
        {
          keys: ["dod"],
          type: "array"
        },
        {
          keys: ["description"],
          type: "string"
        },
        {
          keys: ["priority"],
          type: "number"
        },
        {
          keys: ["time estimate"],
          type: "number-number"
        },
      ];
      
      var findKey = function(key) {
        //Logtask.append("findKey: key " + key);
        for(var i = 0; i < keyTypeMap.length; i++) {
          if (keyTypeMap[i].keys.indexOf(key) !== -1) {
            return keyTypeMap[i];
          }
        }
        return "";
      }
      
      var parseKeyContent = function(key) {
        //Logtask.start("parseKeyContent: key " + key);
        //Logtask.append("index " + index);
        //Logtask.append("key " + JSON.stringify(key));
        // var key = findKey(key);
        var content = "";
        if (key.type === "string" || key.type === "number") {
          while(index !== scope.body.length) {
            var character = scope.body.charAt(index++);
            if (character === "\n") {
              content = key.type === "number" ? parseFloat(content) : content;
              break;
            } else {
              content += character;
            }
          }
        } else if (key.type === "array") {
          var current = "", content = [];
          while(index !== scope.body.length) {
          // while(true) {
            var character = scope.body.charAt(index++);
            // skip whitespaces?
            if (character === "," || index === scope.body.length) {
              current += character === "," ? "" : character;
              content.push(current)
              current = "";
            } else if (character === "\n") {
              content.push(current)
              break;
            } else if (character === " " && current === "") {
              // pass the first whitespace
            } else {
              current += character;
            }
          }
        } else if (key.type === "number-number") {
          var current = "", unit = "", content = [];
          while(index !== scope.body.length) {
          // while(true) {
            var character = scope.body.charAt(index++);
            if (character === "\n" || index === scope.body.length) {
              if ((character >= '0' && character <= '9') || character === '.') {
                current += character;
              } else {
                unit += character;
              }
              current = parseFloat(current)
              content.push(current)
              content.push(unit)
              break;
            } else if (character === "-") {
              current = parseFloat(current);
              content.push(current)
              current = "";
            } else if ((character >= '0' && character <= '9') || character === '.') {
              current += character;
            } else if (character === " " && current === "") {
              // pass the first whitespace
            } else {
              unit += character;
            }
          }
          var contentObj = {};
          if (content.length>0) {
            contentObj.min = content[0];
          }
          if (content.length>1) {
            contentObj.max = content[1];
          }
          if (content.length>2) {
            contentObj.unit = content[2];
          }
          content = contentObj;
        }
        console.log("content " + content)
        //Logtask.end("FROM parseKeyContent: content " + content);
        return content;
            }
      
            var checkForKey = function() {
        //Logtask.start("checkForKey: ");
        //Logtask.append("index " + index);
        var key = "";
        for(; index < scope.body.length; index++) {
          var character = scope.body.charAt(index);
          if (character !== ":") {
            key += character;
          } else {
            index++;
            break;
          }
        }
        //Logtask.append("index " + index);
        //Logtask.end("FROM checkForKey: " + key.toLowerCase());
        return key.toLowerCase();
            }
            
      // var readLine = function(index) {
        // var line = "";
        // while(scope.body[index] !== "\n") {
          // line += scope.body[index++];
        // }
        // return line;
      // }
      
      var readFirstLine = function() {
        var now = scope.body[index], id = "", iding = false, title = "";
        while(now !== "\n" && index !== scope.body.length) {
          if (now === "#" && index === 0) {
            iding = true;
          } else if (iding) {
            if (now === " ") {
              // title = "";
              iding = false;
            } else {
              id += now;
            }
          } else {
            title += now;
          }
          index++
          now = scope.body[index];
        }
        index++;
        if (id === "") {
          id = TasksService.getNextId();
          // TasksService.getNextId()
          // .then(function(id) {
            // id = id;
          // })
        } else {
          id = parseInt(id);
        }
        return { task_id: id, title: title };
      }
      
      scope.updateTask = function() {}
      
            scope.createTask = function() {
        //Logtask.start("createTask: ");
                if (typeof scope.body === "undefined") {
                    return;
                }
                index = 0;
                newTask = {}, counter = 0;
        debugger;
        newTask = readFirstLine();
        // index = firstline.index;
        // debugger;
        while(counter !== 250 && index !== scope.body.length) {
          // console.log("index " + index + " body len " + scope.body.length)
          counter++;
          var key = checkForKey();
          key = findKey(key);
          if (key) {
            // debugger;
            var content = parseKeyContent(key);
            var whitespaceRemoved = key.keys[0].replace(" ", "_");
            newTask[whitespaceRemoved] = content;
          }
        }
                scope.tasks.push(newTask);
        console.log("newTask ", newTask);
        TasksService.saveTask(newTask);
        //Logtask.end("FROM createTask: newTask " + newTask);
            }
      
      scope.log = function() {
        console.log("", scope.tasks)
      }
    }
  }
})