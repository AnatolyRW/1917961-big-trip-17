import { createElement } from '../render.js';

const createOfferEditTripEventTemplate = (offer, useOffersId) => {
  const idFound = useOffersId.find((id) => offer.id === id);
  return (`
  <div class="event__offer-selector">
    <input class="event__offer-checkbox  visually-hidden" id="event-offer-luggage-1" type="checkbox" name="event-offer-luggage" ${ !(idFound === undefined) ? 'checked' : ''}>
    <label class="event__offer-label" for="event-offer-luggage-1">
      <span class="event__offer-title">${offer.title}</span>
       &plus;&euro;&nbsp;
       <span class="event__offer-price">${offer.price}</span>
     </label>
  </div>
`);};

export default class OfferEditTripEventView {
  constructor(offer, useOffersId ) {
    this.offer = offer;
    this.useOffersId = useOffersId;
  }

  getTemlate = () => createOfferEditTripEventTemplate(this.offer, this.useOffersId );

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
