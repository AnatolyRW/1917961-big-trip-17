import { MODE } from '../const.js';
import { remove, replace } from '../framework/render.js';
import EditTripEventView from '../view/edit-trip-event-view.js';
import OffersEditTripEventPresenter from './offers-edit-trip-event-presenter';

export default class EditTripEventPresenter {

  #listTripEventContainer = null;
  #itemTripEventView = null;
  #editTripEventView = null;

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
    this.#renderOffersEditTripEvent();

    this.#editTripEventView.setRollupEditClickHandler(this.#handleRollupEditClick);
    this.#editTripEventView.setSubmitEditHandler(this.#handleSubmitEdit);

  }

  #onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#replaceEditToItem();
      document.removeEventListener('keydown', this.#onEscKeyDown);
    }
  };

  #replaceEditToItem = () => {
    replace(this.#itemTripEventView, this.#editTripEventView);
    //this.#tripEventMode = MODE.DEFAULT;
  };

  #handleRollupEditClick = () => {
    this.#replaceEditToItem();
    document.removeEventListener('keydown', this.#onEscKeyDown);
  };

  #renderOffersEditTripEvent() {
    const offersEditTripEventPresenter = new OffersEditTripEventPresenter(this.#editTripEventView, this.#tripEventModel);
    offersEditTripEventPresenter.init(this.#offersModel);
  }

  #handleSubmitEdit = (tripEventModel) => {
    this.#changeTripEventModel(tripEventModel);
    this.#replaceEditToItem();
    document.removeEventListener('keydown', this.#onEscKeyDown);
  };

  removeItemTripEvent() {
    remove(this.#editTripEventView);
  }
}
