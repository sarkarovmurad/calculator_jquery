'use strict';
$(document).ready(function($) {


	var calculatorComponent = {

		// vars
		$calculator:		$('.calculator'),
		$button_number: 	$('.calculator__button[data-type="number"]'),
		$button_operator: 	$('.calculator__button[data-type="operator"]'),
		$button_event:  	$('.calculator__button[data-type="event"]'),
		$button_dot: 		$('.calculator__button[data-type="dot"]'),
		$input: 			$('.calculator__input'),
		$history: 			$('.calculator-history'),
		symbol_arr:         ['/','*','+','-'],
		symbol_reg:         /\s*[/*\-+]/,


		// methods
		init: function() {

			// Фокус на поле при запуске страницы
			this.input_focus(this);

			// Нажатие на цифру
			this.$button_number.on( 'click', {parent: this}, this.add_number );

			// Нажатие на кнопку события
			this.$button_event.on( 'click', {parent: this}, this.calc_event );

			// Нажатие на кнопку оператора вычисления
			this.$button_operator.on( 'click', {parent: this}, this.add_operator );

			// Нажатие на кнопку точки
			this.$button_dot.on( 'click', {parent: this}, this.add_dot );

			// Нажатие на поле ввода символов
			this.$calculator.find('.calculator__cover').on( 'click', {parent: this}, this.focus_on_input );

			// Ввод символов в текстовое поле
			this.$input.on( 'keydown', {parent: this}, this.keyboard_input );

			// Нажатие на кнопку очистки истории
			this.$history.find('.calculator-history__clear').on('click', {parent: this}, this.history_clear );

		},

		// Фокус на поле ввода
		input_focus: function(event) {
			if( $('body').width() > 960 ) {
				event.$input.focus();
				event.$input[0].setSelectionRange(event.$input.val().length,event.$input.val().length);
			}
		},

		// Добавление цифры
		add_number: function(event) {
			let parent = event.data.parent,
				$self  = $(this);

			// Нельзя делить на 0!
			if( $self.text()==0 && parent.$input.val().slice(-1)=="/" ) {
				return false;
			}
			if( $self.text()==0 && parent.$input.val().slice(-1)=="." ) {
				return false;
			}

			// Если значение поля = 0, то заменяем вводимым значение, если нет - прибавляем
			if( parent.$input.val() == "0" )
				parent.$input.val( $self.text() );
			else
				parent.$input.val( parent.$input.val() + $self.text() );

			parent.input_focus(parent);
		},

		// События ввода
		calc_event: function(event) {
			let parent = event.data.parent,
				$self  = $(this);
			if($self.data('event')=="del") {// Удаление последнего символа
				parent.delete_last_symbol(event);
			} else if($self.data('event')=="clear") {// Сброс значения
				parent.clear_input(event);
			} else if($self.data('event')=="result") {// Получение результата
				parent.get_results(event);
			}
			parent.input_focus(parent);
		},

		// Добавление оператора
		add_operator: function(event) {
			let parent = event.data.parent;
			parent.test_last_symbol(event);
			if( $(this).data('operator')=="-" && parent.$input.val()==0 )
				parent.$input.val('');
			parent.$input.val( parent.$input.val()+$(this).data('operator') );
			parent.input_focus(parent);
		},

		// Добавление точки
		add_dot: function(event) {
			let parent = event.data.parent;
			let arr = parent.$input.val().split(parent.symbol_reg);
			if( arr[arr.length-1].indexOf('.') == "-1" )
				parent.$input.val( parent.$input.val()+"." );
			parent.input_focus(parent);
		},

		// Удаление последнего символа
		delete_last_symbol: function(event) {
			let parent = event.data.parent;
			parent.$input.val( parent.$input.val().substring(0, parent.$input.val().length - 1) );
			parent.test_zero(event);// Проверка на пустое значение
			parent.input_focus(parent);
		},

		// Сброс значения
		clear_input: function(event) {
			let parent = event.data.parent;
			parent.$input.val(0);
			parent.input_focus(parent);
		},

		// Получение результата
		get_results: function(event) {
			let parent = event.data.parent;

			// Удаляем лишние символы (точку в конце строки, символы операторов)
			parent.test_last_symbol(event);

			let this_expression = parent.$input.val(),
				this_result     = eval( parent.$input.val().replace(/[^-()\d/*+.]/g, '') );

			// Округляем до 3 символов после точки
			if( String(this_result).indexOf('.') != "-1" ) {
				this_result = this_result.toFixed(3)/1;
			}

			// Если в строке вычисления одно значение, то не вычисляем
			if(
				   parent.$input.val().split(parent.symbol_reg).length == 1
				|| parent.$input.val().split(parent.symbol_reg).length == 2 && parent.$input.val().substr(0,1)=="-"
			)
				return false;

			parent.$input.val( this_result );
			parent.history_add(event, this_expression, this_result );
			parent.input_focus(parent);
		},

		// Проверка на пустое значение
		test_zero: function(event) {
			let parent = event.data.parent;
			if( !parent.$input.val() ) {
				parent.$input.val('0');
			}
		},

		// Проверка последнего символа в поле на символ вычисления
		test_last_symbol: function(event) {
			let parent = event.data.parent;
			// Если последний символ - точка, то удаляем её
			if( parent.$input.val().slice(-1) == "." ) {
				parent.delete_last_symbol(event);
			}
			// Если последний символ - символ оператора, то тоже удаляем его
			if( $.inArray(parent.$input.val().slice(-1), parent.symbol_arr) != "-1" ) {
				parent.delete_last_symbol(event);
				return false;
			}
		},

		// Добавления фокуса на поле ввода символов
		focus_on_input: function(event) {
			if( $('body').width() > 960 ) {
				let parent = event.data.parent;
				parent.$input.focus();
				parent.$input[0].setSelectionRange(parent.$input.val().length,parent.$input.val().length);
			}
		},

		// Ввод символов с клавиатура
		keyboard_input: function(event) {
			let parent = event.data.parent;
			if(// Числа
				   event.which>=48 && event.which<=57  // С левой клавиатуры
				|| event.which>=96 && event.which<=105 // С правой клавиатуры
			){
				if( !(event.key>=0&&event.key<=9) ) {// Если это символы, получаемые при нажатии shift+цифра, то -> return false
					return false;
				} else if( (event.which==48 || event.which==96) && parent.$input.val().slice(-1)=="/" ) {// Нельзя делить на 0!
					return false;
				}  else if( (event.which==48 || event.which==96) && parent.$input.val().slice(-1)=="." ) {// Нельзя делить на 0!
					return false;
				} else {
					// Если значение пустое, то удаляем из поля нолик перед вводом символов
					if(parent.$input.val()==0) parent.$input.val('');
				}
			} else if(// Операторы вычисления
				   event.which==173 // вычитание слева
				|| event.which==191 // Деление слева
				|| event.which==107 // Сложение справа
				|| event.which==109 // вычитание справа
				|| event.which==106 // Умножение справа
				|| event.which==111 // Деление справа
			) {
				parent.test_last_symbol(event);
				if( (event.which==173 || event.which==109) && parent.$input.val()==0 )
					parent.$input.val('');
			} else {// Остальные символы
				event.preventDefault();
				if( event.which == 8 ) { // Backspace
					parent.delete_last_symbol(event);
				} else if(// "=" и Enter
					   event.which==61 // Равно
					|| event.which==13 // Enter
				) {
					event.preventDefault();
					parent.get_results(event);
				} else if(// Точка или запятая
					   event.which==110 // Точка справа
					|| event.which==190 // Точка слева
					|| event.which==188 // Запятая
				) {
					parent.add_dot(event);
				} else {
					return false;
				}
			}
		},

		// Добавление значения в историю
		history_add: function(event, _expression, _result) {
			let parent = event.data.parent;
			if( parent.$history.find('.calculator-history__item--clear').length > 0 ) {
				parent.$history.find('.calculator-history__item--clear').remove();
			}
			$('.calculator-history__list').append('<article class="calculator-history__item">'+_expression+' = <b>'+_result+'</b></article>');
		},

		// Очистка истории
		history_clear: function(event) {
			let parent = event.data.parent;
			if( parent.$history.find('.calculator-history__item--clear').length == 0 ) {
				parent.$history.find('.calculator-history__item').remove();
				$('.calculator-history__list').append('<article class="calculator-history__item calculator-history__item--clear">История вычислений пуста</article>');
			}
		}

	}
	calculatorComponent.init();


});