import './filter-presenter.js';
import { render } from '../render.js';
import SortTripEventsView from '../view/sort-trip-events-view.js';
import ListTripEventsView from '../view/list-trip-events-view.js';
import ItemTripEventView from '../view/item-trip-event-view.js';
import EditTripEvenView from '../view/edit-trip-event-view.js';
import OfferItemTripEventView from '../view/offer-item-trip-event-view.js';
import OfferEditTripEventView from '../view/offer-edit-trip-event-view.js';

export default class MainPresenter {

  listTripEvents = new ListTripEventsView();
  firstItemTripEventTemplate = new ItemTripEventView();

  isUseOffer = (idOffer) => function (element) {
    return element['id'] === idOffer;
  };

  init = (tripEventsTable, tripEvents, offers) => {
    this.tripEventsTable = tripEventsTable;
    this.tripEvents = tripEvents;
    this.recorsTripEvents = [...this.tripEvents.getTripEvents()];
    this.offers = [...offers.getOffers()];
    this.useOffersId = null;
    this.offersWithType = null;

    //console.log(this.recorsTripEvents);

    render(new SortTripEventsView(), this.tripEventsTable);
    render(this.listTripEvents, this.tripEventsTable);

    const editTripEvenView = new EditTripEvenView(this.recorsTripEvents[0]);
    render(editTripEvenView , this.listTripEvents.getElement());
    const editTripEventForOffersElement = editTripEvenView.getElement().querySelector('.event__available-offers');
    this.useOffersId = this.recorsTripEvents[0].offers;
    this.offersWithType = this.offers.find((offer) => (offer.type === this.recorsTripEvents[0].type));

    for (let j = 0; j < this.offersWithType.offers.length; j++) {
      render(new OfferEditTripEventView(this.offersWithType.offers[j], this.useOffersId), editTripEventForOffersElement);
    }

    for (let i = 0; i < this.recorsTripEvents.length; i++) {

      const itemTripEventView = new ItemTripEventView(this.recorsTripEvents[i]);
      render(itemTripEventView, this.listTripEvents.getElement());
      const itemTripEventForOffersElement = itemTripEventView.getElement().querySelector('.event__selected-offers');
      this.useOffersId = this.recorsTripEvents[i].offers;

      for (let j = 0; j < this.useOffersId.length; j++) {
        this.offersWithType = this.offers.find((offer) => (offer.type === this.recorsTripEvents[i].type));
        const useOffer = this.offersWithType['offers'].find(this.isUseOffer(this.useOffersId[j]));
        render(new OfferItemTripEventView(useOffer), itemTripEventForOffersElement);
      }

    }

  };

}
