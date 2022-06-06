import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import { TRIP_EVENT_TYPES } from '../mock/const.js';
import dayjs from 'dayjs';
import flatpickr from 'flatpickr';

import 'flatpickr/dist/flatpickr.min.css';

const createDestinationList = (distinationModel) => {
  let destinationList = '';
  distinationModel.destination.forEach((element) => {
    destinationList += `<option value="${element.name}"></option>`;
  });
  return destinationList;
};

const createTypeItemTripEvent = (tripEventTypes, type) => {
  let listTypeTripEvent = '';
  tripEventTypes.forEach((tripEventType) => {
    listTypeTripEvent +=
      `<div class="event__type-item">
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
            ${type}
          </label>
          <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destination.name}" list="destination-list-1">
          <datalist id="destination-list-1">

            ${createDestinationList(distinationModel)}

          </datalist>
        </div>

        <div class="event__field-group  event__field-group--time">
          <label class="visually-hidden" for="event-start-time-1">From</label>
          <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${dayjs(dateFrom).format('DD/MM/YY HH:MM')}">
          &mdash;
          <label class="visually-hidden" for="event-end-time-1">To</label>
          <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${dayjs(dateTo).format('DD/MM/YY HH:MM')}">
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

export default class EditTripEventView extends AbstractStatefulView {

  #distinationModel = null;
  #datepicker = null;

  constructor(tripEvent, distinationModel) {
    super();
    this._state = EditTripEventView.parseTripEventToState(tripEvent);
    this.#distinationModel = distinationModel;
    this.#setInnerHandlers();
    this.#setDateFromPicker();
    this.#setDateToPicker();
  }

  get template() {
    return createEditTripEventTemplate(this._state, this.#distinationModel);
  }

  get containerOffersElement() {
    return this.element.querySelector('.event__available-offers');
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

  setDestinationChangeHandler = (callback) => {
    this._callback.destinationChange = callback;
    this.element.querySelector('.event__input--destination').addEventListener('change', this.#destinationChangeHandler);
  };

  #destinationChangeHandler = (evt) => {
    evt.preventDefault();
    this.updateElement({
      destination: this._callback.destinationChange(evt.target.value)
    });
    this._callback.renderOffers(this._state);
  };

  setRenderOffersEditTripEvent = (callback) => {
    this._callback.renderOffers = callback;
  };

  #changeTypeTripEvent = (evt) => {
    evt.preventDefault();
    if (evt.target.tagName !== 'LABEL' || evt.target.innerText === this._state.type) {
      return;
    }
    this.updateElement({
      offers: [],
      type: evt.target.innerText
    });
    this._callback.renderOffers(this._state);
  };

  static parseTripEventToState = (tripEvent) => ({ ...tripEvent });

  static parseStateToTripEvent = (state) => {
    const tripEvent = { ...state };
    return tripEvent;
  };

  #setInnerHandlers = () => {
    this.element.querySelector('.event__type-list').addEventListener('click', this.#changeTypeTripEvent);
  };

  _restoreHandlers = () => {
    this.#setInnerHandlers();
    this.setRollupEditClickHandler(this._callback.rollupEditClick);
    this.setSubmitEditHandler(this._callback.submitEdit);
    this.setDestinationChangeHandler(this._callback.destinationChange);
    this.#setDateFromPicker();
    this.#setDateToPicker();
  };

  #dateFromChangeHandler = ([newDateFrom]) => {
    this.updateElement({
      dateFrom: newDateFrom,
    });
    this._callback.renderOffers(this._state);
  };

  #setDateFromPicker = () => {
    this.#datepicker = flatpickr(
      this.element.querySelector('#event-start-time-1'),
      {
        dateFormat: 'd/m/y H:i',
        enableTime: true,
        // eslint-disable-next-line camelcase
        time_24hr: true,
        defaultDate: this._state.dateFrom,
        onChange: this.#dateFromChangeHandler,
      },
    );
  };

  #dateToChangeHandler = ([newDateTo]) => {
    this.updateElement({
      dateTo: newDateTo,
    });
    this._callback.renderOffers(this._state);
  };

  #setDateToPicker = () => {
    this.#datepicker = flatpickr(
      this.element.querySelector('#event-end-time-1'),
      {
        dateFormat: 'd/m/y H:i',
        enableTime: true,
        // eslint-disable-next-line camelcase
        time_24hr: true,
        defaultDate: this._state.dateTo,
        onChange: this.#dateToChangeHandler,
      },
    );
  };

}
