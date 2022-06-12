import AbstractView from '../framework/view/abstract-view.js';

const createFilterItemTemplate = (filter, currentFilterType) => {
  const { type, name, count } = filter;
  return (
    `<div class="trip-filters__filter">
      <input
        id="${type}"
        class="trip-filters__filter-input  visually-hidden"
        type="radio"
        name="trip-filter"
        value="${type.slice(-name.length)}"
        ${type === currentFilterType ? 'checked' : ''}
        ${count === 0 ? 'disabled' : ''}>
        <label class="trip-filters__filter-label" for="${type}">${name}</label>
    </div>`
  );
};

const createFilterTemplate = (filterItems, currentFilterType) => {
  const filterItemsTemplate = filterItems
    .map((filter) => createFilterItemTemplate(filter, currentFilterType))
    .join('');

  return (
    `<form class="trip-filters" action="#" method="get">
      ${filterItemsTemplate}
      <button class="visually-hidden" type="submit">Accept filter</button>
    </form>`
  );
};

export default class FilterTripEventsView extends AbstractView {

  #filterType = null;
  #currentFilter = null;

  constructor (filterType, currentFilterType) {
    super();
    this.#filterType = filterType;
    this.#currentFilter = currentFilterType;

  }

  get template() {
    return createFilterTemplate(this.#filterType, this.#currentFilter);
  }

  get idFilter () {
    return this.#filterType;
  }

  setFilterChangeHandler = (callback) => {
    this._callback.change = callback;
    this.element.addEventListener('change', this.#filterChangeHandler);
  };

  #filterChangeHandler = (evt) => {
    if (evt.target.tagName !== 'INPUT') {
      return;
    }
    this.#filterType = evt.target.id;
    evt.preventDefault();
    this._callback.change(this.#filterType);
  };

  get container () {
    return document.querySelector('.trip-controls__filters');
  }

}

