import './filter-presenter.js';
import { render, RenderPosition } from '../render.js';
import NewSortTemlate from '../view/sort-view.js';
import NewListTemlate from '../view/list-view';

export default class MainPresenter {
  init = (tableContainer) => {
    render(new NewSortTemlate, tableContainer);
    render(new NewListTemlate, tableContainer, RenderPosition.AFTEREND);
  };
}
