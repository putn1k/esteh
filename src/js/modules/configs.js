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

const validateConfig = {
  justValidate: {
    errorFieldCssClass: 'is-invalid',
    errorLabelStyle: {
      color: 'var(--error)',
      marginTop: '6px',
      fontSize: '12px',
      textAlign: 'left',
    },
    errorFormClass: 'shaked',
    errorTimeout: 1500,
  },
  errorTimeout: 1500,
  mask: {
    bodyMask: ' (___) ___ __ __',
  }
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
};