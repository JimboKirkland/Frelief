const config = {
    apiKey: "AIzaSyC2DZjWu4XlEXQ9OYs5CjaArRF_7vPp7CY",
    authDomain: "rpsgame-d268f.firebaseapp.com",
    databaseURL: "https://rpsgame-d268f.firebaseio.com",
    projectId: "rpsgame-d268f",
    storageBucket: "",
    messagingSenderId: "656169863266"
  };

  firebase.initializeApp(config);
   var database = firebase.database();

$("#button").on("click", function(event) {
      // Prevent the page from refreshing
      event.preventDefault();
 // Get inputs
      search = $("#search").val().trim();
      
    // Change what is saved in firebase
   	  database.ref().orderByChild(search).limitToLast(1).on("child_added", function(childSnapshot) {
      // full list of items to the well
      searchquery = childSnapshot.val().search;
      $("#search").text("searchquery");
		})
   	});

$("#buttons").on("click", function(event) {
      // Prevent the page from refreshing
      event.preventDefault();
 // Get inputs
      provide = $("#provide").val().trim();
      
    // Change what is saved in firebase
   	  database.ref().push ({
   	  	itemProvided: provide
				
			}) 
		});