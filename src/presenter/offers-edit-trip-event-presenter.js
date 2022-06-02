import { render } from '../framework/render.js';
import OfferEditTripEventView from '../view/offer-edit-trip-event-view.js';

export default class OffersEditTripEventPresenter {

  #offersWithType = null;
  #offersModel = null;
  #tripEventModel = null;

  #tripEventView = null;
  #offerEditTripEventViews = [];

  constructor(tripEventView, tripEventModel) {
    this.#tripEventView = tripEventView;
    this.#tripEventModel = tripEventModel;
  }

  init(TripEventTypesOffersModel ) {
    this.#offersModel = TripEventTypesOffersModel;
    this.#renderItemTripEventOffers();
  }

  #renderItemTripEventOffers = () => {
    this.#offersWithType = this.#offersModel.find((offer) => (offer.type === this.#tripEventModel.type));
    for (let j = 0; j < this.#offersWithType.offers.length; j++) {
      this.#offerEditTripEventViews.push(new OfferEditTripEventView(this.#offersWithType.offers[j], this.#tripEventModel.offers));
      render(this.#offerEditTripEventViews[j], this.#tripEventView.containerOffersElement);
    }
  };

}
