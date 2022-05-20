import { render } from '../framework/render.js';

import FilterPresenter from './filter-presenter.js';
import ItemTripEventPresenter from './item-trip-event-presenter.js';

import SortTripEventsView from '../view/sort-trip-events-view.js';
import ListTripEventsView from '../view/list-trip-events-view.js';
import NoTripEventsView from '../view/no-trip-events-view.js';

export default class MainPresenter {
  #listTripEventsView = new ListTripEventsView();
  #sortTripEventsView = new SortTripEventsView();
  #noTripEventsView = new NoTripEventsView();

  #filterTripEventsPresenter = null;
  #itemTripEventPresenters = [];

  #itemsTripEventsModel = null;
  #offersModel = null;


  constructor(itemsTripEventsModel, TripEventTypesOffersModel) {
    if (itemsTripEventsModel) {
      this.#itemsTripEventsModel = [...itemsTripEventsModel.tripEvents];
    }
    if (TripEventTypesOffersModel) {
      this.#offersModel = [...TripEventTypesOffersModel.offers];
    }
  }

  init() {
    this.#renderSortTripEvents();
    this.#renderlistTripEvents();
    this.renderTripEventItems();
    this.#filterTripEventsPresenter = new FilterPresenter(this.#itemTripEventPresenters);
    this.#filterTripEventsPresenter.init();
  }

  #renderSortTripEvents () {
    render(this.#sortTripEventsView , this.#sortTripEventsView.container);
  }

  #renderlistTripEvents () {
    render(this.#listTripEventsView, this.#listTripEventsView.container);
  }

  renderTripEventItems(idFilter) {
    if (this.#itemsTripEventsModel.length) {
      this.#itemsTripEventsModel.forEach((element) => {
        const itemTripEventPresenter = new ItemTripEventPresenter(element, this.#listTripEventsView, this.#offersModel);
        itemTripEventPresenter.init();
        this.#itemTripEventPresenters.push(itemTripEventPresenter);
      });
    } else {
      this.#noTripEventsView.idFilter = idFilter;
      render(this.#noTripEventsView, this.#noTripEventsView.container);
    }
  }
}
