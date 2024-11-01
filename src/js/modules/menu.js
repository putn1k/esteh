import {
  isEscKey,
  lockScroll,
  unlockScroll
} from './utils.js';

const IS_OPEN_CLASSNAME = 'is-open';
const IS_CLOSING_CLASSNAME = 'is-closing';
const ANIMATION_TIMEOUT = 400;
const burgerNode = document.querySelector( '.burger' );
const menuNode = document.querySelector( '.header-menu' );

export const initMobileMenu = () => {
  if ( !burgerNode || !menuNode ) return;

  const temporaryLockNode = ( node, timeout = ANIMATION_TIMEOUT ) => {
    node.disabled = true;
    setTimeout( () => {
      node.disabled = false;
      node.focus();
    }, timeout );
  };

  const openMenu = () => {
    lockScroll();
    temporaryLockNode( burgerNode );
    burgerNode.classList.add( IS_OPEN_CLASSNAME );
    menuNode.classList.add( IS_OPEN_CLASSNAME );
  };

  const closeMenu = () => {
    temporaryLockNode( burgerNode );
    burgerNode.classList.remove( IS_OPEN_CLASSNAME );
    menuNode.classList.add( IS_CLOSING_CLASSNAME );
    setTimeout( () => {
      menuNode.classList.remove( IS_OPEN_CLASSNAME );
      menuNode.classList.remove( IS_CLOSING_CLASSNAME );
    }, ANIMATION_TIMEOUT );
    unlockScroll();
  };

  burgerNode.addEventListener( 'click', ( evt ) => {
    evt.preventDefault();
    !evt.currentTarget.classList.contains( IS_OPEN_CLASSNAME ) ? openMenu() : closeMenu();
  } );

  document.addEventListener( 'keydown', ( evt ) => {
    if ( isEscKey( evt ) && burgerNode.classList.contains( IS_OPEN_CLASSNAME ) ) {
      closeMenu();
    }
  } );
};