angular.module("buginator.authController", []).config(function ($stateProvider) {
    $stateProvider.state("login", {
        url: "/login",
        templateUrl: "html/auth/login.html"
    });
}).controller("authController", function ($rootScope, $scope, $state, authService, registerService) {
    $scope.credentials = {};
    $scope.loginError = false;
    $scope.registerData = {};
    $scope.rePassword = null;
    $scope.registerError = false;
    $scope.forgotError = false;
    $scope.forgotSuccess = false;
    $scope.registerSuccess = false;

    $scope.authenticate = function (credentials) {
        authService.authenticate(credentials,
            function (returnedData) {
                $rootScope.user = returnedData;
                $scope.loginError = false;
                $rootScope.user.perms = authService.createPermissions($rootScope.user);
                $scope.credentials = {};
                //$state.go("home");
            }, function (returnedData) {
                $scope.credentials = {};
                $scope.loginError = true;
                $scope.loginErrorMsg = "Username or password is invalid.";
            });
    };

    $rootScope.$state = $state;

    $scope.login = function () {
        $scope.authenticate($scope.credentials);
    };

    var loggedError = function (returnedData) {
        $rootScope.user = null;
    };

    authService.isLogged(loggedError)
        .then(function (returnedData) {
            $rootScope.user = returnedData;
            $rootScope.user.perms = authService.createPermissions($rootScope.user);
        }, loggedError);

    $scope.logout = function () {
        authService.logout(
            function (returnedData) {
                $rootScope.user = null;
                $state.go("login");
            }, function (returnedData) {
                console.log(returnedData);
                $rootScope.user = null;
                $state.go("login");
            });
    };

    $scope.register = function () {
        registerService.register($scope.registerData,
            function (returnedData) {
                $scope.registerError = false;
                $scope.registerData = {};
                $scope.rePassword = null;
                $scope.registerSuccess = true;
                $scope.registerSuccessMsg = "Thank you for registering. Details has been sent to mail.";
                $("a[href=#login]").tab("show");
            }, function (returnedData) {
                $scope.registerError = true;
                $scope.registerSuccess = false;
                $scope.registerErrorMsg = returnedData.data.message;
            });
    };

    $scope.resetPass = function () {
        authService.remindPassword($scope.credentials.username,
            function (returnedData) {
                $scope.credentials = {};
                $scope.forgotError = false;
                $scope.forgotSuccess = true;
                $scope.forgotSuccessMsg = "Your password has been reseted and sent to mail.";
                $("a[href=#login]").tab("show");
            }, function (returnedData) {
                $scope.forgotError = true;
                $scope.forgotSuccess = false;
                $scope.forgotErrorMsg = returnedData.data.message;
            });
    }
});