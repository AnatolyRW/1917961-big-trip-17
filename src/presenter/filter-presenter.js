import FilterTripEventsView from '../view/filter-trip-events-view';
import { render } from '../framework/render.js';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc.js';
dayjs.extend(utc);

export default class FilterPresenter {

  #filterTripEventsView = null;

  #itemsTripEventsModel = null;
  #itemTripEventPresenters = [];
  #filterItemsTripEventsModel = [];
  #offersModel = null;

  #itemTripEventPresenter = null;

  constructor(itemTripEventPresenters) {
    this.#itemTripEventPresenters = itemTripEventPresenters;
  }

  init() {
    this.#renderFilterTripEvents();
  }

  #renderFilterTripEvents() {

    render(this.#filterTripEventsView, this.#filterTripEventsView.container);

    const renderFilterChange = () => {
      render(this.#filterTripEventsView, this.#filterTripEventsView.container);
      switch (this.#filterTripEventsView.idFilter) {
        case 'filter-future':
          this.#filterItemsTripEventsModel = this.#itemsTripEventsModel.filter((itemTripEventModel) => dayjs().isBefore(itemTripEventModel.dateTo));
          this.#itemTripEventPresenter.removeItemTripEvent();
          this.#itemTripEventPresenter.init(this.#filterTripEventsView.idFilter);
          break;
        case 'filter-past':
          this.#filterItemsTripEventsModel = this.#itemsTripEventsModel.filter((itemTripEventModel) => dayjs().isAfter(itemTripEventModel.dateFrom));
          this.#itemTripEventPresenter.removeItemTripEvent();
          this.#itemTripEventPresenter.init(this.#filterTripEventsView.idFilter);
          break;
        default:
          this.#filterItemsTripEventsModel = this.#itemsTripEventsModel;
          this.#itemTripEventPresenter.removeItemTripEvent();
          this.#itemTripEventPresenter.init(this.#filterTripEventsView.idFilter);
      }
    };

    this.#filterTripEventsView.setFilterChangeHandler(() => {
      renderFilterChange();
    });

  }

  get filterTripEventsView() {
    return this.#filterTripEventsView;
  }

  renderTripEventItems(idFilter) {
    if (this.#filterItemsTripEventsModel.length) {
      this.#filterItemsTripEventsModel.forEach((element) => {
        const itemTripEventPresenter = new ItemTripEventPresenter(element, this.#listTripEventsView, this.#offersModel);
        itemTripEventPresenter.init();
        this.#itemTripEventPresenters.push(itemTripEventPresenter);
      });
    } else {
      this.#noTripEventsView.idFilter = idFilter;
      render(this.#noTripEventsView, this.#noTripEventsView.container);
    }
  }

}
