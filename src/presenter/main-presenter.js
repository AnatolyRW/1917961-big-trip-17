import { FilterType, SortType, UpdateType, UserAction } from '../const.js';
import { remove, render, RenderPosition } from '../framework/render.js';
import { sortPrice, sortTime, sortDay, filter } from '../util/common.js';

import SortTripEventsPresenter from '../presenter/sort-trip-evets-presenter.js';
import ItemTripEventPresenter from './item-trip-event-presenter.js';
import AddTripEventPresenter from './add-trip-event-presenter.js';

import ListTripEventsView from '../view/list-trip-events-view.js';
import NoTripEventsView from '../view/no-trip-events-view.js';
import LoadingView from '../view/loading-view.js';
import TripInfoView from '../view/trip-info-view.js';
import UiBlocker from '../framework/ui-blocker/ui-blocker.js';

const TimeLimit = {
  LOWER_LIMIT: 350,
  UPPER_LIMIT: 1000,
};

export default class MainPresenter {
  #listTripEventsView = new ListTripEventsView();
  #noTripEventsView = null;
  #loadingView = new LoadingView();
  #trimInfoView = null;
  #uiBlocker = new UiBlocker(TimeLimit.LOWER_LIMIT, TimeLimit.UPPER_LIMIT);

  #sortTripEventsPresent = null;
  #addTripEventPresenter = null;
  #itemsTripEventPresenter = new Map();

  #itemTripEventsModel = null;
  #offersModel = null;
  #destinationModel = null;
  #filterModel = null;

  #currentSortType = SortType.DAY;
  #currentFilter = FilterType.EVERYTHING;

  #isLoading = true;

  constructor(itemsTripEventsModel, offersModel, destinationModel, filterModel) {
    this.#itemTripEventsModel = itemsTripEventsModel;
    this.#offersModel = offersModel;
    this.#destinationModel = destinationModel;
    this.#filterModel = filterModel;
    this.#addTripEventPresenter = new AddTripEventPresenter(
      this.#listTripEventsView,
      this.#offersModel,
      this.#destinationModel,
      this.#handleItemTripEventModeChange,
      this.#handleViewAction,
    );
    this.#itemTripEventsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get tripEvents() {
    this.#currentFilter = this.#filterModel.filter;
    const tripEvents = this.#itemTripEventsModel.tripEvents;
    const filteredTripEvents = filter[this.#currentFilter](tripEvents);
    switch (this.#currentSortType) {
      case SortType.DAY:
        return filteredTripEvents.sort(sortDay);
      case SortType.PRICE:
        return filteredTripEvents.sort(sortPrice);
      case SortType.TIME:
        return filteredTripEvents.sort(sortTime);
    }
    return this.#itemTripEventsModel.tripEvents;
  }

  init() {
    this.#renderlist();
  }

  createTripEvent = (callback) => {
    this.#currentSortType = SortType.DEFAULT;
    this.#filterModel.setFilter(UpdateType.MINOR, FilterType.EVERYTHING);
    this.#addTripEventPresenter.init(callback);
  };

  #handleViewAction = async (actionType, updateType, update) => {
    this.#uiBlocker.block();
    switch (actionType) {
      case UserAction.UPDATE_TRIP_EVENT:
        this.#itemsTripEventPresenter.get(update.id).setSaving();
        try {
          await this.#itemTripEventsModel.updateTripEvent(updateType, update);
        } catch (err) {
          this.#itemsTripEventPresenter.get(update.id).setAborting();
        }
        break;
      case UserAction.ADD_TRIP_EVENT:
        this.#addTripEventPresenter.setSaving();
        try {
          await this.#itemTripEventsModel.addTripEvent(updateType, update);
        } catch (err) {
          this.#addTripEventPresenter.setAborting();
        }
        break;
      case UserAction.DELETE_TRIP_EVENT:
        this.#itemsTripEventPresenter.get(update.id).setDeleting();
        try {
          await this.#itemTripEventsModel.deleteTripEvent(updateType, update);
        } catch (err) {
          this.#itemsTripEventPresenter.get(update.id).setAborting();
        }
        break;
    }
    this.#uiBlocker.unblock();
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
        this.#clearList({ resetSortType: true });
        this.#renderlist();
        break;
      case UpdateType.INIT:
        this.#isLoading = false;
        remove(this.#loadingView);
        this.#renderlist();
        break;
    }
  };

  #handleItemTripEventModeChange = () => {
    this.#addTripEventPresenter.desroy();
    this.#itemsTripEventPresenter.forEach((presenter) => presenter.resetView());
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }
    this.#currentSortType = sortType;
    this.#clearList();
    this.#renderlist();
  };

  #renderLoading = () => {
    render(this.#loadingView, this.#listTripEventsView.element, RenderPosition.AFTERBEGIN);
  };

  #renderSort = () => {
    this.#sortTripEventsPresent = new SortTripEventsPresenter(this.#currentSortType);
    this.#sortTripEventsPresent.init(this.#handleSortTypeChange);
  };

  #renderNoTripEventsView = () => {
    this.#noTripEventsView = new NoTripEventsView(this.#currentFilter);
    render(this.#noTripEventsView, this.#noTripEventsView.container);
  };

  #renderTripInfo = () => {
    this.#trimInfoView = new TripInfoView(this.#itemTripEventsModel, this.#offersModel);
    render(this.#trimInfoView, this.#trimInfoView.container, RenderPosition.AFTERBEGIN);
  };

  #renderlist = () => {
    render(this.#listTripEventsView, this.#listTripEventsView.container);
    if (this.#isLoading) {
      this.#renderLoading();
      return;
    }
    const tripEvents = this.tripEvents;
    const tripEventsCount = tripEvents.length;
    if (tripEventsCount === 0) {
      this.#renderNoTripEventsView();
      return;
    }
    this.#renderSort();
    this.#renderTripInfo();
    this.tripEvents.forEach(this.#renderTripEventItem);
  };

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

  #clearList({ resetSortType = false } = {}) {
    this.#addTripEventPresenter.desroy();
    this.#itemsTripEventPresenter.forEach((presenter) => presenter.desroy());
    this.#itemsTripEventPresenter.clear();
    this.#sortTripEventsPresent.desroy();
    remove(this.#loadingView);
    if (this.#noTripEventsView) {
      remove(this.#noTripEventsView);
    }
    remove(this.#listTripEventsView,);
    if (resetSortType) {
      this.#currentSortType = SortType.DAY;
    }
    if(this.#trimInfoView) {
      remove(this.#trimInfoView);
    }
  }
}
