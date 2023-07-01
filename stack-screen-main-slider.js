(function() {
  function isStyleAdded(styleName) {
    return false;
  }
  function addStyleToDocument(cssText) {
    var styleElement = document.createElement('style');
    styleElement.type = 'text/css';
    styleElement.appendChild(document.createTextNode(cssText));
    document.head.appendChild(styleElement);
  }
  function StackSlider(element, options) {
    var self = this;

    // Set default options
    var defaults = {
      prevButton: '.stack-slider-prev',
      nextButton: '.stack-slider-next',
      items: '.stack-slider-item'
    };

    // Merge user-provided options with defaults
    options = Object.assign({}, defaults, options);

    // Get DOM elements
    var container = document.querySelector(element);
    container.classList.add('stack-slider');
    if(!container) return;
    var items = container.querySelectorAll(options.items);
    if (!isStyleAdded('.card')) {
      var cardStyles = []
      var zIndex = 10;
      var right = 0;
      var shift = 15;
      var oStep = 0.1;
      for (let index = 0; index < Math.min(items.length, 5); index++) {
        if(index == 0){
          // first child
          cardStyles.push(`
            .card:nth-child(${(index + 1)}) {
              z-index: ${zIndex};
              right: ${right}px;
              transform-origin: right;
              transform: scale(${1 - index*0.1});
              opacity: ${1 - index*0.1};
            }
          `);
          // next
          // first child
          cardStyles.push(`
            .stack-slider.move-next .card:nth-child(${(index + 1)}) {
              z-index: -1;
              right: ${- (items[0].clientWidth - 20) + (-shift*Math.min(items.length, 5) + shift)}px;
              transform-origin: right;
              transform: scale(${1 - Math.min(items.length, 5)*oStep + oStep});
              opacity: 0;
            }
          `);
          // second child
          cardStyles.push(`
            .stack-slider.move-next .card:nth-child(${(index + 2)}) {
              z-index: ${zIndex};
              right: ${right}px;
              transform-origin: right;
              transform: scale(${1 - index*oStep});
              opacity: ${1 - index*oStep};
            }
          `);
          // prev
          // first child
          cardStyles.push(`
            .stack-slider.move-prev .card:nth-child(${(index + 1)}) {
              z-index: ${zIndex - 1};
              right: ${- (items[0].clientWidth - 20) + right - shift}px;
              transform-origin: right;
              transform: scale(${1 - index*oStep - oStep});
              opacity: ${1 - index*oStep - oStep};
            }
          `);
          // last child
          cardStyles.push(`
            .stack-slider.move-prev .card:last-child {
              z-index: ${zIndex};
              right: ${right}px;
              transform-origin: right;
              transform: scale(${1 - index*0.1});
              opacity: ${1 - index*0.1};
            }
          `);
        }
        else {
          cardStyles.push(`
            .card:nth-child(${(index + 1)}) {
              z-index: ${zIndex};
              right: ${- (items[0].clientWidth - 20) + right}px;
              transform-origin: right;
              transform: scale(${1 - index*oStep});
              opacity: ${1 - index*oStep};
            }
          `);
          cardStyles.push(`
            .stack-slider.move-prev .card:nth-child(${(index + 1)}) {
              z-index: ${zIndex - 1};
              right: ${- (items[0].clientWidth - 20) + right - shift}px;
              transform-origin: right;
              transform: scale(${1 - index*oStep - oStep});
              opacity: ${(index == Math.min(items.length, 5) - 1) ? 0 : 1 - index*oStep - oStep};
            }
          `);
          if(index != 1){
            cardStyles.push(`
              .stack-slider.move-next .card:nth-child(${(index + 1)}) {
                z-index: ${zIndex + 1};
                right: ${- (items[0].clientWidth - 20) + right + shift}px;
                transform-origin: right;
                transform: scale(${1 - index*oStep + oStep});
                opacity: ${1 - index*oStep + oStep};
              }
            `);
          }
        }
        zIndex -=1;
        right -=shift;
      }
      if(items.length - 5) {
        cardStyles.push(`
          .card:nth-child(${(Math.min(items.length, 5))}) ~ .card {
            z-index: ${zIndex};
            right: ${- (items[0].clientWidth - 20) + right + shift}px;
            transform-origin: right;
            transform: scale(${1 - Math.min(items.length, 5)*0.1});
            opacity: 0;
          }
        `);
      }
      var cssText = `
        ${cardStyles.join('')}
        .card:first-child:hover{
          box-shadow: 0 0 20px rgba(0, 0, 0, 0.4);
          transform: scale(1.05)
        }
        .card:last-child {
          opacity: 0;
        }
        .card {
          transition: 0.4s cubic-bezier(0.15, 0.77, 0.78, 1.09);
        }
      `;
      addStyleToDocument(cssText);
    }

    // Set up event listeners
    var prevButton = container.querySelector(options.prevButton);
    var nextButton = container.querySelector(options.nextButton);

    if (prevButton) {
      prevButton.addEventListener('click', function() {
        self.prev();
      }, false );
    }

    if (nextButton) {
      nextButton.addEventListener('click', function() {
        self.next();
      }, false );
    }
    
    // Function to show the next item
    this.next = function() {
      var firstChild = container.firstElementChild;
      container.classList.toggle('move-next');
      function myEndFunction() {
        container.appendChild(firstChild);
        container.classList.toggle('move-next');
        firstChild.removeEventListener('transitionend', myEndFunction);
      }
      firstChild.addEventListener('transitionend', myEndFunction, false );
    };

    // Function to show the previous item
    this.prev = function() {
      var firstChild = container.firstElementChild;
      var lastChild = container.lastElementChild;
      container.classList.toggle('move-prev');
      function myEndFunction() {
        container.insertBefore(lastChild, firstChild);
        container.classList.toggle('move-prev');
        firstChild.removeEventListener('transitionend', myEndFunction);
      }
      firstChild.addEventListener('transitionend', myEndFunction, false );
    };
  }

  window.StackSlider = StackSlider;
})();