'use strict';

import BaseView from '../base/base-view';

export default class SlideView extends BaseView {
  constructor(element) {
    super();

    this.currentBuild = 0;
    this.element = element;
    this.builds = element.querySelectorAll('.build');
  }

  setVisibility(isVisible) {
    if (isVisible) {
      this.element.classList.add('is-visible');
    } else {
      this.element.classList.remove('is-visible');
    }
  }

  performNextStep() {
    if (this.currentBuild < this.builds.length) {
      this.builds[this.currentBuild].classList.add('is-built');
      this.currentBuild++;
      return true;
    }

    return false;
  }

  performPrevStep() {
    if (this.currentBuild > 0) {
      this.currentBuild--;
      this.builds[this.currentBuild].classList.remove('is-built');
      return true;
    }
    return false;
  }
}
