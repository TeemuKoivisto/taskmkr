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