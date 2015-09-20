'use strict';

import SlideView from '../views/slide-view';

export default class BaseController {
  constructor() {
    this.slideViews = [];
    this.currentSlide = 0;

    this.constructSlideViews();
    this.setInitialSlide();

    this.addKeyPressListeners();
  }

  constructSlideViews() {
    var slideElements = document.querySelectorAll('.js-gf-slide');
    for (var i = 0; i < slideElements.length; i++) {
      this.addSlideView(new SlideView(slideElements.item(i)));
    }
  }

  addSlideView(slideView) {
    this.slideViews.push(slideView);
  }

  addKeyPressListeners() {
    document.addEventListener('keyup', (event) => {
      switch (event.keyCode) {
        case 38:
        case 39:
        case 34:
          // 38: Up
          // 39: Right
          // 34: Page Down (Remote Control Right)
          this.nextSlide();
          break;
        case 40:
        case 37:
        case 33:
          // 40: Down
          // 37: Left
          // 33: Page Up (Remote Control Left)
          this.prevSlide();
          break;
        default:
          console.log('Unknown key press: ', event);
          break;
      }
    });
  }

  setInitialSlide() {
    var number = parseInt(window.location.hash.substring(1));
    if (isNaN(number)) {
      console.log('Invalid hash - starting from beginning of slide deck.');
      number = 0;
    }

    this.changeSlide(number);
  }

  nextSlide() {
    var nextSlide = this.currentSlide + 1;
    if (nextSlide < this.slideViews.length) {
      this.changeSlide(nextSlide);
    }
  }

  prevSlide() {
    var prevSlide = this.currentSlide - 1;
    if (prevSlide >= 0) {
      this.changeSlide(prevSlide);
    }
  }

  changeSlide(slideNumber) {
    if (slideNumber >= this.slideViews.length) {
      throw Error('Attempting to set slide number to a slide that' +
        'doesn\'t exist');
    } else if (slideNumber < 0) {
      throw Error('Attempting to set a slide number below 0');
    }

    this.slideViews[this.currentSlide].setVisibility(false);
    this.slideViews[slideNumber].setVisibility(true);

    window.location.hash = slideNumber;
    this.currentSlide = slideNumber;
  }
}
