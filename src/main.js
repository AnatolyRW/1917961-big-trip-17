import { render } from './framework/render.js';
import ButtonNewItemTripView from './view/button-new-item-trip-view.js';
import MainPresenter from './presenter/main-presenter.js';
import ItemTripEventsModel from './model/item-trip-events-model.js';
import OffersModel from './model/offers-model.js';
import DestinationModel from './model/destination-model.js';
import FilterModel from './model/filter-model.js';
import FilterTripEventsPresenter from './presenter/filter-trip-events-presenter.js';
import TripEventsApiService from './trip-events-api-service.js';

const AUTHORIZATION = 'Basic RrA67YtrHH89KLlkwwU48nm';
//const END_POINT = 'https://17.ecmascript.pages.academy/task-manager';
const END_POINT = 'https://17.ecmascript.pages.academy/big-trip';
const tripEventsApiService = new TripEventsApiService(END_POINT, AUTHORIZATION);
const offersModel = new OffersModel(tripEventsApiService);
const destinationModel = new DestinationModel(tripEventsApiService);
const itemsTripEventsModel = new ItemTripEventsModel(tripEventsApiService);

const filterModel = new FilterModel();
const mainPresenter = new MainPresenter(itemsTripEventsModel, offersModel, destinationModel, filterModel);
const filterPresenter = new FilterTripEventsPresenter(filterModel, itemsTripEventsModel);
const buttonNewItemTripView = new ButtonNewItemTripView();

const siteHeaderElement = document.querySelector('.trip-main');

const handleNewPointFormClose = () => {
  buttonNewItemTripView.element.disabled = false;
};

const handleNewPointButtonClick = () => {
  mainPresenter.createTripEvent(handleNewPointFormClose);
  buttonNewItemTripView.element.disabled = true;
};


filterPresenter.init();
offersModel.init();
destinationModel.init();
mainPresenter.init();
itemsTripEventsModel.init()
  .finally(() => {
    render(buttonNewItemTripView, siteHeaderElement);
    buttonNewItemTripView.setClickHandler(handleNewPointButtonClick);
  });

