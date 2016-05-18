angular.module('oldbook.services',[])
    .factory('Auth', ['$http', '$localStorage', 'urls', function($http, $localStorage, urls) {
        function urlBase64Decode(str) {
            var output = str.replace('-', '+').replace('_', '/');
            switch (output.length % 4) {
                case 0:
                    break;
                case 2:
                    output += '==';
                    break;
                case 3:
                    output += '=';
                    break;
                default:
                    throw 'Illegal base64url string!';
            }
            return window.atob(output);
        }

        function getClaimsFromToken() {
            var token = $localStorage.token;
            var user = {};
            if (typeof token !== 'undefined') {
                var encoded = token.split('.')[1];
                user = JSON.parse(urlBase64Decode(encoded));
            }
            return user;
        }

        var tokenClaims = getClaimsFromToken();

        return {
            signup: function(data, success, error) {
                $http.post(urls.BASE + 'api/signup', data).success(success).error(error)
            },
            login: function(data, success, error) {
                $http.post(urls.BASE + 'api/authenticate', data).success(success).error(error)
            },
            changepwd:function(data,success,error){
                $http.post(urls.BASE + 'api/changepwd', data).success(success).error(error)
            },
            logout: function(success) {
                tokenClaims = {};
                delete $localStorage.token;
                success();
            },
            getTokenClaims: function() {
                return tokenClaims;
            }
        };
    }])

.factory('BookService', ['$http', 'urls', function($http, urls) {
    return {
        search: function(userdata,success,error) {
            $http.post(urls.BASE + 'api/search', {}).success(success).error(error)
        },
        initialload: function(userdata,success,error) {
            $http.post(urls.BASE + 'api/initialload', {}).success(success).error(error)
        },
        postbook: function(bookdata,success,error){
            $http.post(urls.BASE + 'api/postbook', bookdata).success(success).error(error)
        },
        requestbook: function(bookdata,success,error){
            $http.post(urls.BASE + 'api/requestbook', bookdata).success(success).error(error)
        },
        userhistory: function(userdata,success,error){
            $http.post(urls.BASE + 'api/userhistory', userdata).success(success).error(error)
        }
    };
}]);
