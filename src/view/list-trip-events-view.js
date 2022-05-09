import { createElement } from '../render.js';

const createListTripEventsTemplate = () => '<ul class="trip-events__list"></ul>';

export default class ListTripEventsView {

  #element = null;

  get temlate() {
    return createListTripEventsTemplate();
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.temlate);
    }
    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }

}
