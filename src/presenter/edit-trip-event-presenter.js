import { MODE } from '../const.js';
import { remove } from '../framework/render.js';
import EditTripEventView from '../view/edit-trip-event-view.js';
import OffersEditTripEventPresenter from './offers-edit-trip-event-presenter';
import {UserAction, UpdateType} from '../const.js';

export default class EditTripEventPresenter {

  #listTripEventContainer = null;
  #itemTripEventView = null;
  #editTripEventView = null;

  #tripEventModel = null;
  #offersModel = null;
  #tripEventMode = MODE.DEFAULT;
  #distinationModel = null;

  #changeTripEventMode = null;
  #changeViewAction = null;
  #destroyEditTripEventPresenter = null;

  constructor(
    listTripEventContainer,
    tripEventTypesOffersModel,
    destinationModel,
    itemTripEventView,
    destroyEditTripEventPresenter,
    changeViewAction
  ) {
    this.#listTripEventContainer = listTripEventContainer;
    this.#offersModel = tripEventTypesOffersModel;
    this.#distinationModel = destinationModel;
    this.#itemTripEventView = itemTripEventView;
    this.#destroyEditTripEventPresenter = destroyEditTripEventPresenter;
    this.#changeViewAction = changeViewAction;
  }

  get tripEventModel() {
    return this.#tripEventModel;
  }

  get editTripEvenView() {
    return this.#editTripEventView;
  }

  set editTripEvenView(editTripEvenView) {
    this.#editTripEventView = editTripEvenView;
  }

  get itemTripEventView() {
    return this.#itemTripEventView;
  }

  set itemTripEventView(itemTripEventView) {
    this.#itemTripEventView = itemTripEventView;
  }

  get listTripEventContainer() {
    return this.#listTripEventContainer;
  }

  init(tripEventsModel) {
    this.#tripEventModel = tripEventsModel;

    this.#editTripEventView = new EditTripEventView(tripEventsModel, this.#distinationModel);
    this.#renderOffersEditTripEvent(this.#tripEventModel);

    this.#editTripEventView.setRollupEditClickHandler(this.#handleRollupEditClick);
    this.#editTripEventView.setSaveClickHandler(this.#handlerSaveClick);
    this.#editTripEventView.setDeleteClickHandler(this.#handlerDeleteClick);
    this.#editTripEventView.setRenderOffersEditTripEvent(this.#renderOffersEditTripEvent);
    this.#editTripEventView.setDestinationChangeHandler(this.#handlerDestinationChange);
  }

  onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#destroyEditTripEventPresenter();
      document.removeEventListener('keydown', this.onEscKeyDown);
    }
  };

  #handleRollupEditClick = () => {
    this.#destroyEditTripEventPresenter();
    document.removeEventListener('keydown', this.onEscKeyDown);
  };

  #handlerSaveClick = (changeItemTripEvent) => {
    this.#changeViewAction(
      UserAction.UPDATE_TRIP_EVENT,
      UpdateType.PATCH,
      {...changeItemTripEvent}
    );
    //this.#destroyEditTripEventPresenter();
    document.removeEventListener('keydown', this.onEscKeyDown);
  };

  #handlerDeleteClick = (itemTripEvent) => {
    this.#changeViewAction(
      UserAction.DELETE_TRIP_EVENT,
      UpdateType.MINOR,
      {...itemTripEvent}
    );
    document.removeEventListener('keydown', this.onEscKeyDown);
  };

  #renderOffersEditTripEvent = (tripEventModel) => {
    const offersEditTripEventPresenter = new OffersEditTripEventPresenter(this.#editTripEventView, tripEventModel);
    offersEditTripEventPresenter.init(this.#offersModel);
  };

  #handlerDestinationChange = (nameCity) => {
    const tmp = this.#distinationModel.find((element) => (element.name ===  nameCity));
    return tmp;
  };

  desroy() {
    remove(this.#editTripEventView);
  }

}
