const toTop = document.querySelector('.to-top')

toTop.addEventListener('click', () => {
	document.body.scrollTop = 0
	document.documentElement.scrollTop = 0
})

function toTopDisplayToggler() {
	if (document.body.scrollTop >= 0 || document.documentElement.scrollTop >= 0) {
		toTop.classList.add('to-top--active')
	} else {
		toTop.classList.remove('to-top--active')
	}
}

window.addEventListener('scroll', toTopDisplayToggler)
