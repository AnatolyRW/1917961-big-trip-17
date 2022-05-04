import './filter-presenter.js';
import { render } from '../render.js';
import SortTripEventsView from '../view/sort-trip-events-view.js';
import ListTripEventsView from '../view/list-trip-events-view.js';
import ItemTripEventView from '../view/item-trip-event-view.js';
import EditTripEvenView from '../view/edit-trip-event-view.js';
import AddTripEventView from '../view/add-trip-event-view.js';

//const COUNT_TRIP_EVENTS = 3;

export default class MainPresenter {

  listTripEvents = new ListTripEventsView();
  firstItemTripEventTemplate = new ItemTripEventView();

  init = (tripEventsTable, tripEvents) => {
    this.tripEventsTable = tripEventsTable;
    this.tripEvents = tripEvents;
    this.recorsTripEvents = [...this.tripEvents.getTripEvents()];

    //console.log(this.recorsTripEvents);

    render(new SortTripEventsView(), this.tripEventsTable);
    render(this.listTripEvents, this.tripEventsTable);
    render(new EditTripEvenView(), this.listTripEvents.getElement());

    for (let i = 0; i < this.recorsTripEvents.length; i++) {
      render(new ItemTripEventView(this.recorsTripEvents[i]), this.listTripEvents.getElement());
    }

    render(new AddTripEventView(), this.listTripEvents.getElement());

  };

}
