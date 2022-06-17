import { remove } from '../framework/render.js';
import EditTripEventView from '../view/edit-trip-event-view.js';
import { UserAction, UpdateType } from '../const.js';

export default class EditTripEventPresenter {

  #listContainer = null;
  #itemTripEventView = null;
  #editTripEventView = null;

  #tripEventModel = null;
  #offersModel = null;
  #destinationModel = null;

  #changeViewAction = null;
  #closeEditHandler = null;

  constructor(listContainer, offersModel, destinationModel, closeEditHandler, changeViewAction) {
    this.#listContainer = listContainer;
    this.#offersModel = offersModel;
    this.#destinationModel = destinationModel;
    this.#closeEditHandler = closeEditHandler;
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

  get listTripEventContainer() {
    return this.#listContainer;
  }

  init(tripEventsModel) {
    this.#tripEventModel = tripEventsModel;
    this.#editTripEventView = new EditTripEventView(tripEventsModel, this.#destinationModel, this.#offersModel);
    this.#editTripEventView.setRollupEditClickHandler(this.#handleRollupEditClick);
    this.#editTripEventView.setSaveClickHandler(this.#handlerSaveClick);
    this.#editTripEventView.setDeleteClickHandler(this.#handlerDeleteClick);
    this.#editTripEventView.setDestinationChangeHandler(this.#handlerDestinationChange);
  }

  onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#closeEditHandler();
      document.removeEventListener('keydown', this.onEscKeyDown);
    }
  };

  #handleRollupEditClick = () => {
    this.#closeEditHandler();
    document.removeEventListener('keydown', this.onEscKeyDown);
  };

  #handlerSaveClick = (changeItemTripEvent) => {
    this.#changeViewAction(
      UserAction.UPDATE_TRIP_EVENT,
      UpdateType.PATCH,
      {...changeItemTripEvent}
    );
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

  #handlerDestinationChange = (nameCity) => this.#destinationModel.destinations.find((element) => (element.name ===  nameCity));

  desroy() {
    remove(this.#editTripEventView);
  }

}
