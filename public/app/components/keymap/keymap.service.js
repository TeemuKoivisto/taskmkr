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