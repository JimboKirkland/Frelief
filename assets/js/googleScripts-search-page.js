var map;
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 33.744513, lng: -84.390400},
    zoom: 12,
    disableDefaultUI: true,
    zoomControl: true
  });
  var geocoder = new google.maps.Geocoder();
  var markers = [];
$('#post-container').on('click', '.post', function(resultsMap){
  var markerId = $(this).attr("value");
  database.ref(markerId).on("value", function(snap) {
  var addressId = snap.val().address+", "+snap.val().city+", "+snap.val().state+", "+snap.val().zip;
    geocoder.geocode({'address': addressId}, function(results, status){
      if (status == google.maps.GeocoderStatus.OK){
        map.setCenter(results[0].geometry.location);
        var latitude = results[0].geometry.location.lat();
        var longitude = results[0].geometry.location.lng();
        var myLatLng = {lat: latitude, lng: longitude};
        function addMarker(){
          var marker = new google.maps.Marker({
            map: map,
            position: myLatLng,
            center: myLatLng,
            animation: google.maps.Animation.DROP,
          });
          markers.push(marker);
        }
        addMarker();
      }
    })
  });
});
$('#close').on('click', function(){
  markers[0].setMap(null)
  markers = [];
  initMap();
})
}
