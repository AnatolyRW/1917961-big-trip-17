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
  #changeTripEventModel = null;
  #destroyEditTripEventPresenter = null;

  constructor(
    listTripEventContainer,
    tripEventTypesOffersModel,
    destinationModel,
    itemTripEventView,
    destroyEditTripEventPresenter,
    changeTripEventModel
  ) {
    this.#listTripEventContainer = listTripEventContainer;
    this.#offersModel = tripEventTypesOffersModel;
    this.#distinationModel = destinationModel;
    this.#itemTripEventView = itemTripEventView;
    this.#destroyEditTripEventPresenter = destroyEditTripEventPresenter;
    this.#changeTripEventModel = changeTripEventModel;
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
    this.#editTripEventView.setSubmitEditHandler(this.#handleSubmitEdit);
    this.#editTripEventView.setRenderOffersEditTripEvent(this.#renderOffersEditTripEvent);
    this.#editTripEventView.setDestinationChangeHandler(this.#handlerdestinationChange);
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

  #handleSubmitEdit = (newItemTripEvent) => {
    this.#changeTripEventModel(newItemTripEvent);
    this.#destroyEditTripEventPresenter();
    document.removeEventListener('keydown', this.onEscKeyDown);
  };

  #renderOffersEditTripEvent = (tripEventModel) => {
    const offersEditTripEventPresenter = new OffersEditTripEventPresenter(this.#editTripEventView, tripEventModel);
    offersEditTripEventPresenter.init(this.#offersModel);
  };

  #handlerdestinationChange = (nameCity) => {
    const tmp = this.#distinationModel.find((element) => (element.name ===  nameCity));
    return tmp;
  };

  desroy() {
    remove(this.#editTripEventView);
  }

}
