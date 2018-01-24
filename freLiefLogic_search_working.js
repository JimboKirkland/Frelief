
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

  // Button for search provider data
  $("#search-btn").on("click", function(event) {
   
   event.preventDefault();

  // Grabs user input from the form
  // var image = $("#image-input").val().trim();

  // set the input value to a variable seachServices
   search = $("#search-input").val();

   database.ref().orderByChild(search).limitToLast(10).on("child_added", function(childSnapshot) {

   contactName        = childSnapshot.val().contactName;
   nameOfOrganization = childSnapshot.val().nameOfOrganization;
   servicesOffered = childSnapshot.val().servicesOffered;
   address = childSnapshot.val().address;
   city = childSnapshot.val().city;
   state = childSnapshot.val().state;
   zip = childSnapshot.val().zip;
   phonenum = childSnapshot.val().phonenum;


  // $("#search-value").text("searchquery");
    
//       console.log(contactName);
//       console.log(nameOfOrganization);
//       console.log(servicesOffered);

  $("#search-table > tbody").append("<tr><td>"  + contactName 
                                    + "</td><td>" + nameOfOrganization 
                                    + "</td><td>" + servicesOffered 
                                    + "</td><td>" + address 
                                    + "</td><td>" + city 
                                    + "</td><td>" + state 
                                    + "</td><td>" + zip 
                                    + "</td><td>" + phonenum + "</td></tr>");
  });

  // Alert
  alert("Provider successfully added");

});

//ref.child('contact-name-input').orderByChild('contact-name-input').on("value", function(snapshot) {
  //  console.log(snapshot.val());
    //snapshot.forEach(function(data) {
     //   console.log(data.key);
    //});


// 3. Create Firebase event for adding provider to the database and a row in the html when a user adds an entry
//database.ref().on("child_added", function(childSnapshot, prevChildKey) {


  // Store search value into a variable.

//  var servicesOffered = childSnapshot.val().servicesOffered; 


  // Provider Info
  //console.log(contactName);
  //console.log(nameOfOrganization);
 
  // Add provider data to the table output
 


