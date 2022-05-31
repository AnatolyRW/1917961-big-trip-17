import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import { TRIP_EVENT_TYPES } from '../mock/const.js';

const createDestinationList = (distinationModel) => {
  let destinationList = '';
  distinationModel.forEach((element) => {
    destinationList += `<option value="${element.name}"></option>`;
  });
  return destinationList;
};

const createTypeItemTripEvent = (tripEventTypes, type) => {
  let listTypeTripEvent = '';
  tripEventTypes.forEach((tripEventType) => {
    listTypeTripEvent += `<div class="event__type-item">
    <input id="event-type-${tripEventType}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="taxi" ${type === tripEventType ? 'checked' : ''}>
    <label class="event__type-label  event__type-label--${tripEventType}" for="event-type-${tripEventType}-1">${tripEventType}</label>
  </div>`;
  });
  return listTypeTripEvent;
};

const createEditTripEventTemplate = (tripEvent, distinationModel) => {
  const { basePrice,
    dateFrom,
    dateTo,
    destination,
    type
  } = tripEvent;
  return (`
  <li>
   <form class="event event--edit" action="#" method="post">
      <header class="event__header">
        <div class="event__type-wrapper">
          <label class="event__type  event__type-btn" for="event-type-toggle-1">
            <span class="visually-hidden">Choose event type</span>
            <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
          </label>
          <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

          <div class="event__type-list">
            <fieldset class="event__type-group">
              <legend class="visually-hidden">Event type</legend>

              ${createTypeItemTripEvent(TRIP_EVENT_TYPES, type)}

            </fieldset>
          </div>
        </div>

        <div class="event__field-group  event__field-group--destination">
          <label class="event__label  event__type-output" for="event-destination-1">
            Flight
          </label>
          <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destination.name}" list="destination-list-1">
          <datalist id="destination-list-1">

            ${createDestinationList(distinationModel)}

          </datalist>
        </div>

        <div class="event__field-group  event__field-group--time">
          <label class="visually-hidden" for="event-start-time-1">From</label>
          <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${dateFrom.format('DD/MM/YY HH:MM')}">
          &mdash;
          <label class="visually-hidden" for="event-end-time-1">To</label>
          <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${dateTo.format('DD/MM/YY HH:MM')}">
        </div>

        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-1">
            <span class="visually-hidden">Price</span>
            &euro;
          </label>
          <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${basePrice}">
        </div>

        <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
        <button class="event__reset-btn" type="reset">Delete</button>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </header>
      <section class="event__details">
        <section class="event__section  event__section--offers">
          <h3 class="event__section-title  event__section-title--offers">Offers</h3>

          <div class="event__available-offers">
          </div>
        </section>

        <section class="event__section  event__section--destination">
          <h3 class="event__section-title  event__section-title--destination">Destination</h3>
          <p class="event__destination-description">${destination.description}</p>
        </section>
      </section>
    </form>
  </li>
`);
};

export default class TripEventEditView extends AbstractStatefulView {

  #distinationModel = null;

  constructor(tripEvent, distinationModel) {
    super();
    this._state = TripEventEditView.parseTripEventToState(tripEvent);
    this.#distinationModel = distinationModel;
    this.element.querySelector('.event__type-list').addEventListener('click', this.#changeTypeTripEvent);
  }

  get template() {
    return createEditTripEventTemplate(this._state, this.#distinationModel);
  }

  setRollupEditClickHandler = (callback) => {
    this._callback.rollupEditClick = callback;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#rollupEditClickHandler);
  };

  #rollupEditClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.rollupEditClick();
  };

  setSubmitEditHandler = (callback) => {
    this._callback.submitEdit = callback;
    this.element.querySelector('form').addEventListener('submit', this.#submitEditHandler);
  };

  #submitEditHandler = (evt) => {
    evt.preventDefault();
    this._callback.submitEdit(this._state);
  };

  #changeTypeTripEvent = (evt) => {
    evt.preventDefault();
    console.log(evt.target);
    console.log(evt.target.value);
    this.updateElement({
      type: evt.target.value
    });
  };

  get containerOffersElement() {
    return this.element.querySelector('.event__available-offers');
  }

  static parseTripEventToState = (tripEvent) => ({ ...tripEvent });

  static parseStateToTripEvent = (state) => {
    const tripEvent = { ...state };
    return tripEvent;
  };
}
