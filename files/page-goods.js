// Добавляет пробел 1000 -> 1 000  /  10000 -> 10 000
function addSpaces(nStr){
	return nStr.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ')
}

// Крутит изображение при обновлении картинки защиты от роботов
function RefreshImageAction(img,num,cnt) {
	if(cnt>13) { return false; }
	$(img).attr('src', $(img).attr('rel') + 'icon/refresh/' + num + '.gif');
	num = (num==6)?0:num;
	setTimeout(function () {
		RefreshImageAction(img, num+1, cnt+1)
	}, 50);
}

// Товар. Карточка товара
function pageGoods() {
	// Слайдер доп. изображений
	$('.thumblist .owl-carousel').owlCarousel({
		items: 4,
		margin: 16,
		loop: false,
		rewind: true,
		lazyLoad: true,
		dots: false,
		nav: false,
		navText: [ , ],
		autoplay: true,
		autoplayHoverPause: true,
		autoHeight: true,
		smartSpeed: 500,
		mouseDrag: true,
		touchDrag: true,
		pullDrag: true,
		responsiveClass: true,
		responsiveRefreshRate: 100,
		responsive: {
			0:{items:2},
			320:{items:2},
			480:{items:3},
			641:{items:4},
			768:{items:4},
			992:{items:3},
			1200:{items:4}
		}
	});
	// Сопутствующие товары Слайдер
	$('.related__goods .owl-carousel').owlCarousel({
		items: 4,
		margin: 32,
		loop: false,
		rewind: true,
		lazyLoad: true,
		nav: true,
		navContainer: '.related__goods .owl-nav',
		navText: [ , ],
		dots: false,
		dotsContainer: '.related__goods .owl-dots',
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
			641:{items:2},
			768:{items:3},
			992:{items:3},
			1200:{items:4}
		}
	});
	// С этим товаром смотрят Слайдер
	$('.related__views .owl-carousel').owlCarousel({
		items: 4,
		margin: 32,
		loop: false,
		rewind: true,
		lazyLoad: true,
		nav: true,
		navContainer: '.related__views .owl-nav',
		navText: [ , ],
		dots: false,
		dotsContainer: '.related__views .owl-dots',
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
			641:{items:2},
			768:{items:3},
			992:{items:3},
			1200:{items:4}
		}
	});

	// Функция показать больше для Отзывов
	var opinionContent = $('.productView__opinion');
	var opinionCount = opinionContent.find('.opinion__item').length;
	if(opinionCount<=3){ opinionContent.find('.opinion__buttons').hide(); }
	opinionContent.find('.opinion__buttons .showAll').on('click',function(event){
		event.preventDefault();
		if($(this).hasClass('active')){
			$(this).removeClass('active').find('span').text("Все отзывы");
			opinionContent.find('.opinion__item').removeClass('show');
		}else{
			$(this).addClass('active').find('span').text("Скрыть все");
			opinionContent.find('.opinion__item').addClass('show');
		}
	});
	// Переключение для Положительный и Отрицательный отзыв
	$('.generally label').on('click', function(event){
		event.preventDefault();
		$('.generally label').removeClass('active');
		$('.generally input').attr('checked', false);
		$(this).addClass('active');
		$(this).next('input').attr('checked', true);
	});
	// Добавление отзыва о товаре. Рейтинг
	if($('.goodsOpinionRating').length){
		$('.goodsOpinionRating').rating();
	}
	// Ссылка на отображение формы для добавление отзыва о товаре
	$('.opinion__add').on('click', function(event){
		event.preventDefault();
		if ($(this).hasClass('active')) {
			$(this).removeClass('active');
			$('.opinion__addForm').slideUp(600);
		}else{
			$(this).addClass('active');
			$('.opinion__addForm').slideDown(600);
			$('html, body').animate({scrollTop : jQuery('.opinion__addForm').offset().top}, 500);
		}
	});
	// Валидация формы на странице оформления заказа, а так же формы на страницы связи с администрацией
	$(".opinion__form .button").on('click', function(){
		var form = $(".opinion__form");
		form.validate({
			errorPlacement: function(error, element) { }
		});
		form.submit();
		return false;
	});
	// Иконка для обновления изображение капчи
	$('.captcha__refresh').click(function(){
		RefreshImageAction(this,1,1);
		$('.captcha__image').attr('src',$('.captcha__image').attr('src')+'&rand'+Math.random(0,10000));
		return false;
	});
	// Переключение табов
	function tabSwitch() {
		var tabs = $('.productView__tabs');
		var tab = tabs.find('.tab');
		var block = $('.tabs__content > div');
		tab.first().addClass('active');
		block.first().addClass('active');
		// Табы в карточке
		tab.on('click', function(){
			var id = $(this).data('tab');
			var content = tabs.find('.tabs__content > div[data-tab="'+ id +'"]');
			tab.removeClass('active');
			block.removeClass('active');
			$(this).addClass('active');
			content.addClass('active')
		});
	}
	tabSwitch();

	// Открытие зон доставки
	$('.zone__open').on('click', function(event){
		event.preventDefault();
		if ($(this).hasClass('active')) {
			$(this).removeClass('active');
			$('.zone__list').slideUp(600);
		}else{
			$(this).addClass('active');
			$('.zone__list').slideDown(600);
		}
	});

	// Свернуть и Развернуть дополнительное описание
	$('.opinion__more').on('click', function(event) {
		event.preventDefault();
		// Старый текст ссылки
		var txtOld = $(this).text();
		// Новый текст ссылки
		var txtNew = $(this).attr('rel');
		if ($(this).hasClass('active')) {
			$(this).removeClass('active');
			$(this).parent().find('.opinion__text.comment').addClass('mask').removeClass('active');
			$(this).html(txtNew);
			$(this).attr('rel', txtOld);
		}else{
			$(this).addClass('active');
			$(this).parent().find('.opinion__text.comment').addClass('active').removeClass('mask');
			$(this).html(txtNew);
			$(this).attr('rel', txtOld);
		}
	});
	// Свернуть и Развернуть отображение кнопок
	$('.opinion__text.comment').each(function (){
		var contentHeight = $(this).height();
		if(contentHeight >= 90){
			$(this).parent().find('.opinion__more').show();
			$(this).parent().find('.opinion__text.comment').addClass('mask');
		}else{
			$(this).parent().find('.opinion__more').hide();
			$(this).parent().find('.opinion__text.comment').removeClass('mask');
		}
	});
}

// Радио кнопки для модификаций
function newModification() {
	$('.goodsModificationsProperty').each(function(){
		a = $(this).find('select option:selected').attr('value');
		$(this).find('.goodsModificationsValue[data-value="'+ a +'"]').addClass('active');
		dis = $(this).find('select option:disabled').attr('value');
		$(this).find('.goodsModificationsValue[data-value="'+ dis +'"]').removeClass('active');
		$(this).find('.goodsModificationsValue[data-value="'+ dis +'"]').addClass('disabled');
	});
	$('.goodsModificationsValue').click(function(){
		$(this).parent().find('.goodsModificationsValue').removeClass('active');
		$(this).addClass('active');
		a = $(this).data('value');
		$(this).parent().parent().find('select option[value="' + a + '"]').prop('selected',true);
		$(this).parent().parent().find('select').trigger('change');
	});
	$('.goodsModificationsValue.disabled').off('click');
}

// Модификации select
function goodsModification() {
	// Функция собирает свойства в строку, для определения модификации товара
	function getSlugFromGoodsDataFormModificationsProperties(obj) {
		var properties = new Array();
		$(obj).each(function(i){
			properties[i] = parseInt($(this).val());
		});
		return properties.sort(function(a,b){return a - b}).join('_');
	}

	var
			goodsDataProperties = $('.goodsModificationsProperty select[name="form[properties][]"]'),  // Запоминаем поля выбора свойств, для ускорения работы со значениями свойств
			goodsDataModifications = $('.goodsModificationsList'); // Запоминаем блоки с информацией по модификациям, для ускорения работы

	// Обновляет возможность выбора свойств модификации, для отключения возможности выбора по характеристикам модификации которой не существует.
	function updateVisibility (y) {
		// Проверяем в каждом соседнем поле выбора модификаций, возможно ли подобрать модификацию для указанных свойств
		goodsDataProperties.each(function(j){
			// Если мы сравниваем значения свойства не с самим собой, а с другим списком значений свойств
			if( j != y ) {
				// Проходим по всем значениям текущего свойства модификации товара
				$(this).find('option').each(function(){
					// Записываем временный массив свойств, которые будем использовать для проверки существования модификации
					var checkProperties = new Array();
					$(goodsDataProperties).each(function(i){
						checkProperties[i] = parseInt($(this).val());
					});
					// Пытаемся найти модификацию соответствующую выбранным значениям свойств
					checkProperties[j] = parseInt($(this).attr('value'));
					// Собираем хэш определяющий модификацию по свойствам
					slug = checkProperties.sort(function(a,b){return a - b}).join('_');
					// Ищем модификацию по всем выбранным значениям свойств товара. Если модификации нет в возможном выборе, отмечаем потенциальное значение выбора как не доступное для выбора, т.к. такой модификации нет.
					if(!goodsDataModifications.filter('[rel="'+slug+'"]').length) {
						$(this).attr('disabled', true);
						// Если выбрав данное значение свойства товара можно подобрать модификацию, то выделяем вариант выбора как доступный.
					} else {
						$(this).attr('disabled', false);
					}
				});
			}
		});
	}
	// Обновляем возможность выбора модификации товара по свойствам. Для тех свойств, выбор по которым не возможен, отключаем такую возможность.
	// Проверяем возможность выбора на всех полях кроме первого, чтобы отключить во всех остальных варианты, которые не возможно выбрать
	updateVisibility (0);
	// Проверяем возможность выбора на всех полях кроме второго, чтобы в первом поле так же отключилась возможность выбора не существующих модификаций
	updateVisibility (1);

	// Изменение цены товара при изменении у товара свойства для модификации
	goodsDataProperties.each(function(y){
		$(this).change(function(){
			var slug = getSlugFromGoodsDataFormModificationsProperties(goodsDataProperties),
					modificationBlock             = $('.goodsModificationsList[rel="'+slug+'"]'),
					modificationId                = parseInt(modificationBlock.find('[name="id"]').val()),
					modificationArtNumber         = modificationBlock.find('[name="art_number"]').val(),
					modificationPriceNow          = parseInt(modificationBlock.find('[name="price_now"]').val()),
					modificationPriceNowFormated  = modificationBlock.find('.price_now_formated').html(),
					modificationPriceOld          = parseInt(modificationBlock.find('[name="price_old"]').val()),
					modificationPriceOldFormated  = modificationBlock.find('.price_old_formated').html(),
					modificationRestValue         = parseFloat(modificationBlock.find('[name="rest_value"]').val()),
					modificationDescription       = modificationBlock.find('.description').html(),
					modificationIsInCompareList   = modificationBlock.find('[name="is_has_in_compare_list"]').val(), // Отследить что делает
					modificationGoodsModImageId   = modificationBlock.find('[name="goods_mod_image_id"]').val(),
					goodsModView                  = $('.productView'),
					goodsModificationId           = $('.goodsModificationId'),
					goodsPriceNow                 = $('.productView .price__now'),
					goodsPriceOld                 = $('.productView .price__old'),
					goodsAvailableQty             = $('.productView__qty'),
					goodsAvailable                = goodsModView.find('.productView__available'),
					goodsAvailableTrue            = goodsAvailable.find('.available__true'),
					goodsAvailableFalse           = goodsAvailable.find('.available__false'),
					goodsArtNumberBlock           = $('.productView__articles'),
					goodsArtNumber                = goodsArtNumberBlock.find('.goodsModArtNumber'),
					goodsModDescriptionBlock      = $('.goodsModDescription'),
					goodsModRestValue             = goodsModView.find('.goodsModRestValue');

			// Изменяем данные товара для выбранных параметров. Если нашлась выбранная модификация
			if(modificationBlock.length) {
				// Цена товара
				goodsPriceNow.html(modificationPriceNowFormated);
				goodsPriceNow.attr('data-price', modificationPriceNow);
				goodsPriceNow.attr('content', modificationPriceNow);
				$('.related .checkbox__input').each(function(i, checkbox){
					var $checkbox = $(checkbox);
					var checkboxActive = $checkbox.prop('checked');
					if(checkboxActive) {
						changePrice($checkbox, checkboxActive);
					}
				});
				// Старая цена товара
				if(modificationPriceOld>modificationPriceNow) {
					goodsPriceOld.html(modificationPriceOldFormated);
				} else {
					goodsPriceOld.html('');
					goodsPriceOld.hide();
				}
				// Есть ли товар есть в наличии
				if(modificationRestValue>0) {
					goodsAvailableTrue.show();
					goodsAvailableFalse.hide();
					goodsModView.removeClass('empty');
					goodsModRestValue.html('Мало');
					goodsModRestValue.attr('data-value', modificationRestValue);
					goodsAvailableQty.find('.quantity').attr('max', modificationRestValue);
					goodsAvailableQty.find('.quantity').val("1");
					// Если товара нет в наличии
				} else {
					goodsAvailableTrue.hide();
					goodsAvailableFalse.show();
					goodsModView.addClass('empty');
					goodsModRestValue.html(modificationRestValue);
					goodsModRestValue.attr('data-value', modificationRestValue);
					goodsAvailableQty.find('.quantity').attr('max', modificationRestValue);
					goodsAvailableQty.find('.quantity').val("1");
				}
				// Много Мало
				if(modificationRestValue>10) {
					goodsModRestValue.html('Много');
				} else {
					goodsModRestValue.html('Мало');
				}

				// Покажем артикул модификации товара, если он указан
				if(modificationArtNumber.length>0) {
					goodsArtNumberBlock.show();
					goodsArtNumber.html(modificationArtNumber);
					// Скроем артикул модификации товара, если он не указан
				} else {
					goodsArtNumberBlock.hide();
					goodsArtNumber.html('');
				}
				// Описание модификации товара. Покажем если оно есть, спрячем если его у модификации нет
				if(modificationDescription.length > 0) {
					goodsModDescriptionBlock.show().html('<div>' + modificationDescription + '</div>');
				} else {
					goodsModDescriptionBlock.hide().html();
				}
				// Идентификатор товарной модификации
				goodsModificationId.val(modificationId);
				$('.goodsDataMainModificationId').attr('name','form[goods_mod_id][' + modificationId + ']');
				var goodsDataMainImage = $('.goodsDataMainImage').attr('data-src');
				// Меняет главное изображение товара на изображение с идентификатором goods_mod_image_id
				function changePrimaryGoodsImage(goods_mod_image_id) {
					// Если не указан идентификатор модификации товара, значит ничего менять не нужно.
					if(1 > goods_mod_image_id) {
						return true;
					}
					var
							// Блок с изображением выбранной модификации товара
							goodsModImageBlock = $('.productView__imageBox [data-id="' + parseInt(goods_mod_image_id) + '"'),
							// Блок, в котором находится главное изображение товара
							MainImageBlock = $('.productView__image'),
							// Изображение модификации товара, на которое нужно будет изменить главное изображение товара.
							MediumImageUrl = goodsModImageBlock.attr('data-href'),
							// Главное изображение, в которое будем вставлять новое изображение
							MainImage = MainImageBlock.find('img')
					;
					// Если изображение модификации товара найдено - изменяем главное изображение
					MainImage.attr('src', MediumImageUrl).parent().attr('href', MediumImageUrl);
					// Изменяем идентификатор главного изображения
					MainImageBlock.attr("data-id", parseInt(goods_mod_image_id));
					return true;
				}
				// Обновляем изображние модификации товара, если оно указано
				changePrimaryGoodsImage(modificationGoodsModImageId);
			} else {
				// Отправим запись об ошибке на сервер
				sendError('no modification by slug '+slug);
				alert('К сожалению сейчас не получается подобрать модификацию соответствующую выбранным параметрам.');
			}
			// Обновляем возможность выбора другой модификации для текущих значений свойств модификации товара.
			updateVisibility(y);
		});
	});

	/*$('.related .checkbox__input').on('change', function(){
		var $checkbox = $(this);
		var modId = $checkbox.data('mod-id');
		var checkboxActive = $checkbox.prop('checked');
		if (checkboxActive) {
			// Создаём инпут с доп товаром
			var $input = $('<input class="goodsID-' + modId + '">')
					.attr('type', 'hidden')
					.attr('name', 'form[goods_mod_id][' + modId + ']')
					.attr('data-price', $checkbox.data('mod-price'))
					.val(1);
			$('.productView__form').append($input);
			// Пересчёт цены
			changePrice($checkbox, checkboxActive);
		} else {
			// Удаляем  доп товар
			$('.productView__form').find('input[name="form[goods_mod_id][' + modId + ']"]').remove();
			// Пересчёт цены
			changePrice($checkbox, checkboxActive)
		}
	});*/

	function changePrice(currentCheckbox, checkboxActive){
		var $checkbox = currentCheckbox;
		var checkboxPrice = $checkbox.data('mod-price');
		var $priceNowBlock = $('.productView__price .price__now');
		var nowPrice = $priceNowBlock.attr('data-price');
		var newPrice = 0;
		if (checkboxActive) {
			newPrice = String(parseInt(nowPrice) + parseInt(checkboxPrice));
			$priceNowBlock.attr('data-price', parseInt(nowPrice) + parseInt(checkboxPrice))
		} else {
			newPrice = String(nowPrice - checkboxPrice);
			$priceNowBlock.attr('data-price', parseInt(nowPrice)  - parseInt(checkboxPrice))
		}
		$priceNowBlock.find('.num').text(addSpaces(newPrice))
	}
}

// Изменение кол-ва в карточке
function prodQty(){
	$('.productView__qty .quantity').change(function(){
		// Если вводят 0 то заменяем на 1
		if($(this).val() < 1){
			$(this).val(1);
		}
		// Обновление кол-ва для функций "Добавить"
		$('.goodsDataMainModificationId').val($(this).val());
		// Количество
		var val = parseInt($(this).val());
		// Цена товара без изменений
		var price = parseInt($('.productView__price .price__now').attr('content'));
		var newPrice = 0;
		// Проверяем наличие добавленных товаров вместе с основным
		if ($('.productView__form [class^="goodsID-"]').length) {
			$('.productView__form [class^="goodsID-"]').each(function(){
				// Сумма всех добавленных товаров
				newPrice += parseInt($(this).attr('data-price'))
			});
		}
		// Считаем новую сумму товара с учетом добавленных
		var multi = String(val * price + newPrice);
		// Обновляем новую сумму
		$('.productView__price .price__now').attr('data-price', multi);
		$('.productView__price .price__now').find('.num').text(addSpaces(multi));
	});
}

// Загрузка основных функций шаблона
$(document).ready(function(){
	pageGoods();
	goodsModification();
	prodQty();
});