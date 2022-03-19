(function () {
  async function getItems() {
    const response = await fetch('js/db.json');
    const items = await response.json();
    renderItems(items.furniture);
  }

  getItems();

  function renderItems(items) {
    const itemsContainer = document.querySelector('.best-seling__items-container');
    items.forEach((element) => {
      if (element.category === 'Best-seling') {
        itemsContainer.innerHTML += `<div class="best-seling__item cart-item" data-id="${element.id}">
					<div class="best-seling__item-img-container">
						<a href="product.html"><img
								src=${element.imageUrl}
								alt=${element.name}
								class="best-seling__img item-image"></a>
					</div>
					<a href="product.html">
						<div class="best-seling__item-name item-name">${element.name}
						</div>
					</a>
					<div class="best-seling__item-price"><span
							class="highlighted item-price">${element.price}</span><span
							class="highlighted">,00 USD</span>
					</div>
					<button class="button button-filled item-button">order
						now</button>
				</div>`;
      }
    });
  }
})();
