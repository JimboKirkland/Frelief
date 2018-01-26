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
var search = $("#categories").val();

//Auto populate
database.ref().limitToLast(10).on("child_added", function(snap) {
    userId = snap.key;
    offering = snap.val().offering;
    category = snap.val().category;
    name = snap.val().name;
    address = snap.val().address;
    city = snap.val().city;
    state = snap.val().state;
    phone = snap.val().phone;
    servicesOffered = snap.val().servicesOffered;

   $("#post-container").prepend(
     "<div class='post' value='"+userId+"'>"+
       "<div class='img'><img src='images/"+category+".png'></div>"+
       "<div class='data'>"+
         "<p>" + offering + "</p>"+
         "<p>" + address + "</p>"+
         "<p>" + city + ", " + state + "</p>"+
         "</div></div></div>"
       ).slideDown("slow")
});

//Change category
$("#categories").on("change", function(){
 event.preventDefault();
 $("#post-container").html(" ");
 var search = $("#categories").val();

 database.ref().limitToLast(10).on("child_added", function(snap) {
   if (search == "all"){
     name = snap.val().name;
     category = snap.val().category;
     offering = snap.val().offering;
     address = snap.val().address;
     userId = snap.key;

     $("#post-container").prepend(
       "<div class='post' value='"+userId+"'>"+
         "<div class='img'><img src='images/"+category+".png'></div>"+
         "<div class='data'>"+
           "<p>" + offering + "</p>"+
           "<p>" + address + "</p>"+
           "<p>" + city + ", " + state + "</p>"+
           "</div></div></div>"
         )
   } else if (search == snap.val().category){
     name = snap.val().name;
     category = snap.val().category;
     offering = snap.val().offering;
     address = snap.val().address;
     userId = snap.key;

     $("#post-container").prepend(
       "<div class='post' value='"+userId+"'>"+
         "<div class='img'><img src='images/"+category+".png'></div>"+
         "<div class='data'>"+
           "<p>" + offering + "</p>"+
           "<p>" + address + "</p>"+
           "<p>" + city + ", " + state + "</p>"+
           "</div></div></div>"
         )
    }
  });
});

//Post click
$(".post").click(function(){
  console.log("hello");
  // sessionStorage.setItem('postId', $(".post").val())
})
