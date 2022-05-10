import { getDurationDates } from '../util.js';
import AbstractView from '../framework/view/abstract-view.js';


const createItemTrioEventTemplate = (tripEvent) => {
  const {basePrice,
    dateFrom,
    dateTo,
    destination,
    isFavorite,
    type
  } = tripEvent;
  return (`
    <li class="trip-events__item">
      <div class="event">
        <time class="event__date" datetime="${dateFrom.toDate()}">${dateFrom.format('MMM D')}</time>
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${tripEvent.type}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${type} ${destination.name}</h3>
        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="${dateFrom.toDate()}">${dateFrom.format('HH:MM')}</time>
            &mdash;
            <time class="event__end-time" datetime="${dateTo.toDate()}">${dateTo.format('HH:MM')}</time>
          </p>
          <p class="event__duration">${getDurationDates(dateFrom, dateTo)}</p>
        </div>
        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
        </p>
        <h4 class="visually-hidden">Offers:</h4>
        <ul class="event__selected-offers">
        </ul>
        <button class="event__favorite-btn  ${isFavorite ? 'event__favorite-btn--active' : ''}" type="button">
          <span class="visually-hidden">Add to favorite</span>
          <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
            <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
          </svg>
        </button>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    </li>
`);
};

export default class ItemTripEventView extends AbstractView {

  #tripEvent = null;

  constructor(tripEvent) {
    super();
    this.#tripEvent = tripEvent;
  }

  get template() {
    return createItemTrioEventTemplate(this.#tripEvent);
  }

  setRolloutEditClickHandler = (callback) => {
    this._callback.click = callback;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#rolloutEditClickHandler);
  };

  #rolloutEditClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.click();
  };

}
