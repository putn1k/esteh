import {
  smoothScrollConfig
} from './configs.js';

import {
  iosVhFix
} from './utils.js';

import {
  initScrollObserver,
} from './scroll-observer.js';

import {
  initMobileMenu
} from './menu.js';

const initSiteSettings = () => {
  iosVhFix();
  initMobileMenu();
  initScrollObserver();
  new SmoothScroll( 'a[href*="#"]', smoothScrollConfig );
  [ '[data-gallery]' ].map( ( item ) => baguetteBox.run( item ) );
};

export {
  initSiteSettings,
};