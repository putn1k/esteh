import {
  observerConfig,
} from './configs.js';

const scrollTopNode = document.querySelector( '#scroll-top' );
const siteTopNode = document.querySelector( '#site-top' );

const showScrollTop = () => {
  scrollTopNode.classList.add( 'scroll-top--show' );
};

const hideScrollTop = () => {
  scrollTopNode.classList.remove( 'scroll-top--show' );
};

const initItemObserver = ( targetNode, observeNode, isTrueFn, isFalseFn, config ) => {
  if ( !targetNode || !observeNode ) return;
  const callback = ( entries ) => {
    entries.forEach( ( entry ) => {
      ( !entry.isIntersecting ) ? isTrueFn( targetNode ): isFalseFn( targetNode );
    } );
  };
  new IntersectionObserver( callback, config ).observe( observeNode );
};

export const initScrollObserver = () => {
  initItemObserver( scrollTopNode, siteTopNode, showScrollTop, hideScrollTop, observerConfig.scrollTop );
};