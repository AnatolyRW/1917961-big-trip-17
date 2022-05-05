import { generateOffersWithTypes } from '../mock/offers.js';

export default class offersModal {

  offers = generateOffersWithTypes();

  getOffers = () => this.offers;

}
