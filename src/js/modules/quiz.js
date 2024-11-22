import {
  quizConfig,
  validateConfig,
  requestsConfig
} from './configs.js';

import {
  sendData,
} from './utils.js';

import {
  simpleModal,
} from './modal.js';

export default class QuizApp {
  modalConfig = null;
  sliderConfig = null;
  slider = null;
  modal = null;
  form = null;
  validate = null;
  validateConfig = null;
  voltageNodes = null;
  radioNodes = null;
  MIN_CABLE_WIDTH = null;
  MAX_CABLE_WIDTH = null;

  constructor() {
    this.MIN_CABLE_WIDTH = quizConfig.MIN_CABLE_WIDTH;
    this.MAX_CABLE_WIDTH = quizConfig.MAX_CABLE_WIDTH;
    this.form = document.querySelector( `#${quizConfig.formID}` );
    if ( !this.form ) return;
    this.modalConfig = Object.assign( {}, quizConfig.modalConfig, {
      beforeOpen: this.initSlider,
      afterClose: this.destroySlider,
    } );
    this.modal = new HystModal( this.modalConfig );
    this.voltageNodes = this.form.querySelectorAll( '[data-voltage]' );
    this.radioNodes = this.form.querySelectorAll( '[type="radio"]' );
    this.setBaseValidate( this.form );
    this.checkVoltage();
    this.radioNodes.forEach( this.setRadioListener );

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
        }
      }
    } );
    this.slider = new Swiper( quizConfig.sliderSelector, this.sliderConfig );
  };

  destroySlider = () => {
    this.slider.destroy();
  };

  setBaseValidate( form ) {
    if ( !form ) return;

    const requiredFields = form.querySelectorAll( '[required]' );
    const requiredRule = validateConfig.requiredFieldRule;
    const cableRules = [ {
        rule: 'number',
        errorMessage: 'Значение не является числом'
      },
      {
        rule: 'minNumber',
        value: this.MIN_CABLE_WIDTH,
        errorMessage: `Длина кабеля меньше ${this.MIN_CABLE_WIDTH}`
      },
      {
        rule: 'maxNumber',
        value: this.MAX_CABLE_WIDTH,
        errorMessage: `Длина кабеля больше ${this.MAX_CABLE_WIDTH}`
      }
    ];
    this.validateConfig = Object.assign( {}, validateConfig.justValidate, {
      focusInvalidField: false,
    } );
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
        case 'power-cable-width':
          this.validate.addField( elementSelector, [ requiredRule, ...cableRules ] );
          break;
        case 'hv-cable-width':
          this.validate.addField( elementSelector, [ requiredRule, ...cableRules ] );
          break;
        case 'safe-cable-width':
          this.validate.addField( elementSelector, [ requiredRule, ...cableRules ] );
          break;
        case 'test-cable-width':
          this.validate.addField( elementSelector, [ requiredRule, ...cableRules ] );
          break;
        case 'work-cable-width':
          this.validate.addField( elementSelector, [ requiredRule, ...cableRules ] );
          break;
        case 'burn-cable-width':
          this.validate.addField( elementSelector, [ requiredRule, ...cableRules ] );
          break;
      }
    } );

    this.validate.onFail( this.onFaliValidate );
    this.validate.onSuccess( this.onSuccessValidate );
  }

  onSuccessValidate = ( evt ) => {
    evt.preventDefault();
    sendData( evt, requestsConfig.handlerURL, this.isSendOk, this.isSendError );
  }

  onFaliValidate = () => {
    const firstInvalidElement = document.querySelector( '.is-invalid' )
    if ( firstInvalidElement ) {

      this.slider.slideTo( this.getSliderIndexByEl( firstInvalidElement ) );
      firstInvalidElement.focus();
    }
  }

  getSliderIndexByEl( el ) {
    const str = el
      .closest( '.swiper-slide' )
      .ariaLabel;
    const match = str.match( /^(\d+)\s*\/\s*\d+$/ );
    const firstValue = match ? match[ 1 ] : null;
    return parseInt( firstValue, 10 ) - 1;
  }

  isSendOk = () => {
    console.log( 1 );

    this.modal.close( `#${quizConfig.modalSelector}` );

    simpleModal.open( '#send-ok-modal' );
  };

  isSendError = ( target ) => {
    target.classList.add( this.validateConfig.errorFormClass );
    setTimeout( () => {
      target.classList.remove( this.validateConfig.errorFormClass );
    }, validateConfig.errorTimeout );
  };

  setRadioListener = ( input ) => {
    input.addEventListener( 'change', this.onChangeCustom );
  }

  checkVoltage() {
    this.renderTestStationFields();
    this.voltageNodes.forEach( ( input ) =>
      input.addEventListener( 'change', this.onChangeVoltage )
    )
  }

  onChangeVoltage = () => {
    this.renderTestStationFields();
  }

  onChangeCustom = ( evt ) => {
    const fieldsContainer = evt.target.closest( '.cb-quiz__fields' );
    if ( evt.target.hasAttribute( 'data-custom' ) ) {
      this.renderCustomField( fieldsContainer, evt.target )
    } else {
      this.removeCustomNode( fieldsContainer )
    }
  }

  renderCustomField( container, handler ) {
    const customFieldNode = document.querySelector( '#custom-field' )
      .content
      .querySelector( '.cb-quiz__field' )
      .cloneNode( true );
    customFieldNode.querySelector( 'input' ).name = `${handler.name}(${handler.value})`;

    container.appendChild( customFieldNode );
    this.validate.addField( `[name="${handler.name}(${handler.value})"]`, [ validateConfig.requiredFieldRule, ] )
  }

  removeCustomNode( container ) {
    if ( container.querySelector( '.cb-quiz__field--custom' ) ) {
      const customField = container.querySelector( '.cb-quiz__field--custom input' );
      this.validate.removeField( `[name="${customField.name}"]` )
      container.querySelector( '.cb-quiz__field--custom' ).remove();
    }
  }

  getVoltageType() {
    const checkedInput = Array.from( this.voltageNodes ).find( input => input.checked === true );
    return checkedInput.dataset.voltage;
  }

  renderTestStationFields() {
    const container = this.form.querySelector( '.cb-quiz__test-station' );
    const testFieldsNode = document.querySelector( `#test-station-${this.getVoltageType()}` )
      .content
      .querySelector( '.cb-quiz__fields' )
      .cloneNode( true );
    testFieldsNode.querySelectorAll( '[type="radio"]' ).forEach( this.setRadioListener );
    container.innerHTML = '';
    container.appendChild( testFieldsNode );
  }
}