(function () {
  const cartIcon = document.querySelector('.shoping-basket');
  const cartCount = document.querySelector('.shoping-basket-counter');
  const productContainer = document.querySelector('.modal-basket-product-list');
  const productWrapper = document.querySelector('.modal-basket-products-wrapper');
  const cartEmpty = document.querySelector('.modal-basket-empty');
  const cartForm = document.querySelector('.modal-basket-form');
  const itemsFromStorage = JSON.parse(localStorage.getItem('items'));
  let counter = 0;

  renderStorageItems();

  function renderStorageItems() {
    if (itemsFromStorage) {
      const productContainer = document.querySelector('.modal-basket-product-list');
      itemsFromStorage.forEach(function (el) {
        const itemCard = `<div class="modal-basket-product-container cart-item" data-id=${el.id}>
				<div class="modal-basket-product-img-container">
					<a href="product.html"><img class="item-image" src=${el.img} alt=${el.name}></a>   
				</div>
				<div class="modal-basket-product-info">
				<a href="product.html"><div class="modal-basket-product-name item-name">${el.name}</div></a>   
		 			<div class="items counter-wrapper modal-basket-product-quantity">
		 				<div class="items__control modal-basket-product-button down" >
						 	<img src="img/quntity-arrow.png" data-action="minus">
						</div>
		 				<div class="items__current" data-counter>${el.no}</div>
		 				<div class="items__control modal-basket-product-button up" >
						 	<img src="img/quntity-arrow.png" data-action="plus">
						</div>
		 		</div>
			</div>
			<p class="dollar-or-uah">$</p>
		 	<div class="modal-basket-product-price">${el.price}</div>
		 	<div class="modal-basket-product-price-total active">${el.no * el.price}</div>
			<button class="modal-basket-product-delete" data-action="delete"></button>
		</div>`;
        productContainer.innerHTML += itemCard;
      });

      counter = itemsFromStorage.reduce((sum, data) => data.no + sum, 0);
      onVisibleCart();
      cartPrice();
    }
  }

  function addToCart(target) {
    const product = target.closest('.cart-item');
    const items = [];
    const item = {
      id: product.getAttribute('data-id'),
      img: product.querySelector('.item-image').getAttribute('src'),
      name: product.querySelector('.item-name').textContent,
      price: product.querySelector('.item-price').textContent,
      no: 1,
    };
    if (!itemsFromStorage) {
      items.push(item);
      localStorage.setItem('items', JSON.stringify(items));
      window.location.reload();
    } else {
      itemsFromStorage.forEach((data) => {
        if (item.id === data.id) {
          item.no = data.no + 1;
        } else {
          items.push(data);
        }
      });
      items.push(item);
      localStorage.setItem('items', JSON.stringify(items));
      window.location.reload();
    }
    onVisibleCart();
  }

  window.addEventListener('click', (event) => {
    if (event.target.classList.contains('item-button')) {
      addToCart(event.target);
    }
  });

  function onVisibleCart() {
    if (counter > 0) {
      cartIcon.classList.add('active');
      cartCount.classList.add('active');
      cartCount.textContent = counter;
      productContainer.classList.add('active');
      productWrapper.classList.add('active');
      cartEmpty.classList.remove('active');
    } else {
      cartIcon.classList.remove('active');
      productWrapper.classList.remove('active');
      cartEmpty.classList.add('active');
      setTimeout(() => closeCart(), 3000);
    }
  }

  const bodyElement = document.querySelector('body');
  const cartContainer = document.querySelector('.modal-basket-container');

  function openCart() {
    bodyElement.classList.add('lock');
    cartContainer.classList.add('active');
    cartIcon.classList.remove('active');
  }

  cartIcon.addEventListener('click', openCart);

  const cartClose = document.querySelector('.modal-basket-close');

  function closeCart() {
    const modalForMenu = document.querySelector('.modal-menu');
    if (!modalForMenu.classList.contains('active')) {
      bodyElement.classList.remove('lock');
    }
    cartContainer.classList.remove('active');
    onVisibleCart();
  }

  window.addEventListener('click', function (event) {
    if (event.target.classList.contains('modal-basket-container')) {
      closeCart();
    }
  });

  cartClose.addEventListener('click', closeCart);

  function changeItemsCountCart(target) {
    const product = target.closest('.cart-item');
    const productId = product.getAttribute('data-id');
    const count = product.querySelector('[data-counter]');
    const index = itemsFromStorage.indexOf(
      itemsFromStorage.filter((item) => item.id === productId)[0],
    );
    switch (target.dataset.action) {
      case 'plus':
        ++count.innerText, counter++, itemsFromStorage[index].no++;
        break;
      case 'minus':
        parseInt(count.innerText) > 1
          ? (--count.innerText, itemsFromStorage[index].no--)
          : (itemsFromStorage.splice(index, 1), product.remove()),
          counter--;
        break;
      case 'delete':
        (counter -= itemsFromStorage[index].no),
          itemsFromStorage.splice(index, 1),
          product.remove();
        break;
    }
    cartCount.textContent = counter;
    onVisibleCart();
    cartPrice();
    localStorage.setItem('items', JSON.stringify(itemsFromStorage));
  }

  productContainer.addEventListener('click', (event) => {
    if (
      event.target.dataset.action === 'plus' ||
      event.target.dataset.action === 'minus' ||
      event.target.dataset.action === 'delete'
    ) {
      changeItemsCountCart(event.target);
    }
  });

  function cartPrice() {
    const itemsInCart = Array.from(document.querySelectorAll('.modal-basket-product-container'));
    const totalCartPrice = document.querySelector('.total-price');
    itemsInCart.forEach((item) => {
      const itemPrice = item.querySelector('.modal-basket-product-price');
      const itemTotalPrice = item.querySelector('.modal-basket-product-price-total');
      const itemCount = item.querySelector('[data-counter]');
      itemTotalPrice.textContent = itemPrice.textContent * itemCount.textContent;
    });
    totalCartPrice.textContent = itemsInCart.reduce(
      (sum, item) => sum + +item.querySelector('.modal-basket-product-price-total').textContent,
      0,
    );
  }

  function submitGreeting() {
    const thankYouUser = document.querySelector('.modal-basket-thanks-heading');
    const greetingText = document.querySelector('.modal-basket-thanks');
    const userName = document.querySelector('.cart-usermane');
    const valueInputs = document.querySelectorAll('.modal-form');
    thankYouUser.textContent = `Thank you ${userName.value}`;
    productWrapper.classList.remove('active');
    greetingText.classList.add('active');
    itemsFromStorage.splice(0, itemsFromStorage.length);
    valueInputs.forEach((input) => (input.value = ''));
    counter = 0;
    setTimeout(() => (closeCart(), greetingText.classList.remove('active')), 3000);
  }

  cartForm.addEventListener('submit', (event) => {
    event.preventDefault(), submitGreeting();
  });

  curencyRate();

  async function curencyRate() {
    const response = await fetch(
      'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchangenew?json',
    );
    const curency = await response.json();
    const usdRate = parseInt(curency.filter((el) => el.cc === 'USD')[0].rate);
    localStorage.setItem('rate', usdRate);
    const localCurrency = localStorage.getItem('currency');
    localCurrency === 'false'
      ? exchange(usdRate)
      : (localStorage.setItem('currency', 'true'), (document.getElementById('USD').checked = true));
  }

  function exchange(usdRate) {
    const productsInCart = document.querySelectorAll('.modal-basket-product-container');
    const totalCurrencyTag = document.querySelector('.dollar-or-uah-total');
    const localCurrency = localStorage.getItem('currency');
    productsInCart.forEach((product) => {
      const price = product.querySelector('.modal-basket-product-price');
      const curencyTag = product.querySelector('.dollar-or-uah');
      switch (localCurrency) {
        case 'true':
          (price.textContent = parseInt(price.textContent) / usdRate),
            (curencyTag.textContent = '$'),
            (totalCurrencyTag.textContent = '$'),
            (document.getElementById('USD').checked = true);
          break;
        case 'false':
          (price.textContent = parseInt(price.textContent) * usdRate),
            (curencyTag.textContent = '₴'),
            (totalCurrencyTag.textContent = '₴'),
            (document.getElementById('UAH').checked = true);
          break;
      }
    });
    cartPrice();
  }

  productWrapper.addEventListener('click', function (event) {
    const classList = event.target.classList;
    if (classList.contains('curencytoggle')) {
      if (classList.contains('USD') && localStorage.getItem('currency') === 'false') {
        localStorage.setItem('currency', 'true');
      }
      if (classList.contains('UAH') && localStorage.getItem('currency') === 'true') {
        localStorage.setItem('currency', 'false');
      }
      exchange(parseInt(localStorage.getItem('rate')));
    }
  });
})();
