var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Calc = function () {
	function Calc(field) {
		_classCallCheck(this, Calc);

		this.field = field;
	}

	_createClass(Calc, [{
		key: 'addNumber',
		value: function addNumber(number) {
			var lastEl = this.getLastElement();
			var el = document.createElement('span');
			el.className = 'num';
			el.innerHTML = number;

			if (number === 0) if (lastEl && lastEl.classList.contains('item-number')) if (lastEl.children.length === 1 && lastEl.children[0].innerText === '0') return false;

			if (lastEl && lastEl.classList.contains('item-number')) {
				if (lastEl.children.length < 15) {
					if (lastEl.children.length === 1 && lastEl.children[0].innerText === '0') lastEl.innerHTML = '';

					lastEl.appendChild(el);
				}
			} else {
				var item = document.createElement('span');
				item.className = 'item-number';
				item.appendChild(el);

				this.field.appendChild(item);
			}

			this.update();
		}
	}, {
		key: 'addOperator',
		value: function addOperator(operator) {
			var lastEl = this.getLastElement();
			var el = document.createElement('span');
			el.className = 'operator';
			el.innerHTML = operator;

			if (this.field.children.length === 0) return false;

			if (lastEl && lastEl.classList.contains('operator')) {
				lastEl.remove();
				this.field.appendChild(el);
			} else this.field.appendChild(el);

			this.update();
		}
	}, {
		key: 'result',
		value: function result() {
			function setNumbers(num) {
				var newNum = '';
				var numStr = num.toString();
				for (var i in numStr) {
					newNum += '<span class="num">' + numStr[i] + '</span>';
				}return newNum;
			}

			var operators = document.querySelectorAll('.operator');

			for (var i = 0; i < operators.length; i++) {

				if (operators[i].innerText == '*' || operators[i].innerText == '/') {
					var next = operators[i].nextElementSibling;
					var prev = operators[i].previousElementSibling;

					if (next.innerText.toString() && prev.innerText.toString()) {
						if (operators[i].innerText == '*') {
							var num = calcNum.mul(parseFloat(prev.innerText), parseFloat(next.innerText));
							next.remove();
							prev.innerHTML = setNumbers(num);
							operators[i].remove();
						}

						if (operators[i].innerText == '/') {
							var _num = calcNum.div(parseFloat(prev.innerText), parseFloat(next.innerText));
							next.remove();
							prev.innerHTML = setNumbers(_num);
							operators[i].remove();
						}
					}
				}
			}

			for (var _i = 0; _i < operators.length; _i++) {

				if (operators[_i].innerText == '+' || operators[_i].innerText == '-') {
					var _next = operators[_i].nextElementSibling;
					var _prev = operators[_i].previousElementSibling;

					if (_next.innerText.toString() && _prev.innerText.toString()) {
						if (operators[_i].innerText == '+') {
							var _num2 = calcNum.add(parseFloat(_prev.innerText), parseFloat(_next.innerText));
							_next.remove();
							_prev.innerHTML = setNumbers(_num2);
							operators[_i].remove();
						}

						if (operators[_i].innerText == '-') {
							var _num3 = calcNum.sub(parseFloat(_prev.innerText), parseFloat(_next.innerText));
							_next.remove();
							_prev.innerHTML = setNumbers(_num3);
							operators[_i].remove();
						}
					}
				}
			}

			this.update();
		}
	}, {
		key: 'dot',
		value: function dot() {
			var number = void 0;

			if (this.getLastElement() && this.getLastElement().classList.contains('item-number')) number = this.getLastElement();else return false;

			if (/\./.test(number.innerText.toString())) return false;

			var el = document.createElement('span');
			el.className = 'num';
			el.innerHTML = '.';

			number.appendChild(el);

			this.update();
		}
	}, {
		key: 'getLastElement',
		value: function getLastElement() {
			return this.field.lastElementChild;
		}
	}, {
		key: 'inverse',
		value: function inverse() {
			var number = void 0;

			if (this.getLastElement() && this.getLastElement().classList.contains('item-number')) number = this.getLastElement();else return false;

			if (/\-/.test(number.innerText.toString())) {
				number.children[0].remove();
			} else {
				var el = document.createElement('span');
				el.className = 'num';
				el.innerHTML = '-';

				number.prepend(el);
			}

			this.update();
		}
	}, {
		key: 'percent',
		value: function percent() {
			var number = void 0;

			if (this.getLastElement() && this.getLastElement().classList.contains('item-number')) number = this.getLastElement();else return false;

			var percentNumber = parseFloat(number.innerText) / 100;
			var numStr = percentNumber.toString();
			number.innerHTML = '';

			for (var i in numStr) {
				var el = document.createElement('span');
				el.className = 'num';
				el.innerHTML = numStr[i];

				number.appendChild(el);
			}

			this.update();
		}
	}, {
		key: 'backspace',
		value: function backspace() {
			if (this.getLastElement()) {
				var lastEl = this.getLastElement();

				if (lastEl.classList.contains('item-number')) {
					if (lastEl.children.length > 1) lastEl.lastElementChild.remove();else lastEl.remove();
				}

				if (lastEl.classList.contains('operator')) lastEl.remove();
			}
		}
	}, {
		key: 'reset',
		value: function reset() {
			this.field.innerHTML = '';

			this.update();
		}
	}, {
		key: 'update',
		value: function update() {
			var _ = this;

			if (size() >= 15) _.field.style.fontSize = '20px';else _.field.style.fontSize = '30px';

			_.field.scrollTop = _.field.scrollHeight;

			function size() {
				var num = _.field.children.length;

				for (var i = 0; i < _.field.children.length; i++) {
					num += _.field.children[i].children.length - 1;
				}return num;
			}
		}
	}]);

	return Calc;
}();

function $(selector) {
	return document.querySelector(selector);
}
function $$(selector) {
	return document.querySelectorAll(selector);
}

var calc = new Calc($('.calc__field'));

var buttons = {
	multiplied: $('.js-calc-multiplied'),
	division: $('.js-calc-division'),
	percent: $('.js-calc-percent'),
	inverse: $('.js-calc-inverse'),
	reset: $('.js-calc-reset'),
	clear: $('.js-calc-clear'),
	minus: $('.js-calc-minus'),
	equal: $('.js-calc-equal'),
	plus: $('.js-calc-plus'),
	num: $$('.js-calc-num'),
	dot: $('.js-calc-dot')
};

document.addEventListener("DOMContentLoaded", function () {

	for (var i = 0; i < buttons.num.length; i++) {
		buttons.num[i].addEventListener('click', function () {
			calc.addNumber(parseInt(this.innerText));
		});
	}

	buttons.plus.addEventListener('click', function () {
		return calc.addOperator('+');
	});
	buttons.minus.addEventListener('click', function () {
		return calc.addOperator('-');
	});
	buttons.division.addEventListener('click', function () {
		return calc.addOperator('/');
	});
	buttons.multiplied.addEventListener('click', function () {
		return calc.addOperator('*');
	});

	buttons.dot.addEventListener('click', function () {
		return calc.dot();
	});
	buttons.reset.addEventListener('click', function () {
		return calc.reset();
	});
	buttons.equal.addEventListener('click', function () {
        adsCalculator();
		return calc.result();
	});
	buttons.percent.addEventListener('click', function () {
		return calc.percent();
	});
	buttons.inverse.addEventListener('click', function () {
		return calc.inverse();
	});
	buttons.clear.addEventListener('click', function () {
		return calc.backspace();
	});

	document.addEventListener('keyup', function (ev) {
		switch (ev.keyCode) {
			case 97:
			case 49:
				{
					calc.addNumber(1);
				}break;
			case 50:
			case 98:
				{
					calc.addNumber(2);
				}break;
			case 51:
			case 99:
				{
					calc.addNumber(3);
				}break;
			case 52:
			case 100:
				{
					calc.addNumber(4);
				}break;
			case 53:
			case 101:
				{
					calc.addNumber(5);
				}break;
			case 54:
			case 102:
				{
					calc.addNumber(6);
				}break;
			case 55:
			case 103:
				{
					calc.addNumber(7);
				}break;
			case 56:
			case 104:
				{
					calc.addNumber(8);
				}break;
			case 57:
			case 105:
				{
					calc.addNumber(9);
				}break;
			case 48:
			case 96:
				{
					calc.addNumber(0);
				}break;
			case 187:
			case 107:
				{
					calc.addOperator('+');
				}break;
			case 189:
			case 109:
				{
					calc.addOperator('-');
				}break;
			case 220:
			case 111:
			case 191:
				{
					calc.addOperator('/');
				}break;
			case 106:
				{
					calc.addOperator('*');
				}break;
			case 67:
				{
					calc.reset();
				}break;
			case 13:
				{
					calc.result();
					adsCalculator();
                }break;
			case 8:
				{
					calc.backspace();
				}break;
			case 190:
			case 110:
				{
					calc.dot();
				}break;
		}
	});
});

(function(exports){

    /**
     * Addition
     * @param {Number} num1
     * @param {Number} num2
     * @return {Number} result
     */
    exports.add=function(num1, num2) {
        var baseNum, baseNum1, baseNum2;
        try {
            baseNum1 = num1.toString().split(".")[1].length;
        } catch (e) {
            baseNum1 = 0;
        }
        try {
            baseNum2 = num2.toString().split(".")[1].length;
        } catch (e) {
            baseNum2 = 0;
        }
        baseNum = Math.pow(10, Math.max(baseNum1, baseNum2));
        return (num1 * baseNum + num2 * baseNum) / baseNum;
    };

    /**
     * Subtraction
     * @param {Number} num1
     * @param {Number} num2
     * @return {Number} result
     */
    exports.sub=function(num1, num2) {
        var baseNum, baseNum1, baseNum2;
        var precision;
        try {
            baseNum1 = num1.toString().split(".")[1].length;
        } catch (e) {
            baseNum1 = 0;
        }
        try {
            baseNum2 = num2.toString().split(".")[1].length;
        } catch (e) {
            baseNum2 = 0;
        }
        baseNum = Math.pow(10, Math.max(baseNum1, baseNum2));
        precision = (baseNum1 >= baseNum2) ? baseNum1 : baseNum2;
        return ((num1 * baseNum - num2 * baseNum) / baseNum).toFixed(precision);
    };

    /**
     * Multiplication
     * @param {Number} num1
     * @param {Number} num2
     * @return {Number} result
     */
    exports.mul=function(num1, num2) {
        var baseNum = 0;
        try {
            baseNum += num1.toString().split(".")[1].length;
        } catch (e) {
        }
        try {
            baseNum += num2.toString().split(".")[1].length;
        } catch (e) {
        }
        return Number(num1.toString().replace(".", "")) * Number(num2.toString().replace(".", "")) / Math.pow(10, baseNum);
    };
    /**
     * Division
     * @param {Number} num1
     * @param {Number} num2
     * @return {Number} result
     */
    exports.div=function(num1, num2) {
        var baseNum1 = 0, baseNum2 = 0;
        var baseNum3, baseNum4;
        try {
            baseNum1 = num1.toString().split(".")[1].length;
        } catch (e) {
            baseNum1 = 0;
        }
        try {
            baseNum2 = num2.toString().split(".")[1].length;
        } catch (e) {
            baseNum2 = 0;
        }
        baseNum3 = Number(num1.toString().replace(".", ""));
        baseNum4 = Number(num2.toString().replace(".", ""));
        return (baseNum3 / baseNum4) * (Math.pow(10, baseNum2 - baseNum1));
    };

})(typeof exports === 'undefined'?this.calcNum={}:exports);


function adsCalculator() {


    
};