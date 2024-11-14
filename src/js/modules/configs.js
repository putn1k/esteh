const sliderConfig = {
  default: {
    slidesPerView: 1,
    spaceBetween: 30,
    watchSlidesProgress: true,
  },
  mainSlider: {
    slidesPerView: 1.5,
    breakpoints: {
      768: {
        slidesPerView: 2.4,
      },
      1200: {
        slidesPerView: 3,
      },
    },
  },
  previewCatalog: {
    navigation: {
      prevEl: '#catalog-slider [data-to-slide="prev"]',
      nextEl: '#catalog-slider [data-to-slide="next"]',
    },
  },
  previewGallery: {
    navigation: {
      prevEl: '#gallery-slider [data-to-slide="prev"]',
      nextEl: '#gallery-slider [data-to-slide="next"]',
    },
  },
  previewArticles: {
    navigation: {
      prevEl: '#articles-slider [data-to-slide="prev"]',
      nextEl: '#articles-slider [data-to-slide="next"]',
    },
  },
  certificates: {
    navigation: {
      prevEl: '#certificates-slider [data-to-slide="prev"]',
      nextEl: '#certificates-slider [data-to-slide="next"]',
    },
  },
  quiz: {
    allowTouchMove: false,
    init: false,
    navigation: {
      prevEl: '#quiz-slider [data-to-slide="prev"]',
      nextEl: '#quiz-slider [data-to-slide="next"]',
    },
    pagination: {
      el: '[data-slider-pagination]',
      type: 'custom',
      renderCustom: ( swiper, current, total ) => {
        return current + ' из ' + total;
      },
    },
  },
};

const smoothScrollConfig = {
  speed: 900,
  speedAsDuration: true,
  updateURL: false,
};

const modalConfig = {
  linkAttributeName: false,
  catchFocus: true,
  closeOnEsc: true,
  backscroll: true,
};

const quizConfig = {
  modalSelector: '#quiz-modal',
  sliderSelector: '#quiz-slider',
  formID: 'quiz-modal-form',
  modalConfig: {
    linkAttributeName: 'data-quizmodal',
    catchFocus: true,
    closeOnEsc: true,
    backscroll: true,
  },
  sliderConfig: {
    slidesPerView: 1,
    spaceBetween: 30,
    watchSlidesProgress: true,
    allowTouchMove: false,
  },
  MIN_CABLE_WIDTH: 10,
  MAX_CABLE_WIDTH: 30
};

const validateConfig = {
  justValidate: {
    errorFieldCssClass: [ 'is-invalid' ],
    errorLabelCssClass: [ 'form-input__invalid-message' ],
    errorLabelStyle: {
      color: 'var(--error-color)',
      marginTop: '4px',
      fontSize: '12px',
      textAlign: 'left',
    },
    errorFormClass: 'shaked',
    errorTimeout: 1500,
  },
  errorTimeout: 1500,
  mask: {
    bodyMask: ' (___) ___ __ __',
  },
  requiredFieldRule: {
    rule: 'required',
    value: true,
    errorMessage: 'Поле обязательно для заполнения'
  },
};

const observerConfig = {
  scrollTop: {
    rootMargin: '600px',
    threshold: 1,
  },
};

const requestsConfig = {
  handlerURL: 'https://jsonplaceholder.typicode.com/posts',
};

export {
  sliderConfig,
  smoothScrollConfig,
  modalConfig,
  validateConfig,
  observerConfig,
  requestsConfig,
  quizConfig
};