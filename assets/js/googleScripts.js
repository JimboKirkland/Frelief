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
var map;
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 33.744513, lng: -84.390400},
    zoom: 12,
    disableDefaultUI: true,
    zoomControl: true
  });
  var infoWindow = new google.maps.InfoWindow;
  var geocoder = new google.maps.Geocoder();
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

    address = childSnapshot.val().address+", "+childSnapshot.val().city+", "+childSnapshot.val().state+", "+childSnapshot.val().zip;

  geocoder.geocode({'address': address}, function(results, status) {
    if (status === 'OK') {
      var marker = new google.maps.Marker({
        map: resultsMap,
        position: results[0].geometry.location,
      });
      var currentInfoWindow = null;
      var infowindow = new google.maps.InfoWindow({
          content: contentString
          });
      google.maps.event.addListener(marker, 'click', function() {
        if (currentInfoWindow != null) {
          currentInfoWindow.close();
        }
        infowindow.open(map, marker);
        currentInfoWindow = infowindow;
      });
    } else {
      console.log('Geocode was not successful for the following reason: ' + status);
    }
    });
  });
}

//HTML5 geolocation
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(function(position) {
    var pos = {
      lat: position.coords.latitude,
      lng: position.coords.longitude
    };
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
