var contactName ="";

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
  console.log(contactName, address);



});
console.log(address);
