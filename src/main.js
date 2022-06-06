import './presenter/item-trip-event-presenter.js';

import MainPresenter from './presenter/main-presenter.js';
import ItemTripEventsModel from './model/item-trip-events-model.js';
import OffersModel from './model/offers-model.js';
import DestinationModel from './model/destination-model.js';

const offersModel = new OffersModel();
const destinationModel = new DestinationModel();
const itemsTripEventsModel = new ItemTripEventsModel(offersModel, destinationModel);
const mainPresenter = new MainPresenter(itemsTripEventsModel, offersModel, destinationModel);
mainPresenter.init();

