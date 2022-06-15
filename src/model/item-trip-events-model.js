import Observable from '../framework/observable.js';
import { UpdateType } from '../const.js';


export default class ItemTripEventsModel extends Observable {

  #tripEvents = [];
  #tripEventsApiService = null;

  constructor(tripEventsApiService) {
    super();
    this.#tripEventsApiService = tripEventsApiService;
  }


  init = async () => {
    try {
      const tripEvents = await this.#tripEventsApiService.tripEvents;
      this.#tripEvents = tripEvents.map(this.#adaptToClient);
    } catch (err) {
      this.#tripEvents = [];
    }
    this._notify(UpdateType.INIT);
  };

  get tripEvents() {
    return this.#tripEvents;
  }

  updateTripEvent = async (updateType, update) => {
    const index = this.#tripEvents.findIndex((tripEvent) => tripEvent.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting task');
    }
    try {
      const response = await this.#tripEventsApiService.updateTripEvent(update);
      const updateTripEvent = this.#adaptToClient(response);
      this.#tripEvents = [
        ...this.#tripEvents.slice(0, index),
        updateTripEvent,
        ...this.#tripEvents.slice(index + 1),
      ];
      this._notify(updateType, updateTripEvent);
    } catch (err) {
      throw new Error('Can\'t update task');
    }
  };

  addTripEvent = async (updateType, update) => {
    try {
      const response = await this.#tripEventsApiService.addTripEvent(update);
      const newTripEvent = this.#adaptToClient(response);
      this.#tripEvents = [
        newTripEvent,
        ...this.#tripEvents,
      ];
      this._notify(updateType, update);
    } catch (err) {
      throw new Error('Can\'t add task');
    }
  };

  deleteTripEvent = async (updateType, update) => {
    const index = this.#tripEvents.findIndex((task) => task.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting task');
    }
    try {
      await this.#tripEventsApiService.deleteTtipEvent(update);
      this.#tripEvents = [
        ...this.#tripEvents.slice(0, index),
        ...this.#tripEvents.slice(index + 1),
      ];
      this._notify(updateType);
    } catch (err) {
      throw new Error('Can\'t delete task');
    }
  };

  #adaptToClient = (tripEvent) => {
    const adaptedTask = {
      ...tripEvent,
      basePrice: tripEvent['base_price'],
      dateFrom: tripEvent['date_from'],
      dateTo: tripEvent['date_to'],
      isFavorite: tripEvent['is_favorite'],
    };

    delete adaptedTask['base_price'];
    delete adaptedTask['date_from'];
    delete adaptedTask['date_to'];
    delete adaptedTask['is_favorite'];

    return adaptedTask;
  };
}
