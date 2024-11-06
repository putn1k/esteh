import {
  initTabs
} from './utils.js';

const arrTabs = [ {
  id: 'product-description'
} ];

export const initAllTabs = () => {
  arrTabs.forEach( ( {
    id,
    options = null
  } ) => {
    initTabs( id, options );
  } );
};