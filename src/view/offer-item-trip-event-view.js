import { createElement } from '../render.js';

const createOfferItemTripEventTemplate = (offer) => (`
    <li class="event__offer">
      <span class="event__offer-title">${offer.title}</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">${offer.price}</span>
    </li>
`);

export default class OfferItemTripEventView {
  constructor(offer) {
    this.offer = offer;
  }

  getTemlate = () => createOfferItemTripEventTemplate(this.offer);

  getElement = () => {
    if (!this.element) {
      this.element = createElement(this.getTemlate());
    }
    return this.element;
  };

  removeElement = () => {
    this.element = null;
  };

}
