//Make map
function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 12,
    center: {lat: 33.744513, lng: -84.390400},
    disableDefaultUI: true,
  });

//Click post
$('#post-container').on('click', '.post', function(){
  var markerId = $(this).attr("value");

    //Make marker
    var marker = new google.maps.Marker({
      position: myLatLng,
      map: map,
      title: 'Hello World!'
    });
  }
})
