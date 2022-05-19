import AbstractView from '../framework/view/abstract-view.js';

const createNoTripEventsTemplate = (typeFilter) => {
  let str = '';
  switch(typeFilter) {
    case 'filter-future':
      str = 'There are no future events now';
      break;
    case 'filter-past':
      str = 'There are no past events now';
      break;
    default:
      str = 'Click New Event to create your first point';
  }
  return `<p class="trip-events__msg">${str}</p>`;
};

/*
Значение отображаемого текста зависит от выбранного фильтра:
  * Everthing – 'Click New Event to create your first point'
  * Past — 'There are no past events now';
  * Future — 'There are no future events now'.
*/

export default class NoTripEventsView extends AbstractView{

  #idFilter = null;

  constructor () {
    super();
    this.#idFilter = 'filter-everything';
  }

  get idFilter () {
    return this.#idFilter;
  }

  set idFilter (typeFilter) {
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
