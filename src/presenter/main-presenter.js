import './filter-presenter.js';
import { render, replace } from '../framework/render.js';
import SortTripEventsView from '../view/sort-trip-events-view.js';
import ListTripEventsView from '../view/list-trip-events-view.js';
import ItemTripEventView from '../view/item-trip-event-view.js';
import EditTripEvenView from '../view/edit-trip-event-view.js';
import OfferItemTripEventView from '../view/offer-item-trip-event-view.js';
import OfferEditTripEventView from '../view/offer-edit-trip-event-view.js';
import NoTripEventsView from '../view/no-trip-events-view.js';

export default class MainPresenter {

  #tripEventsContainer = null;
  #listTripEvents = null;
  #offersWithType = null;
  #itemsTripEvents = null;
  #offers = null;
  #sortTripEvents = null;
  #noTripEvents = null;

  constructor(itemsTripEvents, TripEventTypesOffers) {

    if (itemsTripEvents) {
      this.#itemsTripEvents = [...itemsTripEvents.tripEvents];
    }

    if (TripEventTypesOffers) {
      this.#offers = [...TripEventTypesOffers.offers];
    }

    this.#listTripEvents = new ListTripEventsView();
    this.#sortTripEvents = new SortTripEventsView();
    this.#noTripEvents = new NoTripEventsView();
  }

  init() {
    if (this.#itemsTripEvents) {
      render(this.#sortTripEvents , this.#sortTripEvents.container);
      render(this.#listTripEvents, this.#listTripEvents.container);

      for (let i = 0; i < this.#itemsTripEvents.length; i++) {
        this.#renderItemTripEvent(this.#itemsTripEvents[i]);
      }
    } else {
      render(this.#noTripEvents, this.#noTripEvents.container);
    }

  }

  #renderItemTripEventOffers(itemTripEventView, itemsTripEvent) {
    const itemTripEventForOffersElement = itemTripEventView.element.querySelector('.event__selected-offers');
    this.#offersWithType = this.#offers.find((offer) => (offer.type === itemsTripEvent.type));
    for (let j = 0; j < this.#offersWithType.offers.length; j++) {
      render(new OfferItemTripEventView(this.#offersWithType.offers[j], itemsTripEvent.offers), itemTripEventForOffersElement);
    }
  }

  #renderEditTripEventOffers(itemTripEventView, itemsTripEvent) {
    const itemTripEventForOffersElement = itemTripEventView.element.querySelector('.event__available-offers');
    this.#offersWithType = this.#offers.find((offer) => (offer.type === itemsTripEvent.type));
    for (let j = 0; j < this.#offersWithType.offers.length; j++) {
      render(new OfferEditTripEventView(this.#offersWithType.offers[j], itemsTripEvent.offers), itemTripEventForOffersElement);
    }
  }

  #renderItemTripEvent(itemTripEvent) {
    const itemTripEventView = new ItemTripEventView(itemTripEvent);
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

    render(itemTripEventView, this.#listTripEvents.element);
  }

}
