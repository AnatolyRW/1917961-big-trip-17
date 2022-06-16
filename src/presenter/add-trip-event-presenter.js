import { render, remove, RenderPosition } from '../framework/render.js';
import AddTripEventView from '../view/add-trip-event-view.js';
import { UserAction, UpdateType } from '../const.js';
import { getBlankTripEvent } from '../util/common.js';

export default class AddTripEventPresenter {

  #listContainer = null;
  #itemTripEventView = null;
  #addTripEventView = null;

  #tripEventModel = null;
  #offersModel = null;
  #destinationModel = null;

  #changeViewAction = null;
  #closeEditHandler = null;

  #destroyCallback = null;

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
    return this.#addTripEventView;
  }

  set editTripEvenView(editTripEvenView) {
    this.#addTripEventView = editTripEvenView;
  }

  get listTripEventContainer() {
    return this.#listContainer;
  }

  init(callback) {
    this.#destroyCallback = callback;

    if (this.#addTripEventView !== null) {
      return;
    }
    this.#addTripEventView = new AddTripEventView(getBlankTripEvent(this.#destinationModel), this.#destinationModel, this.#offersModel);
    this.#addTripEventView.setSaveClickHandler(this.#handlerSaveClick);
    this.#addTripEventView.setCancelClickHandler(this.#handlerCancelClick);
    this.#addTripEventView.setDestinationChangeHandler(this.#handlerDestinationChange);

    render(this.#addTripEventView, this.#listContainer.element, RenderPosition.AFTERBEGIN);

    document.addEventListener('keydown', this.onEscKeyDown);
  }

  onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#closeEditHandler();
      document.removeEventListener('keydown', this.onEscKeyDown);
    }
  };

  #handlerSaveClick = (changeItemTripEvent) => {
    this.#changeViewAction(
      UserAction.ADD_TRIP_EVENT,
      UpdateType.MAJOR,
      { ...changeItemTripEvent }
    );
  };

  #handlerCancelClick = () => {
    this.desroy();
    document.removeEventListener('keydown', this.onEscKeyDown);
  };

  #handlerDestinationChange = (nameCity) => {
    const tmp = this.#destinationModel.destinations.find((element) => (element.name === nameCity));
    return tmp;
  };

  setSaving = () => {
    this.#addTripEventView.updateElement({
      isDisabled: true,
      isSaving: true,
    });
  };

  setAborting = () => {
    const resetFormState = () => {
      this.#addTripEventView.updateElement({
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      });
    };
    this.#addTripEventView.shake(resetFormState);
  };

  desroy() {
    if (this.#addTripEventView === null) {
      return;
    }
    this.#destroyCallback?.();
    remove(this.#addTripEventView);
    this.#addTripEventView = null;
    document.removeEventListener('keydown', this.onEscKeyDown);
  }

}
