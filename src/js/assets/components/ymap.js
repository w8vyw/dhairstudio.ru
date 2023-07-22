ymaps.ready(init)
function init() {
	let map = new ymaps.Map('map', {
		center: [55.75176098858261, 37.859469151975524],
		zoom: 16
	})
	let mark = new ymaps.Placemark(
		[55.75176098858261, 37.859469151975524],
		{
			balloonContentHeader: '<a href="https://dhairstudio.ru" style="color: #83503a;">DJANET HAIR STUDIO</a>',
			balloonContentBody:
				'Описание<br><a href="https://yandex.ru/maps/-/CCUgzXHEhC" target="_blank">Московская Область, г. Реутов, ул. Октября, вл.10, ТЦ Экватор, 2 этаж</a>',
			balloonContentFooter: '<a href="tel:+79636021001" style="color: #83503a; font-size: 16px; font-weight: 700;">+7 963 602 10 01</a>',
			hintContent: 'Мы ждем тебя здесь!'
		},
		{
			preset: 'islands#redIcon'
		}
	)
	map.geoObjects.add(mark)
	map.controls.remove('geolocationControl')
	map.controls.remove('searchControl')
	map.controls.remove('trafficControl')
	map.controls.remove('typeSelector')
	map.controls.remove('fullscreenControl')
	map.controls.remove('zoomControl')
	map.controls.remove('rulerControl')
}