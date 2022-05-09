import { createElement } from '../render.js';

const createOfferEditTripEventTemplate = (offer, useOffers) => {
  const isUseOffer = useOffers.find((id) => offer.id === id);
  return (`
  <div class="event__offer-selector">
    <input class="event__offer-checkbox  visually-hidden" id="event-offer-luggage-1" type="checkbox" name="event-offer-luggage" ${ !(isUseOffer === undefined) ? 'checked' : ''}>
    <label class="event__offer-label" for="event-offer-luggage-1">
      <span class="event__offer-title">${offer.title}</span>
       &plus;&euro;&nbsp;
       <span class="event__offer-price">${offer.price}</span>
     </label>
  </div>
`);};

export default class OfferEditTripEventView {

  #offer = null;
  #useOffers = null;
  #element = null;

  constructor(offer, useOffers ) {
    this.#offer = offer;
    this.#useOffers = useOffers;
  }

  get temlate() {
    return createOfferEditTripEventTemplate(this.#offer, this.#useOffers);
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
