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
$("#done").on("click", function() {
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
  var date = moment().format("MMM Do");

//Require input field to be filled
  if (name == ""){
    $('#name-input').css("border", "2px solid red");
     setTimeout(function(){
      $('#name-input').css("border", "2px solid #f8f8f8")
    }, 500)
  }
  if (offering == ""){
    $('#offer-input').css("border", "2px solid red");
     setTimeout(function(){
      $('#offer-input').css("border", "2px solid #f8f8f8")
    }, 500)
  }
  if (category == "Select Category"){
    $('select').css({"background": "url('images/select-arrows.svg') red", "background-repeat": "no-repeat", "background-position": "right center"});
     setTimeout(function(){
      $('select').css({"background": "url('images/select-arrows.svg') #f8f8f8", "background-repeat": "no-repeat", "background-position": "right center"})
    }, 500)
  }
  if (description == ""){
    $('#description-input').css("border", "2px solid red");
     setTimeout(function(){
      $('#description-input').css("border", "2px solid #f8f8f8")
    }, 500)
  }
  if (address == ""){
    $('#address-input').css("border", "2px solid red");
     setTimeout(function(){
      $('#address-input').css("border", "2px solid #f8f8f8")
    }, 500)
  }
  if (city == ""){
    $('#city-input').css("border", "2px solid red");
     setTimeout(function(){
      $('#city-input').css("border", "2px solid #f8f8f8")
    }, 500)
  }
  if (state == ""){
    $('#state-input').css("border", "2px solid red");
     setTimeout(function(){
      $('#state-input').css("border", "2px solid #f8f8f8")
    }, 500)
  }
  if (zip == ""){
    $('#zip-input').css("border", "2px solid red");
     setTimeout(function(){
      $('#zip-input').css("border", "2px solid #f8f8f8")
    }, 500)
  }
  if (phone == ""){
    $('#phone-input').css("border", "2px solid red");
     setTimeout(function(){
      $('#phone-input').css("border", "2px solid #f8f8f8")
    }, 500)
  }

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
    date: date
  };

  if (name && offering && category && description && address && city && state && zip && phone) {
    // Uploads provider data to the database
    database.ref().push(newProvider);

    $('#thank-you').fadeTo(1000, 1).css('display', 'flex');
    window.setTimeout(function(){
      $('body').fadeOut(1000, function(){
        window.location.href = "search_pg.html"
      });
    }, 2000)
  }
});
