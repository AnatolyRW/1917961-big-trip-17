import { createElement } from '../render.js';

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

export default class OfferItemTripEventView {

  #offer = null;
  #useOffers = null;
  #element = null;

  constructor(offer, useOffers) {
    this.#offer = offer;
    this.#useOffers = useOffers;
  }

  get temlate() {
    const tmp = createOfferItemTripEventTemplate(this.#offer, this.#useOffers);
    return tmp;
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.temlate);
    }
    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }

}
