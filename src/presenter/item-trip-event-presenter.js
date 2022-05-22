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
  #changeTripEventModel = null;

  constructor(listTripEventContainer, TripEventTypesOffersModel, changeTripEventModel) {
    this.#listTripEventContainer = listTripEventContainer;
    this.#offersModel = TripEventTypesOffersModel;
    this.#changeTripEventModel = changeTripEventModel;
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
    this.#itemTripEventView.setFavoriteClickHandler(this.#handleFavoriteClick);
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

  #replaceEditToItem = () => {
    replace(this.#itemTripEventView, this.#editTripEvenView);
  };

  #handleFavoriteClick = () => {
    this.#changeTripEventModel({...this.#tripEventModel, isFavorite: !this.#tripEventModel.isFavorite});
  };

  #handleRolloutEditClick = () => {
    this.#replaceItemToEdit();
    document.addEventListener('keydown', this.#onEscKeyDown);
  };

  #handleRollupEditClick = () => {
    this.#replaceEditToItem();
    document.removeEventListener('keydown', this.#onEscKeyDown);
  };

  #handleSubmitEdit = (tripEventModel) => {
    this.#changeTripEventModel(tripEventModel);
    this.#replaceEditToItem();
    document.removeEventListener('keydown', this.#onEscKeyDown);
  };

  renderItemTripEvent() {
    this.#itemTripEventView.setRolloutEditClickHandler(this.#handleRolloutEditClick);
    this.#itemTripEventView.setFavoriteClickHandler(this.#handleFavoriteClick);
    this.#editTripEvenView.setRollupEditClickHandler(this.#handleRollupEditClick);
    this.#editTripEvenView.setSubmitEditHandler(this.#handleSubmitEdit);
    this.#renderOffersItemTripEvent();
    this.#renderOffersEditTripEvent();
    render(this.#itemTripEventView, this.#listTripEventContainer.element);
  }

  #renderOffersItemTripEvent() {
    const offersItemTripEventPresenter = new OffersItemTripEventPresenter(this.#itemTripEventView, this.#tripEventModel);
    offersItemTripEventPresenter.init(this.#offersModel);
  }

  #renderOffersEditTripEvent() {
    const offersEditTripEventPresenter = new OffersEditTripEventPresenter(this.#editTripEvenView, this.#tripEventModel);
    offersEditTripEventPresenter.init(this.#offersModel);
  }

  desroy() {
    remove(this.#itemTripEventView);
    remove(this.#editTripEvenView);
  }
}
