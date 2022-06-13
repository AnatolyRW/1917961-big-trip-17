import AbstractView from '../framework/view/abstract-view.js';

const createFilterTemplate = (priceTotal) => (`
<section class="trip-main__trip-info  trip-info">
<div class="trip-info__main">
  <h1 class="trip-info__title">Amsterdam &mdash; Chamonix &mdash; Geneva</h1>

  <p class="trip-info__dates">Mar 18&nbsp;&mdash;&nbsp;20</p>
</div>

<p class="trip-info__cost">
  Total: &euro;&nbsp;<span class="trip-info__cost-value">${String.toString(priceTotal)}</span>
</p>
</section>
`);

export default class TripInfoView extends AbstractView {

  #priceTotal = null;

  constructor (filterType) {
    super();
    this.#priceTotal = filterType;
  }

  get template() {
    return createFilterTemplate(this.#priceTotal);
  }

  get idFilter () {
    return this.#priceTotal;
  }

  get container () {
    return document.querySelector('.trip-main');
  }
}

