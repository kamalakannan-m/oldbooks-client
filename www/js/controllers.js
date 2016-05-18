angular.module('oldbook.controllers', [])

.controller('loginCtrl', function($scope, $state, Auth, BookService, $rootScope, $localStorage) {
    if ($localStorage.token) {
        $state.go('tab.home');
    }
    $scope.login = function(userdata) {
        Auth.login(userdata, success, success);

        function success(data) {
            $localStorage.token = data.token;
            $state.go('tab.home');
        }
    }
})

.controller('signupCtrl', function($scope, $state, Auth) {
    $scope.signup = function(userdata) {
        Auth.signup(userdata, success, success);
    }

    function success(data) {
        $state.go('tab.home');
    }
})

.controller('fpasswordCtrl', function($scope) {

})

.controller('chnPwdCtrl', function($scope, $state, Auth) {
    $scope.changepwd = function(userdata) {
        Auth.changepwd(userdata, success, success);
    }

    function success(data) {
        $state.go('tab.home');
    }
})

.controller('tabCtrl', function($scope, Auth, BookService) {
    BookService.initialload({}, success, success);

    function success(data) {
        $scope.menus = data;
    }
    $scope.showSubItem = function() {
        $scope.subItem = true;
    };
})

.controller('homeCtrl', ['$scope', '$stateParams', 'BookService', function($scope, $stateParams, BookService) {
    $scope.searched = false;
    BookService.search({}, success, success);

    function success(data) {
        $scope.relatedBooks = data;
        $scope.recentBooks = data;
    }
    $scope.searchbook = function(data) {
        $scope.searched = true;
        $scope.searchResult = $scope.recentBooks;
        console.log(data);
    }
}])

.controller('sideNavCtrl', function($scope, $ionicSideMenuDelegate) {

})

.controller('NavController', function($scope, $ionicSideMenuDelegate) {
    $scope.toggleLeft = function() {
        $ionicSideMenuDelegate.toggleLeft();
    };
})

.controller('favCtrl', function($scope,BookService) {

    $scope.showDelete = false;
    $scope.showMove = false;
    BookService.search({}, success, success);

    function success(data) {
        $scope.favBooks = data;
    }

    $scope.deleteBook = function($index) {
        $scope.favBooks.splice($index, 1);
    };

    $scope.moveBook = function(book, fromIndex, toIndex) {
        $scope.favBooks.splice(fromIndex, 1);
        $scope.favBooks.splice(toIndex, 0, book);
    };

})

.controller('searchCtrl', function($scope) {

})

.controller('postBookCtrl', function($scope, Auth, $state, BookService) {
        BookService.search({}, success, success);

        function success(data) {
            $scope.allbooks = data;
        }
        $scope.postbook = function(book) {
            book.bookid = "5736d32541b406c8f834d50c";
            book.user = "5736c5f941b406c8f834d50b";
            BookService.postbook(book, success, success);
        }

        function success(data) {

        }

    })
    .controller('historyCtrl', function($scope, Auth, $state, BookService) {
        BookService.userhistory({ user: "5736c5f941b406c8f834d50b" }, success, success);
        function success(data) {
            $scope.bookshistory = data[0];
            $scope.booklist=$scope.bookshistory['postedBooks'];
        }
        $scope.setActive = function(type) {
            $scope.active = type;
            if (type == 'post') {
                $scope.booklist = $scope.bookshistory['postedBooks']
            } else {
                $scope.booklist = $scope.bookshistory['requestedBooks']
            }
        }

    })

.controller('requestBookCtrl', function($scope, BookService) {
    BookService.search({}, success, success);

    function success(data) {
        $scope.allbooks = data;
    }
    $scope.requestbook = function(book) {
        book.bookid = "5736d32541b406c8f834d50c";
        book.user = "5736c5f941b406c8f834d50b";
        BookService.requestbook(book, success, success);
    }

    function success(data) {

    }
})

.controller('settingsCtrl', function($scope, $state, $localStorage) {
    $scope.signout = function() {
        delete $localStorage.token;
        $state.go('login');
    }
});
