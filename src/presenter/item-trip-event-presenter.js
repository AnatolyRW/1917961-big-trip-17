import { remove, render, replace } from '../framework/render.js';
import ItemTripEventView from '../view/item-trip-event-view.js';
import EditTripEvenView from '../view/edit-trip-event-view.js';
import OffersItemTripEventPresenter from './offers-item-trip-event-presenter.js';
import OffersEditTripEventPresenter from './offers-edit-trip-event-presenter';

export default class ItemTripEventPresenter {

  #container = null;
  #itemTripEventView = null;
  #editTripEvenView = null;

  #tripEventModel = null;
  #offersModel = null;

  constructor(tripEventsModel, container, TripEventTypesOffersModel) {
    this.#tripEventModel = tripEventsModel;
    this.#container = container;
    this.#offersModel = TripEventTypesOffersModel;
  }

  get tripEventModel() {
    return this.#tripEventModel;
  }

  set tripEventModel(itemsTripEventsModel) {
    this.#tripEventModel = itemsTripEventsModel;
  }

  init() {
    this.#itemTripEventView = new ItemTripEventView(this.#tripEventModel);
    this.#renderOffersItemTripEvent();
    this.#editTripEvenView = new EditTripEvenView(this.#tripEventModel);
    this.#renderOffersEditTripEvent();
    this.#renderItemTripEvent(this.#tripEventModel);
  }

  #onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#replaceEditToItem();
      document.removeEventListener('keydown', this.#onEscKeyDown);
    }
  };

  #replaceItemToEdit = () => {
    replace(this.#editTripEvenView, this.#itemTripEventView);
  };

  #handleRolloutEditClick = () => {
    this.#replaceItemToEdit();
    document.addEventListener('keydown', this.#onEscKeyDown);
  };

  #replaceEditToItem = () => {
    replace(this.#itemTripEventView, this.#editTripEvenView);
  };

  #handleRollupEditClick = () => {
    this.#replaceEditToItem();
    document.removeEventListener('keydown', this.#onEscKeyDown);
  };

  #handleSubmitEdit = (evt) => {
    evt.preventDefault();
    this.#replaceEditToItem();
    document.removeEventListener('keydown', this.#onEscKeyDown);
  };

  #renderItemTripEvent() {
    this.#itemTripEventView.setRolloutEditClickHandler(this.#handleRolloutEditClick);
    this.#editTripEvenView.setRollupEditClickHandler(this.#handleRollupEditClick);
    this.#editTripEvenView.setSubmitEditHandler(this.#handleSubmitEdit);
    render(this.#itemTripEventView, this.#container.element);
  }

  removeItemTripEvent() {
    remove(this.#itemTripEventView);
  }

  #renderOffersItemTripEvent() {
    const offersItemTripEventPresenter = new OffersItemTripEventPresenter(this.#itemTripEventView, this.#tripEventModel);
    offersItemTripEventPresenter.init(this.#offersModel);
  }

  #renderOffersEditTripEvent() {
    const offersEditTripEventPresenter = new OffersEditTripEventPresenter(this.#editTripEvenView, this.#tripEventModel);
    offersEditTripEventPresenter.init(this.#offersModel);
  }
}
