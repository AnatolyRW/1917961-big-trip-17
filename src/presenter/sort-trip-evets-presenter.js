import { SortType } from '../const.js';
import SortTripEventsView from '../view/sort-trip-events-view.js';

import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc.js';
import { render, remove, RenderPosition } from '../framework/render';
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
    render(this.#sortTripEventsView, this.#sortTripEventsView.container, RenderPosition.AFTERBEGIN);
    this.#sortTripEventsView.setSortChangeHandler(this.#handleSortChange);
  }

  #handleSortChange = (idSort) => {
    this.#sortTypeChange(idSort);
  };

  desroy() {
    remove(this.#sortTripEventsView);
  }

}
