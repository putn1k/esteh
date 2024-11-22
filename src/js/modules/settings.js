import {
  smoothScrollConfig
} from './configs.js';

import {
  iosVhFix
} from './utils.js';

import {
  initAllTabs
} from './tabs.js';


import {
  initScrollObserver,
} from './scroll-observer.js';

import {
  initMobileMenu
} from './menu.js';

import QuizApp from './quiz.js';

const initSiteSettings = () => {
  iosVhFix();
  initMobileMenu();
  initScrollObserver();
  new SmoothScroll( 'a[href*="#"]', smoothScrollConfig );
  initAllTabs();
  [ '[data-gallery]' ].map( ( item ) => baguetteBox.run( item ) );
  new QuizApp;
  new AcceptCookiePopup( {
    siteName: 'ООО ПО Энергоспецтехника',
    linkCookiePage: 'policy-cookie.php'
  } );
};

export {
  initSiteSettings,
};
