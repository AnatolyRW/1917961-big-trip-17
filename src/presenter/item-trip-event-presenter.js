import { MODE } from '../const.js';
import { remove, render, replace } from '../framework/render.js';
import ItemTripEventView from '../view/item-trip-event-view.js';
import EditTripEventPresenter from './edit-trip-event-presenter.js';
import OffersItemTripEventPresenter from './offers-item-trip-event-presenter.js';
import {UserAction, UpdateType} from '../const.js';

export default class ItemTripEventPresenter {

  #listTripEventContainer = null;
  #itemTripEventView = null;
  #editTripEvenView = null;

  #tripEventModel = null;
  #offersModel = null;
  #tripEventMode = MODE.DEFAULT;
  #distinationModel = null;

  #changeViewAction = null;
  #changeTripEventMode = null;

  #editTripEventPresenter = null;


  constructor(listTripEventContainer, tripEventTypesOffersModel, distinationModel, changeViewAction, changeTripEventMode) {
    this.#listTripEventContainer = listTripEventContainer;
    this.#offersModel = tripEventTypesOffersModel;
    this.#distinationModel = distinationModel;
    this.#changeViewAction = changeViewAction;
    this.#changeTripEventMode = changeTripEventMode;
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

    if (prevItemTripEventView === null & prevEditTripEvenView === null) {
      render(this.#itemTripEventView, this.#listTripEventContainer.element);
      return;
    }

    if (this.#tripEventMode === MODE.DEFAULT) {
      replace(this.#itemTripEventView, prevItemTripEventView);
    }

    if (this.#tripEventMode === MODE.EDITING) {
      this.#closeEditTripEvent();
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
      this.#closeEditTripEvent,
      this.#changeViewAction
    );
    this.#editTripEventPresenter.init(this.#tripEventModel);
    replace(this.#editTripEventPresenter.editTripEvenView, this.#itemTripEventView);
    this.#changeTripEventMode();
    this.#tripEventMode = MODE.EDITING;
    this.#editTripEvenView = this.#editTripEventPresenter.editTripEvenView;
  };

  #replaceEditToItem = () => {
    replace(this.#itemTripEventView, this.#editTripEventPresenter.editTripEvenView);
  };

  #handleFavoriteClick = () => {
    this.#changeViewAction(
      UserAction.UPDATE_TRIP_EVENT,
      UpdateType.PATCH,
      {...this.#tripEventModel, isFavorite: !this.#tripEventModel.isFavorite},
    );
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
      this.#closeEditTripEvent();
    }
  };

  desroy() {
    remove(this.#itemTripEventView);
  }

  #closeEditTripEvent = () => {
    this.#replaceEditToItem();
    this.#tripEventMode = MODE.DEFAULT;
    this.#editTripEventPresenter.desroy();
    this.#editTripEventPresenter = null;
  };

}
