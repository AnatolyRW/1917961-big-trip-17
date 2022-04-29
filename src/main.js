import '../src/presenter/main-presenter';
import MainPresenter from './presenter/main-presenter';


const siteMainElement = document.querySelector('.page-body__page-main');
const tripEventsElement = siteMainElement.querySelector('.trip-events');

const mainPresenter = new MainPresenter();

mainPresenter.init(tripEventsElement);
