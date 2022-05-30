import { generateTripEvent } from '../mock/trip-event.js';


export default class ItemsTripEventsModel {

  #tripEvents = null;

  constructor(tripEventTypesOffers, destinationModel) {
    this.#tripEvents = Array.from({length: 20}, generateTripEvent(tripEventTypesOffers.offers, destinationModel.destination));
  }

  get tripEvents() {
    return this.#tripEvents;
  }

}
