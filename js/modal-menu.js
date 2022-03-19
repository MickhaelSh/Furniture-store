(function () {
  const menuButton = document.querySelector('.header__burger-container');
  const bodyElement = document.querySelector('body');
  const modalMenu = document.querySelector('.modal-menu');
  const navElements = document.querySelectorAll('.modal-menu__nav-element');

  function toggleModalMenu() {
    menuButton.classList.toggle('active');
    bodyElement.classList.toggle('lock');
    modalMenu.classList.toggle('active');
  }

  function openMenuLink() {
    menuButton.classList.remove('active');
    bodyElement.classList.remove('lock');
    modalMenu.classList.remove('active');
  }
  menuButton.addEventListener('click', toggleModalMenu);
  navElements.forEach((navLink) => navLink.addEventListener('click', openMenuLink));

  function addToStorage(target) {
    const itemId = target.closest('.cart-item').getAttribute('data-id');
    localStorage.setItem('productForPage', itemId);
  }

  window.addEventListener('click', (event) => {
    if (
      event.target.classList.contains('item-image') ||
      event.target.classList.contains('item-name')
    ) {
      addToStorage(event.target);
    }
  });
})();
