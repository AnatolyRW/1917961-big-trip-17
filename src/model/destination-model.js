import Observable from '../framework/observable.js';
import { generateDestination } from '../mock/destination';
import { NAME_CITYS } from '../mock/const.js';

export default class DestinationModel extends Observable{

  #destination = null;

  constructor() {
    super();
    this.#destination = Array.from({length: NAME_CITYS.length}, generateDestination);
  }

  get destination() {
    return this.#destination;
  }

}
