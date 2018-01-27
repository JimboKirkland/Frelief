var map, infoWindow;

//Initial map
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 33.744513, lng: -84.390400},
    zoom: 12,
    disableDefaultUI: true,
    zoomControl: true
  });
  infoWindow = new google.maps.InfoWindow;

  var geocoder = new google.maps.Geocoder();

  window.onload =  geocodeAddress(geocoder, map);
}

var markerId = "";

//Set markers
function geocodeAddress(geocoder, resultsMap) {
  database.ref().on("child_added", function(snap) {
    var offering = snap.val().offering;
    var name = snap.val().name;
    var category = snap.val().category;
    var address = snap.val().address;
    var city = snap.val().city;
    var state = snap.val().state;
    var zip = snap.val().zip;
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
    var infowindow = new google.maps.InfoWindow({content: contentString});

    //Set full address
    address = snap.val().address+", "+snap.val().city+", "+snap.val().state+", "+snap.val().zip;
  });
}

$('#post-container').on('click', '.post', function(){
  console.log($(this).attr("value"))
  markerId = $(this).attr("value")
  geocodeAddress(geocoder)
    geocoder.geocode({'address': address}, function(results, status) {
      if (status === 'OK') {
        resultsMap.setCenter(results[0].geometry.location);
        var marker = new google.maps.Marker({
          map: resultsMap,
          position: results[0].geometry.location,
        });
      } else {
        console.log('Geocode was not successful for the following reason: ' + status);
      }
    });
  }
})

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ?
                        'Error: The Geolocation service failed.' :
                        'Error: Your browser doesn\'t support geolocation.');
  infoWindow.open(map);
}
