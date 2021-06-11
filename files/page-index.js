// Переименование названий Месяца
function monthNames() {
	$('#news .month').each(function (){
		if ($(this).text() === 'Jan') {
			$(this).text('Января')
		}else if ($(this).text() === 'Feb') {
			$(this).text('Февраля')
		}else if ($(this).text() === 'Mar') {
			$(this).text('Марта')
		}else if ($(this).text() === 'Apr') {
			$(this).text('Апреля')
		}else if ($(this).text() === 'May') {
			$(this).text('Мая')
		}else if ($(this).text() === 'Jun') {
			$(this).text('Июня')
		}else if ($(this).text() === 'Jul') {
			$(this).text('Июля')
		}else if ($(this).text() === 'Aug') {
			$(this).text('Августа')
		}else if ($(this).text() === 'Sep') {
			$(this).text('Сентября')
		}else if ($(this).text() === 'Nov') {
			$(this).text('Ноября')
		}else if ($(this).text() === 'Dec') {
			$(this).text('Декабря')
		}
	});
}

// Отсчет даты до окончания акции
function counterDate() {
	// Устанавливаем дату обратного отсчета ММ-ДД-ГГ
	var end = $('.counter').attr('end');
	var countDownDate = new Date(end).getTime();
	// Обновление счетчика каждую секунду
	var x = setInterval(function() {
		var now = new Date().getTime();
		var distance = countDownDate - now;
		var days = Math.floor(distance / (1000 * 60 * 60 * 24));
		var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
		var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
		var seconds = Math.floor((distance % (1000 * 60)) / 1000);
		// Вывод
		$('.counter .days span').text(days);
		$('.counter .hours span').text(hours);
		$('.counter .minutes span').text(minutes);
		$('.counter .seconds span').text(seconds);
		// Счетчик завершен
		if (distance < 0) {
			clearInterval(x);
			$('.counter').hide();
		}
	}, 1000);
}

// Функция показать больше для Каталога на главной странице
function pdtCatalog() {
	$('#catalog .owl-carousel').owlCarousel({
		items: 4,
		margin: 32,
		loop: false,
		rewind: true,
		lazyLoad: true,
		nav: true,
		navContainer: '#catalog .owl-nav',
		navText: [ , ],
		dots: true,
		autoHeight: false,
		autoHeightClass: 'owl-height',
		autoplay: false,
		autoplayHoverPause: true,
		smartSpeed: 500,
		mouseDrag: true,
		touchDrag: true,
		pullDrag: true,
		responsiveClass: true,
		responsiveRefreshRate: 100,
		responsive: {
			0:{items:1},
			320:{items:2},
			481:{items:2},
			641:{items:2},
			768:{items:3},
			992:{items:3},
			1200:{items:4}
		}
	});
}

// Функция слайдеров на главной
function pdtSlider() {
	// Функция слайдер для "Акции" на главной странице
	$('#pdt__sales .owl-carousel').owlCarousel({
		items: 1,
		margin: 0,
		loop: false,
		rewind: true,
		lazyLoad: true,
		nav: true,
		navContainer: '.pdt .owl-nav[data-content="pdt__sales"]',
		navText: [ , ],
		dots: false,
		dotsContainer: '',
		autoHeight: false,
		autoHeightClass: 'owl-height',
		autoplay: false,
		autoplayHoverPause: true,
		smartSpeed: 500,
		mouseDrag: true,
		touchDrag: true,
		pullDrag: true,
		responsiveClass: true,
		responsiveRefreshRate: 100
	});
	// Функция слайдера для "Лидеры продаж" на главной странице
	$('#pdt__best .owl-carousel').owlCarousel({
		items: 4,
		margin: 32,
		loop: false,
		rewind: true,
		lazyLoad: true,
		nav: true,
		navContainer: '.pdt .owl-nav[data-content="pdt__best"]',
		navText: [ , ],
		dots: false,
		dotsContainer: '',
		autoHeight: false,
		autoHeightClass: 'owl-height',
		autoplay: false,
		autoplayHoverPause: true,
		smartSpeed: 500,
		mouseDrag: true,
		touchDrag: true,
		pullDrag: true,
		responsiveClass: true,
		responsiveRefreshRate: 100,
		responsive: {
			0:{items:1},
			320:{items:1},
			481:{items:2},
			641:{items:3},
			768:{items:3},
			992:{items:3},
			1200:{items:4}
		}
	});
	// Функция слайдера для Новинок на главной странице
	$('#pdt__new .owl-carousel').owlCarousel({
		items: 4,
		margin: 32,
		loop: false,
		rewind: true,
		lazyLoad: true,
		nav: true,
		navContainer: '.pdt .owl-nav[data-content="pdt__new"]',
		navText: [ , ],
		dots: false,
		autoHeight: false,
		autoHeightClass: 'owl-height',
		autoplay: false,
		autoplayHoverPause: true,
		smartSpeed: 500,
		mouseDrag: true,
		touchDrag: true,
		pullDrag: true,
		responsiveClass: true,
		responsiveRefreshRate: 100,
		responsive: {
			0:{items:1},
			320:{items:1},
			481:{items:2},
			641:{items:3},
			768:{items:3},
			992:{items:3},
			1200:{items:4}
		}
	});
	// Функция слайдера для Хитов продаж на главной странице
	$('#pdt__sale .owl-carousel').owlCarousel({
		items: 3,
		margin: 32,
		loop: false,
		rewind: true,
		lazyLoad: true,
		nav: true,
		navContainer: '.pdt .owl-nav[data-content="pdt__sale"]',
		navText: [ , ],
		dots: false,
		autoHeight: false,
		autoHeightClass: 'owl-height',
		autoplay: false,
		autoplayHoverPause: true,
		smartSpeed: 500,
		mouseDrag: true,
		touchDrag: true,
		pullDrag: true,
		responsiveClass: true,
		responsiveRefreshRate: 100,
		responsive: {
			0:{items:1},
			320:{items:1},
			481:{items:1},
			641:{items:1},
			768:{items:2},
			992:{items:3},
			1200:{items:3}
		}
	});
	// Табы в товарах
	$('#pdt .nav__tab').on('click', function (event) {
		event.preventDefault();
		var content = $(this).attr('data-content');
		var parent = $(this).parents('#pdt');
		console.log(parent)
		parent.find('[id^="pdt__"]').prepend('<div class="preloader top"><div class="loading"></div></div>');
		preload();
		parent.find('.nav__tab').removeClass('active')
		parent.find('[id^="pdt__"][data-content]').removeClass('active');
		parent.find('.owl-nav[data-content]').removeClass('active');
		$(this).addClass('active');
		parent.find('[id^="pdt__"][data-content="'+ content +'"').addClass('active');
		parent.find('.owl-nav[data-content="'+ content +'"').addClass('active');
	});
}

// Слайдер для главной страницы
function slideShow() {
	// Слайдер на главной
	var owlS = $('#slideshow .owl-carousel');
	owlS.owlCarousel({
		items: 1,
		loop: false,
		rewind: true,
		lazyLoad: true,
		nav: true,
		navText: [ , ],
		navContainer: '#slideshow .owl-nav',
		dots: false,
		dotsContainer: '',
		URLhashListener: true,
		autoplay: false,
		autoplayHoverPause: true,
		autoHeight: true,
		autoHeightClass: 'owl-height',
		smartSpeed: 500,
		dotsSpeed: 400,
		mouseDrag: true,
		touchDrag: true,
		pullDrag: true,
		onInitialized: counter,
		onChanged: counter
	});
	function counter(event) {
		var items = event.item.count;     // Number of items
		var item = event.item.index + 1;  // Position of the current item
		$('#slideshow .count').remove();
		$('#slideshow .owl-next').before('<span class="count">'+ item + '/' + items +'</span>')
	}
}

// Новости
function newsCarousel() {
	if ($("#news .news_list_all.owl-carousel").length){
		$("#news .news_list_all.owl-carousel").owlCarousel({
			items: 2,
			margin: 32,
			loop: false,
			rewind: true,
			lazyLoad: true,
			nav: true,
			navContainer: '#news .owl-nav[data-content="news_list_all"]',
			navText: [ , ],
			dots: false,
			autoHeight: true,
			autoHeightClass: 'owl-height',
			autoplay: false,
			autoplayHoverPause: true,
			smartSpeed: 500,
			mouseDrag: true,
			touchDrag: true,
			pullDrag: true,
			responsiveClass: true,
			responsiveRefreshRate: 100,
			responsive: {
				0:{items:1},
				320:{items:1},
				640:{items:2}
			}
		});
	}else{
		$("#news .news_list_articles.owl-carousel").owlCarousel({
			items: 2,
			margin: 32,
			loop: false,
			rewind: true,
			lazyLoad: true,
			nav: true,
			navContainer: '#news .owl-nav[data-content="news_list_articles"]',
			navText: [ , ],
			dots: false,
			autoHeight: true,
			autoHeightClass: 'owl-height',
			autoplay: false,
			autoplayHoverPause: true,
			smartSpeed: 500,
			mouseDrag: true,
			touchDrag: true,
			pullDrag: true,
			responsiveClass: true,
			responsiveRefreshRate: 100,
			responsive: {
				0:{items:1},
				320:{items:1},
				640:{items:2}
			}
		});
		$("#news .news_list_mass_media.owl-carousel").owlCarousel({
			items: 2,
			margin: 32,
			loop: false,
			rewind: true,
			lazyLoad: true,
			nav: true,
			navContainer: '#news .owl-nav[data-content="news_list_mass_media"]',
			navText: [ , ],
			dots: false,
			autoHeight: true,
			autoHeightClass: 'owl-height',
			autoplay: false,
			autoplayHoverPause: true,
			smartSpeed: 500,
			mouseDrag: true,
			touchDrag: true,
			pullDrag: true,
			responsiveClass: true,
			responsiveRefreshRate: 100,
			responsive: {
				0:{items:1},
				320:{items:1},
				640:{items:2}
			}
		});
		$("#news .news_list_shop.owl-carousel").owlCarousel({
			items: 2,
			margin: 32,
			loop: false,
			rewind: true,
			lazyLoad: true,
			nav: true,
			navContainer: '#news .owl-nav[data-content="news_list_shop"]',
			navText: [ , ],
			dots: false,
			autoHeight: true,
			autoHeightClass: 'owl-height',
			autoplay: false,
			autoplayHoverPause: true,
			smartSpeed: 500,
			mouseDrag: true,
			touchDrag: true,
			pullDrag: true,
			responsiveClass: true,
			responsiveRefreshRate: 100,
			responsive: {
				0:{items:1},
				320:{items:1},
				640:{items:2}
			}
		});
	}
	// Табы в новостях
	$('#news .nav__tab').on('click', function (event) {
		event.preventDefault();
		var content = $(this).attr('data-content');
		$('#news [class^="news_list_"]').prepend('<div class="preloader"><div class="loading"></div></div>');
		preload();
		$('#news .nav__tab').removeClass('active')
		$('#news [class^="news_list_"][data-content]').removeClass('active');
		$('#news .owl-nav[data-content]').removeClass('active');
		$(this).addClass('active');
		$('#news [class^="news_list_"][data-content="'+ content +'"').addClass('active');
		$('#news .owl-nav[data-content="'+ content +'"').addClass('active');
	});
}

// Загрузка основных функций шаблона
$(document).ready(function(){
	monthNames();
	counterDate();
	slideShow();
	newsCarousel();
	pdtCatalog();
	pdtSlider();
});