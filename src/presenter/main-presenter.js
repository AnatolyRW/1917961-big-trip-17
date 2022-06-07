import { Filter, SortType, UpdateType, UserAction } from '../const.js';
import { remove, render } from '../framework/render.js';
import { sortPrice, sortTime, sortDay } from '../util/common.js';

import SortTripEventsPresenter from '../presenter/sort-trip-evets-presenter.js';
import FilterTripEventsPresenter from './filter-trip-events-presenter.js';
import ItemTripEventPresenter from './item-trip-event-presenter.js';

import ListTripEventsView from '../view/list-trip-events-view.js';
import NoTripEventsView from '../view/no-trip-events-view.js';


export default class MainPresenter {
  #listTripEventsView = new ListTripEventsView();
  #noTripEventsView = new NoTripEventsView(Filter.EVERYTHING);

  #sortTripEventsPresent = null;
  #filterTripEventsPresenter = null;
  #itemsTripEventPresenter = new Map();

  #itemTripEventsModel = null;
  #offersModel = null;
  #destinationModel = null;

  #currentSortType = SortType.DAY;
  #currentFilter = Filter.EVERYTHING;


  constructor(itemsTripEventsModel, offersModel, destinationModel) {
    this.#filterTripEventsPresenter = new FilterTripEventsPresenter(this.#handleFilterChange);

    this.#itemTripEventsModel = itemsTripEventsModel;
    this.#offersModel = offersModel;
    this.#destinationModel = destinationModel;

    this.#itemTripEventsModel.addObserver(this.#handleModelEvent);

    //this.#tripEventSourceModel = tripEventsModel.tripEvents; //?
  }

  get tripEvents () {
    switch (this.#currentSortType) {
      case SortType.DAY:
        return [...this.#itemTripEventsModel.tripEvents].sort(sortDay);
      case SortType.PRICE:
        return [...this.#itemTripEventsModel.tripEvents].sort(sortPrice);
      case SortType.TIME:
        return [...this.#itemTripEventsModel.tripEvents].sort(sortTime);
    }
    return this.#itemTripEventsModel.tripEvents;
  }

  init() {
    this.#renderlist();
  }

  #handleViewAction = (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_TRIP_EVENT:
        this.#itemTripEventsModel.updateTripEvent(updateType, update);
        break;
      case UserAction.ADD_TRIP_EVENT:
        this.#itemTripEventsModel.addTripEvent(updateType, update);
        break;
      case UserAction.DELETE_TRIP_EVENT:
        this.#itemTripEventsModel.deleteTripEvent(updateType, update);
        break;
    }
  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#itemsTripEventPresenter.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this.#clearList();
        this.#renderlist();
        break;
      case UpdateType.MAJOR:
        this.#clearList();
        this.#renderlist(true);
        break;
    }
  };

  #handleItemTripEventModeChange = () => {
    this.#itemsTripEventPresenter.forEach((presenter) => presenter.resetView());
  };

  #handleFilterChange = (idFilter) => {
    if(this.#currentFilter === idFilter) {
      return;
    }
    this.#itemTripEventsModel = this.#filterTripEventsPresenter.filterChange(idFilter, this.tripEvents);
    this.#clearList();
    if (!this.tripEvents.length) {
      this.#noTripEventsView.idFilter = idFilter;
      render(this.#noTripEventsView, this.#noTripEventsView.container);
      return;
    }
    this.#renderlist();
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }
    this.#currentSortType = sortType;
    this.#clearList();
    this.#renderlist();
  };

  #renderSort = () => {
    this.#sortTripEventsPresent = new SortTripEventsPresenter(this.#currentSortType);
    this.#sortTripEventsPresent.init(this.#handleSortTypeChange);
  };

  #renderNoTripEventsView = () => {
    render(this.#noTripEventsView, this.#noTripEventsView.container);
  };

  #renderlist() {
    const tripEvents = this.tripEvents;
    const tripEventsCount = tripEvents.length;
    if (tripEventsCount === 0) {
      this.#renderNoTripEventsView();
      return;
    }
    this.#renderSort();
    render(this.#listTripEventsView, this.#listTripEventsView.container);
    this.tripEvents.forEach(this.#renderTripEventItem);
  }

  #renderTripEventItem = (itemTripEventModel) => {
    const itemTripEventPresenter = new ItemTripEventPresenter(
      this.#listTripEventsView,
      this.#offersModel,
      this.#destinationModel,
      this.#handleViewAction,
      this.#handleItemTripEventModeChange
    );
    itemTripEventPresenter.init(itemTripEventModel);
    this.#itemsTripEventPresenter.set(itemTripEventModel.id, itemTripEventPresenter);
  };

  #clearList(resetSortType = false) {
    this.#itemsTripEventPresenter.forEach((presenter) => presenter.desroy());
    this.#itemsTripEventPresenter.clear();
    this.#sortTripEventsPresent.desroy();
    remove(this.#noTripEventsView);
    remove(this.#listTripEventsView,);
    if (resetSortType) {
      this.#currentSortType = SortType.DAY;
    }
  }
}
