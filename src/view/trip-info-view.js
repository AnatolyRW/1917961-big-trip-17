import AbstractView from '../framework/view/abstract-view.js';
import dayjs from 'dayjs';
import minMax from 'dayjs/plugin/minMax';
dayjs.extend(minMax);

const CountTravelItinerary = {
  ZERO: 0,
  ONE: 1,
  TWO: 2,
  THREE: 3
};

const calculatePriceOffersTotal = (offersModel, tripEvent) => {
  const offersWithType = offersModel.offers.find((offer) => (offer.type === tripEvent.type));
  let priceOffersTotal = 0;
  if (offersWithType !== undefined) {
    offersWithType.offers.map((offer) => {
      if (tripEvent.offers.includes(offer.id)) {
        priceOffersTotal += offer.price;
      }
    });
  }
  return priceOffersTotal;
};

const calculatePriceTotal = (itemsTripEventsModel, offersModel) => {
  let priceTotal = 0;
  itemsTripEventsModel.tripEvents.forEach((tripEvent) => {
    priceTotal += calculatePriceOffersTotal(offersModel, tripEvent) + tripEvent.basePrice;
  });
  return priceTotal;
};

const createTravelItinerary = (itemsTripEventsModel) => {
  const destinations = [...new Set(itemsTripEventsModel.tripEvents.map((tripEvent) => tripEvent.destination.name))];
  let countTravelItinerary = '';
  switch (destinations.length) {
    case CountTravelItinerary.ZERO:
      countTravelItinerary = '';
      break;
    case CountTravelItinerary.ONE:
      countTravelItinerary = `${destinations[0]}`;
      break;
    case CountTravelItinerary.TWO:
      countTravelItinerary = `${destinations[0]} &mdash; ${destinations[destinations.length - 1]}`;
      break;
    case CountTravelItinerary.THREE:
      countTravelItinerary = `${destinations[0]} &mdash; ${destinations[1]} &mdash; ${destinations[destinations.length - 1]}`;
      break;
    default:
      countTravelItinerary = `${destinations[0]} &mdash; ... &mdash; ${destinations[destinations.length - 1]}`;
      break;
  }
  return countTravelItinerary;
};

const createDatesTravelItinerary = (itemsTripEventsModel) => {
  const datesFrom = [...new Set(itemsTripEventsModel.tripEvents.map((tripEvent) => dayjs(tripEvent.dateFrom)))];
  const datesTo = [...new Set(itemsTripEventsModel.tripEvents.map((tripEvent) => dayjs(tripEvent.dateTo)))];
  const dateFromMin = dayjs.min(datesFrom);
  const dateFromMax = dayjs.max(datesTo);
  return `${dateFromMin.format('MMM DD')}&nbsp;&mdash;&nbsp;${dateFromMax.format('DD')}`;
};

const createPriceTotalTemplate = (itemsTripEventsModel, offersModel) => (`
<section class="trip-main__trip-info  trip-info">
  <div class="trip-info__main">
    <h1 class="trip-info__title">${createTravelItinerary(itemsTripEventsModel)}</h1>
    <p class="trip-info__dates">${createDatesTravelItinerary(itemsTripEventsModel)}</p>
  </div>

  <p class="trip-info__cost">
    Total: &euro;&nbsp;
    <span class="trip-info__cost-value">
      ${calculatePriceTotal(itemsTripEventsModel, offersModel)}
    </span>
  </p>
</section>
`);

export default class TripInfoView extends AbstractView {

  #priceTotal = null;
  #itemsTripEventsModel = null;
  #offersModel = null;

  constructor(itemsTripEventsModel, offersModel) {
    super();
    this.#itemsTripEventsModel = itemsTripEventsModel;
    this.#offersModel = offersModel;
  }

  get template() {
    return createPriceTotalTemplate(this.#itemsTripEventsModel, this.#offersModel);
  }

  get idFilter() {
    return this.#priceTotal;
  }

  get container() {
    return document.querySelector('.trip-main');
  }
}

