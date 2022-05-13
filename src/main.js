import '../src/presenter/main-presenter.js';

import FilterPresenter from './presenter/filter-presenter.js';
import ItemsTripEventsModel from './model/items-trip-events-model.js';
import TripEventTypesOffersModel from './model/trip-event-types-offers-model.js';

const tripEventTypesOffersModel = new TripEventTypesOffersModel();
const itemsTripEvents = new ItemsTripEventsModel(tripEventTypesOffersModel);
const filterPresenter = new FilterPresenter(itemsTripEvents, tripEventTypesOffersModel);

filterPresenter.init();
