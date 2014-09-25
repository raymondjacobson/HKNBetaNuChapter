$(document).ready(function(){
  // Set navigation
  var loc = window.location.hash.replace("#/", "");
  $('#nav .columns').removeClass('selected');
  if (loc == "" || loc == null) {
    $('#nav a.home div').addClass('selected');
  }
  else {
    $('#nav a').each(function(){
      if ($(this).hasClass(loc)) {
        $(this).find('div').addClass('selected');
      }
    });
  }

  $('#nav .columns').click(function(){
    $('#nav .columns').removeClass('selected');
    $(this).addClass('selected');
  });
});