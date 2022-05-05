import '../src/presenter/main-presenter';
import MainPresenter from './presenter/main-presenter';
import TripEventsModal from './model/trip-events-modal.js';
import OffersModal from './model/offers-modal.js';


const siteMainElement = document.querySelector('.page-body__page-main');
const tripEventsTable = siteMainElement.querySelector('.trip-events');

const offers = new OffersModal();
const tripEvents = new TripEventsModal(offers);
const mainPresenter = new MainPresenter();

mainPresenter.init(tripEventsTable, tripEvents, offers);
