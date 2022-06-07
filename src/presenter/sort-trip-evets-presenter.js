import { SortType } from '../const.js';
import { sortPrice, sortTime, sortDay } from '../util/common.js';
import SortTripEventsView from '../view/sort-trip-events-view.js';

import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc.js';
import { render, remove } from '../framework/render';
dayjs.extend(utc);

export default class SortTripEventsPresenter {

  #sortTripEventsView = new SortTripEventsView(SortType.DAY);

  #sortTypeChange = null;
  #currentSortType = null;

  constructor(sortType = SortType.DAY) {
    this.#currentSortType  = sortType;
  }

  init(sortTypeChange) {
    this.#sortTypeChange = sortTypeChange;
    this.#sortTripEventsView = new SortTripEventsView(this.#currentSortType);
    render(this.#sortTripEventsView, this.#sortTripEventsView.container);
    this.#sortTripEventsView.setSortChangeHandler(this.#handleSortChange);
  }

  #handleSortChange = (idSort) => {
    this.#sortTypeChange(idSort);
  };

  sortChange = (idSort, itemsTripEventSourceModel) => {

    switch (idSort) {
      case SortType.PRICE:
        itemsTripEventSourceModel.sort(sortPrice);
        break;
      case SortType.TIME:
        itemsTripEventSourceModel.sort(sortTime);
        break;
      case SortType.DAY:
        itemsTripEventSourceModel.sort(sortDay);
        break;
      default:
        itemsTripEventSourceModel.sort(sortDay);
    }

  };

  desroy() {
    remove(this.#sortTripEventsView);
  }

}
