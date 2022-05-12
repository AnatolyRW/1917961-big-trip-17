import '../src/presenter/main-presenter.js';
import MainPresenter from './presenter/main-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';
import ItemsTripEventsModel from './model/items-trip-events-model.js';
import TripEventTypesOffersModel from './model/trip-event-types-offers-model.js';


//const siteMainElement = document.querySelector('.page-body__page-main');
//const tripEventsContainer = siteMainElement.querySelector('.trip-events');
//const tripControlsFiltersElement = document.querySelector('.trip-controls__filters');

const tripEventTypesOffersModel = new TripEventTypesOffersModel();
const itemsTripEvents = new ItemsTripEventsModel(tripEventTypesOffersModel);
const mainPresenter = new MainPresenter(tripEventsContainer, itemsTripEvents, tripEventTypesOffersModel);
const filterPresenter = new FilterPresenter(tripControlsFiltersElement, itemsTripEvents, tripEventTypesOffersModel);

mainPresenter.init();
filterPresenter.init();
