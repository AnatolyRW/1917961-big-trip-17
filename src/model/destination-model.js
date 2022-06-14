import Observable from '../framework/observable.js';
import { UpdateType } from '../const.js';

export default class DestinationModel extends Observable{

  #destinations = [];
  #tripEventsApiService = null;

  constructor(tripEventsApiService) {
    super();
    this.#tripEventsApiService = tripEventsApiService;
  }

  init = async () => {
    try {
      const destinations = await this.#tripEventsApiService.destinations;
      this.#destinations = destinations;
    } catch(err) {
      this.#destinations = [];
    }
    this._notify(UpdateType.INIT);
  };

  get destinations() {
    return this.#destinations;
  }

}
