import AbstractView from '../framework/view/abstract-view.js';

const createListTripEventsTemplate = () => '<ul class="trip-events__list"></ul>';

export default class ListTripEventsView extends AbstractView {

  get template() {
    return createListTripEventsTemplate();
  }

  get container () {
    const siteMainElement = document.querySelector('.page-body__page-main');
    return siteMainElement.querySelector('.trip-events');
  }

}
