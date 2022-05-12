import FilterTripEventsView from '../view/filter-trip-events-view';
import { render } from '../framework/render.js';

const tripControlsFiltersElement = document.querySelector('.trip-controls__filters');

export default class FilterPresenter {
  constructor(containerElement, itemsTripEvents, TripEventTypesOffers) {
    this.tripControlsFiltersElement = containerElement;
  }

  init () {
    render(new FilterTripEventsView, this.tripControlsFiltersElement);
  }
}
