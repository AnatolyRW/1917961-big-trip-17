import { render } from '../framework/render.js';
import OfferItemTripEventView from '../view/offer-item-trip-event-view.js';

export default class OffersItemTripEventPresenter {

  #offersWithType = null;
  #offersModel = null;
  #tripEventModel = null;

  #tripEventView = null;
  #offerItemTripEventViews = [];

  constructor(tripEventView, itemTripEventModel) {
    this.#tripEventView = tripEventView;
    this.#tripEventModel = itemTripEventModel;
  }

  init(TripEventTypesOffersModel) {
    this.#offersModel = TripEventTypesOffersModel;
    this.#renderItemTripEventOffers();
  }

  #renderItemTripEventOffers() {
    this.#offersWithType = this.#offersModel.offers.find((offer) => (offer.type === this.#tripEventModel.type));
    for (let j = 0; j < this.#offersWithType.offers.length; j++) {
      this.#offerItemTripEventViews.push(new OfferItemTripEventView(this.#offersWithType.offers[j], this.#tripEventModel.offers));
      render(this.#offerItemTripEventViews[j], this.#tripEventView.containerOffersElement);
    }
  }

}
