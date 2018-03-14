angular.module('starter.services', [])

    .service('LoginService', function($q) {
        return {
            loginUser: function(name, pw) {
                var deferred = $q.defer();
                var promise = deferred.promise;

                if (name == 'Admin' && pw == 'Admin') {
                    deferred.resolve('Welcome ' + name + '!');
                } else {
                    deferred.reject('Wrong credentials.');
                }
                promise.success = function(fn) {
                    promise.then(fn);
                    return promise;
                }
                promise.error = function(fn) {
                    promise.then(null, fn);
                    return promise;
                }
                return promise;
            }
        }
    })

.factory('Restaurants', function($q) {

  var userData = {};
  //Initialize db
  var db = new PouchDB('restaurants')
  var remoteCouch = "http://localhost:8100/restaurants";

  //Sync db
  

  return {
    choose: function(restaurant) {
      //save the restaurant like as a doc in CouchDB
      var likes = {
        _id: userData.data.username,
        likes: restaurant.name
      };

      //Check if doc exists, and update it
      var abc = db.get(userData.data.username).then(function(doc) {
        //Ignore already liked restaurant
        likedRestaurants = doc.likes.split(",");
        if(likedRestaurants.indexOf(restaurant.name) > -1) {
          console.log("You got it");
          return;
        }
        return db.put({_id:userData.data.username, likes:doc.likes+","+restaurant.name, _rev:doc._rev});
      });

      abc.then(function(resp) {
        console.log("doc updated");
        console.log(resp);
      });

      //If not, add a new one
      abc.catch(function(err) {
        console.log("doc doesn't exist");
        db.put({_id:userData.data.username, likes:restaurant.name}).then(function(doc) {
          console.log("doc created");
          console.log(doc);
        }).catch(function(err2) {
          console.log("doc could not be created");
          console.log(err2);
        })
      });
    },
    get: function() {
      var deferred = $q.defer();
      //Return all the docs
      db.allDocs({include_docs:true, descending:true}).then(function(doc) {
       console.log("docs fetched");
       favorites = [];
       for(i=0;i<doc.rows.length;i++) {
        name = doc.rows[i].doc._id.split("@")[0];
        likes = doc.rows[i].doc.likes;
        photo = "https://outlook.office365.com/EWS/Exchange.asmx/s/GetUserPhoto?email=" + doc.rows[i].doc._id + "&size=HR64x64";
        favorites.push({name: name, likes: likes, photo: photo});
       }
       console.log("fav");
       console.log(favorites);
       deferred.resolve(favorites);
     }).catch(function(err) {
      console.log("Error fetching docs");
      console.log(err);
     })
     return deferred.promise;
    },
    saveCurrentSessionInfo: function(data, photo) {
      console.log("Saving");
      userData = {data: data, photo: photo};
      console.log(userData);
    }
  };
});