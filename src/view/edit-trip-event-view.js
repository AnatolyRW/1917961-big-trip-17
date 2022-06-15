import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import { TRIP_EVENT_TYPES } from '../const.js';
import dayjs from 'dayjs';
import flatpickr from 'flatpickr';

import 'flatpickr/dist/flatpickr.min.css';

const isValidDestination = (DestinationString, destinations) => {
  let isValid = false;
  destinations.forEach((element) => {
    if (DestinationString === element.name) { isValid = true; }
  });
  return isValid;
};

const createDestinationList = (distinationModel) => {
  let destinationList = '';
  distinationModel.destinations.forEach((element) => {
    destinationList += `<option value="${element.name}"></option>`;
  });
  return destinationList;
};

const patternDestination = (distinationModel) => {
  const destinations = distinationModel.destinations;
  let patternDestinationValue = 'pattern="';
  for (let i = 0; i < destinations.length - 1; i++) {
    patternDestinationValue += `${destinations[i].name}|`;
  }
  patternDestinationValue += `${destinations[destinations.length - 1].name}"`;
  return patternDestinationValue;
};

const createTypeItemTripEvent = (tripEventTypes, type, isDisabled) => {
  let listTypeTripEvent = '';
  tripEventTypes.forEach((tripEventType) => {
    listTypeTripEvent +=
      `<div class="event__type-item">

       <input id="event-type-${tripEventType}-1" class="event__type-input
       visually-hidden"
       type="radio"
       name="event-type"
       value="taxi"
       ${type === tripEventType ? 'checked' : ''}
       ${isDisabled ? 'disabled' : ''}>

       <label class="event__type-label  event__type-label--${tripEventType}"
       for="event-type-${tripEventType}-1">${tripEventType}</label>

     </div>`;
  });
  return listTypeTripEvent;
};

const createItemTripEventOffers = (offersModel, tripEvent, isDisabled) => {
  const offersWithType = offersModel.offers.find((offer) => (offer.type === tripEvent.type));
  if (offersWithType !== undefined) {
    return offersWithType.offers.map((offer) => {
      const checked = tripEvent.offers.includes(offer.id) ? 'checked' : '';
      return `<div class="event__offer-selector">

              <input class="event__offer-checkbox  visually-hidden"
              id="event-offer-luggage-${offer.id}"
              type="checkbox" name="event-offer-luggage"
              ${checked}
              data-offer-id=${offer.id}
              ${isDisabled ? 'disabled' : ''}>

              <label class="event__offer-label" for="event-offer-luggage-${offer.id}">
                <span class="event__offer-title"}>${offer.title}</span>
                 &plus;&euro;&nbsp;
                 <span class="event__offer-price"}>${offer.price}</span>
               </label>
            </div>`;
    }).join('');
  }
  return '';
};

const createEditTripEventTemplate = (tripEvent, distinationModel, offersModel) => {
  const { basePrice, dateFrom, dateTo, destination, type, isDisabled, isSaving, isDeleting } = tripEvent;
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

              ${createTypeItemTripEvent(TRIP_EVENT_TYPES, type, isDisabled)}

            </fieldset>
          </div>
        </div>

        <div class="event__field-group  event__field-group--destination">
          <label class="event__label  event__type-output" for="event-destination-1">
            ${type}
          </label>
          <input class="event__input  event__input--destination"
          id="event-destination-1"
          type="text"
          name="event-destination"
          value="${destination.name}"
          list="destination-list-1"
          ${patternDestination(distinationModel)}
          ${isDisabled ? 'disabled' : ''}>

          <datalist id="destination-list-1">
            ${createDestinationList(distinationModel)}
          </datalist>
        </div>

        <div class="event__field-group  event__field-group--time">
          <label class="visually-hidden" for="event-start-time-1">From</label>

          <input class="event__input  event__input--time"
          id="event-start-time-1"
          type="text"
          name="event-start-time"
          value="${dayjs(dateFrom).format('DD/MM/YY HH:MM')}"
          ${isDisabled ? 'disabled' : ''}>

          &mdash;
          <label class="visually-hidden" for="event-end-time-1">To</label>

          <input class="event__input  event__input--time"
          id="event-end-time-1"
          type="text"
          name="event-end-time"
          value="${dayjs(dateTo).format('DD/MM/YY HH:MM')}"
          ${isDisabled ? 'disabled' : ''}>

        </div>

        <div class="event__field-group  event__field-group--price">

          <label class="event__label" for="event-price-1">
            <span class="visually-hidden">Price</span>
            &euro;
          </label>

          <input class="event__input  event__input--price"
          id="event-price-1"
          type="text" name="event-price"
          value="${basePrice.toString()}"
          ${isDisabled ? 'disabled' : ''}
          pattern="[0-9]+">
        </div>

        <button class="event__save-btn  btn  btn--blue" type="submit" ${isDisabled ? 'disabled' : ''}>
          ${isSaving ? 'Saving...' : 'Save'}
        </button>

        <button class="event__reset-btn" type="reset" ${isDisabled ? 'disabled' : ''}>
          ${isDeleting ? 'Deleting...' : 'Delete'}
        </button>

        <button class="event__rollup-btn" type="button" ${isDisabled ? 'disabled' : ''}>
          <span class="visually-hidden">Open event</span>
        </button>

      </header>
      <section class="event__details">
        <section class="event__section  event__section--offers">
          <h3 class="event__section-title  event__section-title--offers">Offers</h3>

          <div class="event__available-offers">
          ${createItemTripEventOffers(offersModel, tripEvent, isDisabled)}
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
  #offersModel = null;
  #datepicker = null;

  constructor(tripEvent, distinationModel, offersModel) {
    super();
    this._state = EditTripEventView.parseTripEventToState(tripEvent);
    this.#distinationModel = distinationModel;
    this.#offersModel = offersModel;
    this.#setInnerHandlers();
    this.#setDateFromPicker();
    this.#setDateToPicker();
  }

  get template() {
    return createEditTripEventTemplate(this._state, this.#distinationModel, this.#offersModel);
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

  setSaveClickHandler = (callback) => {
    this._callback.saveClick = callback;
    this.element.querySelector('form').addEventListener('submit', this.#saveClickHandler);
  };

  #saveClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.saveClick(this._state);
  };

  setDestinationChangeHandler = (callback) => {
    this._callback.destinationChange = callback;
    this.element.querySelector('.event__input--destination').addEventListener('change', this.#destinationChangeHandler);
  };

  #destinationChangeHandler = (evt) => {
    evt.preventDefault();
    if (!isValidDestination(evt.target.value, this.#distinationModel.destinations)) {
      return;
    }
    this.updateElement({
      destination: this._callback.destinationChange(evt.target.value)
    });
  };

  setDeleteClickHandler = (callback) => {
    this._callback.deleteClick = callback;
    this.element.querySelector('.event__reset-btn').addEventListener('click', this.#deleteClickHandler);
  };

  #deleteClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.deleteClick(this._state);
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
  };

  #changePriceTripEvent = (evt) => {
    evt.preventDefault();
    const reg = /^(?:[1-9]\d*|\d)$/;
    if (!reg.test(evt.target.value)) {
      return;
    }
    this.updateElement({
      basePrice: parseInt(evt.target.value, 10)
    });
  };

  #offersToggleHandler = (evt) => {
    if (!evt.target.classList.contains('event__offer-checkbox')) {
      return;
    }
    const offers = Array.from(this.element.querySelectorAll('.event__offer-checkbox'))
      .filter((element) => element.checked)
      .map((element) => Number(element.dataset.offerId));
    this.updateElement({
      offers: offers,
    });
  };

  static parseTripEventToState = (tripEvent) => (
    { ...tripEvent,
      isDisabled: false,
      isSaving: false,
      isDeleting: false,
    });

  static parseStateToTripEvent = (state) => {
    const tripEvent = { ...state };
    delete tripEvent.isDisabled;
    delete tripEvent.isSaving;
    delete tripEvent.isDeleting;
    return tripEvent;
  };

  #setInnerHandlers = () => {
    this.element.querySelector('.event__type-list').addEventListener('click', this.#changeTypeTripEvent);
    this.element.querySelector('.event__input--price').addEventListener('change', this.#changePriceTripEvent);
    if (this.element.querySelector('.event__available-offers')) {
      this.element.querySelector('.event__available-offers').addEventListener('click', this.#offersToggleHandler);
    }
  };

  _restoreHandlers = () => {
    this.#setInnerHandlers();
    this.setRollupEditClickHandler(this._callback.rollupEditClick);
    this.setSaveClickHandler(this._callback.saveClick);
    this.setDestinationChangeHandler(this._callback.destinationChange);
    this.#setDateFromPicker();
    this.#setDateToPicker();
  };

  #dateFromChangeHandler = ([newDateFrom]) => {
    this.updateElement({
      dateFrom: newDateFrom,
    });
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
        maxDate: this._state.dateTo,
        onChange: this.#dateFromChangeHandler,
      },
    );
  };

  #dateToChangeHandler = ([newDateTo]) => {
    this.updateElement({
      dateTo: newDateTo,
    });
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
        minDate: this._state.dateFrom,
        onChange: this.#dateToChangeHandler,
      },
    );
  };

}
