$('#home, #about, #services, #work, #contact').click(function() {
  var id = $(this).attr('id');

  $('html, body').animate({
    scrollTop: $('.' + id + '-wrap').offset().top
  }, 'slow');
});
