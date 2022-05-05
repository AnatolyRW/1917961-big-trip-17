import { TRIP_EVENT_TYPES, TITLE_OFFER, MAX_PRICE } from './const.js';
import { getRandomInteger } from '../util';

const generateOffer = (id) => (
  {
    id: id,
    title: TITLE_OFFER[getRandomInteger(0, TITLE_OFFER.length - 1)],
    price: getRandomInteger(1, MAX_PRICE)
  }
);

const generateOffers = () => {
  const countOffers = getRandomInteger(1, TITLE_OFFER.length - 1);
  const offers = [];
  for (let i = 0; i < countOffers; i++) {
    offers.push(generateOffer(i));
  }
  return offers;
};


const generateOffersWithTypes = () => {
  const offersWithTypes = [];
  for (let i = 0; i < TRIP_EVENT_TYPES.length; i++) {
    offersWithTypes.push({
      type: TRIP_EVENT_TYPES[i],
      offers: generateOffers()
    });
  }
  return offersWithTypes;
};

export { generateOffersWithTypes };
