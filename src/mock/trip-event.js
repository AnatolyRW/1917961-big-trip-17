import { TRIP_EVENT_TYPES, MAX_PRICE } from './const.js';
import { getRandomInteger, deleteRandomValueFromArray } from '../util/common.js';
import { nanoid } from 'nanoid';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc.js';
dayjs.extend(utc);

const findTripEventType = (TripEventType) => function (ofer) {
  return ofer.type === TripEventType;
};

let randomTripEventType = '';

const generateOffer = (offers) => {
  randomTripEventType = TRIP_EVENT_TYPES[getRandomInteger(0, TRIP_EVENT_TYPES.length - 1)];
  const typeWithOffers = offers.find(findTripEventType(randomTripEventType));
  const copyOffers = typeWithOffers.offers.slice();
  const cuntUseOffers = getRandomInteger(0, copyOffers.length);
  const useOffers = [];
  for (let i = 0; i < cuntUseOffers; i++) {
    useOffers.push(deleteRandomValueFromArray(copyOffers).id);
  }
  return useOffers;
};

const generateDateFrom = () => {
  const maxDaysGap = 9;
  const minDayGap = -9;
  const daysGap = getRandomInteger(minDayGap, maxDaysGap);
  return dayjs().add(daysGap, 'day');
};

const generateDateTo = (date) => {
  const MINUTES_IN_DAYS = 3 * 1440;
  return dayjs(date).add(getRandomInteger(0, MINUTES_IN_DAYS), 'minute');
};

const generateTripEvent = (offers, destination) => function () {
  const date = generateDateFrom();
  return {
    basePrice: getRandomInteger(0, MAX_PRICE),
    dateFrom: date.toISOString(),
    dateTo: generateDateTo(date).toISOString(),
    destination: destination[getRandomInteger(0, destination.length - 1)],
    id: nanoid(),
    isFavorite: getRandomInteger(0, 1),
    offers: generateOffer(offers),
    type: randomTripEventType
  };
};

export { generateTripEvent };
