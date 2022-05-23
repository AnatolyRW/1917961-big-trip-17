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

const updateItemTripEventModel = (items, update) => {
  const index = items.findIndex((item) => item.id === update.id);

  if (index === -1) {
    return items;
  }

  return [
    ...items.slice(0, index),
    update,
    ...items.slice(index + 1),
  ];
};

const applayFilterFuture = (itemTripEventModel) => dayjs().isBefore(itemTripEventModel.dateTo);

const applayFilterPast = (itemTripEventModel) => dayjs().isAfter(itemTripEventModel.dateFrom);

export { getRandomInteger, checkLengthString, getDurationDates, deleteRandomValueFromArray, updateItemTripEventModel, applayFilterFuture, applayFilterPast };
