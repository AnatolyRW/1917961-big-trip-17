import FilterTripEventsView from '../view/filter-trip-events-view';
import { render } from '../framework/render.js';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc.js';
dayjs.extend(utc);

export default class FilterPresenter {

  #filterTripEventsView = new FilterTripEventsView();
  #noTripEventsView = null;

  #itemTripEventPresenters = [];
  #filterItemTripEventPresenters = [];

  constructor(itemTripEventPresenters, noTripEventsView) {
    this.#itemTripEventPresenters = itemTripEventPresenters;
    this.#noTripEventsView = noTripEventsView;
  }

  get filterTripEventsView() {
    return this.#filterTripEventsView;
  }

  init() {
    this.#filterItemTripEventPresenters = this.#itemTripEventPresenters;
    this.#renderFilterTripEvents();
  }

  #applayFilterFuture = (itemTripEventPresenter) => dayjs().isBefore(itemTripEventPresenter.tripEventModel.dateTo);

  #applayFilterPast = (itemTripEventPresenter) => dayjs().isAfter(itemTripEventPresenter.tripEventModel.dateFrom);

  #renderFilterChange = () => {
    render(this.#filterTripEventsView, this.#filterTripEventsView.container);
    this.#clearListTripEventItems();
    switch (this.#filterTripEventsView.idFilter) {
      case 'filter-future':
        this.#filterItemTripEventPresenters = this.#itemTripEventPresenters.filter(this.#applayFilterFuture);
        break;
      case 'filter-past':
        this.#filterItemTripEventPresenters = this.#itemTripEventPresenters.filter(this.#applayFilterPast);
        break;
      case 'filter-everything':
        this.#filterItemTripEventPresenters = this.#itemTripEventPresenters;
        break;
      default:
        this.#filterItemTripEventPresenters = this.#itemTripEventPresenters;
    }
    this.#renderTripEventItems(this.#filterTripEventsView.idFilter);
  };

  #handleFilterChange = () => {
    this.#renderFilterChange();
  };

  #renderFilterTripEvents() {
    render(this.#filterTripEventsView, this.#filterTripEventsView.container);
    this.#filterTripEventsView.setFilterChangeHandler(this.#handleFilterChange);
  }

  #renderTripEventItems(idFilter) {
    if (this.#filterItemTripEventPresenters.length) {
      this.#filterItemTripEventPresenters.forEach((element) => {
        element.renderItemTripEvent();
      });
    } else {
      this.#noTripEventsView.idFilter = idFilter;
      render(this.#noTripEventsView, this.#noTripEventsView.container);
    }
  }

  #clearListTripEventItems() {
    this.#filterItemTripEventPresenters.forEach((presenter) => presenter.desroy());
  }

}
