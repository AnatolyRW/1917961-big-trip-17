import FilterTripEventsView from '../view/filter-trip-events-view';
import MainPresenter from './main-presenter.js';
import { render } from '../framework/render.js';

export default class FilterPresenter {

  #filterTripEvents = null;
  #itemsTripEvents = null;
  #tripEventTypesOffers = null;
  #mainPresenter = null;

  constructor(itemsTripEvents, tripEventTypesOffers) {
    this.#filterTripEvents = new FilterTripEventsView();
    this.#itemsTripEvents = itemsTripEvents;
    this.#tripEventTypesOffers = tripEventTypesOffers;
  }

  init () {
    this.#renderFilterTripEvents();
    this.#mainPresenter = new MainPresenter(this.#itemsTripEvents, this.#tripEventTypesOffers);
    this.#mainPresenter.init();
  }

  #renderFilterTripEvents () {
    render(this.#filterTripEvents, this.#filterTripEvents.container);

  }

}
