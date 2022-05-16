import './presenter/item-trip-event-presenter.js';

import FilterPresenter from './presenter/filter-presenter.js';
import ItemsTripEventsModel from './model/items-trip-events-model.js';
import TripEventTypesOffersModel from './model/trip-event-types-offers-model.js';

const tripEventTypesOffersModel = new TripEventTypesOffersModel();
const itemsTripEventsModel = new ItemsTripEventsModel(tripEventTypesOffersModel);
const filterPresenter = new FilterPresenter(itemsTripEventsModel, tripEventTypesOffersModel);

filterPresenter.init();
