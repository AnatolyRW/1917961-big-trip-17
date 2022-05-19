import FilterPresenter from './filter-presenter.js';
import ItemTripEventPresenter from './item-trip-event-presenter.js';

export default class MainPresenter {

  #filterTripEventsPresenter = null;
  #itemTripEventPresenter = null;

  #itemsTripEventsModel = null;
  #offersModel = null;


  constructor(itemsTripEventsModel, TripEventTypesOffersModel) {
    if (itemsTripEventsModel) {
      this.#itemsTripEventsModel = [...itemsTripEventsModel.tripEvents];
    }
    if (TripEventTypesOffersModel) {
      this.#offersModel = [...TripEventTypesOffersModel.offers];
    }
  }

  init() {
    this.#filterTripEventsPresenter = new FilterPresenter(this.#itemsTripEventsModel, this.#offersModel);
    this.#filterTripEventsPresenter.init();

    this.#itemTripEventPresenter = new ItemTripEventPresenter(this.#itemsTripEventsModel, this.#offersModel);
    this.#itemTripEventPresenter.init(this.#filterTripEventsPresenter.filterTripEventsView.idFilter);
  }
}
