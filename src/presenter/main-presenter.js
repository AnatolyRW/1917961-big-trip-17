import { render } from '../framework/render.js';
import { updateItemTripEventModel } from '../util/common.js';

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
  #itemsTripEventPresenter = new Map();

  #itemsTripEventModel = null;
  #offersModel = null;


  constructor(itemsTripEventsModel, TripEventTypesOffersModel) {
    if (itemsTripEventsModel) {
      this.#itemsTripEventModel = [...itemsTripEventsModel.tripEvents];
    }
    if (TripEventTypesOffersModel) {
      this.#offersModel = [...TripEventTypesOffersModel.offers];
    }
    this.#filterTripEventsPresenter = new FilterPresenter(this.#itemsTripEventPresenter, this.#noTripEventsView);
  }

  init() {
    this.renderMain();
  }

  #handleItemTripEventChange = (updatedItemTripEventModel) => {
    this.#itemsTripEventModel = updateItemTripEventModel(this.#itemsTripEventModel, updatedItemTripEventModel);
    this.#itemsTripEventPresenter.get(updatedItemTripEventModel.id).init(updatedItemTripEventModel);
  };

  #handleItemTrimEventModeChange = () => {
    this.#itemsTripEventPresenter.forEach((presenter) => presenter.resetView());
  };

  #renderSortTripEvents () {
    render(this.#sortTripEventsView , this.#sortTripEventsView.container);
  }

  #renderlistTripEvents () {
    render(this.#listTripEventsView, this.#listTripEventsView.container);
  }

  #renderTripEventItem = (itemTripEventModel) => {
    const itemTripEventPresenter = new ItemTripEventPresenter(this.#listTripEventsView, this.#offersModel, this.#handleItemTripEventChange, this.#handleItemTrimEventModeChange);
    itemTripEventPresenter.init(itemTripEventModel);
    this.#itemsTripEventPresenter.set(itemTripEventModel.id, itemTripEventPresenter);
  };

  renderMain() {
    if (!this.#itemsTripEventModel.length) {
      render(this.#noTripEventsView, this.#noTripEventsView.container);
      return;
    }
    this.#renderSortTripEvents();
    this.#renderlistTripEvents();
    this.#itemsTripEventModel.forEach(this.#renderTripEventItem);
    this.#filterTripEventsPresenter.init();
  }

  #clearListTripEventItems() {
    this.#itemsTripEventPresenter.forEach((presenter) => presenter.desroy());
    this.#itemsTripEventPresenter.clear();
  }
}
