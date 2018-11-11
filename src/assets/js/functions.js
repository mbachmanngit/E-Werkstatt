import $ from 'jquery';

$(document).ready(function(){
  var timer

  $(window).scroll(function(){
    var wScroll = $(window).scrollTop();
    clearTimeout(timer);
    timer = setTimeout(function(){
      console.log('test');
      $('.dl_section').css('top', wScroll);
    },150);
  });

});
