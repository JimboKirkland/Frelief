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

//Click search button
$("#search-button").on("click", function(event) {
 event.preventDefault();
 $("#post-container").html(" ");

 console.log($("#categories").val())
 search = $("#categories").val();

 database.ref().orderByChild(search).limitToLast(10).on("child_added", function(childSnapshot) {
   if (search == childSnapshot.val().servicesOffered){
     contactName        = childSnapshot.val().contactName;
     nameOfOrganization = childSnapshot.val().nameOfOrganization;
     servicesOffered = childSnapshot.val().servicesOffered;
     address = childSnapshot.val().address;
     city = childSnapshot.val().city;
     state = childSnapshot.val().state;
     zip = childSnapshot.val().zip;
     phonenum = childSnapshot.val().phonenum;

  $("#post-container").append(
    "<div class='post'>"+
      "<div class='img'></div>"+
      "<div class='data'>"+
        "<p>" + servicesOffered + "</p>"+
        "<p>" + contactName + "</p>"+
        "<p>" + address + "</p>"+
        "</div></div></div>"
      )
    }
  });
});
