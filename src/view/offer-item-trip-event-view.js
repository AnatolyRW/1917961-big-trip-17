import AbstractView from '../framework/view/abstract-view.js';

const createOfferItemTripEventTemplate = (offer, useOffers) => {
  const isUseOffer = useOffers.find((id) => offer.id === id);
  if (!(isUseOffer === undefined)) {
    return (`
    <li class="event__offer">
      <span class="event__offer-title">${offer.title}</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">${offer.price}</span>
    </li>`);
  }
  return '<li class="event__offer"></li>';
};

export default class OfferItemTripEventView extends  AbstractView {

  #offer = null;
  #useOffers = null;

  constructor(offer, useOffers) {
    super();
    this.#offer = offer;
    this.#useOffers = useOffers;
  }

  get template() {
    const tmp = createOfferItemTripEventTemplate(this.#offer, this.#useOffers);
    return tmp;
  }

}
