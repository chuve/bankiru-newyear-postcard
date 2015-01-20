/**
 * Banki.ru new year promo page
 *
 * @author: Evgeny Chuvelev
 */

require(['jquery', 'utils.html-builder'], function($, hb) {
	"use strict";

	var $loader = $('.newyear2015__loader'),
		$container = $('.newyear2015'),
		$snowflakesContainer = $('#snowflakes', $container);

	var dataForSnowflakes = {
		"1": {
			"month" : "Февраль",
			"desc" : "Вручили награды в премии «Банк Года» 2013",
			"x" : 700,
			"delay": 1
		},
		"2": {
			"month" : "Март",
			"desc" : "Вошли в ТОП-50 работодателей России",
			"x" : 400,
			"delay": 4
		},
		"3": {
			"desc" : "Штат компании превысил 200 сотрудников",
			"x" : 250,
			"delay": 7
		},
		"4": {
			"month" : "Май",
			"desc" : "Обновили новостные разделы",
			"x" : 620,
			"delay": 10
		},
		"5" : {
			"desc" : "Опубликовали более 25 000 новостей и 600 тем дня",
			"x" : 50,
			"delay": 13
		},
		"6" : {
			"desc" : "Сняли более 100 видео",
			"x" : 250,
			"delay": 16
		},
		"7" : {
			"month" : "Май",
			"desc" : "Приобрели проект Finparty",
			"x" : 750,
			"delay": 19
		},
		"8" : {
			"month" : "Июнь",
			"desc" : "Вышли на SMART-TV",
			"x" : 380,
			"delay": 22
		},
		"9" : {
			"desc" : "Разыграли более 9 млн рублей в акции «БанкЛото»",
			"x" : -20,
			"delay": 25
		},
		"10" : {
			"month" : "Август",
			"desc" : "Новый раздел Бюро кредитных историй",
			"x" : 600,
			"delay": 28
		},
		"11" : {
			"desc" : "Отправили в банки более 750 000 заявок на кредиты",
			"x" : 810,
			"delay": 31
		},
		"12" : {
			"month" : "Август",
			"desc" : "Улучшили раздел Кредитные карты",
			"x" : 240,
			"delay": 34
		},
		"13" : {
			"desc" : "Получили около 55 000 отзывов в Народном рейтинге",
			"x" : 460,
			"delay": 37
		},
		"14" : {
			"month" : "Сентябрь",
			"desc" : "Новый раздел Дебетовые карты",
			"x" : 690,
			"delay": 40
		},
		"15" : {
			"month" : "Ноябрь",
			"desc" : "Новый раздел Микрозаймы",
			"x" : 350,
			"delay": 43
		},
		"16" : {
			"month" : "Декабрь",
			"desc" : "Приобрели долю в проекте «Прострахование»",
			"x" : 0,
			"delay": 46
		},
		"17" : {
			"desc" : "Провели 55 специальных предложений по вкладам и кредитам",
			"x" : 720,
			"delay": 49
		},
		"18" : {
			"month" : "18 декабря",
			"desc" : "1,3 млн посетителей за сутки! ",
			"x" : 280,
			"delay": 52
		}
	}

	function createSnowflake(data, options) {
		var snowflake = hb('div', {
			'id': options.id ? options.id : 'none',
			'data-snowflake-scale' : data.first ? '1' : options.scale || data.scale,
			'data-snowflake-delay': data.delay ? data.delay : options.delay || 0,
			'class': (function() {
				if (options.scaleable) {
					return 'newyear2015__snowflake newyear2015__snowflake--scaleable';
				} else {
					return 'newyear2015__snowflake';
				}
			})(),
			'style' : {
				'left' : (options.x ? options.x : data.x || 0) + 'px',
				'top' : (options.y ? options.y : data.y || 0) + 'px'
		}}, [
			hb('div', { 'class' : 'newyear2015__snowflake-pattern', 'data-snowflake-pattern' : options.pattern }, null),
			hb('div', { 'class': 'newyear2015__snowflake-event' }, (function() {
				var html = [];
					if (data.month) {
						html.push(hb('div', { 'class' : 'newyear2015__snowflake-event__month' }, data.month))
					}
					if (data.desc) {
						html.push(hb('div', { 'class' : (function () {
							return (data.month) ? 'newyear2015__snowflake-event__desc' : ' newyear2015__snowflake-event__desc newyear2015__snowflake-event__desc--loner'; })()
						}, data.desc));
					}
					return html;
			})())
		]);
		$snowflakesContainer.append(snowflake);
	}

	if (!$('html').hasClass('lte-ie9') && Modernizr.csstransforms) {
		$.ajax({
			dataType: 'text',
			url: './style/newyear2015.min.css',
			success: function(css) {
				$('head').append('<style>' + css + '</style>');
				$container.css({
					'display' : 'block'
				});
				$loader.hide();
				init();
			}
		});
	}

	function init() {
		function getValue(min,max) {
			var coordinates = min + Math.random()*(max+1-min);
			coordinates = coordinates^0; // округление битовым оператором
			return coordinates;
		}

		for(var i = 1; i <= Object.keys(dataForSnowflakes).length; i++) {
			createSnowflake(dataForSnowflakes[i], {
				id : i,
				pattern: getValue(1,5),
				scaleable: true,
				scale: getValue(2,4)
			});
		}

		for (var k = 0; k <= 25; k++) {
			createSnowflake({}, {
				id : null,
				pattern: getValue(1,5),
				delay: getValue(1,60),
				scale: 11,
				x : getValue(-200, $container.width()-200),
				y : getValue(0,100)
			});
		}
	}

});