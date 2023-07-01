
(function() {
  // var rotate, timeline;

  // nextRotate = function() {
  //   return $('.card:first-child').fadeOut(400, 'swing', function() {
  //     return $('.card:first-child').appendTo('.container').hide();
  //   });
  // };

  // nextPrev = function() {
  //   return $('.card:last-child').fadeOut(400, 'swing', function() {
  //     return $('.card:last-child').prependTo('.container').hide();
  //   });
  // };

  // $('.next').click(function() {
  //     return nextRotate();
  // });
  // $('.prev').click(function() {
  //   return nextPrev();
  // });
  var slider = new StackSlider('.wrapper', {
    items: '.card'
  });
  var container = document.querySelector('.controller');

  // Set up event listeners
  var prevButton = container.querySelector('.prev');
  var nextButton = container.querySelector('.next');
  if (prevButton) {
    prevButton.addEventListener('click', function() {
      slider.prev();
    }, false );
  }

  if (nextButton) {
    nextButton.addEventListener('click', function() {
      slider.next();
    }, false );
  }
}).call(this);