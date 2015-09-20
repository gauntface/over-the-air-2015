'use strict';

import SlideView from './slide-view';

export default class AliveDeadSlideView extends SlideView {
  constructor(element) {
    super(element);

    this.animation = null;
    this.isAnimating = false;

    this.aliveElement = element.querySelector('.js-alive');
    this.deadElement = element.querySelector('.js-dead');

    this.aliveElement.classList.add('is-visible');
    this.deadElement.classList.remove('is-visible');
  }

  setVisibility(isVisible) {
    this.isAnimating = isVisible;
    if (isVisible) {
      this.startAnimation();
    } else {
      this.stopAnimation();
    }
    super.setVisibility(isVisible);
  }

  startAnimation() {
    if (this.animation) {
      clearTimeout(this.animation);
    }

    this.animation = window.setTimeout(() => {

      this.aliveElement.classList.toggle('is-visible');
      this.deadElement.classList.toggle('is-visible');

      if (this.isAnimating) {
        this.startAnimation();
      }
    }, 800);
  }

  stopAnimation() {
    if (this.animation) {
      clearTimeout(this.animation);
    }
  }
}
