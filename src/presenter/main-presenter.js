import { FILTER, SORT_TYPE, UpdateType, UserAction } from '../const.js';
import { remove, render } from '../framework/render.js';
import { sortPrice, sortTime, sortDay } from '../util/common.js';

import SortTripEventsPresenter from '../presenter/sort-trip-evets-presenter.js';
import FilterTripEventsPresenter from './filter-trip-events-presenter.js';
import ItemTripEventPresenter from './item-trip-event-presenter.js';

import ListTripEventsView from '../view/list-trip-events-view.js';
import NoTripEventsView from '../view/no-trip-events-view.js';


export default class MainPresenter {
  #listTripEventsView = new ListTripEventsView();
  #noTripEventsView = new NoTripEventsView(FILTER.EVERYTHING);

  #sortTripEventsPresent = null;
  #filterTripEventsPresenter = null;
  #itemsTripEventPresenter = new Map();

  #itemTripEventsModel = null;
  //#tripEventSourceModel = null;
  #offersModel = null;
  #destinationModel = null;

  #currentSortType = SORT_TYPE.DAY;
  #currentFilter = FILTER.EVERYTHING;


  constructor(itemsTripEventsModel, offersModel, destinationModel) {
    this.#filterTripEventsPresenter = new FilterTripEventsPresenter(this.#handleFilterChange);
    this.#sortTripEventsPresent = new SortTripEventsPresenter(this.#handleSortTypeChange);

    this.#itemTripEventsModel = itemsTripEventsModel;
    this.#offersModel = offersModel;
    this.#destinationModel = destinationModel;

    this.#itemTripEventsModel.addObserver(this.#handleModelEvent);

    //this.#tripEventSourceModel = tripEventsModel.tripEvents; //?
  }

  get tripEvents () {
    switch (this.#currentSortType) {
      case SORT_TYPE.DAY:
        return [...this.#itemTripEventsModel.tripEvents].sort(sortDay);
      case SORT_TYPE.PRICE:
        return [...this.#itemTripEventsModel.tripEvents].sort(sortPrice);
      case SORT_TYPE.TIME:
        return [...this.#itemTripEventsModel.tripEvents].sort(sortTime);
    }
    return this.#itemTripEventsModel.tripEvents;
  }

  init() {
    this.renderMain();
  }

  //#handleItemTripEventChange = (updatedItemTripEventModel) => {
  //this.#itemsTripEventSourceModel = updateItemTripEventModel(this.#itemsTripEventSourceModel, updatedItemTripEventModel);
  //this.#itemsTripEventPresenter.get(updatedItemTripEventModel.id).init(updatedItemTripEventModel);
  //};

  #handleViewAction = (actionType, updateType, update) => {
    //console.log(actionType, updateType, update);
    // Здесь будем вызывать обновление модели.
    // actionType - действие пользователя, нужно чтобы понять, какой метод модели вызвать
    // updateType - тип изменений, нужно чтобы понять, что после нужно обновить
    // update - обновленные данные
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
    //console.log(updateType, data);
    // В зависимости от типа изменений решаем, что делать:
    // - обновить часть списка (например, когда поменялось описание)
    // - обновить список (например, когда задача ушла в архив)
    // - обновить всю доску (например, при переключении фильтра)
    switch (updateType) {
      case UpdateType.PATCH:
        // - обновить часть списка (например, когда поменялось описание)
        this.#itemsTripEventPresenter.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        // - обновить список (например, когда задача ушла в архив)
        break;
      case UpdateType.MAJOR:
        // - обновить всю доску (например, при переключении фильтра)
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
    this.#clearListTripEventItems();
    if (!this.tripEvents.length) {
      this.#noTripEventsView.idFilter = idFilter;
      render(this.#noTripEventsView, this.#noTripEventsView.container);
      return;
    }
    this.#renderlistTripEventItems();
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }
    this.#currentSortType = sortType;
    this.#clearListTripEventItems();
    this.#renderlistTripEventItems();
  };


  #renderlistTripEventItems() {
    remove(this.#noTripEventsView);
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

  renderMain() {
    if (!this.tripEvents.length) {
      render(this.#noTripEventsView, this.#noTripEventsView.container);
      return;
    }
    this.#sortTripEventsPresent.init();
    this.#renderlistTripEventItems();
    this.#filterTripEventsPresenter.init();
  }

  #clearListTripEventItems() {
    this.#itemsTripEventPresenter.forEach((presenter) => presenter.desroy());
    this.#itemsTripEventPresenter.clear();
    remove(this.#listTripEventsView,);
  }
}
