import {
  observerConfig,
} from './configs.js';

import {
  initObserver,
} from './utils.js';

const scrollTopNode = document.querySelector( '#scroll-top' );
const headerNode = document.querySelector( '.site-header' );
const siteTopNode = document.querySelector( '#site-top' );

const showScrollTop = () => {
  scrollTopNode.classList.add( 'scroll-top--show' );
};

const hideScrollTop = () => {
  scrollTopNode.classList.remove( 'scroll-top--show' );
};

const fixHeader = () => {
  headerNode.classList.add( 'is-fixed' );
  headerNode.nextElementSibling.style.paddingTop = `${headerNode.offsetHeight}px`;
};

const unfixHeader = () => {
  headerNode.classList.remove( 'is-fixed' );
  headerNode.nextElementSibling.style.paddingTop = '';
};

export const initScrollObserver = () => {
  initObserver( scrollTopNode, siteTopNode, showScrollTop, hideScrollTop, observerConfig.scrollTop );
  initObserver( headerNode, siteTopNode, fixHeader, unfixHeader, {
    rootMargin: `${headerNode.offsetHeight}px`,
    threshold: 1,
  } );
};