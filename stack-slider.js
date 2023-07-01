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
    if(!container) return;
    var items = container.querySelectorAll(options.items);
    if (!isStyleAdded('.card')) {
      var cardStyles = []
      var zIndex = 10;
      var right = 0;
      for (let index = 0; index < Math.min(items.length, 5); index++) {
        cardStyles.push(`
          .card:nth-child(${(index + 1)}) {
            z-index: ${zIndex};
            right: ${right}px;
            transform-origin: right;
            transform: scale(${1 - index*0.1});
            opacity: ${1 - index*0.1};
          }
        `);
        zIndex -=1;
        right -=15;
      }
      cardStyles.push(`
        .card:nth-child(${(Math.min(items.length, 5))}) ~ .card {
          z-index: ${zIndex};
          right: ${right}px;
          transform-origin: right;
          transform: scale(${1 - Math.min(items.length, 5)*0.1});
          opacity: 0;
        }
      `);
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
          transition: 0.4s cubic-bezier(0.28, 0.55, 0.385, 1.65);
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
      container.appendChild(firstChild);
    };

    // Function to show the previous item
    this.prev = function() {
      var firstChild = container.firstElementChild;
      var lastChild = container.lastElementChild;
      container.insertBefore(lastChild, firstChild);
    };
  }

  window.StackSlider = StackSlider;
})();