import { generateDestination } from '../mock/destination';
import { NAME_CITYS } from '../mock/const.js';

export default class DestinationModel {

  #destination = null;

  constructor() {
    this.#destination = Array.from({length: NAME_CITYS.length}, generateDestination);
  }

  get destination() {
    return this.#destination;
  }

}
