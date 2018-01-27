var APIKey = "69112145ca09c1f0";

// Here we are building the URL we need to query the database
var queryURL = "http://api.wunderground.com/api/"+APIKey+"/conditions/q/GA/Atlanta.json";

// Here we run our AJAX call to the OpenWeatherMap API
$.ajax({
    url: queryURL,
    method: "GET"
  }).done(function(response) {
    console.log(response);
    $('#weather-icon').html("<img src='"+response.current_observation.icon_url+"'>");
    $('#weather-temp').text(response.current_observation.temp_f);
    $('#weather-weather').text(response.current_observation.weather);
  });
