import Observable from '../framework/observable.js';
import { UpdateType } from '../const.js';

export default class OffersModel extends Observable {

  #offers = [];
  #tripEventsApiService = null;

  constructor(tripEventsApiService) {
    super();
    this.#tripEventsApiService = tripEventsApiService;
  }

  init = async () => {
    try {
      const offers = await this.#tripEventsApiService.offers;
      this.#offers = offers;
    } catch(err) {
      this.#offers = [];
    }
    this._notify(UpdateType.INIT);
  };

  get offers() {
    return this.#offers;
  }

}
