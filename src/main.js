import './presenter/item-trip-event-presenter.js';

import MainPresenter from './presenter/main-presenter.js';
import ItemTripEventsModel from './model/item-trip-events-model.js';
import OffersModel from './model/offers-model.js';
import DestinationModel from './model/destination-model.js';
import FilterModel from './model/filter-model.js';
import FilterTripEventsPresenter from './presenter/filter-trip-events-presenter.js';

const offersModel = new OffersModel();
const destinationModel = new DestinationModel();
const itemsTripEventsModel = new ItemTripEventsModel(offersModel, destinationModel);
const filterModel = new FilterModel();
const filterPresenter = new FilterTripEventsPresenter(filterModel, itemsTripEventsModel);
const mainPresenter = new MainPresenter(itemsTripEventsModel, offersModel, destinationModel, filterModel);

filterPresenter.init();
mainPresenter.init();

