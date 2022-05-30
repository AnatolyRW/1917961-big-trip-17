import { FILTER } from '../const.js';
import { remove, render } from '../framework/render.js';
import { updateItemTripEventModel } from '../util/common.js';

import SortTripEventsPresenter from '../presenter/sort-trip-evets-presenter.js';
import FilterTripEventsPresenter from './filter-trip-events-presenter.js';
import ItemTripEventPresenter from './item-trip-event-presenter.js';
import EditTripEventPresenter from './edit-trip-event-presenter.js';

import ListTripEventsView from '../view/list-trip-events-view.js';
import NoTripEventsView from '../view/no-trip-events-view.js';


export default class MainPresenter {
  #listTripEventsView = new ListTripEventsView();
  #noTripEventsView = new NoTripEventsView(FILTER.EVERYTHING);

  #sortTripEventsPresent = null;
  #filterTripEventsPresenter = null;
  #itemsTripEventPresenter = new Map();

  #itemsTripEventModel = null;
  #itemsTripEventSourceModel = null;
  #offersModel = null;
  #destinationModel = null;


  constructor(itemsTripEventsModel, tripEventTypesOffersModel, destinationModel) {
    if (itemsTripEventsModel) {
      this.#itemsTripEventModel = [...itemsTripEventsModel.tripEvents];
      this.#itemsTripEventSourceModel = [...itemsTripEventsModel.tripEvents];

    }
    if (tripEventTypesOffersModel) {
      this.#offersModel = [...tripEventTypesOffersModel.offers];
    }
    if(destinationModel) {
      this.#destinationModel = [...destinationModel.destination];
    }
    this.#filterTripEventsPresenter = new FilterTripEventsPresenter(this.#handleFilterChange);
    this.#sortTripEventsPresent = new SortTripEventsPresenter(this.#handleSortTypeChange);
  }

  init() {
    this.renderMain();
  }

  #handleItemTripEventChange = (updatedItemTripEventModel) => {
    this.#itemsTripEventSourceModel = updateItemTripEventModel(this.#itemsTripEventSourceModel, updatedItemTripEventModel);
    this.#itemsTripEventPresenter.get(updatedItemTripEventModel.id).init(updatedItemTripEventModel);
  };

  #handleItemTripEventModeChange = () => {
    this.#itemsTripEventPresenter.forEach((presenter) => presenter.resetView());
  };

  #handleFilterChange = (idFilter) => {
    this.#itemsTripEventModel = this.#filterTripEventsPresenter.filterChange(idFilter, this.#itemsTripEventSourceModel);
    this.#clearListTripEventItems();
    if (!this.#itemsTripEventModel.length) {
      this.#noTripEventsView.idFilter = idFilter;
      render(this.#noTripEventsView, this.#noTripEventsView.container);
      return;
    }
    this.#renderlistTripEventItems();
  };

  #handleSortTypeChange = (sortType) => {
    this.#sortTripEventsPresent.sortChange(sortType, this.#itemsTripEventModel);
    this.#clearListTripEventItems();
    this.#renderlistTripEventItems();
  };


  #renderlistTripEventItems() {
    remove(this.#noTripEventsView);
    render(this.#listTripEventsView, this.#listTripEventsView.container);
    this.#itemsTripEventModel.forEach(this.#renderTripEventItem);
  }

  #renderTripEventItem = (itemTripEventModel) => {
    const itemTripEventPresenter = new ItemTripEventPresenter(this.#listTripEventsView, this.#offersModel, this.#destinationModel, this.#handleItemTripEventChange, this.#handleItemTripEventModeChange);
    const editTripEventPresenter = new EditTripEventPresenter(this.#listTripEventsView, this.#offersModel, this.#destinationModel, this.#handleItemTripEventChange, this.#handleItemTripEventModeChange);

    itemTripEventPresenter.init(itemTripEventModel);
    editTripEventPresenter.init(itemTripEventModel);

    itemTripEventPresenter.editTripEvenView = editTripEventPresenter.editTripEvenView;
    editTripEventPresenter.itemTripEventView = itemTripEventPresenter.itemTripEventView;

    this.#itemsTripEventPresenter.set(itemTripEventModel.id, itemTripEventPresenter);
  };

  renderMain() {
    if (!this.#itemsTripEventModel.length) {
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
