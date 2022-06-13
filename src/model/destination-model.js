import Observable from '../framework/observable.js';
import { generateDestination } from '../mock/destination';
import { NAME_CITYS } from '../mock/const.js';

export default class DestinationModel extends Observable{

  #destinations = null;

  constructor() {
    super();
    this.#destinations = Array.from({length: NAME_CITYS.length}, generateDestination);
  }

  get destinations() {
    return this.#destinations;
  }

}
