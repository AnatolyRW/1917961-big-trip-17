import Observable from '../framework/observable.js';
import { generateTripEvent } from '../mock/trip-event.js';


export default class ItemTripEventsModel extends Observable {

  #tripEvents = null;

  constructor(tripEventTypesOffers, destinationModel) {
    super();
    this.#tripEvents = Array.from({length: 20}, generateTripEvent(tripEventTypesOffers.offers, destinationModel.destination));
  }

  get tripEvents() {
    return this.#tripEvents;
  }

  updateTripEvent = (updateType, update) => {
    const index = this.#tripEvents.findIndex((tripEvent) => tripEvent.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting task');
    }

    this.#tripEvents = [
      ...this.#tripEvents.slice(0, index),
      update,
      ...this.#tripEvents.slice(index + 1),
    ];

    this._notify(updateType, update);
  };

  addTripEvent = (updateType, update) => {
    this.#tripEvents = [
      update,
      ...this.#tripEvents,
    ];

    this._notify(updateType, update);
  };

  deleteTripEvent = (updateType, update) => {
    const index = this.#tripEvents.findIndex((task) => task.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting task');
    }

    this.#tripEvents = [
      ...this.#tripEvents.slice(0, index),
      ...this.#tripEvents.slice(index + 1),
    ];

    this._notify(updateType);
  };
}
