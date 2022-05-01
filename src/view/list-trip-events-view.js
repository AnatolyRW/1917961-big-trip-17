import { createElement } from '../render.js';

const createListTripEventsTemplate = () => '<ul class="trip-events__list"></ul>';

export default class ListTripEventsView {
  getTemlate = () => createListTripEventsTemplate();

  getElement = () => {
    if (!this.element) {
      this.element = createElement(this.getTemlate());
    }
    return this.element;
  };

  removeElement = () => {
    this.element = null;
  };

}
