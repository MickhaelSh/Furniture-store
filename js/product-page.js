(function () {
  async function getItems() {
    const response = await fetch('js/db.json');
    const items = await response.json();
    renderItem(items.furniture);
  }
  getItems();

  function renderItem(items) {
    const storeId = localStorage.getItem('productForPage');
    const itemContainer = document.querySelector('.product-main');
    items.forEach((element) => {
      if (element.id === +storeId) {
        itemContainer.innerHTML += `<article class="product-container cart-item" data-id='${element.id}'>
			<div class="product-container__images-container">
				<div class="product-container__main-image ">
					<div class="left-arrow-container arrow-container">
						<img class="left-arrow arrow "
						src="img/brands-carousel-arrow.png" alt="left-arrow">
					</div>
					<div class="big-image-container">	
						<img class="big-image item-image" src=${element.imageUrl} alt=${element.name}>
					</div>
					<div class="right-arrow-container arrow-container">
						<img class="right-arrow arrow" src="img/brands-carousel-arrow.png"
						alt="right-arrow">
					</div>
				</div>	
				<div class="product-container__images-collection">
					<img id="100" class="mini-img first-slide active" src=${element.imageUrl} alt=${element.name}>
					<img id="101" class="mini-img second-slide" src=${element.imageUrl} alt=${element.name}>
					<img id="102" class="mini-img third-slide" src=${element.imageUrl} alt=${element.name}>
					<img id="103" class="mini-img fourth-slide" src=${element.imageUrl} alt=${element.name}>
				</div>
			</div>
			<div class="product-container__text-container">
				<div class="product-container__title-container">
					<div class="product-container__stock highlighted">In stock</div>
					<h1 class="product-container__title item-name">${element.name}</h1>
				</div>
				<div class="product-container__price-container">
					<p class="product-container__price item-price">${element.price}</p><p>,00</p>
					<p class="product-container__currency">$</p>
				</div>
				<button class="button button-filled product-button item-button">add to
					cart</button>
				<div class="product-container__description-container">
					<div class="product-container__description-title">Descriprion</div>
					<div class="product-container__description">${element.description}</div>
				</div>
			</div>
		</article>`;
      }
    });
  }

  function toggleArrows(target) {
    const leftArrow = document.querySelector('.left-arrow-container');
    const rightArrow = document.querySelector('.right-arrow-container');
    if (
      target.classList.contains('big-image') ||
      target.classList.contains('product-container__main-image') ||
      target.classList.contains('arrow') ||
      target.classList.contains('arrow-container')
    ) {
      leftArrow.classList.add('active');
      rightArrow.classList.add('active');
    } else {
      if (leftArrow && rightArrow) {
        leftArrow.classList.remove('active');
        rightArrow.classList.remove('active');
      }
    }
  }

  window.addEventListener('mouseover', (event) => toggleArrows(event.target));

  function changeSlide(target) {
    const miniSlides = document.querySelectorAll('.mini-img');
    let activeId;
    let activeSlide;
    for (i = 0; i < miniSlides.length; i++) {
      if (miniSlides[i].classList.contains('active')) {
        activeId = i;
      }
    }

    miniSlides[activeId].classList.remove('active');

    if (target.classList.contains('left-arrow')) {
      activeSlide = miniSlides[activeId - 1 < 0 ? miniSlides.length - 1 : activeId - 1];
    }
    if (target.classList.contains('right-arrow')) {
      activeSlide = miniSlides[activeId + 1 >= miniSlides.length ? 0 : activeId + 1];
    }
    if (target.classList.contains('mini-img')) {
      activeSlide = target;
    }
    const imgUrl = activeSlide.getAttribute('src');
    const bigImage = document.querySelector('.big-image');
    bigImage.setAttribute('src', imgUrl);
    activeSlide.classList.add('active');
  }

  window.addEventListener('click', (event) => {
    if (event.target.classList.contains('arrow') || event.target.classList.contains('mini-img')) {
      changeSlide(event.target);
    }
  });
})();
