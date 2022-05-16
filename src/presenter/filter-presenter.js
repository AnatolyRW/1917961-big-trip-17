import FilterTripEventsView from '../view/filter-trip-events-view';
import ItemTripEventPresenter from './item-trip-event-presenter.js';
import { render } from '../framework/render.js';
import dayjs from 'dayjs';
import utc  from 'dayjs/plugin/utc.js';
dayjs.extend(utc);

export default class FilterPresenter {

  #filterTripEvents = null;
  #itemsTripEventsModel = null;
  #offersModel = null;
  #itemTripEventPresenter = null;

  constructor(itemsTripEventsModel, TripEventTypesOffersModel) {
    this.#filterTripEvents = new FilterTripEventsView();
    if (itemsTripEventsModel) {
      this.#itemsTripEventsModel = [...itemsTripEventsModel.tripEvents];
    }

    if (TripEventTypesOffersModel) {
      this.#offersModel = [...TripEventTypesOffersModel.offers];
    }
  }

  init () {
    this.#renderFilterTripEvents();
    this.#itemTripEventPresenter = new ItemTripEventPresenter(this.#itemsTripEventsModel, this.#offersModel);
    this.#itemTripEventPresenter.init();
  }

  #renderFilterTripEvents () {

    render(this.#filterTripEvents, this.#filterTripEvents.container);

    const renderFilterChange = () => {
      render(this.#filterTripEvents, this.#filterTripEvents.container);
      switch(this.#filterTripEvents.idFilter) {
        case 'filter-future':
          this.#itemTripEventPresenter.itemsTripEventsModel = this.#itemsTripEventsModel.filter((itemTripEventModel) => dayjs().isBefore(itemTripEventModel.dateTo));
          this.#itemTripEventPresenter.removeItemTripEvent();
          this.#itemTripEventPresenter.init();
          break;
        case 'filter-past':
          this.#itemTripEventPresenter.itemsTripEventsModel = this.#itemsTripEventsModel.filter((itemTripEventModel) => dayjs().isAfter(itemTripEventModel.dateFrom));
          this.#itemTripEventPresenter.removeItemTripEvent();
          this.#itemTripEventPresenter.init();
          break;
        default:
          this.#itemTripEventPresenter.itemsTripEventsModel = this.#itemsTripEventsModel;
          this.#itemTripEventPresenter.removeItemTripEvent();
          this.#itemTripEventPresenter.init();
      }
    };

    this.#filterTripEvents.setFilterChangeHandler(() => {
      renderFilterChange();
    });

  }

}
