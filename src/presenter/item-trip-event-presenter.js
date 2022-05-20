import { remove, render, replace } from '../framework/render.js';
import ItemTripEventView from '../view/item-trip-event-view.js';
import EditTripEvenView from '../view/edit-trip-event-view.js';
import OffersItemTripEventPresenter from './offers-item-trip-event-presenter.js';
import OffersEditTripEventPresenter from './offers-edit-trip-event-presenter';

export default class ItemTripEventPresenter {

  #listTripEventContainer = null;
  #itemTripEventView = null;
  #editTripEvenView = null;

  #tripEventModel = null;
  #offersModel = null;

  constructor(listTripEventContainer, TripEventTypesOffersModel) {
    this.#listTripEventContainer = listTripEventContainer;
    this.#offersModel = TripEventTypesOffersModel;
  }

  get tripEventModel() {
    return this.#tripEventModel;
  }

  get itemTripEventView() {
    return this.#itemTripEventView;
  }

  get editTripEvenView() {
    return this.#editTripEvenView;
  }

  get listTripEventContainer() {
    return this.#listTripEventContainer;
  }

  init(tripEventsModel) {
    this.#tripEventModel = tripEventsModel;

    const prevItemTripEventView = this.#itemTripEventView;
    const prevEditTripEvenView = this.editTripEvenView;

    this.#itemTripEventView = new ItemTripEventView(tripEventsModel);
    this.#renderOffersItemTripEvent();
    this.#editTripEvenView = new EditTripEvenView(tripEventsModel);
    this.#renderOffersEditTripEvent();

    this.#itemTripEventView.setRolloutEditClickHandler(this.#handleRolloutEditClick);
    this.#editTripEvenView.setRollupEditClickHandler(this.#handleRollupEditClick);
    this.#editTripEvenView.setSubmitEditHandler(this.#handleSubmitEdit);

    if (prevItemTripEventView === null || prevEditTripEvenView === null) {
      render(this.#itemTripEventView, this.#listTripEventContainer.element);
      return;
    }

    if (this.#listTripEventContainer.element.contains(prevItemTripEventView.element)) {
      replace(this.#itemTripEventView, prevItemTripEventView);
    }

    if (this.#listTripEventContainer.element.contains(prevEditTripEvenView.element)) {
      replace(this.#editTripEvenView, prevEditTripEvenView);
    }

    remove(prevItemTripEventView);
    remove(prevEditTripEvenView);

  }

  renderItemTripEvent() {
    this.#itemTripEventView.setRolloutEditClickHandler(this.#handleRolloutEditClick);
    this.#editTripEvenView.setRollupEditClickHandler(this.#handleRollupEditClick);
    this.#editTripEvenView.setSubmitEditHandler(this.#handleSubmitEdit);
    this.#renderOffersItemTripEvent();
    this.#renderOffersEditTripEvent();
    render(this.#itemTripEventView, this.#listTripEventContainer.element);
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

  desroy() {
    remove(this.#itemTripEventView);
    remove(this.#editTripEvenView);
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
