export function modalDisplayToggler(modalName) {
	modalName = '.' + modalName
	if (document.querySelector(modalName)) {
		modalName = modalName.replace('.', '')
		let modalOverlay = '[data-modal-overlay="' + modalName + '"]'
		modalName = '.' + modalName
		document.querySelector(modalName).classList.toggle('modal--opened')
		document.querySelector(modalOverlay).classList.toggle('overlay--active')
		document.querySelector(modalOverlay).onclick = () => {
			document.querySelector(modalName).classList.toggle('modal--opened')
			document.querySelector(modalOverlay).classList.toggle('overlay--active')
		}
	}
}

export function createModal(modalName) {
	modalName = '.' + modalName
	if (document.querySelector(modalName)) {
		modalName = modalName.replace('.', '')
		let modalTriggers = '[data-modal-trigger="' + modalName + '"]'
		document.querySelectorAll(modalTriggers).forEach(trigger => (trigger.onclick = () => modalDisplayToggler(modalName)))
	}
}

createModal('hairs-service')
createModal('cosmetology-service')
createModal('body-care-service')
createModal('hairs-coloring')
createModal('hairs-styling')
createModal('hairs-care')
createModal('haircuts')
createModal('nails')
createModal('cosmetology-1')
createModal('cosmetology-2')
createModal('massage')
createModal('depilation')
createModal('makeup')