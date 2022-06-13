import {render} from './framework/render.js';
import ButtonNewItemTripView from './view/button-new-item-trip-view.js';
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
const buttonNewItemTripView = new ButtonNewItemTripView();

const siteHeaderElement = document.querySelector('.trip-main');

const handleNewPointFormClose = () => {
  buttonNewItemTripView.element.disabled = false;
};

const handleNewPointButtonClick = () => {
  mainPresenter.createTripEvent(handleNewPointFormClose);
  buttonNewItemTripView.element.disabled = true;
};

render(buttonNewItemTripView, siteHeaderElement);
buttonNewItemTripView.setClickHandler(handleNewPointButtonClick);

filterPresenter.init();
mainPresenter.init();

