//Fade on load
// $(document).ready(function() {
  $('body').css('display', 'none');
  $('body').fadeIn(1000);
// })

function newpage() {
  window.location = newLocation;
};

$('a').click(function(event) {
  event.preventDefault();
  newLocation = this.href;
  $('body').fadeOut(1000, newpage);
});
