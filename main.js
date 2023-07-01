
(function() {
  var slider = new StackSlider('.container', {
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