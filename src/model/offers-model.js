import Observable from '../framework/observable.js';
import { generateOffersWithTypes } from '../mock/offers.js';

export default class OffersModel extends Observable {

  #offers = generateOffersWithTypes();

  get offers() {
    return this.#offers;
  }

}
