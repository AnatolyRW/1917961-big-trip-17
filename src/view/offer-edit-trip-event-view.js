import { createElement } from '../render.js';

const createOfferItemTripEventTemplate = (offer) => (`
  <div class="event__offer-selector">
    <input class="event__offer-checkbox  visually-hidden" id="event-offer-luggage-1" type="checkbox" name="event-offer-luggage" checked>
    <label class="event__offer-label" for="event-offer-luggage-1">
      <span class="event__offer-title">${offer.title}</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">${offer.price}</span>
    </label>
  </div>
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