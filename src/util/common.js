import { FilterType } from '../const.js';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration.js';
dayjs.extend(duration);

const getRandomInteger = (beginInteger, endInteger) => {
  const rangeInteger = Math.abs(endInteger - beginInteger) + 1;
  return Math.floor(Math.random() * (rangeInteger) + Math.min(beginInteger, endInteger));
};

const checkLengthString = (stringCheck, maxLengthString) => maxLengthString >= stringCheck.length;

const deleteRandomValueFromArray = (arrayFromGetIdentifier) => {
  const index = getRandomInteger(0, arrayFromGetIdentifier.length - 1);
  return arrayFromGetIdentifier.splice(index, 1)[0];
};

const getDurationDates = (dateFrom, dateTo) => {
  const diff = dateTo.diff(dateFrom);
  const countDays = dayjs.duration(diff).format('DD');
  const countChours = dayjs.duration(diff).format('HH');
  const countMinutes = dayjs.duration(diff).format('mm');

  if (countDays > 0) {
    return `${countDays}D ${countChours}H ${countMinutes}M`;
  }

  if (countChours > 0) {
    return `${countChours}H ${countMinutes}M`;
  }

  return `${countMinutes}M`;

};

const applayFilterFuture = (itemTripEventModel) => dayjs().isBefore(itemTripEventModel.dateTo);

const applayFilterPast = (itemTripEventModel) => dayjs().isAfter(itemTripEventModel.dateFrom);

const filter = {
  [FilterType.EVERYTHING]: (points) => points,
  [FilterType.FUTURE]: (points) => points.filter(applayFilterFuture),
  [FilterType.PAST]: (points) => points.filter(applayFilterPast),
};

const sortPrice = (a, b) => b.basePrice - a.basePrice;

const sortTime = (a, b) => dayjs(b.dateTo).diff(b.dateFrom) - dayjs(a.dateTo).diff(a.dateFrom);

const sortDay = (a, b) => dayjs(b.dateFrom).diff(a.dateFrom);

const getBlankTripEvent = (destinationModel) => ({
  basePrice: 0,
  dateFrom: dayjs().toISOString(),
  dateTo: dayjs().toISOString(),
  destination: destinationModel.destinations[0],
  isFavorite: false,
  offers: [],
  type: 'taxi',
});


export {
  getRandomInteger, checkLengthString, getDurationDates, deleteRandomValueFromArray,
  applayFilterFuture, applayFilterPast, sortPrice, sortTime, sortDay, filter, getBlankTripEvent
};
