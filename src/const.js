const MODE = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING'
};

const Filter = {
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
};

export { MODE, Filter, SortType, UpdateType, UserAction };
