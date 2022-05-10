import AbstractView from '../framework/view/abstract-view.js';

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

export default class OfferEditTripEventView extends AbstractView{

  #offer = null;
  #useOffers = null;

  constructor(offer, useOffers ) {
    super();
    this.#offer = offer;
    this.#useOffers = useOffers;
  }

  get template() {
    return createOfferEditTripEventTemplate(this.#offer, this.#useOffers);
  }

}
