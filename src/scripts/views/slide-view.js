'use strict';

import BaseView from '../base/base-view';

export default class SlideView extends BaseView {
  constructor(element) {
    super();

    this.element = element;
  }

  setVisibility(isVisible) {
    if (isVisible) {
      this.element.classList.add('is-visible');
    } else {
      this.element.classList.remove('is-visible');
    }

  }
}
