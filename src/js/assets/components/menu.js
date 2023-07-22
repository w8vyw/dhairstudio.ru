const menu = document.querySelector('.header__menu')
const menuOverlay = document.querySelector('[data-menu-overlay]')
const menuTrigger = document.querySelectorAll('[data-menu-trigger]')

function menuDisplayToggler() {
	menu.classList.toggle('header__menu--opened')
	menuOverlay.classList.toggle('overlay--active')
}

menuTrigger.forEach(trigger => trigger.addEventListener('click', menuDisplayToggler))

menuOverlay.addEventListener('click', menuDisplayToggler)
