import './filter-presenter.js';
import { render } from '../render.js';
import SortTripEventsView from '../view/sort-trip-events-view.js';
import ListTripEventsView from '../view/list-trip-events-view.js';
import ItemTripEventView from '../view/item-trip-event-view.js';
import EditTripEvenView from '../view/edit-trip-event-view.js';
//import AddTripEventView from '../view/add-trip-event-view.js';
import OfferView from '../view/offer-view.js';

//const COUNT_TRIP_EVENTS = 3;

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

    //console.log(this.recorsTripEvents);

    render(new SortTripEventsView(), this.tripEventsTable);
    render(this.listTripEvents, this.tripEventsTable);
    render(new EditTripEvenView(), this.listTripEvents.getElement());
    for (let i = 0; i < this.recorsTripEvents.length; i++) {
      const itemTripEventView = new ItemTripEventView(this.recorsTripEvents[i]);
      render(itemTripEventView, this.listTripEvents.getElement());
      const eventSelectorOffers = itemTripEventView.getElement().querySelector('.event__selected-offers');
      const useOffers = this.recorsTripEvents[i].offers;
      const tripEvent = this.recorsTripEvents[i];
      let offersWithType = [];
      for (let j = 0; j < useOffers.length; j++) {
        offersWithType = this.offers.find((offer) => (offer.type === tripEvent.type));
        const useOffer = offersWithType['offers'].find(this.isUseOffer(useOffers[j]));
        render(new OfferView(useOffer), eventSelectorOffers);

      }

    }
    //render(new AddTripEventView(), this.listTripEvents.getElement());

  };

}
