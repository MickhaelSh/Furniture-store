(function () {
  async function downloadItems() {
    const response = await fetch('./js/db.json');
    const products = await response.json();
    renderItems(products.furniture);
  }
  const categories = Array.from(document.querySelectorAll('.fave-finds__tab'));

  downloadItems();

  function renderItems(products) {
    const productsContainer = document.querySelector('.fave-finds__items-container');
    const localCategory = localStorage.getItem('category')
      ? localStorage.getItem('category')
      : 'Armchairs';

    categories.forEach((category) => {
      if (category.textContent === localCategory) {
        category.classList.add('active');
      }
    });

    productsContainer.innerHTML = '';

    for (const product of products) {
      if (product.category === localCategory) {
        productsContainer.innerHTML += `
    		<div class="fave-finds__item cart-item" data-id=${product.id}>
						<div class="fave-finds__item-image-containter">
						<a href="product.html"><img class="item-image"
							src=${product.imageUrl}
							alt=${product.name}></a>
					</div>
					<a href="product.html"><div class="fave-finds__item-name item-name">${product.name}</div></a>
					<div class="fave-finds__price"><span
							class="highlighted item-price">${product.price}</span><span
							class="highlighted">,00 USD</span></div>
					<button class="button button-outline fave-finds__button item-button">order
						now</button>
				</div>`;
      }
    }
  }

  function toggleCategory(event) {
    downloadItems();
    categories.forEach((category) => category.classList.remove('active'));
    localStorage.setItem('category', event.target.textContent);
  }

  categories.forEach((category) =>
    category.addEventListener('click', (event) => toggleCategory(event)),
  );
})();
