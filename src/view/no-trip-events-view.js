import AbstractView from '../framework/view/abstract-view.js';
import { FilterType } from '../const.js';

const NoTripEventTextType = {
  [FilterType.EVERYTHING]: 'Click New Event to create your first point',
  [FilterType.FUTURE]: 'There are no future events now',
  [FilterType.PAST]: 'There are no past events now'
};

const createNoTripEventsTemplate = (typeFilter) => {
  const NoTripEventText = NoTripEventTextType[typeFilter];
  return `<p class="trip-events__msg">${NoTripEventText}</p>`;
};

export default class NoTripEventsView extends AbstractView {

  #idFilter = null;

  constructor(idFilter) {
    super();
    this.#idFilter = idFilter;
  }

  get idFilter() {
    return this.#idFilter;
  }

  set idFilter(typeFilter) {
    this.#idFilter = typeFilter;
  }

  get template() {
    return createNoTripEventsTemplate(this.#idFilter);
  }

  get container() {
    const siteMainElement = document.querySelector('.page-body__page-main');
    return siteMainElement.querySelector('.trip-events');
  }

}
