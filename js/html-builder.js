/**
 * Created by Evgeny Chuvelev on 01.07.14.
 *
 *	HtmlBuilder
 *
 *	Help you write your js code clean without html tags
 *
 *	@example
 *	// returns '<div id="test-id" class="test-class"><span>Hello World!</span></div>'
 *	require(['utils.html-builder'], function(hb) {
 *		var test = hb('div', {
 *			'id': 'test-id',
 *			'class': 'test-class'
 *			}, '<span>Hello World!</span>'
 *		);
 *		console.log(test);
 *	});
 *	@returns {string} Returns html markup string
 *
 */

define('utils.html-builder', ['underscore'], function (_, undefined) {
	'use strict';

	var sufficientTags = ['area', 'base', 'basefont', 'bgsound', 'br', 'col', 'command', 'embed', 'hr', 'img', 'input', 'keygen', 'link', 'meta', 'param', 'source', 'track', 'wbr'];

	var isSufficient = function(tag) {
		return _.find(sufficientTags, function(t) { return t === tag; });
	};

	var buildContent = function(content) {
		var html = '';

		if (typeof content !== 'undefined') {
			if (_.isArray(content)) {
				html = [];
				content.forEach(function(item) {
					html.push(buildContent(item));
				});
				html = html.join(' ');
			} else if (_.isBoolean(content)) {
				if (content == false) {
					html = '';
				}
			} else if (_.isString(content) || _.isNumber(content)) {
				html = content;
			} else if (_.isObject(content)) {
				if (banki.env.devMode) {
					console.warn('html-builder.js: object as content!')
				}
			}
		}

		return html;
	};

	var buildAttr = function(attrs) {
		var attributes = _.size(attrs) ? ' ' : '',
			attrArray = [];

		if (attrs) {
			if (typeof attrs['class'] !== 'undefined' && _.isArray(attrs['class'])) {
				attrs['class'] = attrs['class'].join(' ');
			}

			if (typeof attrs['style'] !== 'undefined') {
				if (_.isObject(attrs['style'])) {
					attrs['style'] = (function() {
						var ar = [];
						_.each(attrs['style'], function(value, key) {
							ar.push(key + ': ' + value + ';');
						});
						return ar;
					})();
				}

				if (_.isArray(attrs['style'])) {
					attrs['style'] = attrs['style'].join(' ');
				}
			}
		}

		if (_.isObject(attrs)) {
			_.each(attrs, function(value, key) {
				if (typeof value !== 'undefined') { // если undefined то не добавляем атрибут
					if (_.isBoolean(value)) {
						if (value) {
							attrArray.push(key);
						} else {
							// если false то не добавляем атрибут
						}
					} else {
						attrArray.push(key + '="' + value + '"');
					}
				}
			});
			attributes += attrArray.join(' ');
		}

		return attributes;
	};

	/**
	 * @param tag - {string} html tag (e.g. 'div')
	 * @param attrs - {object} Object with html attributes (e.g. { 'href': '#1', 'class': 'small-text', 'id': 'help' })
	 * @param content - {string} (e.g. '<span>Hello World</span>')
	 * @returns {string}
	 */
	return function (tag, attrs, content) {
		return (isSufficient(tag) && typeof content === 'undefined') ? '<' + tag + buildAttr(attrs) + ' />' : '<' + tag + buildAttr(attrs) + '>' + buildContent(content) + '</' + tag + '>';
	};

});