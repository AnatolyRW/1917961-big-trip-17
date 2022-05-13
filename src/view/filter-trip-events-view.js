import AbstractView from '../framework/view/abstract-view.js';

const createFilterTemplate = () => (`
  <form class="trip-filters" action="#" method="get">
    <div class="trip-filters__filter">
      <input id="filter-everything" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="everything">
      <label class="trip-filters__filter-label" for="filter-everything">Everything</label>
    </div>

    <div class="trip-filters__filter">
      <input id="filter-future" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="future">
      <label class="trip-filters__filter-label" for="filter-future">Future</label>
    </div>

    <div class="trip-filters__filter">
      <input id="filter-past" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="past" checked>
      <label class="trip-filters__filter-label" for="filter-past">Past</label>
    </div>

    <button class="visually-hidden" type="submit">Accept filter</button>
  </form>
`);

export default class FilterTripEventsView extends AbstractView {

  get template() {
    return createFilterTemplate();
  }

  setEverythingClickHandler = (callback) => {
    this._callback.click = callback;
    this.element.querySelector('#filter-everything').addEventListener('click', this.#everythingClickHandler);
  };

  #everythingClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.click();
  };

  setFutureClickHandler = (callback) => {
    this._callback.click = callback;
    this.element.querySelector('#filter-future').addEventListener('click', this.#futureClickHandler);
  };

  #futureClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.click();
  };

  setPastClickHandler = (callback) => {
    this._callback.click = callback;
    this.element.querySelector('#filter-past').addEventListener('click', this.#pastClickHandler);
  };

  #pastClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.click();
  };

  get container () {
    return document.querySelector('.trip-controls__filters');
  }

}

