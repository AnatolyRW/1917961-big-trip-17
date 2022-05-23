import AbstractView from '../framework/view/abstract-view.js';

const createFilterTemplate = (idFilter) => (`
  <form class="trip-filters" action="#" method="get">
    <div class="trip-filters__filter">
      <input id="filter-everything" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="everything" ${idFilter === 'filter-everything' ? 'checked' : ''}>
      <label class="trip-filters__filter-label" for="filter-everything">Everything</label>
    </div>

    <div class="trip-filters__filter">
      <input id="filter-future" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="future" ${idFilter === 'filter-future' ? 'checked' : ''}>
      <label class="trip-filters__filter-label" for="filter-future">Future</label>
    </div>

    <div class="trip-filters__filter">
      <input id="filter-past" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="past" ${idFilter === 'filter-past' ? 'checked' : ''}>
      <label class="trip-filters__filter-label" for="filter-past">Past</label>
    </div>

    <button class="visually-hidden" type="submit">Accept filter</button>
  </form>
`);

export default class FilterTripEventsView extends AbstractView {

  #idFilter = null;

  constructor (idFilter) {
    super();
    this.#idFilter = idFilter;
  }

  get template() {
    return createFilterTemplate(this.#idFilter);
  }

  get idFilter () {
    return this.#idFilter;
  }

  setFilterChangeHandler = (callback) => {
    this._callback.change = callback;
    this.element.addEventListener('change', this.#filterChangeHandler);
  };

  #filterChangeHandler = (evt) => {
    if (evt.target.tagName !== 'INPUT') {
      return;
    }
    this.#idFilter = evt.target.id;
    evt.preventDefault();
    this._callback.change(this.#idFilter);
  };

  get container () {
    return document.querySelector('.trip-controls__filters');
  }

}

