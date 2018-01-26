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

// Button for adding provider data
$("#done").on("click", function(event) {
  event.preventDefault();

  // Grabs user input from the form
  var name = $("#name-input").val().trim();
  var offering = $("#offer-input").val();
  var category = $("#category-input").val();
  var description = $('#description-input').val();
  var address = $("#address-input").val().trim();
  var city = $("#city-input").val().trim();
  var state = $("#state-input").val().trim();
  var zip = $("#zip-input").val().trim();
  var phone  = $("#phone-input").val().trim();


  // Creates local "temporary" object for holding provider data
  var newProvider = {
    name:  name,
    offering: offering,
    category:  category,
    description: description,
    address:  address,
    city: city,
    state:  state,
    zip:  zip,
    phone: phone,
  };

  // Uploads provider data to the database
  database.ref().push(newProvider);

  // Alert
  alert("Provider successfully added");

  // Clears all of the text-boxes
  $("#name-input").val("");
  $("#offer-input").val("");
  $("#description-input").val("");
  $("#address-input").val("");
  $("#city-input").val("");
  $("#state-input").val("");
  $("#zip-input").val("");
  $("#phone-input").val("");
});
