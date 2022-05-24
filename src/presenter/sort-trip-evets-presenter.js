import { SORT_TYPE } from '../const.js';
import { sortPrice, sortTime, sortDay } from '../util/common.js';
import SortTripEventsView from '../view/sort-trip-events-view.js';

import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc.js';
import { render } from '../framework/render';
dayjs.extend(utc);

export default class SortTripEventsPresenter {

  #sortTripEventsView = new SortTripEventsView(SORT_TYPE.DAY);

  #changeSort = null;

  constructor(changeSort) {
    this.#changeSort = changeSort;
  }

  init() {
    render(this.#sortTripEventsView, this.#sortTripEventsView.container);
    this.#sortTripEventsView.setSortChangeHandler(this.#handleSortChange);
  }

  #handleSortChange = (idSort) => {
    this.#changeSort(idSort);
  };

  sortChange = (idSort, itemsTripEventSourceModel) => {

    switch (idSort) {
      case SORT_TYPE.PRICE:
        itemsTripEventSourceModel.sort(sortPrice);
        break;
      case SORT_TYPE.TIME:
        itemsTripEventSourceModel.sort(sortTime);
        break;
      case SORT_TYPE.DAY:
        itemsTripEventSourceModel.sort(sortDay);
        break;
      default:
        itemsTripEventSourceModel.sort(sortDay);
    }

  };

}
