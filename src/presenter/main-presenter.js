import './filter-presenter.js';
import { render } from '../render.js';
import NewSortTemlate from '../view/sort-view.js';
import NewListTripEventsTemlate from '../view/list-trip-events-view';
import NewItemTripEventTemplate from '../view/item-trip-event-view.js';
import NewTripEventEditTemplate from '../view/trip-event-edit-view';
import NewTripEventAddTemplate from '../view/trip-event-add-view';

const COUNT_TRIP_EVENTS = 3;

export default class MainPresenter {

  listTripEvents = new NewListTripEventsTemlate();
  firstItemTripEventTemplate = new NewItemTripEventTemplate();

  init = (tripEventsTable) => {
    this.tripEventsTable = tripEventsTable;
    render(new NewSortTemlate(), this.tripEventsTable);
    render(this.listTripEvents, this.tripEventsTable);
    //render(this.firstItemTripEventTemplate, this.tripEventsTable);
    render(new NewTripEventEditTemplate(), this.listTripEvents.getElement());

    for (let i = 0; i < COUNT_TRIP_EVENTS; i++) {
      render(new NewItemTripEventTemplate, this.listTripEvents.getElement());
    }

    render(new NewTripEventAddTemplate(), this.listTripEvents.getElement());

  };

}
