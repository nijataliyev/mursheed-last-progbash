$(document).ready(function($) {
    $('.tab_content').hide();
    $('.tab_content:eq(1)').show();
    $('.tabs li:first').addClass('active');
    $('.tabs li').click(function(event) {
      $('.tabs li').removeClass('active');
      $(this).addClass('active');
      $('.tab_content').hide();
  
      var selectTab = $(this).find('a').attr("href");
  
      $(selectTab).fadeIn();
    });
  });