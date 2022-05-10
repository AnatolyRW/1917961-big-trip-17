import FilterTripEventsView from '../view/filter-trip-events-view';
import { render } from '../framework/render.js';

const tripControlsFiltersElement = document.querySelector('.trip-controls__filters');

render(new FilterTripEventsView, tripControlsFiltersElement);
