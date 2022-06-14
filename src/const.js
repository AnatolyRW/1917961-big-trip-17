import dayjs from 'dayjs';

const TRIP_EVENT_TYPES = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];

const Mode = {
  DEFAULT: false,
  EDITING: true
};

const FilterType = {
  EVERYTHING: 'filter-everything',
  FUTURE: 'filter-future',
  PAST: 'filter-past'
};

const SortType = {
  DAY: 'sort-day',
  TIME: 'sort-time',
  PRICE: 'sort-price'
};

const UserAction = {
  UPDATE_TRIP_EVENT: 'UPDATE_TRIP_EVENT',
  ADD_TRIP_EVENT: 'ADD_TRIP_EVENT',
  DELETE_TRIP_EVENT: 'DELETE_TRIP_EVENT',
};

const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  INIT: 'INIT'
};

const BlankTripEvent = {
  basePrice: '',
  dateFrom: dayjs().toISOString(),
  dateTo: dayjs().toISOString(),
  destination: {
    description: ' ',
    name: 'London',
    pictures: [],
  },
  isFavorite: false,
  offers: [],
  type: 'taxi',
};

const EIGHT = 8;

export { TRIP_EVENT_TYPES, Mode, FilterType, SortType, UpdateType, UserAction, EIGHT, BlankTripEvent };
