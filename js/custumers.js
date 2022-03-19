new Swiper('.custumers__carousel-container', {
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  pagination: { el: '.swiper-pagination', clickable: true },
  spaceBetween: 48,
  breakpoints: {
    320: {
      slidesPerView: 1,
    },
    600: {
      slidesPerView: 2,
    },
    800: {
      slidesPerView: 3,
    },
  },
});
