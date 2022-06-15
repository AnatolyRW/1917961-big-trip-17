import { Mode } from '../const.js';
import { remove, render, replace } from '../framework/render.js';
import ItemTripEventView from '../view/item-trip-event-view.js';
import EditTripEventPresenter from './edit-trip-event-presenter.js';
import { UserAction, UpdateType } from '../const.js';

export default class ItemTripEventPresenter {

  #listContainer = null;
  #itemTripEventView = null;
  #editTripEvenView = null;

  #tripEventModel = null;
  #offersModel = null;
  #isEdit = false;
  #distinationModel = null;

  #changeViewAction = null;
  #resetEditMode = null;

  #editTripEventPresenter = null;


  constructor(listTripEventContainer, tripEventTypesOffersModel, distinationModel, changeViewAction, resetEditMode) {
    this.#listContainer = listTripEventContainer;
    this.#offersModel = tripEventTypesOffersModel;
    this.#distinationModel = distinationModel;
    this.#changeViewAction = changeViewAction;
    this.#resetEditMode = resetEditMode;
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
    return this.#listContainer;
  }

  init(tripEventsModel) {
    this.#tripEventModel = tripEventsModel;

    const prevItemTripEventView = this.#itemTripEventView;
    const prevEditTripEvenView = this.#editTripEvenView;

    this.#itemTripEventView = new ItemTripEventView(tripEventsModel, this.#offersModel);

    this.#itemTripEventView.setRolloutEditClickHandler(this.#handleRolloutEditClick);
    this.#itemTripEventView.setFavoriteClickHandler(this.#handleFavoriteClick);

    if (prevItemTripEventView === null & prevEditTripEvenView === null) {
      render(this.#itemTripEventView, this.#listContainer.element);
      return;
    }

    if (!this.#isEdit) {
      replace(this.#itemTripEventView, prevItemTripEventView);
    }
    this.resetView();

    remove(prevItemTripEventView);
    remove(prevEditTripEvenView);
  }

  #replaceItemToEdit = () => {
    this.#editTripEventPresenter = new EditTripEventPresenter(this.#listContainer, this.#offersModel, this.#distinationModel, this.#closeEditHandler, this.#changeViewAction);
    this.#editTripEventPresenter.init(this.#tripEventModel);
    replace(this.#editTripEventPresenter.editTripEvenView, this.#itemTripEventView);
    this.#resetEditMode();
    this.#isEdit = Mode.EDITING;
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

  resetView = () => {
    if (this.#isEdit) {
      this.#closeEditHandler();
    }
  };

  desroy() {
    remove(this.#itemTripEventView);
  }

  #closeEditHandler = () => {
    this.#replaceEditToItem();
    this.#isEdit = Mode.DEFAULT;
    this.#editTripEventPresenter.editTripEventView = null;
    this.#editTripEventPresenter = null;
  };

  setSaving = () => {
    if (this.#isEdit) {
      this.#editTripEventPresenter.editTripEvenView.updateElement({
        isDisabled: true,
        isSaving: true,
      });
    }
  };

  setDeleting = () => {
    if (this.#isEdit) {
      this.#editTripEventPresenter.editTripEvenView.updateElement({
        isDisabled: true,
        isDeleting: true,
      });
    }
  };

  setAborting = () => {
    if (!this.#isEdit) {
      this.#itemTripEventView.shake();
      return;
    }

    const resetFormState = () => {
      this.#editTripEventPresenter.editTripEvenView.updateElement({
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      });
    };

    this.#editTripEventPresenter.editTripEvenView.shake(resetFormState);
  };

}
