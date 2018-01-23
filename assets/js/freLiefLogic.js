
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
$("#add-provider-btn").on("click", function(event) {
  event.preventDefault();

  // Grabs user input from the form
  //var image = $("#image-input").val().trim();
  var contactName = $("#contact-name-input").val().trim();
  var nameOfOrganization = $("#org-input").val().trim();
  var servicesOffered = $("#servicesOffer-input").val();
  var address = $("#address-input").val().trim();
  var city = $("#city-input").val().trim();
  var state = $("#state-input").val().trim();
  var zip = $("#zip-input").val().trim();
  var phonenum  = $("#phonenum-input").val().trim();
  var email = $("#email-input").val().trim();
  var addtlOffering = $("#addtlOffer-input").val().trim();


  // Creates local "temporary" object for holding provider data
  var newProvider = {
    contactName:  contactName, 
    nameOfOrganization: nameOfOrganization, 
    servicesOffered:  servicesOffered, 
    address:  address, 
    city: city, 
    state:  state, 
    zip:  zip, 
    phonenum: phonenum,
    email:  email,
    addtlOffering:  addtlOffering

  };

  // Uploads provider data to the database
  database.ref().push(newProvider);

  // Logs everything to console
 // console.log(newProvider.contactName);

  // Alert
  alert("Provider successfully added");

  // Clears all of the text-boxes
  $("#contact-name-input").val("");
  $("#org-input").val("");
  $("#servicesOffer-input").val("");
  $("#address-input").val("");
  $("#city-input").val("");
  $("#state-input").val("");
  $("#zip-input").val("");
  $("#phonenum-input").val("");
  $("#email-input").val("");
  $("#addtlOffer-input").val("");
  $("#image-input").val("");

});

// 3. Create Firebase event for adding provider to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot, prevChildKey) {

 // console.log(childSnapshot.val());

  // Store everything into a variable.
  var contactName = childSnapshot.val().contactName; 
  var nameOfOrganization = childSnapshot.val().nameOfOrganization; 
  var servicesOffered = childSnapshot.val().servicesOffered; 
  var address = childSnapshot.val().address; 
  var city = childSnapshot.val().city; 
  var state = childSnapshot.val().state; 
  var zip = childSnapshot.val().zip; 
  var phonenum  = childSnapshot.val().phonenum; 
  var email = childSnapshot.val().email; 
  var addtlOffering = childSnapshot.val().addtlOffering; 

  // Provider Info
  //console.log(contactName);
  //console.log(nameOfOrganization);
 
  // Add provider data to the table output
  $("#provider-table > tbody").append("<tr><td>"  + contactName 
                                    + "</td><td>" + nameOfOrganization 
                                    + "</td><td>" + servicesOffered 
                                    + "</td><td>" + address 
                                    + "</td><td>" + city 
                                    + "</td><td>" + state 
                                    + "</td><td>" + zip 
                                    + "</td><td>" + phonenum 
                                    + "</td><td>" + email 
                                    + "</td><td>" + addtlOffering + "</td></tr>");
});

