var app = angular.module('myApp', []);
app.controller('myController', function ($scope) {

    const socket = io('http://localhost:8000'); 
            socket.on('user-count', function (count) {
                $scope.userCount = count;
                $scope.$apply();
            });

    
    function updateTime() {
        var date = new Date();
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12;
        minutes = minutes < 10 ? '0' + minutes : minutes;
        $scope.currentTime = hours + ':' + minutes + ' ' + ampm;
    }

    updateTime();
    setInterval(updateTime, 1000);
});