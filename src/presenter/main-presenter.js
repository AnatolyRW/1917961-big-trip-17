import { FILTER } from '../const.js';
import { remove, render } from '../framework/render.js';
import { updateItemTripEventModel, applayFilterFuture, applayFilterPast } from '../util/common.js';

import FilterPresenter from './filter-presenter.js';
import ItemTripEventPresenter from './item-trip-event-presenter.js';

import SortTripEventsView from '../view/sort-trip-events-view.js';
import ListTripEventsView from '../view/list-trip-events-view.js';
import NoTripEventsView from '../view/no-trip-events-view.js';

export default class MainPresenter {
  #listTripEventsView = new ListTripEventsView();
  #sortTripEventsView = new SortTripEventsView();
  #noTripEventsView = new NoTripEventsView(FILTER.EVERYTHING);

  #filterTripEventsPresenter = null;
  #itemsTripEventPresenter = new Map();

  #itemsTripEventModel = null;
  #itemsTripEventSourceModel = null;
  #offersModel = null;


  constructor(itemsTripEventsModel, TripEventTypesOffersModel) {
    if (itemsTripEventsModel) {
      this.#itemsTripEventModel = [...itemsTripEventsModel.tripEvents];
      this.#itemsTripEventSourceModel = [...itemsTripEventsModel.tripEvents];
    }
    if (TripEventTypesOffersModel) {
      this.#offersModel = [...TripEventTypesOffersModel.offers];
    }
    this.#filterTripEventsPresenter = new FilterPresenter(this.#handleFilterChange);
  }

  init() {
    this.renderMain();
  }

  #handleItemTripEventChange = (updatedItemTripEventModel) => {
    this.#itemsTripEventSourceModel = updateItemTripEventModel(this.#itemsTripEventModel, updatedItemTripEventModel);
    this.#itemsTripEventPresenter.get(updatedItemTripEventModel.id).init(updatedItemTripEventModel);
  };

  #handleItemTripEventModeChange = () => {
    this.#itemsTripEventPresenter.forEach((presenter) => presenter.resetView());
  };

  #filterChange = (idFilter) => {
    this.#clearListTripEventItems();
    switch (idFilter) {
      case FILTER.FUTURE:
        this.#itemsTripEventModel = this.#itemsTripEventSourceModel.filter(applayFilterFuture);
        break;
      case FILTER.PAST:
        this.#itemsTripEventModel = this.#itemsTripEventSourceModel.filter(applayFilterPast);
        break;
      case FILTER.EVERYTHING:
        this.#itemsTripEventModel = this.#itemsTripEventSourceModel;
        break;
      default:
        this.#itemsTripEventModel = this.#itemsTripEventSourceModel;
    }
  };

  #handleFilterChange = (idFilter) => {
    this.#filterChange(idFilter);
    if (!this.#itemsTripEventModel.length) {
      this.#noTripEventsView.idFilter = idFilter;
      render(this.#noTripEventsView, this.#noTripEventsView.container);
      return;
    }
    this.#renderlistTripEventItems();
  };

  #renderSortTripEvents() {
    render(this.#sortTripEventsView, this.#sortTripEventsView.container);
  }

  #renderlistTripEventItems() {
    remove(this.#noTripEventsView);
    render(this.#listTripEventsView, this.#listTripEventsView.container);
    this.#itemsTripEventModel.forEach(this.#renderTripEventItem);
  }

  #renderTripEventItem = (itemTripEventModel) => {
    const itemTripEventPresenter = new ItemTripEventPresenter(this.#listTripEventsView, this.#offersModel, this.#handleItemTripEventChange, this.#handleItemTripEventModeChange);
    itemTripEventPresenter.init(itemTripEventModel);
    this.#itemsTripEventPresenter.set(itemTripEventModel.id, itemTripEventPresenter);
  };

  renderMain() {
    if (!this.#itemsTripEventModel.length) {
      render(this.#noTripEventsView, this.#noTripEventsView.container);
      return;
    }
    this.#renderSortTripEvents();
    this.#renderlistTripEventItems();
    this.#filterTripEventsPresenter.init();
  }

  #clearListTripEventItems() {
    this.#itemsTripEventPresenter.forEach((presenter) => presenter.desroy());
    this.#itemsTripEventPresenter.clear();
  }
}
