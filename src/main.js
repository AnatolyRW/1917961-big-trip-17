import './presenter/item-trip-event-presenter.js';

//import FilterPresenter from './presenter/filter-presenter.js';
import MainPresenter from './presenter/main-presenter.js';
import ItemsTripEventsModel from './model/items-trip-events-model.js';
import TripEventTypesOffersModel from './model/trip-event-types-offers-model.js';

const tripEventTypesOffersModel = new TripEventTypesOffersModel();
const itemsTripEventsModel = new ItemsTripEventsModel(tripEventTypesOffersModel);
const mainPresenter = new MainPresenter(itemsTripEventsModel, tripEventTypesOffersModel);
mainPresenter.init();

//const filterPresenter = new FilterPresenter(itemsTripEventsModel, tripEventTypesOffersModel);

//filterPresenter.init();
