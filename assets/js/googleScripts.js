  
      // Note: This example requires that you consent to location sharing when
      // prompted by your browser. If you see the error "The Geolocation service
      // failed.", it means you probably did not give permission for the browser to
      // locate you.
      var map, infoWindow;
      function initMap() {
        map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: -34.397, lng: 120.644},
          zoom: 6 
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
  var address = childSnapshot.val().address;
   var contactName = childSnapshot.val().contactName;
   var contentString = '<div id="providerPanelBox" class="providerpanelbox clearfix js-provider-panel-box">'+
            '<div id="provider_panel" class="provider_panel clearfix js-provider_panel">'+
            ' <div id="provider_img" class="providerimg js-provider_img">'+
            '</div>' +
            '<div id="bodyContent">'+
            '<div id="provider_info" class="element js-provider_info">' +
            ' <p id="provider_miles" class="provider_miles js-provider_miles"><em>'+ contactName+ '</em></p>'+
            ' <p id="provider_heading" class="provider_heading js-provider_heading">Name of Service provider here</p>'+
            ' </div>'+
            '</div>'+
            '</div>';

            var infowindow = new google.maps.InfoWindow({
          content: contentString
        });


  geocoder.geocode({'address': address}, function(results, status) {
    if (status === 'OK') {
      resultsMap.setCenter(results[0].geometry.location);
      var marker = new google.maps.Marker({
        map: resultsMap,
        position: results[0].geometry.location,
        title: contactName
      });
       marker.addListener('click', function() {
          infowindow.open(map, marker);
        });
      
    } else {
      alert('Geocode was not successful for the following reason: ' + status);
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
            infoWindow.setContent('Location found.');
            infoWindow.open(map);
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
      

   