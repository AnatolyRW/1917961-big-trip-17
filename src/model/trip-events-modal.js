import { generateTripEvent } from '../mock/trip-event.js';
import { generateOffersWithTypes } from '../mock/offers.js';

export default class TripEventsModal {

  offers = generateOffersWithTypes();
  tripEvents = Array.from({length: 5}, generateTripEvent(this.offers));

  getOffers = () => this.offers;

  getTripEvents = () => this.tripEvents;

}
