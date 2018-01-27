//Make map
function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 12,
    center: {lat: 33.744513, lng: -84.390400},
    disableDefaultUI: true,
  });
  var infoWindow = new google.maps.InfoWindow;
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
var geocoder = new google.maps.Geocoder();



//Click post
$('#post-container').on('click', '.post', function(){
  var markerId = $(this).attr("value");

  function geocodeAddress(geocoder, resultsMap) {
    database.ref(markerId).on("child_added", function(childSnapshot) {
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
          resultsMap.setCenter(results[0].geometry.location);
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

    //Make marker
    // var marker = new google.maps.Marker({
    //   position: myLatLng,
    //   map: map,
    //   title: 'Hello World!'
    // });
  })

}
