import { generateTripEvent } from '../mock/trip-event.js';


export default class TripEventsModal {
  constructor(offers) {
    this.tripEvents = Array.from({length: 5}, generateTripEvent(offers.getOffers()));
  }

  getTripEvents = () => this.tripEvents;

}
