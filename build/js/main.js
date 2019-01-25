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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJtYWluLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIiQoZnVuY3Rpb24gKCkge1xyXG4gIHN2ZzRldmVyeWJvZHkoKTtcclxuICBcclxuICAvLyBzaWRlYmFyIFxyXG4gICQoJy5qcy1zaWRlYmFyLWdhbWInKS5jbGljayhmdW5jdGlvbigpe1xyXG4gICAgJCgnLmpzLXNpZGViYXInKS50b2dnbGVDbGFzcygnaGlkZScpO1xyXG4gIH0pO1xyXG4gIGlmKCQod2luZG93KS53aWR0aCgpIDwgMTI4MCl7XHJcbiAgICAkKCcuanMtc2lkZWJhcicpLmFkZENsYXNzKCdoaWRlJyk7XHJcbiAgfVxyXG4gICQod2luZG93KS5yZXNpemUoZnVuY3Rpb24oKXtcclxuICAgIGlmKCQod2luZG93KS53aWR0aCgpIDwgMTI4MCl7XHJcbiAgICAgICQoJy5qcy1zaWRlYmFyJykuYWRkQ2xhc3MoJ2hpZGUnKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICQoJy5qcy1zaWRlYmFyJykucmVtb3ZlQ2xhc3MoJ2hpZGUnKTtcclxuICAgICAgJChcIi5qcy1zd2ltbVwiKS5zdGlja19pbl9wYXJlbnQoKTtcclxuICAgIH1cclxuICB9KTtcclxuXHJcbiAgLy8gbWVudVxyXG4gICQoJy5qcy1zdWJtZW51JykuY2xpY2soZnVuY3Rpb24oZSl7XHJcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICBpZigkKHRoaXMpLmhhc0NsYXNzKCdvcGVuJykpe1xyXG4gICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKCdvcGVuJykubmV4dCgnLnN1Ym1lbnUnKS5zbGlkZVVwKCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAkKCcuanMtc3VibWVudScpLnJlbW92ZUNsYXNzKCdvcGVuJykubmV4dCgnLnN1Ym1lbnUnKS5zbGlkZVVwKCk7XHJcbiAgICAgICQodGhpcykuYWRkQ2xhc3MoJ29wZW4nKS5uZXh0KCcuc3VibWVudScpLnNsaWRlRG93bigpO1xyXG4gICAgfVxyXG4gIH0pO1xyXG5cclxuICAvLyBzdGlja3lcclxuICBpZigkKHdpbmRvdykud2lkdGgoKSA+IDEyODApe1xyXG4gICAgJChcIi5qcy1zd2ltbVwiKS5zdGlja19pbl9wYXJlbnQoKTtcclxuICB9XHJcblxyXG59KTtcclxuIl0sImZpbGUiOiJtYWluLmpzIn0=
