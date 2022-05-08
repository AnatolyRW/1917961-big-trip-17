import { generateOffersWithTypes } from '../mock/offers.js';

export default class TripEventTypesOffersModel {

  #offers = generateOffersWithTypes();

  get offers() {
    return this.#offers;
  }

}
