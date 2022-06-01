import { MODE } from '../const.js';
import { remove } from '../framework/render.js';
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

  #changeTripEventMode = null;
  #destroyEditTripEventPresenter = null;

  constructor(listTripEventContainer, tripEventTypesOffersModel, destinationModel, itemTripEventView, destroyEditTripEventPresenter) {
    this.#listTripEventContainer = listTripEventContainer;
    this.#offersModel = tripEventTypesOffersModel;
    this.#distinationModel = destinationModel;
    this.#itemTripEventView = itemTripEventView;
    this.#destroyEditTripEventPresenter = destroyEditTripEventPresenter;
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
    this.#renderOffersEditTripEvent(this.#offersModel);

    this.#editTripEventView.setRollupEditClickHandler(this.#handleRollupEditClick);
    this.#editTripEventView.setSubmitEditHandler(this.#handleSubmitEdit);
    this.#editTripEventView.setRenderOffersEditTripEvent(this.#renderOffersEditTripEvent);
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

  #handleSubmitEdit = () => {
    this.#destroyEditTripEventPresenter();
    document.removeEventListener('keydown', this.onEscKeyDown);
  };

  #renderOffersEditTripEvent = (offersModel) => {
    const offersEditTripEventPresenter = new OffersEditTripEventPresenter(this.#editTripEventView, this.#tripEventModel);
    offersEditTripEventPresenter.init(offersModel);
  };

  desroy() {
    remove(this.#editTripEventView);
  }

}
