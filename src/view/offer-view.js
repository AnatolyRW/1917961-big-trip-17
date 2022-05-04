import { createElement } from '../render.js';

const createOfferTemplate = (offer) => (`
    <li class="event__offer">
      <span class="event__offer-title">${offer.title}</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">${offer.price}</span>
    </li>
`);

export default class OfferView {
  constructor(offer) {
    this.offer = offer;
  }

  getTemlate = () => createOfferTemplate(this.offer);

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
