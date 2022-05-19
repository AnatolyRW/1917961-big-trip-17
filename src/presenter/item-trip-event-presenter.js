import './filter-presenter.js';
import { remove, render, replace } from '../framework/render.js';
import SortTripEventsView from '../view/sort-trip-events-view.js';
import ListTripEventsView from '../view/list-trip-events-view.js';
import ItemTripEventView from '../view/item-trip-event-view.js';
import EditTripEvenView from '../view/edit-trip-event-view.js';
import OfferItemTripEventView from '../view/offer-item-trip-event-view.js';
import OfferEditTripEventView from '../view/offer-edit-trip-event-view.js';
import NoTripEventsView from '../view/no-trip-events-view.js';

export default class ItemTripEventPresenter {

  #listTripEventsView = null;
  #sortTripEventsView = null;
  #noTripEventsView = null;
  #itemsTripEventsView = [];

  #offersWithType = null;
  #itemsTripEventsModel = [];
  #offersModel = null;

  constructor(itemsTripEventsModel, TripEventTypesOffersModel) {

    this.#itemsTripEventsModel = itemsTripEventsModel;
    this.#offersModel = TripEventTypesOffersModel;

    this.#listTripEventsView = new ListTripEventsView();
    this.#sortTripEventsView = new SortTripEventsView();
    this.#noTripEventsView = new NoTripEventsView();
  }

  get itemsTripEventsModel () {
    return this.#itemsTripEventsModel;
  }

  set itemsTripEventsModel (itemsTripEventsModel) {
    this.#itemsTripEventsModel = itemsTripEventsModel;
  }

  init(idFilter) {
    remove(this.#noTripEventsView);

    if (this.#itemsTripEventsModel.length) {
      render(this.#sortTripEventsView , this.#sortTripEventsView.container);
      render(this.#listTripEventsView, this.#listTripEventsView.container);

      for (let i = 0; i < this.#itemsTripEventsModel.length; i++) {
        this.#renderItemTripEvent(this.#itemsTripEventsModel[i]);
      }
    } else {
      this.#noTripEventsView.idFilter = idFilter;
      render(this.#noTripEventsView, this.#noTripEventsView.container);
    }

  }

  #renderItemTripEventOffers(itemTripEventView, itemsTripEvent) {
    const itemTripEventForOffersElement = itemTripEventView.element.querySelector('.event__selected-offers');
    this.#offersWithType = this.#offersModel.find((offer) => (offer.type === itemsTripEvent.type));
    for (let j = 0; j < this.#offersWithType.offers.length; j++) {
      render(new OfferItemTripEventView(this.#offersWithType.offers[j], itemsTripEvent.offers), itemTripEventForOffersElement);
    }
  }

  #renderEditTripEventOffers(itemTripEventView, itemsTripEvent) {
    const itemTripEventForOffersElement = itemTripEventView.element.querySelector('.event__available-offers');
    this.#offersWithType = this.#offersModel.find((offer) => (offer.type === itemsTripEvent.type));
    for (let j = 0; j < this.#offersWithType.offers.length; j++) {
      render(new OfferEditTripEventView(this.#offersWithType.offers[j], itemsTripEvent.offers), itemTripEventForOffersElement);
    }
  }

  #renderItemTripEvent(itemTripEvent) {
    const itemTripEventView = new ItemTripEventView(itemTripEvent);
    this.#itemsTripEventsView.push(itemTripEventView);

    this.#renderItemTripEventOffers(itemTripEventView, itemTripEvent);
    const editTripEvenView = new EditTripEvenView(itemTripEvent);
    this.#renderEditTripEventOffers(editTripEvenView, itemTripEvent);

    const replaceItemToEdit = () => {
      replace(editTripEvenView, itemTripEventView);
    };

    const replaceEditToItem = () => {
      replace(itemTripEventView, editTripEvenView);
    };

    const onEscKeyDown = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        replaceEditToItem();
        document.removeEventListener('keydown', onEscKeyDown);
      }
    };

    itemTripEventView.setRolloutEditClickHandler(() => {
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

    render(itemTripEventView, this.#listTripEventsView.element);
  }

  removeItemTripEvent() {
    for (let i = 0; i < this.#itemsTripEventsView.length; i++) {
      remove(this.#itemsTripEventsView[i]);
    }
  }
}
