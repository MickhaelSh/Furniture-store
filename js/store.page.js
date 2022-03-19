(function () {
  async function getItems() {
    const response = await fetch('js/db.json');
    const items = await response.json();
    renderItem(items.furniture);
  }
  getItems();

  function renderItem(items) {
    const itemContainer = document.querySelector('.store__products');
    const storeTitle = document.querySelector('.store__products-title');

    items.forEach((item) => {
      itemContainer.innerHTML += `<div class="fave-finds__item cart-item" data-id=${item.id}>
			 <div class="fave-finds__item-image-containter">
			 <a href="product.html"><img class="item-image"
				 src=${item.imageUrl}
				 alt=${item.name}></a>
		 </div>
		 <a href="product.html"><div class="fave-finds__item-name item-name">${item.name}</div></a>
		 <div class="fave-finds__price"><span
				 class="highlighted item-price">${item.price}</span><span
				 class="highlighted">,00 USD</span></div>
		 <button class="button button-filled store__button item-button">order
			 now</button>
	 	</div>`;
    });
    storeTitle.textContent = `Products (${items.length})`;
  }
})();
