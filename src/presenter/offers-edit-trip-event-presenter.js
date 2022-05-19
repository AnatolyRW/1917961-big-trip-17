import { render } from '../framework/render.js';
import OfferEditTripEventView from '../view/offer-edit-trip-event-view.js';

export default class OffersEditTripEventPresenter {

  #offersWithType = null;
  #offersModel = null;

  #offerEditTripEventViews = [];

  constructor(TripEventTypesOffersModel) {
    this.#offersModel = TripEventTypesOffersModel;
  }

  init(tripEventView, itemTripEventModel) {
    this.#renderItemTripEventOffers(tripEventView, itemTripEventModel);
  }

  #renderItemTripEventOffers(tripEventView, itemsTripEventModel) {
    this.#offersWithType = this.#offersModel.find((offer) => (offer.type === itemsTripEventModel.type));
    for (let j = 0; j < this.#offersWithType.offers.length; j++) {
      this.#offerEditTripEventViews.push(new OfferEditTripEventView(this.#offersWithType.offers[j], itemsTripEventModel.offers));
      render(this.#offerEditTripEventViews[j], tripEventView.containerOffersElement);
    }
  }

}
