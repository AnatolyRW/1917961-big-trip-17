import { FILTER } from '../const.js';
import FilterTripEventsView from '../view/filter-trip-events-view';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc.js';
import { render } from '../framework/render';
dayjs.extend(utc);

export default class FilterPresenter {

  #filterTripEventsView = new FilterTripEventsView(FILTER.EVERYTHING);
  #noTripEventsView = null;

  #changeFilter = null;

  constructor(changeFilter) {
    this.#changeFilter = changeFilter;
  }

  get filterTripEventsView() {
    return this.#filterTripEventsView;
  }

  init() {
    render(this.#filterTripEventsView, this.#filterTripEventsView.container);
    this.#filterTripEventsView.setFilterChangeHandler(this.#handleFilterChange);
  }

  #handleFilterChange = (idFilter) => {
    this.#changeFilter(idFilter);
  };

}
