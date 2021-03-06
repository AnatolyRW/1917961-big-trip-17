import ApiService from './framework/api-service.js';

const Method = {
  GET: 'GET',
  PUT: 'PUT',
  POST: 'POST',
  DELETE: 'DELETE'
};

export default class TripEventsApiService extends ApiService {
  get tripEvents() {
    return this._load({url: 'points'})
      .then(ApiService.parseResponse);
  }

  get destinations() {
    return this._load({url: 'destinations'})
      .then(ApiService.parseResponse);
  }

  get offers() {
    return this._load({url: 'offers'})
      .then(ApiService.parseResponse);
  }

  updateTripEvent = async (tripEvent) => {
    const response = await this._load({
      url: `points/${tripEvent.id}`,
      method: Method.PUT,
      body: JSON.stringify(this.#adaptToServer(tripEvent)),
      headers: new Headers({'Content-Type': 'application/json'}),
    });

    const parsedResponse = await ApiService.parseResponse(response);

    return parsedResponse;
  };

  addTripEvent = async (tripEvent) => {
    const response = await this._load({
      url: 'points',
      method: Method.POST,
      body: JSON.stringify(this.#adaptToServer(tripEvent)),
      headers: new Headers({'Content-Type': 'application/json'}),
    });
    const parsedResponse = await ApiService.parseResponse(response);
    return parsedResponse;
  };

  deleteTripEvent = async (tripEvent) => {
    const response = await this._load({
      url: `points/${tripEvent.id}`,
      method: Method.DELETE,
    });
    return response;
  };

  #adaptToServer = (tripEvent) => {
    const adaptedTripEvent = {...tripEvent,
      'base_price': tripEvent.basePrice,
      'date_from': tripEvent.dateFrom,
      'date_to': tripEvent.dateTo,
      'is_favorite': tripEvent.isFavorite,
    };
    delete adaptedTripEvent.basePrice;
    delete adaptedTripEvent.dateFrom;
    delete adaptedTripEvent.dateTo;
    delete adaptedTripEvent.isFavorite;
    return adaptedTripEvent;
  };

}
