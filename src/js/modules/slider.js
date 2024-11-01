import {
  initSlider
} from './utils.js';

import {
  sliderConfig
} from './configs.js';

const initSliders = () => {
  initSlider( '#catalog-slider', Object.assign( sliderConfig.mainSlider, sliderConfig.previewCatalog ) );
  initSlider( '#gallery-slider', Object.assign( sliderConfig.mainSlider, sliderConfig.previewGallery ) );
  initSlider( '#articles-slider', Object.assign( sliderConfig.mainSlider, sliderConfig.previewArticles ) );
};

export {
  initSliders,
};