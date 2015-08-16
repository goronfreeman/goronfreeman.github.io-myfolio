$(document).ready(function() {
  $('.image-link').magnificPopup({type:'image'});
});

// This will create a single gallery from all elements that have class "gallery-item"
$('.gallery-item').magnificPopup({
  type: 'image',
  gallery:{
    enabled:true
  }
});

$('#home, #about, #services, #work, #contact').click(function() {
  var id = $(this).attr('id');

  $('html, body').animate({
    scrollTop: $('.' + id + '-wrap').offset().top
  }, 'slow');
});
