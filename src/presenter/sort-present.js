import NewSortTemlate from '../view/sort-view.js';
import { render } from '../render.js';

const tripControlsSortElement = document.querySelector('.trip-events');

render(new NewSortTemlate, tripControlsSortElement);
