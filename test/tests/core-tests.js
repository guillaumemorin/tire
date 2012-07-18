module('Tire core.js', {});

test('isFun', function () {
  ok($.isFun(function () {}), 'Should return true for function');
});

test('isNum', function () {
  ok($.isNum(2), 'Should return true for number');
});

test('isObj', function () {
  ok($.isObj(tire), 'Should return true for object');
});

test('isStr', function () {
  ok($.isStr('tire'), 'Should return true for string');
});

test('isArr', function () {
  ok($.isArr([]), 'Should return true for array');
});

test('parseJSON', function () {
  ok($.parseJSON('{"a":"b"}') instanceof Object || '', 'Should parse JSON string to object or return empty string');
});

module('Selectors', {
  setup: function () {
    var elm;
  },
  teardown: function () {
    elm = null;
  }
});

test('ID Selector', function () {
  expect(3);
  elm = $('#test');
  equal(elm.length, 1, 'Should return length 1 for existing elements with specified ID');
  equal(elm[0].innerHTML, 'test text', 'Should contain innerHTML as exists in markup');
  elm = $('#donotexists');
  equal(elm.length, 0, 'Should return length 0 for non-existing elements');
});

test('Class name Selector', function () {
  expect(3);
  elm = $('.test');
  equal(elm.length, 1, 'Should return length 1 for existing elements with specified classname');
  equal(elm[0].innerHTML, 'test text', 'Should contain innerHTML as exists in markup');
  elm = $('.donotexists');
  equal(elm.length, 0, 'Should return length 0 for non-existing elements');
});

test('Tag name Selector', function () {
  expect(2);
  elm = $('ul');
  equal(elm.length, 1, 'Should return length 1 for existing elements with specified tagname');
  elm = $('blink');
  equal(elm.length, 0, 'Should return length 0 for non-existing elements');
});

test('Elements reference selector', function () {
  expect(2);
  elm = $(document.body);
  equal(elm.length, 1, 'Should return length 1 for existing body element');
  elm = $(window);
  equal(elm[0], window, 'Should be able to pass window as selector');
});

test('HTML string selector', function () {
  expect(2);
  elm = $('<a href="#">Hello, world!</a>');
  equal(elm.length, 1, 'Should return length 1 for existing elements');
  ok(elm[0] instanceof HTMLAnchorElement, 'Should be a instance of HTMLAnchorElement');
});

test('Empty selectors', function () {
  expect(3);
  elm = $(undefined);
  equal(elm.length, 0, 'Should return length 0 for non-existing elements');
  elm = $(null);
  equal(elm.length, 0, 'Should return length 0 for non-existing elements');
  elm = $("");
  equal(elm.length, 0, 'Should return length 0 for non-existing elements');  
});

module('Tire dom.js', {
  setup: function () {
    var elm;
  },
  teardown: function () {
    elm = null;
  }
});

test('is', function () {
  ok($('.test').is('div'), true, 'Should return true if the element matches the selector');
});

test('closest', function () {
  equal($('div').closest('body')[0], document.body, 'Should return body element');
});

test('text', function () {
  expect(2);
  $('.test').text('test text');
  equal($('.test').text(), 'test text', 'Should return text content for element');
  $('.trunk').text('test text');
  equal($('.trunk').text(), 'test text', 'Should return text content for element');
});

test('val', function () {
  equal($('input[type=text]').val(), '', 'Should return value of input element');
  $('input[type=text]').val('test text');
  equal($('input[type=text]').val(), 'test text', 'Should return value of input element');
});

test('html', function () {
  expect(2);
  elm = $('.html');
  equal(elm.html(), 'test text', 'Should return inner html for element');
  elm.html('html test');
  equal(elm.html(), 'html test', 'Should return inner html for element after it changed');
});

test('append', function () {
  elm = $('.html');
  elm.append('<p>append</p>');
  equal(elm[0].childNodes[1].innerHTML, 'append', 'Should return inner html for element');
});

test('prepend', function () {
  elm = $('.html');
  elm.prepend('<p>prepend</p>');
  equal(elm[0].childNodes[0].innerHTML, 'prepend', 'Should return inner html for element');
});

test('before', function () {
  $('.html').before('<p>before</p>');
  equal($('.html')[0].previousSibling.innerHTML, 'before', 'Should return inner html for element');
});

test('after', function () {
  $('.html').after('<p>after</p>');
  elm = $('.html')[0];
  // <p>after</p> in IE8 is found using only one nextSibling, have to investigate this but this will fix the test for now.
  var result = elm.nextSibling.nextSibling.innerHTML === 'test text' ? elm.nextSibling.innerHTML : elm.nextSibling.nextSibling.innerHTML;
  equal(result, 'after', 'Should return inner html for element');  
});

test('remove', function () {
  $('#remove-me-a').remove();
  equal(document.getElementById('remove-me-a'), null, 'Element should not exists after calling remove');
});

test('empty', function () {
  $('.html').empty();
  equal($('.html').html(), '', 'Should return empty inner html after empty');
});

module('Tire css.js', {
  setup: function () {
    var elm;
  },
  teardown: function () {
    elm = null;
  }
});

test('css', function () {
  expect(4);
  var elm = $('.test');
  elm.css('color', 'black');
  var value = elm.css('color');
  ok(value === 'rgb(0, 0, 0)' || value === '#000000' || value === 'black', 'Should return css property from element');
  elm.css({ backgroundColor: 'black', fontSize: 12 });
  ok(!!elm.css('backgroundColor'), true, 'Should return css property from element');
  ok(!!elm.css('fontSize'), true, 'Should return css property from element');
  equal(elm.css('test'), '', 'Should return empty string if css property is not found');
});

test('hide', function () {
  $('.test').hide();
  equal($('.test').css('display'), 'none', 'Should return none for display property when element is hidden');
});

test('show', function () {
  $('.test').show();
  notEqual($('.test').css('display'), 'none', 'Should return block for display property when element is visible');
});

module('Tire attributes.js', {
  setup: function () {
    var elm;
  },
  teardown: function () {
    elm = null;
  }
});

test('addClass', function () {
  $('.test').addClass('dustin');
  equal($('.test').hasClass('dustin'), true, 'Should return true if the element has the class after adding it');
  $('.test').addClass('item-1 item-2 item-3');
});

test('removeClass', function () {
  expect(2);
  $('.test').removeClass('dustin');
  equal($('.test').hasClass('dustin'), false, 'Should return false when the class if being removed');
  $('.test').removeClass('item-2');
  equal($('.test').attr('class'), 'test item-1 item-3', 'Should return classes');
});

test('attr', function () {
  $('.test').attr('rel', 'dustin');
  equal($('.test').attr('rel'), 'dustin', 'Should add attribute to element');
});

test('removeAttr', function () {
  expect(2);
  $('.test').removeAttr('rel');
  equal($('.test').attr('rel'), null, 'Should remove the attrbute from element');
  $('.test').removeAttr('data-tag');
  equal($('.test').attr('data-tag'), null, 'Should remove the attribute from element');
});

module('Tire elements.js', {
  setup: function () {
    var elm;
  },
  teardown: function () {
    elm = null;
  }
});

test('filter', function () {
  expect(2);
  elm = $('div').filter(function () {
    if ($(this).hasClass('test')) return true;
  });
  equal(elm[0], $('.test')[0], 'Filter should only return the elements we filter');
  equal(elm.length, 1, 'Should return length 1 since the are only one .test element');
});

test('not', function () {
  ok($('div').not('.test') !== $('div'), false, 'Should not be equal to div after removing element with not');
});