$(function () {
  svg4everybody();
  
  // sidebar 
  $('.js-sidebar-gamb').click(function(){
    $('.js-sidebar').toggleClass('hide');
  });
  if($(window).width() < 1280){
    $('.js-sidebar').addClass('hide');
  }
  $(window).resize(function(){
    if($(window).width() < 1280){
      $('.js-sidebar').addClass('hide');
    } else {
      $('.js-sidebar').removeClass('hide');
      $(".js-swimm").stick_in_parent();
    }
  });

  // menu
  $('.js-submenu').click(function(e){
    e.preventDefault();
    if($(this).hasClass('open')){
      $(this).removeClass('open').next('.submenu').slideUp();
    } else {
      $('.js-submenu').removeClass('open').next('.submenu').slideUp();
      $(this).addClass('open').next('.submenu').slideDown();
    }
  });

  // sticky
  if($(window).width() > 1280){
    $(".js-swimm").stick_in_parent();
  }

});
