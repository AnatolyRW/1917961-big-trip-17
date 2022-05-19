import FilterTripEventsView from '../view/filter-trip-events-view';
import ItemTripEventPresenter from './item-trip-event-presenter.js';
import { render } from '../framework/render.js';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc.js';
dayjs.extend(utc);

export default class FilterPresenter {

  #filterTripEventsView = null;
  #itemsTripEventsModel = null;
  #offersModel = null;
  #itemTripEventPresenter = null;

  constructor(itemsTripEventsModel, TripEventTypesOffersModel) {

    this.#filterTripEventsView = new FilterTripEventsView();

    if (itemsTripEventsModel) {
      this.#itemsTripEventsModel = itemsTripEventsModel;
    }

    if (TripEventTypesOffersModel) {
      this.#offersModel = TripEventTypesOffersModel;
    }
  }

  init() {
    this.#renderFilterTripEvents();
    //this.#itemTripEventPresenter = new ItemTripEventPresenter(this.#itemsTripEventsModel, this.#offersModel);
    //this.#itemTripEventPresenter.init(this.#filterTripEventsView.idFilter);
  }

  #renderFilterTripEvents() {

    render(this.#filterTripEventsView, this.#filterTripEventsView.container);

    const renderFilterChange = () => {
      render(this.#filterTripEventsView, this.#filterTripEventsView.container);
      switch (this.#filterTripEventsView.idFilter) {
        case 'filter-future':
          this.#itemTripEventPresenter.itemsTripEventsModel = this.#itemsTripEventsModel.filter((itemTripEventModel) => dayjs().isBefore(itemTripEventModel.dateTo));
          this.#itemTripEventPresenter.removeItemTripEvent();
          this.#itemTripEventPresenter.init(this.#filterTripEventsView.idFilter);
          break;
        case 'filter-past':
          this.#itemTripEventPresenter.itemsTripEventsModel = this.#itemsTripEventsModel.filter((itemTripEventModel) => dayjs().isAfter(itemTripEventModel.dateFrom));
          this.#itemTripEventPresenter.removeItemTripEvent();
          this.#itemTripEventPresenter.init(this.#filterTripEventsView.idFilter);
          break;
        default:
          this.#itemTripEventPresenter.itemsTripEventsModel = this.#itemsTripEventsModel;
          this.#itemTripEventPresenter.removeItemTripEvent();
          this.#itemTripEventPresenter.init(this.#filterTripEventsView.idFilter);
      }
    };

    this.#filterTripEventsView.setFilterChangeHandler(() => {
      renderFilterChange();
    });

  }

  get filterTripEventsView() {
    return this.#filterTripEventsView;
  }

}
