import {
  modalConfig,
} from './configs.js';

import {
  initModal,
} from './utils.js';

const simpleModal = new HystModal( Object.assign( {}, modalConfig ) );

const initModals = () => {
  initModal( simpleModal );
};

export {
  initModals,
};
