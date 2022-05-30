import { MODE } from '../const.js';
import { remove, render, replace } from '../framework/render.js';
import ItemTripEventView from '../view/item-trip-event-view.js';
import OffersItemTripEventPresenter from './offers-item-trip-event-presenter.js';

export default class ItemTripEventPresenter {

  #listTripEventContainer = null;
  #itemTripEventView = null;
  #editTripEvenView = null;

  #tripEventModel = null;
  #offersModel = null;
  #tripEventMode = MODE.DEFAULT;
  #distinationModel = null;

  #changeTripEventModel = null;
  #changeTripEventMode = null;

  constructor(listTripEventContainer, tripEventTypesOffersModel, destinationModel, changeTripEventModel, changeTripEventMode) {
    this.#listTripEventContainer = listTripEventContainer;
    this.#offersModel = tripEventTypesOffersModel;
    this.#changeTripEventModel = changeTripEventModel;
    this.#changeTripEventMode = changeTripEventMode;
    this.#distinationModel = destinationModel;
  }

  get tripEventModel() {
    return this.#tripEventModel;
  }

  get itemTripEventView() {
    return this.#itemTripEventView;
  }

  set itemTripEventView(itemTripEventView) {
    this.#itemTripEventView = itemTripEventView;
  }

  get editTripEvenView() {
    return this.#editTripEvenView;
  }

  set editTripEvenView(editTripEvenView) {
    this.#editTripEvenView = editTripEvenView;
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

    this.#itemTripEventView.setRolloutEditClickHandler(this.#handleRolloutEditClick);
    this.#itemTripEventView.setFavoriteClickHandler(this.#handleFavoriteClick);

    if (prevItemTripEventView === null || prevEditTripEvenView === null) {
      render(this.#itemTripEventView, this.#listTripEventContainer.element);
      return;
    }

    if (this.#tripEventMode === MODE.DEFAULT) {
      replace(this.#itemTripEventView, prevItemTripEventView);
    }

    if (this.#tripEventMode === MODE.EDITING) {
      replace(this.#editTripEvenView, prevEditTripEvenView);
    }

    remove(prevItemTripEventView);
    remove(prevEditTripEvenView);

  }

  /*#onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#replaceEditToItem();
      document.removeEventListener('keydown', this.#onEscKeyDown);
    }
  };*/

  #replaceItemToEdit = () => {
    replace(this.#editTripEvenView, this.#itemTripEventView);
    this.#changeTripEventMode();
    this.#tripEventMode = MODE.EDITING;
  };

  #replaceEditToItem = () => {
    replace(this.#itemTripEventView, this.#editTripEvenView);
    this.#tripEventMode = MODE.DEFAULT;
  };

  #handleFavoriteClick = () => {
    this.#changeTripEventModel({...this.#tripEventModel, isFavorite: !this.#tripEventModel.isFavorite});
  };

  #handleRolloutEditClick = () => {
    this.#replaceItemToEdit();
    //document.addEventListener('keydown', this.#onEscKeyDown);
  };

  #renderOffersItemTripEvent() {
    const offersItemTripEventPresenter = new OffersItemTripEventPresenter(this.#itemTripEventView, this.#tripEventModel);
    offersItemTripEventPresenter.init(this.#offersModel);
  }

  resetView = () => {
    if (this.#tripEventMode !== MODE.DEFAULT) {
      this.#replaceEditToItem();
    }
  };

  desroy() {
    remove(this.#itemTripEventView);
    remove(this.#editTripEvenView);
  }
}
