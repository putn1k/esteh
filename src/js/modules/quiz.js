import {
  quizConfig,
  validateConfig,
  requestsConfig
} from './configs.js';

import {
  sendData,
} from './utils.js';

export default class QuizApp {
  modalConfig = null;
  sliderConfig = null;
  slider = null;
  modal = null;
  form = null;
  validate = null;
  validateConfig = null;

  constructor() {
    this.modalConfig = Object.assign( {}, quizConfig.modalConfig, {
      beforeOpen: this.initSlider,
      afterClose: this.destroySlider,
    } );
    this.modal = new HystModal( this.modalConfig );
    this.form = document.querySelector( `#${quizConfig.formID}` );

    this.setValidate( this.form );
  }

  initSlider = () => {
    this.sliderConfig = Object.assign( {}, quizConfig.sliderConfig, {
      navigation: {
        prevEl: `${quizConfig.sliderSelector} [data-to-slide="prev"]`,
        nextEl: `${quizConfig.sliderSelector} [data-to-slide="next"]`,
      },
      pagination: {
        el: `${quizConfig.sliderSelector} [data-slider-pagination]`,
        type: 'custom',
        renderCustom: ( swiper, current, total ) => {
          return current + ' из ' + total;
        },
      },
    } );
    this.slider = new Swiper( quizConfig.sliderSelector, this.sliderConfig );
  };

  destroySlider = () => {
    this.slider.destroy();
  };

  setValidate( form ) {
    if ( !form ) return;

    const requiredFields = form.querySelectorAll( '[required]' );
    const requiredRule = validateConfig.requiredFieldRule;
    this.validateConfig = validateConfig.justValidate;
    this.validate = new JustValidate( form, this.validateConfig );
    requiredFields.forEach( ( input ) => {
      const elementSelector = `#${form.id} [data-validate="${input.dataset.validate}"]`;
      switch ( input.dataset.validate ) {
        case 'name':
          this.validate.addField( elementSelector, [ requiredRule, ] );
          break;
        case 'org':
          this.validate.addField( elementSelector, [ requiredRule, ] );
          break;
        case 'city':
          this.validate.addField( elementSelector, [ requiredRule, ] );
          break;
        case 'email':
          this.validate.addField( elementSelector, [ requiredRule,
            {
              rule: 'email',
              errorMessage: 'Некорректный адрес электронной почты',
            },
          ] );
          break;
        case 'phone':
          this.validate.addField( elementSelector, [ requiredRule, ] );
          break;
      }
    } );

    this.validate.onSuccess( this.onSuccessValidate );
  }

  onSuccessValidate = ( evt ) => {
    evt.preventDefault();
    sendData( evt, requestsConfig.handlerURL, this.isSendOk, this.isSendError );
  }

  isSendOk = () => {
    return;
  };

  isSendError = ( target ) => {
    target.classList.add( this.validateConfig.errorFormClass );
    setTimeout( () => {
      target.classList.remove( this.validateConfig.errorFormClass );
    }, validateConfig.errorTimeout );
  };
}