import { FILTER } from '../const.js';
import { applayFilterFuture, applayFilterPast } from '../util/common.js';
import FilterTripEventsView from '../view/filter-trip-events-view';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc.js';
import { render } from '../framework/render';
dayjs.extend(utc);

export default class FilterTripEventsPresenter {

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

  filterChange = (idFilter, tripEventSourceModel) => {
    let itemsTripEventModel = [];
    switch (idFilter) {
      case FILTER.FUTURE:
        itemsTripEventModel = tripEventSourceModel.filter(applayFilterFuture);
        break;
      case FILTER.PAST:
        itemsTripEventModel = tripEventSourceModel.filter(applayFilterPast);
        break;
      case FILTER.EVERYTHING:
        itemsTripEventModel = tripEventSourceModel;
        break;
      default:
        itemsTripEventModel = tripEventSourceModel;
    }
    return itemsTripEventModel;
  };

}
