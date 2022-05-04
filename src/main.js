import '../src/presenter/main-presenter';
import MainPresenter from './presenter/main-presenter';
import TripEventsModal from './model/trip-events-modal.js';


const siteMainElement = document.querySelector('.page-body__page-main');
const tripEventsTable = siteMainElement.querySelector('.trip-events');

const tripEvents = new TripEventsModal();
const mainPresenter = new MainPresenter();

mainPresenter.init(tripEventsTable, tripEvents);
