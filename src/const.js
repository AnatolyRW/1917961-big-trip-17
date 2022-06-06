const MODE = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING'
};

const FILTER = {
  EVERYTHING: 'filter-everything',
  FUTURE: 'filter-future',
  PAST: 'filter-past'
};

const SORT_TYPE = {
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
};

export { MODE, FILTER, SORT_TYPE, UpdateType, UserAction };
