TaskMkrApp.controller("KeymapController", function(KeymapService) {
  var vm = this;
  
  KeymapService.getKeymaps()
  .then(function(keymaps) {
    vm.keymaps = keymaps;
  })
})