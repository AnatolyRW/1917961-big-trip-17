import { FilterType, UpdateType } from '../const.js';
import { filter } from '../util/common.js';
import FilterTripEventsView from '../view/filter-trip-events-view';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc.js';
import { render, replace, remove } from '../framework/render';
dayjs.extend(utc);

export default class FilterTripEventsPresenter {

  #filterTripEventsView = null;
  #noTripEventsView = null;

  #changeFilter = null;
  #filterModel = null;
  #itemTripEventsModel = null;

  constructor(filterModel, itemsTripEventsModel) {
    this.#filterModel = filterModel;
    this.#itemTripEventsModel = itemsTripEventsModel;

    this.#itemTripEventsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get filterTripEventsView() {
    return this.#filterTripEventsView;
  }

  get filters() {
    const tripEvents = this.#itemTripEventsModel.tripEvents;

    return [
      {
        type: FilterType.EVERYTHING,
        name: 'Everything',
        count: filter[FilterType.EVERYTHING](tripEvents).length,
      },
      {
        type: FilterType.FUTURE,
        name: 'Future',
        count: filter[FilterType.FUTURE](tripEvents).length,
      },
      {
        type: FilterType.PAST,
        name: 'Past',
        count: filter[FilterType.PAST](tripEvents).length,
      },
    ];
  }

  init() {
    const filters = this.filters;
    const prevfilterTripEventsView = this.#filterTripEventsView;

    this.#filterTripEventsView = new FilterTripEventsView(filters, this.#filterModel.filter);
    this.#filterTripEventsView.setFilterChangeHandler(this.#handleFilterChange);

    if (prevfilterTripEventsView === null) {
      render(this.#filterTripEventsView, this.#filterTripEventsView.container);
      return;
    }

    replace(this.#filterTripEventsView, prevfilterTripEventsView);
    remove(prevfilterTripEventsView);
  }

  #handleModelEvent = () => {
    this.init();
  };

  #handleFilterChange = (filterType) => {
    if (this.#filterModel.filter === filterType) {
      return;
    }

    this.#filterModel.setFilter(UpdateType.MAJOR, filterType);
  };

}
