import './filter-presenter.js';
import { render } from '../render.js';
import SortTripEventsView from '../view/sort-trip-events-view.js';
import ListTripEventsView from '../view/list-trip-events-view.js';
import ItemTripEventView from '../view/item-trip-event-view.js';
import EditTripEvenView from '../view/edit-trip-event-view.js';
import OfferItemTripEventView from '../view/offer-item-trip-event-view.js';
import OfferEditTripEventView from '../view/offer-edit-trip-event-view.js';
import NoTripEventView from '../view/no-trip-event-view.js';

export default class MainPresenter {

  #tripEventsContainer = null;
  #listTripEvents = null;
  #offersWithType = null;
  #itemsTripEvents = null;
  #offers = null;

  constructor(tripEventsContainer, itemsTripEvents, TripEventTypesOffers) {
    this.#tripEventsContainer = tripEventsContainer;

    if(itemsTripEvents) {
      this.#itemsTripEvents = [...itemsTripEvents.tripEvents];
    }

    if(TripEventTypesOffers) {
      this.#offers = [...TripEventTypesOffers.offers];
    }

    this.#listTripEvents = new ListTripEventsView();
  }

  init() {
    if (this.#itemsTripEvents) {
      render(new SortTripEventsView(), this.#tripEventsContainer);
      render(this.#listTripEvents, this.#tripEventsContainer);

      for (let i = 0; i < this.#itemsTripEvents.length; i++) {
        this.#renderItemTripEvent(this.#itemsTripEvents[i]);
      }
    } else {
      render(new NoTripEventView(), this.#tripEventsContainer);
    }

  }

  #renderItemTripEventOffers (itemTripEventView, itemsTripEvent) {
    const itemTripEventForOffersElement = itemTripEventView.element.querySelector('.event__selected-offers');
    this.#offersWithType = this.#offers.find((offer) => (offer.type === itemsTripEvent.type));
    for (let j = 0; j < this.#offersWithType.offers.length; j++) {
      render(new OfferItemTripEventView(this.#offersWithType.offers[j], itemsTripEvent.offers), itemTripEventForOffersElement);
    }
  }

  #renderEditTripEventOffers (itemTripEventView, itemsTripEvent) {
    const itemTripEventForOffersElement = itemTripEventView.element.querySelector('.event__available-offers');
    this.#offersWithType = this.#offers.find((offer) => (offer.type === itemsTripEvent.type));
    for (let j = 0; j < this.#offersWithType.offers.length; j++) {
      render(new OfferEditTripEventView(this.#offersWithType.offers[j], itemsTripEvent.offers), itemTripEventForOffersElement);
    }
  }

  #renderItemTripEvent (itemTripEvent) {
    const itemTripEventView = new ItemTripEventView(itemTripEvent);
    this.#renderItemTripEventOffers(itemTripEventView, itemTripEvent);
    const editTripEvenView = new EditTripEvenView(itemTripEvent);
    this.#renderEditTripEventOffers(editTripEvenView, itemTripEvent);

    const replaceItemToEdit = () => {
      this.#listTripEvents.element.replaceChild(editTripEvenView.element, itemTripEventView.element);
    };

    const replaceEditToItem = () => {
      this.#listTripEvents.element.replaceChild(itemTripEventView.element, editTripEvenView.element);
    };

    const onEscKeyDown = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        replaceEditToItem();
        document.removeEventListener('keydown', onEscKeyDown);
      }
    };

    itemTripEventView.element.querySelector('.event__rollup-btn').addEventListener('click', () => {
      replaceItemToEdit();
      document.addEventListener('keydown', onEscKeyDown);
    });

    editTripEvenView.element.querySelector('.event__rollup-btn').addEventListener('click', () => {
      replaceEditToItem();
      document.removeEventListener('keydown', onEscKeyDown);
    });

    editTripEvenView.element.querySelector('form').addEventListener('submit', (evt) => {
      evt.preventDefault();
      replaceEditToItem();
      document.removeEventListener('keydown', onEscKeyDown);
    });

    render(itemTripEventView, this.#listTripEvents.element);
  }

}
