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