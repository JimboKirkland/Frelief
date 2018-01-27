// Initializing Firebase
var config = {
  apiKey: "AIzaSyDhP9dTb3yFd-UOgXgcFtCON8jIQ7KxRAw",
  authDomain: "freliefapp.firebaseapp.com",
  databaseURL: "https://freliefapp.firebaseio.com",
  projectId: "freliefapp",
  storageBucket: "freliefapp.appspot.com",
  messagingSenderId: "209625703559"
};

firebase.initializeApp(config);
var database = firebase.database();

      // Note: This example requires that you consent to location sharing when
      // prompted by your browser. If you see the error "The Geolocation service
      // failed.", it means you probably did not give permission for the browser to
      // locate you.
var map, infoWindow;

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 33.744513, lng: -84.390400},
    zoom: 12,
    disableDefaultUI: true,
    zoomControl: true
  });
  infoWindow = new google.maps.InfoWindow;

  var geocoder = new google.maps.Geocoder();

 /* document.getElementById('submit').addEventListener('click', function() {
    geocodeAddress(geocoder, map);
  });*/
  window.onload =  geocodeAddress(geocoder, map);
}

function geocodeAddress(geocoder, resultsMap) {
  database.ref().on("child_added", function(childSnapshot) {
    var offering = childSnapshot.val().offering;
    var name = childSnapshot.val().name;
    var category = childSnapshot.val().category;
    var address = childSnapshot.val().address;
    var city = childSnapshot.val().city;
    var state = childSnapshot.val().state;
    var zip = childSnapshot.val().zip;
    var contentString = "<div class='post'>"+
      "<div class='img'>"+
      "<img src='images/" + category + ".png'>"+
      "</div>"+
      "<div class='data'>"+
        "<p class='header'>" + offering + "</p>"+
        "<p>" + name + "</p>"+
        "<p>" + address + "</p>"+
        "<p>" + city + ", " + state + ", " + zip + "</p>"+
        "</div></div></div>";

            var infowindow = new google.maps.InfoWindow({
          content: contentString
        });

    //Set full address
    address = childSnapshot.val().address+", "+childSnapshot.val().city+", "+childSnapshot.val().state+", "+childSnapshot.val().zip;

    geocoder.geocode({'address': address}, function(results, status) {
      if (status === 'OK') {
        // resultsMap.setCenter(results[0].geometry.location);
        var marker = new google.maps.Marker({
          map: resultsMap,
          position: results[0].geometry.location,
        });
         marker.addListener('click', function() {
           console.log(this)
        if (this.visible == false){
          infowindow.open(map, marker);
        } else {
          infowindow.close(map, marker);
        }
          });

      } else {
        console.log('Geocode was not successful for the following reason: ' + status);
      }
    });
  });
}

  // Try HTML5 geolocation.
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(function(position) {
    var pos = {
      lat: position.coords.latitude,
      lng: position.coords.longitude
    };

    infoWindow.setPosition(pos);
    // infoWindow.setContent('Location found.');
    // infoWindow.open(map);
    map.setCenter(pos);
  }, function() {
    handleLocationError(true, infoWindow, map.getCenter());
  });
} else {
  // Browser doesn't support Geolocation
  handleLocationError(false, infoWindow, map.getCenter());
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ?
                        'Error: The Geolocation service failed.' :
                        'Error: Your browser doesn\'t support geolocation.');
  infoWindow.open(map);
}
