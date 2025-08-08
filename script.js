
const menuOpenButton = document.querySelector('#menu-open-button');
const menuCloseButton = document.querySelector('#menu-close-button');

menuOpenButton.addEventListener('click', () => {
    document.body.classList.toggle('show-mobile-menu');
});

menuCloseButton.addEventListener('click', () => menuOpenButton.click());

function updateContactButtonVisibility() {
    const isMobile = window.innerWidth <= 768;
    const desktopBtn = document.querySelector('.desktop-contact');
    const mobileBtn = document.querySelector('.mobile-contact');

    if (isMobile) {
      desktopBtn.style.display = 'none';
      mobileBtn.style.display = 'block';
    } else {
      desktopBtn.style.display = 'block';
      mobileBtn.style.display = 'none';
    }
  }

  updateContactButtonVisibility();
  window.addEventListener('resize', updateContactButtonVisibility);