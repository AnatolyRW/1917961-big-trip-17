import NewFilterTemplate from '../view/filter-view.js';
import { render } from '../render.js';

const tripControlsFiltersElement = document.querySelector('.trip-controls__filters');

render(new NewFilterTemplate, tripControlsFiltersElement);
