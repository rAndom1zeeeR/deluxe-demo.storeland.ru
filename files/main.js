///////////////////////////////////////////////////////
/* Общие функции */
//////////////////////////////////////////////////////
// Возвращает правильное окончание для слова
function genWordEnd(num, e, m, mm) {
  // Если забыли указать окончания
  if(typeof (e) == "undefined") { e = ''; }
  if(typeof (m) == "undefined") { e = 'а'; }
  if(typeof (mm) == "undefined"){ e = 'oв'; }
  // Если передали пустую строку, вместо цифры
  if(0 == num.length) { num = 0; }
  // Превращаем цифру в правильный INT
  num = GetSum(num).toString();
  // Получаем последний символ цифры
  ch1 = num.substring(num.length-1);
  // Получаем последний символ цифры
  ch2 = num.length == 1 ? 0 : num.substring(num.length-2, num.length-1);
  // Если последняя цифра - 1, вернем единственное число
  if(ch2!=1 && ch1==1)               {return e;}
  // Если последняя цифра - от 2 до 4х , вернем множественное чило из массива с индексом 2
  else if(ch2!=1 && ch1>1 && ch1<=4) {return m;}
  // Если последняя цифра - от 5 до 0 , вернем множественное чило из массива с индексом 3
  else if(ch2==1 || ch1>4 || ch1==0) {return mm;}
}

// Считает сумму  33 599,65 + 2000 - 1910-41,6
function GetSum(val,precision) {
  if(typeof (precision) == "undefined" || precision < 0) { precision = 0; }
  // Возводим в степень точности 10 для округления
  var p = Math.pow(10,precision);
  try {return Math.round(parseFloat(eval(val.toString().replace(/\s/gi, "").replace(/,/gi, ".")))*p)/p;} catch (e) {return 0;}
}

// Форматирует цену
function number_format(n,e,t,r){var i=n,a=e,o=function(n,e){var t=Math.pow(10,e);return(Math.round(n*t)/t).toString()};i=isFinite(+i)?+i:0,a=isFinite(+a)?Math.abs(a):0;var u,d,f="undefined"==typeof r?",":r,h="undefined"==typeof t?".":t,l=a>0?o(i,a):o(Math.round(i),a),s=o(Math.abs(i),a);s>=1e3?(u=s.split(/\D/),d=u[0].length%3||3,u[0]=l.slice(0,d+(0>i))+u[0].slice(d).replace(/(\d{3})/g,f+"$1"),l=u.join(h)):l=l.replace(".",h);var c=l.indexOf(h);return a>=1&&-1!==c&&l.length-c-1<a?l+=new Array(a-(l.length-c-1)).join(0)+"0":a>=1&&-1===c&&(l+=h+new Array(a).join(0)+"0"),l}

// Функция определения ширины экрана пользователя
function getClientWidth() {return document.compatMode=='CSS1Compat' && !window.opera?document.documentElement.clientWidth:document.body.clientWidth;}

// Работа с cookie файлами. 
// Получение переменной из cookie
function getCookie(name) {
  var matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

// Установка переменной в cookie
function setCookie(name, value, options) {
  options = options || {};
  var expires = options.expires;
  if (typeof expires == "number" && expires) {
    var d = new Date();
    d.setTime(d.getTime() + expires*1000);
    expires = options.expires = d;
  }
  if (expires && expires.toUTCString) { 
    options.expires = expires.toUTCString();
  }
  value = encodeURIComponent(value);
  var updatedCookie = name + "=" + value;
  for(var propName in options) {
    updatedCookie += "; " + propName;
    var propValue = options[propName];
    if (propValue !== true) {
      updatedCookie += "=" + propValue;
    }
  }
  document.cookie = updatedCookie;
}

// Удаление переменной из cookie
function deleteCookie(name, options ) {
  options = options || {};
  options.expires = -1;
  setCookie(name, "", options)
}

// Отправляет ошибку на сервер, для того чтобы служба тех поддержки могла разобраться в проблеме как можно быстрее.
function sendError (desc, page, line) {
  var img=document.createElement('img');
  img.src = 'https://storeland.ru/error/js?desc='+encodeURIComponent(desc)+'&page='+encodeURIComponent(window.location)+'&line=0';
  img.style.position = 'absolute';
  img.style.top = '-9999px';
  try { document.getElementsByTagName('head').appendChild(img) } catch (e){}
  return false;
}

// Функция определения браузера
function userAgent(){
  var ua = detect.parse(navigator.userAgent);
  if (ua.browser.family === 'Safari') {
    $('body').addClass('Safari');
  }
  if (ua.browser.family === 'IE') {
    $('body').addClass('IE');
  }
  if (ua.browser.family === 'Edge') {
    $('body').addClass('Edge');
  }
  if (ua.browser.family === 'Firefox') {
    $('body').addClass('Firefox');
  }
  if (ua.browser.family === 'Opera') {
    $('body').addClass('Opera');
  }
  if (ua.browser.family === 'Chrome') {
    $('body').addClass('Chrome');
  }
  if (ua.os.family === 'iOS') {
    $('body').addClass('iOS');
  }
  if (ua.os.family === 'Android') {
    $('body').addClass('Android');
  }
}

// Наверх
function toTop() {
  $("#toTop").hide();
  $(window).scroll(function () {
    if ($(this).scrollTop() > 100) {
      $('#toTop').fadeIn();
    } else {
      $('#toTop').fadeOut();
    }
  });
  $('.toTop').click(function () {
    $('body,html').animate({
      scrollTop: 0
    }, 800);
    return false;
  });
}

// Предзагрузчик
function preload() {
  var preloader = $('.preloader');
  var spinner = preloader.find('.loading');
  spinner.fadeOut();
  preloader.delay(1000).fadeOut('slow');
}


///////////////////////////////////////////////////////
/* Валидаторы */
//////////////////////////////////////////////////////
// Валидаторы для телефона в "консультация"
function validName(){
  var name = $('#callback').find('.form__person');
  if(name.val() != ''){
    name.removeClass('error');
    name.parent().removeClass('error');
    name.attr('placeholder','Введите Имя');
    return true;
  }else{
    name.addClass('error');
    name.parent().addClass('error');
    name.attr('placeholder','Вы не ввели Имя');
    return false;
  } 
}
function validPhone(){ 
  var tel = $('#callback').find('.form__phone');
  var check = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{5,10}$/.test(tel.val());
  if(check == true && check != ''){
    tel.removeClass('error');
    tel.parent().removeClass('error');
    tel.attr('placeholder','Введите номер');
    return true;
  }
  else{
    tel.addClass('error');
    tel.parent().addClass('error');
    tel.attr('placeholder','Вы не ввели номер');
    return false;
  }
}
// Проверка телефона в обратном звонке.
function validSubmit(){
  var name = validName();
  var phone = validPhone();
  return name && phone;
}
// Проверка отправки формы
$(function(){
  $('#callback .form__callback').submit(validSubmit);
});

// Валидаторы для Имени и телефона в "Обратный звонок" модальное окно
function validNameFancy(){
  var name = $('#fancybox__callback').find('.form__person');
  if(name.val() != ''){
    name.removeClass('error');
    name.parent().removeClass('error');
    name.attr('placeholder','Введите Имя');
    return true;
  }else{
    name.addClass('error');
    name.parent().addClass('error');
    name.attr('placeholder','Вы не ввели Имя');
    return false;
  } 
}
function validPhoneFancy(){
  var tel = $('#fancybox__callback').find('.form__phone');
  var check = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{5,10}$/.test(tel.val());
  if(check == true && check != ''){
    tel.removeClass('error');
    tel.parent().removeClass('error');
    tel.attr('placeholder','Введите номер');
    return true;
  }
  else{
    tel.addClass('error');
    tel.parent().addClass('error');
    tel.attr('placeholder','Вы не ввели номер');
    return false;
  }
}
function validSubmitFancy(){
  var name = validNameFancy();
  var phone = validPhoneFancy();
  return name && phone;
}
// Проверка отправки формы
$(function(){
  $('#fancybox__callback .form__callback').submit(validSubmitFancy);
});

// Валидаторы для Имени и телефона в "Обратная связь" модальное окно
function validNameFeedback(){
  var name = $('#fancybox__feedback').find('.form__person');
  if(name.val() != ''){
    name.removeClass('error');
    name.parent().removeClass('error');
    name.attr('placeholder','Введите Имя');
    return true;
  }else{
    name.addClass('error');
    name.parent().addClass('error');
    name.attr('placeholder','Вы не ввели Имя');
    return false;
  }
}
function validPhoneFeedback(){
  var tel = $('#fancybox__feedback').find('.form__phone');
  var check = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{5,10}$/.test(tel.val());
  if(check == true && check != ''){
    tel.removeClass('error');
    tel.parent().removeClass('error');
    tel.attr('placeholder','Введите номер');
    return true;
  }
  else{
    tel.addClass('error');
    tel.parent().addClass('error');
    tel.attr('placeholder','Вы не ввели номер');
    return false;
  }
}
function validSubmitFeedback(){
  var name = validNameFeedback();
  var phone = validPhoneFeedback();
  return name && phone;
}
// Проверка отправки формы
$(function(){
  $('#fancybox__feedback .form__callback').submit(validSubmitFeedback);
});

// Валидаторы для телефона в "Подписаться" в подвале
function validPhoneSubscribe(){
  var tel = $('.subscribe').find('.form__phone');
  var check = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{5,10}$/.test(tel.val());
  if(check == true && check != ''){
    tel.removeClass('error');
    tel.parent().removeClass('error');
    tel.attr('placeholder','Введите номер');
    return true;
  }
  else{
    tel.addClass('error');
    tel.parent().addClass('error');
    tel.attr('placeholder','Вы не ввели номер');
    return false;
  }
}
// Подписаться. Валидатор почты в "Подписаться"
function validEmailSubscribe(){
  var email = $('.subscribe').find('.form__email');
  var check = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email.val());
  if(check == true && check != ''){
    email.removeClass('error');
    email.parent().removeClass('error');
    email.attr('placeholder','Введите Email');
    return true;
  }else{
    email.addClass('error');
    email.parent().addClass('error');
    email.val('');
    email.attr('placeholder','Вы ввели неверный Email');
    return false;
  }
}
function validSubmitSubscribe(){
  var email = validEmailSubscribe();
  var phone = validPhoneSubscribe();
  return email || phone;
}
// Проверка отправки формы
$(function(){
  $('.subscribe .form__callback').submit(validSubmitSubscribe);
});


///////////////////////////////////////////////////////
/* Действия */
//////////////////////////////////////////////////////
// Удаление товара из Избранного без обновлении страницы
function removeFromFavorites(e){
  event.preventDefault();
  if(confirm('Вы точно хотите удалить товар из Избранного?')){
    e.parent().parent().parent().fadeOut().remove();
    var href = e.attr('href');
    var oldCount = $('.favorites__count').attr('data-count');
    var goodsModId = e.attr('data-goods-mod-id');
    $.ajax({
      cache : false,
      url		: href,
      success: function(d){
        var newCount = oldCount - 1;
        $('.favorites__count').attr('data-count', newCount).text(newCount);
        var flag = 0;
        if(newCount != 0){
          $('.addto__favorites .addto__item').each(function(){
            if(flag == 0){
              if($(this).css('display') == 'none'){
                $(this).css('display', 'flex');
                flag++;
              }
            }
          });
        }else{
          $('.favorites').removeClass("hasItems");
          $('.favorites__count').attr('data-count', '0').text('0');
        }
        var obj = $('.add-favorites[data-mod-id="' + goodsModId + '"]');
        if(obj.length) {
          obj.attr("data-action-is-add", "1")
              .removeAttr("title")
              .removeClass("added")
              .attr("href", obj.attr("href").replace(obj.attr('data-action-delete-url'), obj.attr('data-action-add-url')));
        }
      }
    });
  }
}
// Удаление ВСЕХ товаров из Избранного без обновлении страницы
function removeFromFavoritesAll(e){
  event.preventDefault();
  if(confirm('Вы точно хотите очистить Избранное?')){
    // Предзагрузчик анимации
    $('.addto__favorites').prepend('<div class="preloader small"><div class="loading"></div></div>');
    var href = e.attr('href');
    $.ajax({
      cache  : false,
      url		 : href,
      success: function(d){
        $('.favorites').removeClass("hasItems");
        $('.favorites__count').attr('data-count', '0').text("0");
        $('.addto__favorites .addto__item').remove();
        $('.addto__favorites .preloader').hide();
        $('.add-favorites').removeAttr("title").removeClass("added");
      }
    });
  }
}

// Удаление товара из Сравнения без обновлении страницы
function removeFromCompare(e){
  event.preventDefault();
  if(confirm('Вы точно хотите удалить товар из сравнения?')){
    e.parent().parent().parent().fadeOut().remove();
    var href = e.attr('href');
    var oldCount = $('.compare__count').attr('data-count');
    var goodsModId = e.attr('data-goods-mod-id');
    $.ajax({
      cache : false,
      url		: href,
      success: function(d){
        var newCount = oldCount - 1;
        $('.compare__count').attr('data-count', newCount).text(newCount);
        var flag = 0;
        if(newCount != 0){
          $('.addto__compare .addto__item').each(function(){
            if(flag == 0){
              if($(this).css('display') == 'none'){
                $(this).css('display', 'flex');
                flag++;
              }
            }
          });
        }else{
          $('.compare').removeClass("hasItems");
          $('.compare__count').attr('data-count', '0').text('0');
        }
        var obj = $('.add-compare[data-mod-id="' + goodsModId + '"]');
        if(obj.length) {
          obj.attr("data-action-is-add", "1")
              .removeAttr("title")
              .removeClass("added")
              .attr("href", obj.attr("href").replace(obj.attr('data-action-delete-url'), obj.attr('data-action-add-url')));
        }
      }
    });
  }
}
// Удаление ВСЕХ товаров из Сравнения без обновлении страницы
function removeFromCompareAll(e){
  event.preventDefault();
  if(confirm('Вы точно хотите очистить сравнение?')){
    // Предзагрузчик анимации
    $('.addto__compare').prepend('<div class="preloader small"><div class="loading"></div></div>');
    var href = e.attr('href');
    $.ajax({
      cache  : false,
      url		 : href,
      success: function(d){
        $('.compare').removeClass("hasItems");
        $('.compare__count').attr('data-count', '0').text("0");
        $('.addto__compare .addto__item').remove();
        $('.addto__compare .preloader').hide();
        $('.add-compare').removeAttr("title").removeClass("added");
      }
    });
  }
}

// Удаление товара из корзины без обновлении страницы
function removeFromCart(e){
  event.preventDefault();
  if(confirm('Вы точно хотите удалить товар из корзины?')){
    e.parent().parent().parent().fadeOut().remove();
    var href = e.attr('href');
    var qty = e.data('qty');
    var oldCount = $('.cart__count').attr('data-count');
    $.ajax({
      cache  : false,
      url		 : href,
      success: function(d){
        var newCount = oldCount - qty;
        $('.cart__count').attr('data-count', newCount).text(newCount);
        $('.addto__cart .cartSumNow').html($(d).find('.cartSumNow').html());
        $('header .cartSumNow').html($(d).find('.cartSumNow').html());
        var flag = 0;
        if(newCount != 0){
          $('.addto__cart .addto__item').each(function(){
            if(flag == 0){
              if($(this).css('display') == 'none'){
                $(this).css('display', 'flex');
                flag++;
              }
            }
          })
        }else{
          $('.cart').removeClass("hasItems");
          $('.cart__count').attr('data-count', '0').text("0");
          $('.addto__cart .addto__item').remove();
        }
      }
    });
  }
}
// Удаление ВСЕХ товаров из Корзины без обновлении страницы
function removeFromCartAll(e){
  event.preventDefault();
  if(confirm('Вы точно хотите очистить корзину?')){
    // Предзагрузчик анимации
    $('.addto__cart').prepend('<div class="preloader small"><div class="loading"></div></div>');
    e.parent().fadeOut().remove();
    var href = e.attr('href');
    $.ajax({
      cache  : false,
      url		 : href,
      success: function(d){
        $('.totalSum').html($(d).find('.totalSum').html());
        $('.cart').removeClass("hasItems");
        $('.cart__count').attr('data-count', '0').text("0");
        $('.addto__cart .addto__item').remove();
        $('.addto__cart .preloader').hide();
      }
    });
  }
}

// Закрытие элементов
function closeMenu() {
  // Закрытие всего при нажатии на темную часть
  $('#overlay').on('click', function(e){
    event.preventDefault();
    if($(this).hasClass('opened')){
      $('div, a, form, span').removeClass('opened');
      $('.overflowMenu').removeClass('active');
      setTimeout(function () {
        $('#overlay').removeClass('transparent')
      },600)
    }
  });

  // Закрытие элементов
  $('.dropdown__close, .addto__close').on('click', function(event){
    event.preventDefault();
    $('div, a, form').removeClass('opened');
    $('.dropdown__open').removeClass('opened');
    $('.dropdown__content').removeClass('opened');
    $('#overlay').removeClass('opened');
  });
}
// Открытие Контактов, Меню, Сравнения, Избранного
function openMenu() {
  // Открытие элементов
  $('.dropdown__open').on('click', function(event){
    event.preventDefault();
    $('div').removeClass('opened');
    var value = $(this).data('open');
    if ($('.dropdown__content[data-content="'+ value +'"]').hasClass('opened')){
      $(this).removeClass('opened');
      $(this).parent().removeClass('opened');
      $('.sidebar__links').removeClass('opened');
      $('#overlay').removeClass('opened');
      $('.dropdown__content[data-content="'+ value +'"]').removeClass('opened');
    }else{
      $(this).addClass('opened');
      $(this).parent().addClass('opened');
      $('.sidebar__links').addClass('opened');
      $('#overlay').addClass('opened');
      $('.dropdown__content[data-content="'+ value +'"]').addClass('opened');
    }
  });

  // Открытие каталога с сохранением вложенности
  $('.catalog__item .open').on('click', function(event){
    event.preventDefault();
    if ($(this).closest('.parent').hasClass('opened')) {
      $(this).parent().next('.sub').slideUp(600);
      $(this).closest('.parent').removeClass('opened');
      $(this).closest('.open').removeClass('opened');
    } else {
      $(this).parent().next('.sub').slideDown(600);
      $(this).closest('.parent').addClass('opened');
      $(this).closest('.open').addClass('opened');
    }
  });

  // "Еще" в выпадающем каталоге
  function catalogItemsMore(){
    // Определяем главные категории
    var item = $('#menu .catalog__item[data-level="0"]');
    // Удаляем скрытые категории
    item.find('.hide').remove();
    // Проверяем категории
    item.each(function (event){
      var t = $(this);
      var item1 = t.find('.catalog__item[data-level="1"]');
      var href = t.find('a').attr('href');
      // Добавляем порядок главных категорий
      var count = event + 1;
      t.css('order', count)
      // Добавляем кнопку "Еще" если больше 4 подкатегорий
      if(item1.length > 4) {
        t.append('<div class="catalog__more"><a href="'+ href +'" class="catalog__link">Еще...</a></div>');
      }
      // Если в категории нет подкатегорий, переносим ее в конец
      if(item1.length == 0) {
        t.css('order', item.length + 1)
      }
    });
  }
  catalogItemsMore();

  //Кнопка выбора меню/каталога
  var  button = $('.dropdown__label [data-open]');
  //Скрываем меню
  $('[data-content="menu"]').hide();
  button.on('click', function(){
    var name = $(this).attr('data-open');
    var content = $(this).parents().find('[data-content="'+ name +'"]');
    button.removeClass('active');
    $(this).addClass('active');
    $('.dropdown__content [data-content]').hide();
    content.show();
  });

  //Открытие меню
  $('.mainnav--icon').on('click', function (event){
    event.preventDefault();
    $('#addtoCatalog').hide();
    $('#addtoMenu').show();
    button.removeClass('active');
    $('.dropdown__label [data-open="menu"]').addClass('active');
  });

  //Открытие каталога
  $('.catalog--icon').on('click', function (event){
    event.preventDefault();
    $('#addtoMenu').hide();
    $('#addtoCatalog').show();
    button.removeClass('active');
    $('.dropdown__label [data-open="catalog"]').addClass('active');
  });

  //Открытие меню в подвале
  $('.footer__open').on('click', function (){
    var p = $(this).parent().parent(); //parent
    var c = $(this).parent().next();  //content
    p.hasClass('opened') ? p.removeClass('opened') && c.slideUp() : p.addClass('opened') && c.slideDown();
  });
}

// Дополнительные пункты меню в шапке Перенос пунктов меню
function mainnavHeader(){
  var mainnav = $('#menu .mainnav');
  var overMenuExist = mainnav.find('.overflowMenu li').length;
  if(overMenuExist){
    mainnav.find('.overflowMenu li').removeClass('mainnav__replaced');
    mainnav.find('.mainnav__more').remove();
    mainnav.find('.overflowMenu li').each(function(){
      mainnav.find('.mainnav__list').append($(this));
    });
  }
  var menuWidth = mainnav.width();
  var menuCount = mainnav.find('.mainnav__list li').length + 1;
  var nextCheck = 0;
  for(var i=1; i < menuCount;  i++){
    var currentWidth = parseInt(Math.ceil(mainnav.find('.mainnav__list li:nth-child('+i+')').width())) + 16;
    nextCheck += currentWidth;
    if(nextCheck > menuWidth){
      var a = i;
      for(a;a < menuCount;a++){
        mainnav.find('.mainnav__list li:nth-child('+ a +')').addClass('mainnav__replaced');
      }
      mainnav.find('.mainnav__replaced').each(function(){
        mainnav.find('.overflowMenu').append($(this));
      });
      mainnav.find('.mainnav__list').append('<li class="mainnav__item mainnav__more"><a class="mainnav__link">Еще...</a></li>');
      mainnav.find('.mainnav__more').on('click',function(){
        mainnav.find('.overflowMenu').hasClass('opened') ? mainnav.find('.overflowMenu').removeClass('opened') : mainnav.find('.overflowMenu').addClass('opened');
        mainnav.hasClass('opened') ? mainnav.removeClass('opened') : mainnav.addClass('opened');
      });
      $(function($){
        $(document).mouseup(function (e){
          var div =  mainnav.find('.overflowMenu.opened');
          var btn =  mainnav.find('.mainnav__more');
          if (!div.is(e.target) && div.has(e.target).length === 0 && !btn.is(e.target)) {
            div.removeClass('opened');
            mainnav.removeClass('opened');
          }
        });
      });
      return false;
    }
  }
}



// Превращает поле пароля в текстовое поле и обратно
// @LinkObject - ссылка по которой кликнули
// @InputObject - объект у которого нужно изменить тип поля
function ChangePasswordFieldType (LinkObject, InputObject) {
  var
      // Ссылка по которой кликнули
      LObject = $(LinkObject),
      // Объект у которого изменяем тип с password на text
      IObject = $(InputObject),
      // Старый текст ссылки
      txtOld = LObject.text(),
      // Новый текст ссылки
      txtNew = LObject.attr('rel');
  // Если объекты не получены, завершим работу функции
  if( LObject.length==0 || IObject.length==0 ) {
    return false;
  }
  // Изменяем у ссылки текст со старого на новый
  //LObject.html(txtNew);
  // Старый текст ссылки сохраняем в атрибуте rel
  //LObject.attr('rel', txtOld);
  // Изменяем тип input поля
  if(IObject[0].type == 'text') {
    IObject[0].type = 'password';
  } else {
    IObject[0].type = 'text';
  }
}

// Показать пароль
function showPass() {
  $('.showPassBlock').on('click', function(event){
    ChangePasswordFieldType(this, $('#sites_client_pass'));
    ChangePasswordFieldType(this, $('.sites_client_pass'));
    if ($(this).hasClass('active')) {
      $(this).removeClass('active');
    } else {
      $(this).addClass('active');
    }
    return false;
  });
}


// Проверка вводимых значений в количестве товара
function keyPress(oToCheckField, oKeyEvent) {
  return oKeyEvent.charCode === 0 || /\d/.test(String.fromCharCode(oKeyEvent.charCode));
}

// Функция + - для товара
function quantity() {
  //Regulator Up копки + в карточке товара при добавлении в корзину
  $('.qty__plus').off('click').click(function(){
    var quantity = $(this).parent().find('.quantity, .cartqty');
    var currentVal = parseInt(quantity.val());
    if (!isNaN(currentVal)){
      quantity.val(currentVal + 1);
      quantity.trigger('keyup');
      quantity.trigger('change');
    }
    return false;
  });
  //Regulator Down копки - в карточке товара при добавлении в корзину
  $('.qty__minus').off('click').click(function(){
    var quantity = $(this).parent().find('.quantity, .cartqty');
    var currentVal = parseInt(quantity.val());
    if (!isNaN(currentVal)){
      quantity.val(currentVal - 1);
      quantity.trigger('keyup');
      quantity.trigger('change');
    }
    return false;
  });
}




// Загрузка основных функций шаблона
$(document).ready(function(){
  userAgent();
  openMenu();
  closeMenu();
  showPass();
  quantity();
  mainnavHeader();
  toTop();
  footerLinksMore();
  // Стили для новых селектов
  /*$('.select').styler();*/
  // Ленивая загрузка
  $(function(){
    var observer = lozad(); // lazy loads elements with default selector as '.lozad'
    observer.observe();
  });
  // Отправка формы по Ctrl+Enter
  $('form').bind('keypress', function(e){
    if((e.ctrlKey) && ((e.which==10)||(e.which==13))) {$(this).submit();}
  // Отправка данных формы по нажатию на Enter в случае если курсор находится в input полях (В некоторых браузерах при нажатии по enter срабатывает клик по первому submit полю, которое является кнопкой назад. Для этого написан этот фикс)
  }).find('input').bind('keypress', function(e){
    if(((e.which==10)||(e.which==13))) { try{$(this.form).submit();} catch(e){} return false; }
  });
  // Маска ввода телефона
  $(".form__phone").mask("+7 (999) 999-9999"); // будет грузится в нескольких местах
  // Возврашаем пользователя на страницу с которой был сделан обратный звонок
  $('.callbackredirect').val(document.location.href);
  // Отключить функцию клик
  $('.offClick').off('click');
});

// Запуск основных функций для разных разрешений экрана
$(document).ready(function(){
  if(getClientWidth() > 481 && window.outerHeight < 630){
    $('body').addClass('landscape');
  }else{
    $('body').removeClass('landscape');
  }
});
// Запуск функций при изменении экрана
$(window).resize(function(){
  if(getClientWidth() > 481 && window.outerHeight < 630){
    $('body').addClass('landscape');
  }else{
    $('body').removeClass('landscape');
  }
});


/*
//Функции для удобства
function addActive(obj){obj.addClass('active');}
function removeActive(obj){obj.removeClass('active')}
//if (addOpened(t));
function addOpened(obj){obj.hasClass('opened') ? obj.removeClass('opened') : obj.addClass('opened')}*/

function addActive(obj){obj.hasClass('active') ? obj.removeClass('active') : obj.addClass('active')}


// Загрузчик файлов
function loadFile(fileName, ext, cb){
  if(!fileName){console.error('Не передано имя загружаемого файла');return;}
  if(!ext){console.error('Не передано расширение загружаемого файла');return;}
  if(!(typeof cb === 'function')){cb = function(){}};

  var $file = $('#' + fileName + '-' + ext);
  var attrName = (ext === 'css') ? 'href' : 'src';

  if(!$file.length){console.error('Файл ' + fileName + ' не найден в разметке и не может быть загружен');return;}
  // Если файл уже загружен
  if($file.attr(attrName)){
    cb();
    //console.log(fileName + '.' + ext, 'Already loaded');
    return (true);
  }
  $file.on('load', cb)
  $file.attr(attrName, $file.data(attrName));
}

// Уведомления
function notyStart(text, type) {
  new Noty({
    text: text,
    layout: "bottomRight",
    type: type,
    theme: "",
    textAlign: "center",
    animation: {
      open: 'animated fadeInUp',
      close: 'animated fadeOutDown',
      easing: 'swing',
      speed: 400
    },
    timeout: "2000",
    progressBar: true,
    closable: true,
    closeOnSelfClick: true,
    modal: false,
    dismissQueue: false,
    onClose: true,
    killer: false
  }).show();
}

// Закрытие в модальных окнах
function fancyClose(){
  var btnClose = $('.fancybox-slide--html .fancybox-close-small');
  var modalClose = $('.modal__close');
  btnClose.hide();
  modalClose.on('click', function (event){
    event.preventDefault();
    $.fancybox.close();
  });
}
fancyClose();



///////////////////////////////////////
// Функция скрывания категорий и меню в подвале, если больше 5 пунктов.
///////////////////////////////////////
function footerLinksMore(){
	$('.footer__links').each(function(){
		var t = $(this);
		// Добавляем кнопку Еще если больше 11 пунктов
		if(t.find('li').length > 11) {
			t.append('<li class="show"><a class="footer__links-open" href="javascript:;"><span>Посмотреть все</span></a></li>');
		}
		// Действия при нажатии на кнопку Еще
		t.find('.footer__links-open').on('click', function(){
			if($(this).hasClass('opened')){
				$(this).removeClass('opened')
				t.find('li').removeClass('show')
				$(this).parent().addClass('show')
				$(this).find('span').text('Посмотреть все')
			}else{
				$(this).addClass('opened')
				t.find('li').addClass('show')
				$(this).find('span').text('Скрыть')
			}
		});
	});	
}


///////////////////////////////////////
// Корзина
///////////////////////////////////////
function cartQuantity(){
	$('.cartqty').change($.debounce(300, function(){
		var quantity = $(this);
		var qVal = $(this).val();
		if(qVal >= '1'){
			var id = $(this).closest('.cart__item').data('id');
			var qty = $(this).val();
			var data = $('.cartForm').serializeArray();
			data.push({name: 'only_body', value: 1});
			$.ajax({
				data: data,
				cache:false,
				success:function(d){
					quantity.val($(d).find('.cart__item[data-id="' + id + '"] .cartqty').val());
					item = $('.cart__item[data-id="' + id + '"]');
					item.find('.cartPriceTotal span').html($(d).find('.cart__item[data-id="' + id + '"] .cartPriceTotal span').html());
					$('.cart__total').html($(d).find('.cart__total').html());
					c = $(d).find('.cart__item[data-id="' + id + '"] .cartqty').val();
					// Вызов функции быстрого заказа в корзине
					$('#startOrder').on('click', function() {
						startOrder();
						return false;
					});
					if(qty > c){
						$('.cart__error').remove();
						$('.cartTable').before('<div class="cart__error warning">Вы пытаетесь положить в корзину товара больше, чем есть в наличии</div>');
						$('.cart__error').fadeIn(500).delay(2500).fadeOut(500, function(){$('.cartErr').remove();});
						$('.cartqty').removeAttr('readonly');
					}
				}
			});
		}else{
			$(this).val('1');
			$(this).trigger('change');
		}
	}));
	quantity();
}

// Удаление товара из корзины
function cartDelete(s){
	var yep = confirm('Вы точно хотите удалить товар из корзины?');
	if(yep == true){
		s.closest('.cart__item').fadeOut();
		url = s.data('href');
		$.ajax({
			url:url,
			cache:false,
			success:function(d){
				$('.cartTable').html($(d).find('.cartTable').html());
				cartQuantity();
				$('#startOrder').on('click', function() {
					startOrder();
					return false;
				});
			}
		});
	}else{
		return false;
	}
}

// Функция быстрого оформления заказа в корзине
function startOrder(){
	var globalOrder = $('#globalOrder');
	var cartTable = $('.cartTable');
	var closeOrder = $('#closeOrder');
	var startOrder = $('#startOrder');
	//объект блока куда будет выводиться форма быстрого заказа
	var OrderAjaxBlock = $('#OrderAjaxBlock');
	var urlQuickForm = '/cart/add'; // адрес страницы с формой
	// данные которые отарвятся на сервер чтобы получить только форму быстрого заказа без нижней части и верхней части сайта
	var quickFormData = [
		{name: 'ajax_q', value: 1},
		{name: 'fast_order', value: 1}
	];
	cartTable.addClass('disable');
	globalOrder.show('slow');
	closeOrder.show();
	startOrder.hide();
	$.ajax({
		type: "POST",
		cache: false,
		url: urlQuickForm,
		data: quickFormData,
		success: function(data) {
			OrderAjaxBlock.html($(data).find('.fastOrderContent').wrap('<div></div>').html());
			OrderAjaxBlock.show('slow');
			$('html, body').delay(400).animate({scrollTop : jQuery('#globalOrder').offset().top}, 800);
			showPass();
			orderScripts();
			orderScriptsSelect();
			coupons();
			orderValid();
			// Стили для новых селектов
			$(".form__phone").mask("+7 (999) 999-9999");
			$("#sites_client_phone").mask("+7 (999) 999-9999");
			$('#closeOrder').on('click', function() {
				cartTable.removeClass('disable');
				globalOrder.hide();
				closeOrder.hide();
				startOrder.show();
				$('html, body').delay(400).animate({scrollTop : jQuery('#globalOrder').offset().top}, 800);
				return false;
			});
		}
	});
	return false;
}


// Быстрый заказ
function quickOrder(formSelector) {
	// Находим форму, которую отправляем на сервер, для добавления товара в корзину
	var formBlock = $($(formSelector).get(0));
	// Проверка на существование формы отправки запроса на добавление товара в корзину
	if(1 > formBlock.length || formBlock.get(0).tagName != 'FORM') {
		alert('Не удалось найти форму добавления товара в корзину');
		return false;
	}
	// Получаем данные формы, которые будем отправлять на сервер
	var formData = formBlock.serializeArray();
	// Сообщаем серверу, что мы пришли через ajax запрос
	formData.push({name: 'ajax_q', value: 1});
	// Так же сообщим ему, что нужно сразу отобразить форму быстрого заказа
	formData.push({name: 'fast_order', value: 1});
	// Аяксом добавляем товар в корзину и вызываем форму быстрого заказа товара
	$.ajax({
		type    : "POST",
		cache	  : false,
		url		  : formBlock.attr('action'),
		data		: formData,
		success: function(data) {
			$.fancybox.open(data, {
				keyboard: false,
				baseClass: "fastOrder",
				afterShow: function(){
					showPass();
					orderScripts();
					orderScriptsSelect();
					orderValid();
					coupons();
					preload();
					$('.fastOrder__form').validate({
						errorPlacement: function(error, element) { }
					});
				}
			})

		}
	});
	return false;
}

// Регистрация и выбор доставки
function orderScripts() {
	// маска телефона
	$("#sites_client_phone").mask("+7 (999) 999-9999");
	// Выбор даты доставки. Документация к плагину //t1m0n.name/air-datepicker/docs/index-ru.html
	$("#deliveryConvenientDate").datepicker({
		// Если true, то при активации даты, календарь закроется.
		autoClose: true,
		// Можно выбрать только даты, идущие за сегодняшним днем, включая сегодня
		minDate: new Date()
	});
	// При оформлении заказа дадим возможность зарегистрироваться пользователю
	$('#form__wantRegister').click(function(){
		if($(this).prop("checked")) {
			$('.form__WantRegisterPass').show();
			$('#sites_client_email').addClass('required');
			$('#sites_client_email').attr("required", true);
			$(this).parent().addClass('active');
			$(this).attr("checked", true);
			$('.form__fields.email label').addClass('required');
		} else {
			$('.form__WantRegisterPass').hide();
			$('#sites_client_email').removeClass('required');
			$('#sites_client_email').attr("required", false);
			$(this).parent().removeClass('active');
			$(this).attr("checked", false);
			$('.form__fields.email label').removeClass('required');
		}
	});
	// Отображение вариантов оплаты
	var ID = $('input[name="form[delivery][id]"]:checked').val();
	$('.order__payment').hide();
	$('.order__payment[rel="' + ID + '"]').show();
	$('.order__payment[rel="' + ID + '"]').find('input:first').click();
	// Действия при выборе варианта доставки на этапе оформления заказа
	$('.delivery__radio').on('click', function(d){
		// Отображение вариантов оплаты при выборе доставки
		var ID = $('input[name="form[delivery][id]"]:checked').val();
		$('.order__payment').hide();
		$('.order__payment[rel="' + ID + '"]').show();
		$('.order__payment[rel="' + ID + '"]').find('input:first').click();
		$('.delivery__radio').each(function(){
			$(this).prop('checked',false);
			$(this).parent().removeClass('active');
		});
		$('.zone__radio').each(function(){
			$(this).prop('checked',false);
			$(this).parent().parent().removeClass('active');
		});
		var val = $(this).val();
		var fz = $($('.zone__radio[deliveryid='+val+']')[0]);
		$(this).prop('checked',true);
		fz.prop('checked',true);
		$(this).parent().addClass('active');
		var price = $(this).attr('price');
		var priceBlock = $('.delivery__option[rel='+ val +']').find('.delivery__price').find('.num');
		// Обновление цены при наличии зоны
		var cartSumTotal = $('.cartSumTotal').data('value');
		var zonePrice =  $('.zone__radio:checked').attr('price');
		if(zonePrice > 0){
			priceBlock.text(zonePrice);
			$('.cartSumDelivery .num').text(zonePrice);
		}else{
			priceBlock.text(price);
			$('.cartSumDelivery .num').text(price);
		}
		// Обновление цены с учетом доставки
		var cartSumTotalHide = $('.cartSumDiscount:eq(0) .num').text().toString().replace(/\s/g, '');
		var newSum = parseInt(cartSumTotalHide) + parseInt(priceBlock.text());
		$('.cartSumTotal .num').text(newSum);
		// Скрытие необязательных полей при выборе самовывоза
		if($(this).data('name') == 'Самовывоз'){
			$('.fastOrder__form').addClass('pickup');
			$('.address input, .address textarea').val('Самовывоз');
			$('#deliveryConvenientDate').val('01.01.2220');
			$(".total__buttons button").removeClass('disabled');
			$(".total__buttons button").attr('data-tooltip', 'Оформить заказ');
		}else{
			$('.fastOrder__form').removeClass('pickup');
			$('.address input, .address textarea').val('');
			$('#deliveryConvenientDate').val('');
		}
	});
	// Действия при выборе зоны внутри варианта доставки на этапе оформления заказа
	$('.zone__radio').on('click', function(){
		var val = $(this).attr('deliveryid');
		var price = $(this).attr('price');
		var priceBlock = $('.delivery__option[rel='+ val +']').find('.delivery__price').find('.num');
		// Выбор варианта оплаты при выборе зоны доставки
		var ID = $('input[name="form[delivery][id]"]:checked').val();
		$('.order__payment').hide();
		$('.order__payment[rel="' + ID + '"]').show();
		$('.order__payment[rel="' + ID + '"]').find('input:first').click();
		//
		$('.delivery__radio').each(function(){
			$(this).prop('checked',false);
			if($(this).val() == val){
				$(this).prop('checked',true);
				$(this).parent().addClass('active');
			}else{
				$(this).prop('checked',false);
				$(this).parent().removeClass('active');
			}
		});
		// Обновление цены
		priceBlock.text(price);
		// Обновление цены с учетом доставки
		var cartSumTotalHide = $('.cartSumTotalHide:eq(0) .num').text().toString().replace(/\s/g, '');
		var newSum = parseInt(cartSumTotalHide) + parseInt(priceBlock.text());
		$('.cartSumTotal .num').text(newSum);
		$('.cartSumDelivery .num').text(price);
	});
}

// Выбор доставки и оплаты
function orderScriptsSelect() {
	// Выбор доставки
	$('.delivery__select select').change(function(){
		var selectedDelId = $(this).find('option:selected').attr('delid');
		$('.delivery__zoneSelect').hide();
		$('.delivery__zoneSelect[del="'+selectedDelId+'"]').show();
		$('.delivery__zoneSelect option').attr('selected',false)
		$('.delivery__zoneSelect[del="'+selectedDelId+'"] option:first-of-type').attr('selected',true);
		$('.delivery__option .delivery__radio[value="'+selectedDelId+'"]').click();
		var WithoutZone = $('div[rel='+ selectedDelId +'] .delivery__radio:checked').attr('pricewithoutzones');
		var WithZone = $('div[rel='+ selectedDelId +'] .zone__radio:checked').attr('price');
		if(WithZone >= 0){
			startprice = WithZone;
		}else{
			startprice = WithoutZone;
		}
		$('.changeprice').text(startprice);
		$('.cartSumDelivery .num').text(startprice);
		$('.order__payment').hide();
		$('.order__payment[rel="'+ selectedDelId +'"]').show();
		var startInputId = $('.delivery__radio:checked').attr('value');
		$('.hiddenRadio .order__payment input').attr('checked',false);
		$('.hiddenRadio .order__payment[rel="'+startInputId+'"] input').each(function(){
			$(this).click();
			return false;
		});
		$('.order__paymentSelect option:first-child').prop('selected', true);
		// Вывод описания доставки
		var DeliveryDescription = $('.delivery__radio:checked').parent().find('.delivery__desc').html()
		$('.delivery__description').html(DeliveryDescription);
		if (DeliveryDescription == undefined ) {
			$('.delivery__description').css("display", "none");
		}else{
			$('.delivery__description').css("display", "block");
		}
		// Вывод описания оплаты
		var PaymentDescription = $('.hiddenRadio .paymentRadio:checked').parent().find('.delivery__desc').html()
		$('.payment__description').html(PaymentDescription);
		if (PaymentDescription == undefined ) {
			$('.payment__description').css("display", "none");
		}else{
			$('.payment__description').css("display", "block");
		}
	});

	// Обновление цены и описания при выборе доставки
	$('.delivery__select select').each(function(){
		var selectedDelId = $(this).find('option:selected').attr('delid');
		$('.delivery__zoneSelect').hide();
		$('.delivery__zoneSelect[del="'+selectedDelId+'"]').show();
		$('.delivery__zoneSelect option').attr('selected',false)
		$('.delivery__zoneSelect[del="'+selectedDelId+'"] option:first-of-type').attr('selected',true);
		$('.delivery__option .delivery__radio[value="'+selectedDelId+'"]').click();
		var WithoutZone = $('div[rel='+ selectedDelId +'] .delivery__radio:checked').attr('pricewithoutzones');
		var WithZone = $('div[rel='+ selectedDelId +'] .zone__radio:checked').attr('price');
		if(WithZone >= 0){
			startprice = WithZone;
		}else{
			startprice = WithoutZone;
		}
		$('.changeprice').text(startprice);
		$('.cartSumDelivery .num').text(startprice);
		$('.order__payment').hide();
		$('.order__payment[rel="'+ selectedDelId +'"]').show();
		var startInputId = $('.delivery__radio:checked').attr('value');
		$('.hiddenRadio .order__payment input').attr('checked',false);
		$('.hiddenRadio .order__payment[rel="'+startInputId+'"] input').each(function(){
			$(this).click();
			return false;
		});
		$('.order__paymentSelect option:first-child').prop('selected', true);
		// Вывод описания доставки
		var DeliveryDescription = $('.delivery__radio:checked').parent().find('.delivery__desc').html();
		$('.delivery__description').html(DeliveryDescription);
		if (DeliveryDescription == undefined ) {
			$('.delivery__description').css("display", "none");
		}else{
			$('.delivery__description').css("display", "block");
		}
		// Вывод описания оплаты
		var PaymentDescription = $('.hiddenRadio .paymentRadio:checked').parent().find('.payment__desc').html();
		$('.payment__description').html(PaymentDescription);
		if (PaymentDescription == undefined ) {
			$('.payment__description').css("display", "none");
		}else{
			$('.payment__description').css("display", "block");
		}
	});

	// Выбор зоны доставки
	$('.delivery__zoneSelect select').each(function(){
		var optValue = $(this).find('option:selected').attr('value');
		$('.delivery__zones input[value="'+optValue+'"]').click();
		var WithZone = $('.zone__radio:checked').attr('price');
		$('.changeprice').text(WithZone);
		$('.cartSumDelivery .num').text(startprice);
	});

	// Выбор зоны доставки
	$('.delivery__zoneSelect select').change(function(){
		var optValue = $(this).find('option:selected').attr('value');
		$('.delivery__zones input[value="'+optValue+'"]').click();
		var WithZone = $('.zone__radio:checked').attr('price');
		$('.changeprice').text(WithZone);
		$('.cartSumDelivery .num').text(startprice);
	});

	// Выбор оплаты
	$('.paymentSelect').change(function(){
		var selectedDelId = $(this).find('option:selected').attr('value');
		$('.hiddenRadio .paymentRadio[value="'+selectedDelId+'"]').click();
		var PaymentDescription = $('.hiddenRadio .paymentRadio:checked').parent().find('.payment__desc').html();
		$('.payment__description').html(PaymentDescription);
		if (PaymentDescription == undefined ) {
			$('.payment__description').css("display", "none");
		}else{
			$('.payment__description').css("display", "block");
		}
	});

	// Выбор оплаты
	$('.payment__option input').on('click', function (){
		var t = $(this).parent()
		$('.payment__option').removeClass('active')
		t.addClass('active')
	});
	// Проверяем выбранную оплату
	$('.payment__option input').each(function (){
		var t = $(this).parent()
		if($(this).attr('checked')){
			t.addClass('active')
		}
	});
}

// Проверка вводимых данных
function orderValid() {
	// Валидация формы на странице оформления заказа
	$(".total__buttons button, #makeOrder").on('click', function(){
		var form = $(".fastOrder__form");
		form.validate({
			errorPlacement: function(error, element) { }
		});
		form.submit();
		return false;
	});
	// Выключение кнопки оформления заказа если не все поля заполнены
	$(".fastOrder__form [required]").blur(function(){
		if($('.fastOrder__form').valid()) {
			$(".total__buttons button").removeClass('disabled');
			$(".total__buttons button").attr('data-tooltip', 'Оформить заказ');
			$("#makeOrder").removeClass('disabled');
			$("#makeOrder").attr('data-tooltip', 'Оформить заказ');
		} else {
			$(".total__buttons button").addClass('disabled');
			$(".total__buttons button").attr('data-tooltip', 'Заполните все поля');
			$("#makeOrder").addClass('disabled');
			$("#makeOrder").attr('data-tooltip', 'Заполните все поля');
		}
	});
	// Выключение кнопки оформления заказа если не все поля заполнены
	$(function(){
		if($('.fastOrder__form').valid()) {
			$(".total__buttons button").removeClass('disabled');
			$(".total__buttons button").attr('data-tooltip', 'Оформить заказ');
			$("#makeOrder").removeClass('disabled');
			$("#makeOrder").attr('data-tooltip', 'Оформить заказ');
		}else{
			$(".fastOrder__form input, .fastOrder__form textarea, .fastOrder__form select").removeClass('error');
		}
	});
}

// Отправка купона при оформлении заказа
function coupons() {
	var submitBtn = $('.coupon__button');
	var couponInput = $('#coupon__code');
	var resetBtn = $('.coupon__reset');
	submitBtn.on('click', function(){
		var url = '/order/stage/confirm';
		var val = couponInput.val();
		// Получаем данные формы, которые будем отправлять на сервер
		var formData = $('#myform').serializeArray();
		formData.push({name: 'ajax_q', value: 1});
		formData.push({name: 'only_body', value: 1});
		formData.push({name: 'form[coupon_code]', value: val});
		$.ajax({
			type: "POST",
			cache: false,
			url: url,
			data: formData,
			success: function(data) {
				var oldQuickPrice = $('.cartSumTotal:eq(0) .num').text().toString().replace(/\s/g, '')
				var discountBlock = $(data).closest('#myform').find('.discount');
				var discountName = discountBlock.find('.name').text();
				var discountPercent = discountBlock.find('.percent').text();
				var totalBlock = $(data).closest('#myform').find('.total');
				// Записываем название и размер скидки по купону
				$('.total__coupons .total__label span').html(discountName);
				$('.total__coupons .cartSumCoupons').html(discountPercent);
				$('.total__discount').hide();
				$('.total__coupons').show();
				// Получаем новую итоговую стоимость заказа
				var totalSum = totalBlock.find('.total-sum').data('total-sum');
				var deliveryPrice = parseInt($('.cartSumDelivery .num').text());
				var newTotalSum = totalSum + deliveryPrice;
				if (totalSum > oldQuickPrice) {
					couponInput.parent().addClass('error');
					couponInput.parent().removeClass('active');
					couponInput.val("").attr("placeholder", "Купон неверен");
					$('.total__coupons').hide();
					$('.total__discount').show();
				} else {
					couponInput.parent().removeClass('error');
					couponInput.parent().addClass('active');
					$('.total__coupons').show();
					// Обновляем значение итоговой стоимости
					$('.cartSumTotal .num').text(newTotalSum);
					$('.cartSumTotal').attr('data-value', newTotalSum);
					$('.cartSumCoupons').attr('data-value', newTotalSum);
					$('.cartSumTotalHide').attr('data-value', newTotalSum);
					$('.cartSumTotalHide .num').text(newTotalSum);
					$('.cartSumDiscount .num').text(totalSum);
				}
			},
			error: function(data){
				console.log("Возникла ошибка: Невозможно отправить форму купона.");
			}
		});
	});
	// Сброс
	resetBtn.on('click', function(){
		$('#coupon__code').val('').trigger('input');
		setTimeout(function(){
			$('.total__coupons').hide();
			$('.total__discount').show();
			var cartSum = $('.cartSumDiscount .num').data('value');
			$('.cartSumTotal .num').text(cartSum);
			$('.cartSumTotal').attr('data-value', cartSum);
			$('.cartSumCoupons').attr('data-value', cartSum);
			$('.cartSumTotalHide').attr('data-value', cartSum);
			$('.cartSumTotalHide .num').text(cartSum);
			couponInput.parent().removeClass('error');
			couponInput.parent().removeClass('active');
			couponInput.val("").attr("placeholder", "Введите купон");
		}, 500);
	});
	// Отображение кнопки Сброс
	couponInput.on('input',function(){
		if($(this).val()) {
			$(this).parent().find('.coupon__reset').addClass('active')
		} else {
			$(this).parent().find('.coupon__reset').removeClass('active')
		}
	});
}


// Товары. Категории
function catalog() {
	// Фильтры по товарам. При нажании на какую либо характеристику или свойство товара происходит фильтрация товаров
	$('.filter__item input').click(function(){
		$(this)[0].form.submit();
	});

	$('.filtersActive input').click(function(){
		$(this)[0].form.submit();
	});

	// Боковое меню сохранение открытой вложенности
	$('.collapsible:not(".active")').find('.collapsible__content').css('display', 'none');
	$('.collapsible__click').click(function(event){
		event.preventDefault();
		if ($(this).closest('.collapsible').hasClass('active')) {
			$(this).parent().find('.collapsible__content').slideUp(600);
			$(this).closest('.collapsible').removeClass('active');
		} else {
			$('.collapsible__content').slideUp(600);
			$('.collapsible').removeClass('active');
			$(this).parent().find('.collapsible__content').slideDown(600);
			$(this).closest('.collapsible').addClass('active');
		}
	});

	// Фильтры открыть
	$('.filters__open').on('click', function(event){
		event.preventDefault();
		if ($(this).parent().parent().hasClass('opened')) {
			$(this).removeClass('opened');
			$(this).parent().parent().removeClass('opened');
			$('#filters').removeClass('opened');
			$('#overlay').removeClass('opened');
		} else {
			$(this).addClass('opened');
			$(this).parent().parent().addClass('opened');
			$('#filters').addClass('opened');
			$('#overlay').addClass('opened');
		}
	});
}

// Фильтр по ценам
function priceFilter() {
	var
			priceFilterMinAvailable = parseInt($('.goodsFilterPriceRangePointers .min').text()),  // Минимальное значение цены для фильтра
			priceFilterMaxAvailable = parseInt($('.goodsFilterPriceRangePointers .max').text()),  // Максимальное значение цены для фильтра
			priceSliderBlock = $('#goods-filter-price-slider'), // Максимальное значение цены для фильтра
			priceInputMin = $("#goods-filter-min-price"), // Поле ввода текущего значения цены "От"
			priceInputMax = $("#goods-filter-max-price"), // Поле ввода текущего значения цены "До"
			priceSubmitButtonBlock = $(".goodsFilterPriceSubmit");  // Блок с кнопкой, которую есть смысл нажимать только тогда, когда изменялся диапазон цен.

	// Изменяет размер ячеек с ценой, т.к. у них нет рамок, есть смысл менять размеры полей ввода, чтобы они выглядили как текст
	function priceInputsChangeWidthByChars() {
		// Если есть блок указания минимальной цены
		if(priceInputMin.length) {
			priceInputMin.css('width', (priceInputMin.val().length*8 + 30) + 'px');
			priceInputMax.css('width', (priceInputMax.val().length*8 + 50) + 'px');
		}
	}

	// Слайдер, который используется для удобства выбора цены
	priceSliderBlock.slider({
		range: true,
		min: priceFilterMinAvailable,
		max: priceFilterMaxAvailable,
		values: [
			parseInt($('#goods-filter-min-price').val())
			,parseInt($('#goods-filter-max-price').val())
		],
		slide: function( event, ui ) {
			priceInputMin.val( ui.values[ 0 ] );
			priceInputMax.val( ui.values[ 1 ] );
			priceSubmitButtonBlock.css('display', 'flex');
			priceInputsChangeWidthByChars();
		}
	});
	// При изменении минимального значения цены
	priceInputMin.keyup(function(){
		var newVal = parseInt($(this).val());
		if(newVal < priceFilterMinAvailable) {
			newVal = priceFilterMinAvailable;
		}
		priceSliderBlock.slider("values", 0, newVal);
		priceSubmitButtonBlock.css('display', 'flex');
		priceInputsChangeWidthByChars();
	});
	// При изменении максимального значения цены
	priceInputMax.keyup(function(){
		var newVal = parseInt($(this).val());
		if(newVal > priceFilterMaxAvailable) {
			newVal = priceFilterMaxAvailable;
		}
		priceSliderBlock.slider("values", 1, newVal);
		priceSubmitButtonBlock.css('display', 'flex');
		priceInputsChangeWidthByChars();
	});
	// Обновить размеры полей ввода диапазона цен
	priceInputsChangeWidthByChars();

	// Активный фильтр цены
	if (priceInputMin.val() > priceFilterMinAvailable || priceInputMax.val() < priceFilterMaxAvailable) {
		$('.filters-price').addClass('hasFilters');
		$('.toolbar').addClass('hasFilters');
	}else{
		$('.filters-price').removeClass('hasFilters');
		$('.toolbar').removeClass('hasFilters');
	}

}

// Функция слайдера для "Вы смотрели" на главной странице
function viewed() {
	/*var viewedContent = $('.viewed');
	var viewedCount = viewedContent.find('.viewed__item').length;
	if(viewedCount>3){ viewedContent.find('.viewed__buttons').show(); }
	$('.viewed__buttons .showAll').on('click',function(){
		if($(this).hasClass('active')){
			$(this).removeClass('active').find('span').text("Показать все");
			viewedContent.find('.viewed__item').removeClass('show');
		}else{
			$(this).addClass('active').find('span').text("Скрыть все");
			viewedContent.find('.viewed__item').addClass('show');
		}
	});*/

	$('.viewed .owl-carousel').owlCarousel({
		items: 1,
		margin: 0,
		loop: false,
		rewind: true,
		lazyLoad: true,
		nav: true,
		navContainer: '.viewed .owl-nav',
		navText: [ , ],
		dots: true,
		dotsContainer: '.viewed .owl-dots',
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
}


// Сравнение товаров
function compare() {
	var owlCompare = $('.CompareGoodsTableTbody .owl-carousel');
	owlCompare.owlCarousel({
		items: 4,
		margin: 15,
		loop: false,
		rewind: false,
		lazyLoad: true,
		dots: false,
		nav: false,
		navContainer: '',
		navText: [ , ],
		autoHeight: true,
		autoHeightClass: 'owl-height',
		autoplay: false,
		autoplayHoverPause: false,
		smartSpeed: 500,
		mouseDrag: false,
		touchDrag: false,
		pullDrag: false,
		responsiveClass: true,
		responsiveRefreshRate: 100,
		responsive: {
			0:{items:2},
			320:{items:2},
			481:{items:2},
			641:{items:3},
			768:{items:3},
			992:{items:4},
			1200:{items:4}
		},
		onInitialized: carouselInitialized,
		onChanged: carouselInitialized
	});
	function carouselInitialized(event){
		if (event.item.count > event.page.size) {
			$('.CompareGoods__nav .owl-nav').css('display', 'block');
		}else{
			$('.CompareGoods__nav .owl-nav').css('display', 'none');
		}
	}
	$('.CompareGoods__nav .owl-nav .owl-prev').click(function(event) {
		$('.CompareGoodsTableTbody .owl-carousel').trigger('prev.owl.carousel');
	});
	$('.CompareGoods__nav .owl-nav .owl-next').click(function(event) {
		$('.CompareGoodsTableTbody .owl-carousel').trigger('next.owl.carousel');
	});
	// Сравнение товаров. Фильтр в верхней навигации. Отображение всех и различающихся характеристик товара
	$('.CompareGoods__switch').click(function(){
		$(this).toggleClass('switch-on');
		if ($(this).hasClass('switch-on')) {
			$(this).trigger('on.switch');
			$('.CompareGoodsTableTbodyComparisonLine:not(.same)').show();
			$('.CompareGoodsTableTbodyComparisonLine.same').hide();
		} else {
			$(this).trigger('off.switch');
			$('.CompareGoodsTableTbodyComparisonLine:hidden').show();
		}
	});
}


// Валидаторы для телефона на странице обратного звонка page-callback.js
function validNamePC(){
	var name = $('.page-сallback').find('.form__person');
	if(name.val() != ''){
		name.removeClass('error');
		name.parent().removeClass('error');
		name.attr('placeholder','Введите Имя');
		return true;
	}else{
		name.addClass('error');
		name.parent().addClass('error');
		name.attr('placeholder','Вы не ввели Имя');
		return false;
	}
}
function validPhonePC(){
	var tel = $('.page-сallback').find('.form__phone');
	var check = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{5,10}$/.test(tel.val());
	if(check == true && check != ''){
		tel.removeClass('error');
		tel.parent().removeClass('error');
		tel.attr('placeholder','Введите номер');
		return true;
	}
	else{
		tel.addClass('error');
		tel.parent().addClass('error');
		tel.attr('placeholder','Вы не ввели номер');
		return false;
	}
}
// Проверка телефона в обратном звонке.
function validSubmitPC(){
	var name = validNamePC();
	var phone = validPhonePC();
	return name && phone;
}
// Проверка отправки формы
$(function(){
	$('.page-сallback .form__callback').submit(validSubmitPC);
});


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


// Функция выбора модификаций
function quickViewMod() {
	// Получение центральной разметки страницы (для быстрого просмотра)
	$(document).ready(function(){
		$.fn.getColumnContent = function() {
			var block = ($(this).length && $(this).hasClass('productViewBlock') ? $(this).filter('.productViewBlock') : $('.productViewBlock:eq(0)'));
			block.each(function(){
				// Удаляем все блоки, которые не отображаются в быстром просмотре.
				$(this).children().not('.productView').remove();
			});
			return block;
		}
		// Быстрый просмотр товара
		// При наведении на блок товара загружаем контент этого товара, который будет использоваться для быстрого просмотра, чтобы загрузка происходила быстрее.
		$('.product__item.hasMod').mouseover(function() {
			// Если в блоке нет ссылки на быстрый просмотр, то не подгружаем никаких данных
			var link = $(this).find('a.add-mod');
			if(link.length < 1) {
				return true;
			}
			// Если массив с подгруженными заранее карточками товара для быстрого просмотра ещё не создан - создадим его.
			if(typeof(document.quickviewPreload) == 'undefined') {
				document.quickviewPreload = [];
			}
			var href = link.attr('href');
			href += (false !== href.indexOf('?') ? '&' : '?') + 'only_body=1';
			// Если контент по данной ссылке ещё не загружен
			if(typeof(document.quickviewPreload[href]) == 'undefined') {
				// Ставим отметку о том, что мы начали загрузку страницы товара
				document.quickviewPreload[href] = 1;
				// Делаем запрос на загрузку страницы товара
				$.get(href, function(content) {
					// Сохраняем контент, необходимый для быстрого просмотра в специально созданный для этого массив
					document.quickviewPreload[href] = $(content).getColumnContent();
					//console.log('loaded')
				})
				// Если загрузить страницу не удалось, удаляем отметку о том, что мы подгрузили эту страницу
				.fail(function() {
					delete document.quickviewPreload[href];
				});
			}
		});
		// Действие при нажатии на кнопку быстрого просмотра.
		$(document).on('click', 'a.add-mod', function() {
			var href = $(this).attr('href');
			href += (false !== href.indexOf('?') ? '&' : '?') + 'only_body=1';
			quickViewShowMod(href);
			$(function(){
				var observer = lozad(); // lazy loads elements with default selector as '.lozad'
				observer.observe();
			});
			preload();
			$('.fancybox-content .productView').removeClass('productViewQuick');
			$('.fancybox-content .productView').addClass('productViewMod');
			return false;
		});
	});
}
// Быстрый просмотр модификаций
function quickViewShowMod(href, atempt) {
	// Если данные по быстрому просмотру уже подгружены
	if(typeof(document.quickviewPreload[href]) != 'undefined') {
		// Если мы в режиме загрузки страницы и ждём результата от другой функции, то тоже подождём, когда тот контент загрузится и будет доступен в этом массиве.
		if(1 == document.quickviewPreload[href]) {
			// Если попытки ещё не указывались, ставим 0 - первая попытка
			if(typeof(atempt) == 'undefined') {
				atempt = 0;
				// Иначе прибавляем счётчик попыток
			} else {
				atempt += 1;
				// Если больше 500 попыток, то уже прошло 25 секунд и похоже, что быстрый просмотр не подгрузится, отменяем информацию о том, что контент загружен
				if(atempt > 500) {
					delete document.quickviewPreload[href];
					// TODO сделать вывод красивой таблички
					alert('Не удалось загрузить страницу товара. Пожалуйста, повторите попытку позже.');
					return true;
				}
			}
			// Запустим функцию быстрого просмотра через 5 сотых секунды, вероятно запрошендная страница товара уже подгрузится.
			setTimeout('quickViewShowMod("' + href + '", '+ atempt +')', 50);
			return true;
		} else {
			$.fancybox.close();
			$.fancybox.open(document.quickviewPreload[href]);
			addCart();
			addTo();
			goodsModification();
			newModification();
			quantity();
			$('.fancybox-content .productView').removeClass('productViewQuick');
			$('.fancybox-content .productView').addClass('productViewMod');
		}
	} else {
		$.get(href, function(content) {
			$.fancybox.close();
			$.fancybox.open($(content).getColumnContent());
			addCart();
			addTo();
			goodsModification();
			newModification();
			quantity();
			$('.fancybox-content .productView').removeClass('productViewQuick');
			$('.fancybox-content .productView').addClass('productViewMod');
		});
	}
}

// Разница в цене в процентах %
function priceDiff() {
	var old = parseFloat($('.productView .price__old .num').text().replace(' ',''));
	var now = parseFloat($('.productView .price__now .num').text().replace(' ',''));
	var diff = 0;
	if(old > now){
		diff = (((old - now)/old)*100).toFixed();
		$('.productView .ico__sales').text('-' + diff + '%');
	}else{
		$('.productView .ico__sales').hide();
	}
	$('.product__item').each(function(){
		var old = parseFloat($(this).find('.price__old .num').text().replace(' ',''));
		var now = parseFloat($(this).find('.price__now .num').text().replace(' ',''));
		var diff = 0;
		if(old > now){
			diff = (((old - now)/old)*100).toFixed();
			$(this).find('.ico__sales').text('-' + diff + '%');
		}else{
			$(this).find('.ico__sales').hide();
		}
	});
}

// Много и Мало вместо точного количества
function goodsModRest() {
	$('.goodsModRestValue').each(function(){
		var value = $(this).data('value');
		if (value > 10) {
			$(this).html('В наличии много');
			$(this).css('opacity', '1');
		}else{
			$(this).html('В наличии мало');
			$(this).css('opacity', '1');
			$(this).parent().addClass('few');
		}
	});
}

// Добавление товара в корзину
function addCart() {
	$('.productView__form, .goodsListForm').off('submit').submit(function() {
		// Выносим функции из шаблонов
		if ($(this).attr('rel') === 'quick') {
			quickOrder(this);
			$('.cart, .addto__cart').addClass("hasItems");
			return (false);
		}
		$('.cart, .addto__cart').addClass("hasItems");
		$('.cart__count').animate({opacity: 0,display: "none"},500);
		$('.cart__count').animate({display: "inline",opacity: 1},500);
		// Находим форму, которую отправляем на сервер, для добавления товара в корзину
		var formBlock = $($(this).get(0));
		var addressCart = '/cart';
		// Проверка на существование формы отправки запроса на добавление товара в корзину
		if (1 > formBlock.length || formBlock.get(0).tagName != 'FORM') {
			alert('Не удалось найти форму добавления товара в корзину');
			return false;
		}
		// Получаем данные формы, которые будем отправлять на сервер
		var formData = formBlock.serializeArray();
		// Сообщаем серверу, что мы пришли через ajax запрос
		formData.push({name: 'ajax_q', value: 1});
		// Так же сообщим ему, что нужно сразу отобразить форму быстрого заказа
		//formData.push({name: 'fast_order', value: 1});
		// Аяксом добавляем товар в корзину и вызываем форму быстрого заказа товара
		$.ajax({
			type: "POST",
			cache: false,
			url: formBlock.attr('action'),
			data: formData,
			success: function(data) {
				//$.fancybox.open(data);
				// Анализ системного сообщения в коризне
				var str = $(data).html();
				// Проверяем текст сообщения на наличие ошибки
				if (str.indexOf("Не удалось добавить товар") != -1) {
					// Сообщение с ошибкой
					if(typeof(Noty) == "function") {
						new Noty({
							text: '<div class="noty__addto"><i class="icon-close"></i><div class="noty__message">'+ $(data).html() + '</div></div>',
							layout:"bottomRight",
							type:"warning",
							theme:"",
							closeWith: ['click'],
							textAlign:"center",
							easing:"swing",
							animation: {
								open: 'animated fadeInUp',
								close: 'animated fadeOutDown',
								easing: 'swing',
								speed: 400
							},
							timeout:"2000",
							progressBar:true,
							closable:true,
							closeOnSelfClick:true,
							modal:false,
							dismissQueue:false,
							onClose:true,
							killer:false
						}).show();
					}
				} else {
					// Сообщение с успешным добавлением
					if(typeof(Noty) == "function") {
						new Noty({
							text: '<div class="noty__addto"><i class="icon-check"></i><div class="noty__message">'+ $(data).html() + '</div></div>',
							layout:"bottomRight",
							type:"success",
							theme:"",
							closeWith: ['click'],
							textAlign:"center",
							easing:"swing",
							animation: {
								open: 'animated fadeInUp',
								close: 'animated fadeOutDown',
								easing: 'swing',
								speed: 400
							},
							timeout:"2000",
							progressBar:true,
							closable:true,
							closeOnSelfClick:true,
							modal:false,
							dismissQueue:false,
							onClose:true,
							killer:false
						}).show();
					}
				}
				// Скрытое обновление корзины
				$('.hiddenUpdate').html(data);
			}
		});
		return false;
	});
}

// Добавление в сравнение и Сохраненное
function addTo() {
// Добавление/удаление товара на сравнение/Сохраненное через ajax
	$('.add-compare').off('click').click(function(){
		// Объект ссылки, по которой кликнули
		var
				a = $(this)
				isAdd = a.attr('data-action-is-add'),
				addUrl = a.attr('data-action-add-url'),
				delUrl = a.attr('data-action-delete-url'),
				addTitle = a.attr('data-action-add-title'),
				delTitle = a.attr('data-action-delete-title'),
				pageUrl = a.attr('data-action-url'),
				pName = a.attr('data-prodname'),
				pUrl = a.attr('data-produrl'),
				pImg = a.attr('data-prodimg'),
				pDataid = a.attr('data-id'),
				pDataPrice = a.attr('data-mod-price'),
				pDataChar = a.attr('data-char-code'),
				pDataMod = a.attr('data-mod-id'),
				aText = a.parent().find('.add-compare'),
				addTooltip = a.attr('data-action-text-add'),
				delTooltip = a.attr('data-action-text-del'),
				requestUrl = a.attr('href');

		var atl = $(this).closest('.product__links');
		var atlS = $(this).closest('.product__shop');
		var flag = 0;
		$('.addto__compare .addto__item').each(function(){
			if($(this).attr('data-id') == pDataid){
				flag = 1;
			}
			if(flag == 1){
				$(this).remove();
				return false;
			}
			return flag;
		});

		// Если в ссылке присутствует идентификатор, который мы можем узнать только вытащив его с текущей страницы
		if( /GET_GOODS_MOD_ID_FROM_PAGE/.test(requestUrl)) {
			requestUrl = requestUrl.replace(new RegExp('GET_GOODS_MOD_ID_FROM_PAGE'), $('.goodsModificationId').val());
		}

		// Если есть информация о том какие URL адреса будут изменены, то можено не перегружать страницу и сделать запрос через ajax
		if(addUrl && delUrl) {
			$.ajax({
				type : "POST",
				dataType: 'json',
				cache : false,
				url : requestUrl,
				data : {
					'ajax_q': 1
				},
				success: function(data) {
					if(flag == 0){
						$('.addto__compare .addto__items').prepend('' +
								'<div class="addto__item" data-id="'+ pDataid +'">' +
								'<a href="'+ pUrl +'" title="'+ pName +'" class="addto__image"><img src="'+ pImg +'" class="goods-image-icon" /></a>' +
								'<div class="addto__shop">' +
								'<a href="'+ pUrl +'" class="addto__name" title="'+ pName +'"><span>'+ pName +'</span></a>' +
								'<div class="addto__price  '+ pDataChar +'">' +
								'<div class="price__now"><span title="'+ pDataPrice +' российских рублей"><span class="num">'+ pDataPrice +'</span> <span>р.</span></span></div>' +
								'<a href="'+ delUrl +'?id='+ pDataMod +'" data-goods-mod-id="'+ pDataMod +'" class="addto__remove remove" title="Убрать товар из списка сравнения" onclick="removeFromCompare($(this))"><span>Удалить</span></a>' +
								'</div>' +
								'</div>' +
								'</div>' +
								'');
					}
					if('ok' == data.status) {
						if(isAdd == 1) {
							var
									from = addUrl
									,to = delUrl
									,newIsAddStatus = 0
									,newTitle = delTitle ? delTitle : ''
									,newTooltip = delTooltip ? delTooltip : ''
							;
							a.addClass('added');
							atl.addClass('added');
							atlS.addClass('added');
						} else {
							var
									from = delUrl
									,to = addUrl
									,newIsAddStatus = 1
									,newTitle = addTitle ? addTitle : ''
									,newTooltip = addTooltip ? addTooltip : ''
							;
							a.removeClass('added');
							atl.removeClass('added');
							atlS.removeClass('added');
						}

						// Если указано, что изменилось число товаров на сравнении
						if(typeof(data.compare_goods_count) != 'undefined') {
							// Блок информации о том, что есть товары на сравнении
							var sidecount = $('.compare__count');
							// Если на сравнении больше нет товаров
							// Указываем информацию о новом количестве товаров на сравнении
							// Блок обновления списка сравнения в каталога
							sidecount.animate({opacity: 0,display: "none"},500,function(){
								sidecount.text(data.compare_goods_count);
								$('.compare__count').attr('data-count', data.compare_goods_count);
								if(data.compare_goods_count > 0){
									$('.compare').addClass("hasItems");
								}else{
									$('.compare').removeClass("hasItems");
									$('.compare__count').attr('data-count', '0').text("0");
									$('.add-compare').removeAttr("title").removeClass("added");
								}
							}).animate({display: "inline",opacity: 1} , 500 );
						}

						// Обновляем ссылку, на которую будет уходить запрос и информацию о ней
						a.attr('href', a.attr('href').replace(new RegExp(from), to))
								.attr('title', newTitle)
								.attr('data-tooltipOFF', newTooltip)
								.attr('data-action-is-add', newIsAddStatus);

						// Если рядом с ссылкой в виде круга есть текстовая надпись с описанием действия
						//if(aText.length) {
						//  aText.text(aText.attr(isAdd == 1 ? 'data-action-text-del' : 'data-action-text-add'));
						//}
						// Если есть функция, которая отображает сообщения пользователю
						if(typeof(Noty) == "function") {
							new Noty({
								text: '<div class="noty__addto"><i class="icon-check"></i><div class="noty__message">'+ data.message + '</div></div>',
								layout:"bottomRight",
								type:"success",
								theme:"",
								closeWith: ['click'],
								textAlign:"center",
								easing:"swing",
								animation: {
									open: 'animated fadeInUp',
									close: 'animated fadeOutDown',
									easing: 'swing',
									speed: 400
								},
								timeout:"2000",
								progressBar:true,
								closable:true,
								closeOnSelfClick:true,
								modal:false,
								dismissQueue:false,
								onClose:true,
								killer:false
							}).show();
						}
					} else if('error' == data.status) {
						// Если есть функция, которая отображает сообщения пользователю
						if(typeof(Noty) == "function") {
							new Noty({
								text: '<div class="noty__addto"><i class="icon-close"></i><div class="noty__message">'+ data.message + '</div></div>',
								layout:"bottomRight",
								type:"warning",
								theme:"",
								closeWith: ['click'],
								textAlign:"center",
								easing:"swing",
								animation: {
									open: 'animated fadeInUp',
									close: 'animated fadeOutDown',
									easing: 'swing',
									speed: 400
								},
								timeout:"2000",
								progressBar:true,
								closable:true,
								closeOnSelfClick:true,
								modal:false,
								dismissQueue:false,
								onClose:true,
								killer:false
							}).show();
						}
					}
				}
			});
			return false;
		}
	});
	// Добавление/удаление товара на сравнение/Сохраненное через ajax
	$('.add-favorites').off('click').click(function(){
		// Объект ссылки, по которой кликнули
		let
				a = $(this)
		addUrl = a.attr('data-action-add-url'),
				delUrl = a.attr('data-action-delete-url'),
				addTitle = a.attr('data-action-add-title'),
				delTitle = a.attr('data-action-delete-title'),
				isAdd = a.attr('data-action-is-add'),
				pName = a.attr('data-prodname'),
				pUrl = a.attr('data-produrl'),
				pImg = a.attr('data-prodimg'),
				pPrice = a.attr('data-prodprice'),
				pDataid = a.attr('data-id'),
				pDataPrice = a.attr('data-mod-price'),
				pDataChar = a.attr('data-char-code'),
				pDataMod = a.attr('data-mod-id'),
				pDataGoodsid = a.attr('data-goodsid'),
				aText = a.parent().find('.add-favorites'),
				addTooltip = a.attr('data-action-text-add'),
				delTooltip = a.attr('data-action-text-del'),
				requestUrl = a.attr('href');

		var atl = $(this).closest('.product__links');
		var atlS = $(this).closest('.product__shop');
		var flag = 0;
		$('.addto__favorites .addto__item').each(function(){
			if($(this).attr('data-id') == pDataid){
				flag = 1;
			}
			if(flag == 1){
				$(this).remove();
				return false;
			}
			return flag;
		});

		// Если в ссылке присутствует идентификатор, который мы можем узнать только вытащив его с текущей страницы
		if( /GET_GOODS_MOD_ID_FROM_PAGE/.test(requestUrl)) {
			requestUrl = requestUrl.replace(new RegExp('GET_GOODS_MOD_ID_FROM_PAGE'), $('.goodsModificationId').val());
		}

		// Если есть информация о том какие URL адреса будут изменены, то можено не перегружать страницу и сделать запрос через ajax
		if(addUrl && delUrl) {
			$.ajax({
				type : "POST",
				dataType: 'json',
				cache : false,
				url : requestUrl,
				data : {
					'ajax_q': 1
				},
				success: function(data) {
					if(flag == 0){
						$('.addto__favorites .addto__items').prepend('' +
								'<div class="addto__item" data-id="'+ pDataid +'">' +
								'<a href="'+ pUrl +'" title="'+ pName +'" class="addto__image"><img src="'+ pImg +'" class="goods-image-icon" /></a>' +
								'<div class="addto__shop"><a href="'+ pUrl +'" class="addto__name" title="'+ pName +'"><span>'+ pName +'</span></a>' +
								'<div class="addto__price '+ pDataChar +'">' +
								'<div class="price__now"><span title="'+ pDataPrice +' российских рублей"><span class="num">'+ pDataPrice +'</span> <span>р.</span></span></div>' +
								'<a href="'+ delUrl +'?id='+ pDataMod +'" data-goods-mod-id="'+ pDataMod +'" class="addto__remove remove" title="Убрать товар из списка избранного" onclick="removeFromFavorites($(this))"><span>Удалить</span></a>' +
								'</div>' +
								'</div>' +
								'</div>' +
								'');
					}
					if('ok' == data.status) {
						if(isAdd == 1) {
							var
									from = addUrl
									,to = delUrl
									,newIsAddStatus = 0
									,newTitle = delTitle ? delTitle : ''
									,newTooltip = delTooltip ? delTooltip : ''
							;
							a.addClass('added');
							atl.addClass('added');
							atlS.addClass('added');
						} else {
							var
									from = delUrl
									,to = addUrl
									,newIsAddStatus = 1
									,newTitle = addTitle ? addTitle : ''
									,newTooltip = addTooltip ? addTooltip : ''
							;
							a.removeClass('added');
							atl.removeClass('added');
							atlS.removeClass('added');
						}

						// Если указано, что изменилось число товаров на сравнении
						if(typeof(data.favorites_goods_count) != 'undefined') {
							// Блок информации о том, что есть товары на сравнении
							var sidecount = $('.favorites__count');
							// Если на сравнении больше нет товаров
							// Указываем информацию о новом количестве товаров на сравнении
							// Блок обновления списка сравнения в каталога
							sidecount.animate({opacity: 0,display: "none"},500,function(){
								sidecount.text(data.favorites_goods_count);
								$('.favorites__count').attr('data-count', data.favorites_goods_count);
								if(data.favorites_goods_count > 0){
									$('.favorites').addClass("hasItems");
								}else{
									$('.favorites').removeClass("hasItems");
									$('.favorites__count').attr('data-count', '0').text("0");
									$('.add-favorites').removeAttr("title").removeClass("added");
								}
							}).animate({display: "inline",opacity: 1} , 500 );
						}

						// Обновляем ссылку, на которую будет уходить запрос и информацию о ней
						a.attr('href', a.attr('href').replace(new RegExp(from), to))
								.attr('title', newTitle)
								.attr('data-tooltipOFF', newTooltip)
								.attr('data-action-is-add', newIsAddStatus);

						// Если рядом с ссылкой в виде круга есть текстовая надпись с описанием действия
						//if(aText.length) {
						//  aText.text(aText.attr(isAdd == 1 ? 'data-action-text-del' : 'data-action-text-add'));
						//}
						// Если есть функция, которая отображает сообщения пользователю
						if(typeof(Noty) == "function") {
							new Noty({
								text: '<div class="noty__addto"><i class="icon-check"></i><div class="noty__message">'+ data.message + '</div></div>',
								layout:"bottomRight",
								type:"success",
								theme:"",
								closeWith: ['click'],
								textAlign:"center",
								easing:"swing",
								animation: {
									open: 'animated fadeInUp',
									close: 'animated fadeOutDown',
									easing: 'swing',
									speed: 400
								},
								timeout:"2000",
								progressBar:true,
								closable:true,
								closeOnSelfClick:true,
								modal:false,
								dismissQueue:false,
								onClose:true,
								killer:false
							}).show();
						}
					} else if('error' == data.status) {
						// Если есть функция, которая отображает сообщения пользователю
						if(typeof(Noty) == "function") {
							new Noty({
								text: '<div class="noty__addto"><i class="icon-close"></i><div class="noty__message">'+ data.message + '</div></div>',
								layout:"bottomRight",
								type:"warning",
								theme:"",
								closeWith: ['click'],
								textAlign:"center",
								easing:"swing",
								animation: {
									open: 'animated fadeInUp',
									close: 'animated fadeOutDown',
									easing: 'swing',
									speed: 400
								},
								timeout:"2000",
								progressBar:true,
								closable:true,
								closeOnSelfClick:true,
								modal:false,
								dismissQueue:false,
								onClose:true,
								killer:false
							}).show();
						}
					}
				}
			});
			return false;
		}
	});
}

// Валидаторы для телефона в "Уведомить" в карточке товара
function validPhoneNotify(){
	var tel = $('#fancybox__notify').find('.form__phone');
	var check = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{5,10}$/.test(tel.val());
	if(check == true && check != ''){
		tel.removeClass('error');
		tel.parent().removeClass('error');
		tel.attr('placeholder','Введите номер');
		return true;
	}
	else{
		tel.addClass('error');
		tel.parent().addClass('error');
		tel.attr('placeholder','Вы не ввели номер');
		return false;
	}
}
// Подписаться. Валидатор почты в "Уведомить"
function validEmailNotify(){
	var email = $('#fancybox__notify').find('.form__email');
	var check = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email.val());
	if(check == true && check != ''){
		email.removeClass('error');
		email.parent().removeClass('error');
		email.attr('placeholder','Введите Email');
		return true;
	}else{
		email.addClass('error');
		email.parent().addClass('error');
		email.val('');
		email.attr('placeholder','Вы ввели неверный Email');
		return false;
	}
}
function validSubmitNotify(){
	var email = validEmailNotify();
	var phone = validPhoneNotify();
	return email || phone;
}
// Проверка отправки формы
$(function(){
	$('#fancybox__notify .form__callback').submit(validSubmitNotify);
});

// Загрузка основных функций шаблона
$(document).ready(function(){
	quickViewMod();
	goodsModRest();
	priceDiff();
	addCart();
	addTo();
	// Добавление товара в корзину
	$('.add-cart').on('click', function() {
		var form = $(this).closest('form');
		if ($(this).hasClass('quick')) {
			form.attr('rel', 'quick');
		} else {
			var rel = form.attr('rel');
			if (rel) {
				form.attr('rel', rel.replace('quick', ''));
			}
		}
		form.trigger('submit');
		return (false);
	});
	// Уведомить при отсутствии товара
	$('.add-notify').on('click', function(){
		$('#fancy__info').val('Уведомить -- ' + $(this).attr('data-name'));
		$('#fancy__name').val($(this).attr('data-name'));
		$('#fancy__art').val($(this).attr('data-art'));
	});
});


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

	// Функция слайдера для Новинок на главной странице
	var btn = $('#pdt__best').find('.showAll');
	btn.on('click', function (event){
		event.preventDefault();
		var t = $(this);
		var parents = t.parents().find('#pdt__best')
		var btnText = t.find('span')
		if(t.hasClass('active')){
			t.removeClass('active')
			parents.removeClass('active')
			btnText.text('Показать все')
			parents.find('.product__item').removeClass('show')
			parents.css({height: ''})
		}else{
			t.addClass('active')
			parents.addClass('active')
			btnText.text('Скрыть')
			parents.find('.product__item').addClass('show')
			parents.css({height: '100%'})
		}
	})
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
