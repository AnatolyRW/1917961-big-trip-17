import '../src/presenter/main-presenter';
import MainPresenter from './presenter/main-presenter';
import ItemsTripEventsModel from './model/items-trip-events-model.js';
import TripEventTypesOffersModel from './model/trip-event-types-offers-model.js';


const siteMainElement = document.querySelector('.page-body__page-main');
const tripEventsTable = siteMainElement.querySelector('.trip-events');

const tripEventTypesOffersModel = new TripEventTypesOffersModel();
const itemsTripEvents = new ItemsTripEventsModel(tripEventTypesOffersModel);
const mainPresenter = new MainPresenter(tripEventsTable, itemsTripEvents, tripEventTypesOffersModel);

mainPresenter.init();
