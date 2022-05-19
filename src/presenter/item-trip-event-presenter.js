import './filter-presenter.js';
import { remove, render, replace } from '../framework/render.js';
import SortTripEventsView from '../view/sort-trip-events-view.js';
import ListTripEventsView from '../view/list-trip-events-view.js';
import ItemTripEventView from '../view/item-trip-event-view.js';
import EditTripEvenView from '../view/edit-trip-event-view.js';
import NoTripEventsView from '../view/no-trip-events-view.js';
import OffersItemTripEventsPresenter from './offers-item-trip-event-presenter.js';
import OffersEditTripEventsPresenter from './offers-edit-trip-event-presenter';

export default class ItemTripEventPresenter {

  #listTripEventsView = null;
  #sortTripEventsView = null;
  #noTripEventsView = null;
  #itemsTripEventsView = [];

  #offersWithType = null;
  #itemsTripEventsModel = [];
  #offersModel = null;

  constructor(itemsTripEventsModel, TripEventTypesOffersModel) {

    this.#itemsTripEventsModel = itemsTripEventsModel;
    this.#offersModel = TripEventTypesOffersModel;

    this.#listTripEventsView = new ListTripEventsView();
    this.#sortTripEventsView = new SortTripEventsView();
    this.#noTripEventsView = new NoTripEventsView();
  }

  get itemsTripEventsModel () {
    return this.#itemsTripEventsModel;
  }

  set itemsTripEventsModel (itemsTripEventsModel) {
    this.#itemsTripEventsModel = itemsTripEventsModel;
  }

  init(idFilter) {
    remove(this.#noTripEventsView);

    if (this.#itemsTripEventsModel.length) {
      render(this.#sortTripEventsView , this.#sortTripEventsView.container);
      render(this.#listTripEventsView, this.#listTripEventsView.container);

      for (let i = 0; i < this.#itemsTripEventsModel.length; i++) {
        this.#renderItemTripEvent(this.#itemsTripEventsModel[i]);
      }
    } else {
      this.#noTripEventsView.idFilter = idFilter;
      render(this.#noTripEventsView, this.#noTripEventsView.container);
    }

  }

  #renderItemTripEvent(itemTripEventModel) {
    const itemTripEventView = new ItemTripEventView(itemTripEventModel);
    const offersItemTripEventsPresenter = new OffersItemTripEventsPresenter(this.#offersModel);
    offersItemTripEventsPresenter.init(itemTripEventView, itemTripEventModel);
    this.#itemsTripEventsView.push(itemTripEventView);

    const editTripEvenView = new EditTripEvenView(itemTripEventModel);
    const offersEditTripEventsPresenter = new OffersEditTripEventsPresenter(this.#offersModel);
    offersEditTripEventsPresenter.init(editTripEvenView, itemTripEventModel);

    const replaceItemToEdit = () => {
      replace(editTripEvenView, itemTripEventView);
    };

    const replaceEditToItem = () => {
      replace(itemTripEventView, editTripEvenView);
    };

    const onEscKeyDown = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        replaceEditToItem();
        document.removeEventListener('keydown', onEscKeyDown);
      }
    };

    itemTripEventView.setRolloutEditClickHandler(() => {
      replaceItemToEdit();
      document.addEventListener('keydown', onEscKeyDown);
    });

    editTripEvenView.setRollupEditClickHandler(() => {
      replaceEditToItem();
      document.removeEventListener('keydown', onEscKeyDown);
    });

    editTripEvenView.setSubmitEditHandler((evt) => {
      evt.preventDefault();
      replaceEditToItem();
      document.removeEventListener('keydown', onEscKeyDown);
    });

    render(itemTripEventView, this.#listTripEventsView.element);
  }

  removeItemTripEvent() {
    for (let i = 0; i < this.#itemsTripEventsView.length; i++) {
      remove(this.#itemsTripEventsView[i]);
    }
  }
}
