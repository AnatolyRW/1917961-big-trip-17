import './presenter/item-trip-event-presenter.js';

import MainPresenter from './presenter/main-presenter.js';
import ItemsTripEventsModel from './model/items-trip-events-model.js';
import TripEventTypesOffersModel from './model/trip-event-types-offers-model.js';
import DestinationModel from './model/destination-model.js';

const tripEventTypesOffersModel = new TripEventTypesOffersModel();
const destinationModel = new DestinationModel();
const itemsTripEventsModel = new ItemsTripEventsModel(tripEventTypesOffersModel, destinationModel);
const mainPresenter = new MainPresenter(itemsTripEventsModel, tripEventTypesOffersModel, destinationModel);
mainPresenter.init();

