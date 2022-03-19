new Swiper('.brands__carousel', {
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  loop: true,
  breakpoints: {
    320: {
      slidesPerView: 2,
    },
    600: {
      slidesPerView: 3,
    },
    700: {
      slidesPerView: 4,
    },
    800: {
      slidesPerView: 5,
    },
  },
});
