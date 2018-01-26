$('#post-container').on('click', '.post', function(){
  var id = $(this).attr("value")
  database.ref(id).on("value", function(snap) {
    $('#post-offering').html(snap.val().offering);
    $('#post-date').html(snap.val().date);
    $('#post-name').html(snap.val().name);
    $('#post-phone').html(snap.val().phone);
    $('#post-description').html(snap.val().description);
    $('#post-address').html(snap.val().address+"<br>"+snap.val().city+", "+snap.val().state+", "+snap.val().zip);
  });
  $('#flex-container').fadeTo(200, 0.05);
  $('#post-container').fadeTo(200, 0.05);
  $('#post').animate({top: '10%'});
})

$('#close').on('click', function(){
  $('#flex-container').fadeTo(200, 1);
  $('#post-container').fadeTo(200, 1);
  $('#post').animate({top: '-80%'});
})
