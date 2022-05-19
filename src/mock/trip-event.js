import { TRIP_EVENT_TYPES, DESCRIPTION_CITYS, NAME_CITYS, MAX_COUNT_LINE_DESCRIPTION_CITY, MAX_COUNT_PICTURE, MAX_PRICE } from './const.js';
import { getRandomInteger, deleteRandomValueFromArray } from '../util.js';
import dayjs from 'dayjs';
import utc  from 'dayjs/plugin/utc.js';
dayjs.extend(utc);


const generateDescriptionCity = () => {
  const randomCountLine = getRandomInteger(0, MAX_COUNT_LINE_DESCRIPTION_CITY - 1);
  let description = '';
  for (let i = 0; i < randomCountLine; i++) {
    description += DESCRIPTION_CITYS[getRandomInteger(0, DESCRIPTION_CITYS.length - 1)];
  }
  return description;
};

const generatePicture = () => ({
  description: DESCRIPTION_CITYS[getRandomInteger(0, DESCRIPTION_CITYS.length - 1)],
  src: `http://picsum.photos/248/152?r=${getRandomInteger(0, MAX_COUNT_PICTURE - 1)}`
});

const generateDestination = () => ({
  description: generateDescriptionCity(),
  name: NAME_CITYS[getRandomInteger(0, NAME_CITYS.length - 1)],
  pictures: Array.from({ length: MAX_COUNT_PICTURE }, generatePicture)
});

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
  const maxDaysGap = 1;
  const minDayGap = 9;
  const daysGap = getRandomInteger(minDayGap, maxDaysGap);
  return dayjs().add(daysGap, 'day');
};

const generateDateTo = (date) => {
  const MINUTES_IN_DAYS = 3 * 1440;
  return dayjs(date).add(getRandomInteger(0,MINUTES_IN_DAYS), 'minute');
};

let newId = 0;

const generateTripEvent = (offers) => function () {
  const date = generateDateFrom();
  return {
    basePrice: getRandomInteger(0, MAX_PRICE),
    dateFrom: date,
    dateTo: generateDateTo(date),
    destination: generateDestination(),
    id: ++newId,
    isFavorite: getRandomInteger(0,1),
    offers: generateOffer(offers),
    type: randomTripEventType
  };
};

export { generateTripEvent };
