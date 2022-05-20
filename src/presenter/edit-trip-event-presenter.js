import { remove, render, replace } from '../framework/render.js';
import EditTripEventView from '../view/edit-trip-event-view.js';
import EditTripEvenView from '../view/edit-trip-event-view.js';
import OffersItemTripEventsPresenter from './offers-item-trip-event-presenter.js';
import OffersEditTripEventsPresenter from './offers-edit-trip-event-presenter';

export default class EditTripEventPresenter {

  #container = null;
  #editTripEventView = null;

  #tripEventModel = null;
  #offersModel = null;

  constructor(tripEventsModel, container, TripEventTypesOffersModel) {
    this.#tripEventModel = tripEventsModel;
    this.#container = container;
    this.#offersModel = TripEventTypesOffersModel;
  }

  get tripEventModel() {
    return this.#tripEventModel;
  }

  set tripEventModel(itemsTripEventsModel) {
    this.#tripEventModel = itemsTripEventsModel;
  }

  init() {
    this.#editTripEventView = new EditTripEventView(this.#tripEventModel);
    this.#renderEditTripEvent(this.#tripEventModel);
  }

  #renderEditTripEvent(TripEventModel) {

    const offersItemTripEventsPresenter = new OffersItemTripEventsPresenter(this.#offersModel);
    offersItemTripEventsPresenter.init(this.#editTripEventView, TripEventModel);


    const editTripEvenView = new EditTripEvenView(TripEventModel);
    const offersEditTripEventsPresenter = new OffersEditTripEventsPresenter(this.#offersModel);
    offersEditTripEventsPresenter.init(editTripEvenView, TripEventModel);

    const replaceItemToEdit = () => {
      replace(editTripEvenView, this.itemTripEventView);
    };

    const replaceEditToItem = () => {
      replace(this.itemTripEventView, editTripEvenView);
    };

    const onEscKeyDown = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        replaceEditToItem();
        document.removeEventListener('keydown', onEscKeyDown);
      }
    };

    this.#editTripEventView.setRolloutEditClickHandler(() => {
      replaceItemToEdit();
      document.addEventListener('keydown', onEscKeyDown);
    });

    editTripEvenView.setRollupEditClickHandler(() => {
      replaceEditToItem();
      document.removeEventListener('keydown', onEscKeyDown);
    });

    editTripEvenView.setSubmitEditHandler((evt) => {
      evt.preventDefault();
      replaceEditToItem();
      document.removeEventListener('keydown', onEscKeyDown);
    });

    render(this.#editTripEventView, this.#container.element);
  }

  removeItemTripEvent() {
    remove(this.#editTripEventView);
  }
}
