import { DESCRIPTION_CITYS, NAME_CITYS, MAX_COUNT_LINE_DESCRIPTION_CITY, MAX_COUNT_PICTURE, } from './const.js';
import { getRandomInteger } from '../util/common.js';

const generateDescriptionCity = () => {
  const randomCountLine = getRandomInteger(1, MAX_COUNT_LINE_DESCRIPTION_CITY - 1);
  let description = '';
  for (let i = 0; i < randomCountLine; i++) {
    description += DESCRIPTION_CITYS[getRandomInteger(0, DESCRIPTION_CITYS.length - 1)];
  }
  return description;
};

const generatePicture = () => ({
  description: DESCRIPTION_CITYS[getRandomInteger(0, DESCRIPTION_CITYS.length - 1)],
  src: `http://picsum.photos/248/152?r=${getRandomInteger(0, MAX_COUNT_PICTURE - 1)}`
});

const generateDestination = (i, j) => ({
  description: generateDescriptionCity(),
  name: NAME_CITYS[j],
  pictures: Array.from({ length: MAX_COUNT_PICTURE }, generatePicture)
});

export { generateDestination };
