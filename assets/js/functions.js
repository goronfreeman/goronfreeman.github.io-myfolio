$(document).ready(function() {
  $('.image-link').magnificPopup({
    type: 'image'
  });
});

// This will create a single gallery from all elements that have class "gallery-item"
$('.gallery-item').magnificPopup({
  type: 'image',
  gallery: {
    enabled: true
  }
});

$('#header, #about, #services, #work, #contact').click(function(e) {
  var id = $(this).attr('id');

  e.preventDefault();
  $('html, body').animate({
    scrollTop: $('.' + id + '-wrap').offset().top - 60
  }, 'slow');
});
