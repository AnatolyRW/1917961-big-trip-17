import { render } from '../framework/render.js';
import OfferItemTripEventView from '../view/offer-item-trip-event-view.js';

export default class OffersItemTripEventsPresenter {

  #offersWithType = null;
  #offersModel = null;

  #offerItemTripEventViews = [];

  constructor(TripEventTypesOffersModel) {
    this.#offersModel = TripEventTypesOffersModel;
  }

  init(tripEventView, itemTripEventModel) {
    this.#renderItemTripEventOffers(tripEventView, itemTripEventModel);
  }

  #renderItemTripEventOffers(tripEventView, itemsTripEventModel) {
    this.#offersWithType = this.#offersModel.find((offer) => (offer.type === itemsTripEventModel.type));
    for (let j = 0; j < this.#offersWithType.offers.length; j++) {
      this.#offerItemTripEventViews.push(new OfferItemTripEventView(this.#offersWithType.offers[j], itemsTripEventModel.offers));
      render(this.#offerItemTripEventViews[j], tripEventView.containerOffersElement);
    }
  }

}
