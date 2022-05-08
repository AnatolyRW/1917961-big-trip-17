import { generateTripEvent } from '../mock/trip-event.js';


export default class ItemsTripEventsModel {

  #tripEvents = null;

  constructor(tripEventTypesOffers) {
    this.#tripEvents = Array.from({length: 5}, generateTripEvent(tripEventTypesOffers.offers));
  }

  get tripEvents() {
    return this.#tripEvents;
  }

}
