import { MODE } from '../const.js';
import { remove, render, replace } from '../framework/render.js';
import ItemTripEventView from '../view/item-trip-event-view.js';
import EditTripEventPresenter from './edit-trip-event-presenter.js';
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

  #editTripEventPresenter = null;


  constructor(listTripEventContainer, tripEventTypesOffersModel, distinationModel, changeTripEventModel, changeTripEventMode) {
    this.#listTripEventContainer = listTripEventContainer;
    this.#offersModel = tripEventTypesOffersModel;
    this.#changeTripEventModel = changeTripEventModel;
    this.#changeTripEventMode = changeTripEventMode;
    this.#distinationModel = distinationModel;
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
    const prevEditTripEvenView = this.#editTripEvenView;

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

  #replaceItemToEdit = () => {
    this.#editTripEventPresenter = new EditTripEventPresenter(
      this.#listTripEventContainer,
      this.#offersModel,
      this.#distinationModel,
      this.#itemTripEventView,
      this.#destroyEditTripEventPresenter
    );
    this.#editTripEventPresenter.init(this.#tripEventModel);
    replace(this.#editTripEventPresenter.editTripEvenView, this.#itemTripEventView);
    this.#changeTripEventMode();
    this.#tripEventMode = MODE.EDITING;
  };

  #replaceEditToItem = () => {
    replace(this.#itemTripEventView, this.#editTripEventPresenter.editTripEvenView);
  };

  #handleFavoriteClick = () => {
    this.#changeTripEventModel({...this.#tripEventModel, isFavorite: !this.#tripEventModel.isFavorite});
  };

  #handleRolloutEditClick = () => {
    this.#replaceItemToEdit();
    document.addEventListener('keydown', this.#editTripEventPresenter.onEscKeyDown);
  };

  #renderOffersItemTripEvent() {
    const offersItemTripEventPresenter = new OffersItemTripEventPresenter(this.#itemTripEventView, this.#tripEventModel);
    offersItemTripEventPresenter.init(this.#offersModel);
  }

  resetView = () => {
    if (this.#tripEventMode !== MODE.DEFAULT) {
      this.#destroyEditTripEventPresenter();
    }
  };

  desroy() {
    remove(this.#itemTripEventView);
  }

  #destroyEditTripEventPresenter = () => {
    this.#replaceEditToItem();
    this.#tripEventMode = MODE.DEFAULT;
    this.#editTripEventPresenter.desroy();
    this.#editTripEventPresenter = null;
  };

}
