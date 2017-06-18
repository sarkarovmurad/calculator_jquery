<!doctype html>
<html lang="ru">
	<head>

		<meta charset="UTF-8">
		<title>Калькулятор</title>
		<meta name="keywords" content="Кейвордс калькулятора">
		<meta name="description" content="Дескрипшн калькулятора">

		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=0, minimum-scale=1.0, maximum-scale=1.0">

		<link href="build/css/global/project.css" type="text/css" rel="stylesheet">

		<link rel='shortcut icon' href='favicon.ico' type='image/x-icon'>

		<link rel="apple-touch-icon" sizes="180x180" href="build/img/favicon/apple-touch-icon.png">
		<link rel="icon" type="image/png" sizes="32x32" href="build/img/favicon/favicon-32x32.png">
		<link rel="icon" type="image/png" sizes="16x16" href="build/img/favicon/favicon-16x16.png">
		<link rel="manifest" href="build/img/favicon/manifest.json">
		<link rel="mask-icon" href="build/img/favicon/safari-pinned-tab.svg" color="#5bbad5">
		<meta name="theme-color" content="#ffffff">

	</head>
	<body>
		<div class="wrapper">
			<div class="container">
				<div class="content">

					<!--  -->
					<section class="calculator">
						<div class="calculator__global-grid">
							<div class="calculator__global-cell">
								<header class="calculator__header">
									<input class="calculator__input" type="text" value="0"></input>
									<div class="calculator__cover"></div>
								</header>
								<div class="calculator__body">

									<div class="calculator__grid">
										<div class="calculator__column">
											<div class="calculator__row">
												<div class="calculator__cell">
													<button class="calculator__button" type="button" title="Сбросить" data-type="event" data-event="clear">C</button>
												</div>
												<div class="calculator__cell">
													<button class="calculator__button" type="button" title="Удалить" data-type="event" data-event="del">
														<section class="icon-del">
															<span class="icon-del__cross"></span>
														</section>
													</button>
												</div>
												<div class="calculator__cell">
													<button class="calculator__button" type="button" title="Разделить" data-type="operator" data-operator="/">
														<section class="calculator-divide"></section>
													</button>
												</div>
											</div><?// .calculator__row ?>
											<div class="calculator__row">
												<div class="calculator__cell">
													<button class="calculator__button" data-type="number" type="button">7</button>
												</div>
												<div class="calculator__cell">
													<button class="calculator__button" data-type="number" type="button">8</button>
												</div>
												<div class="calculator__cell">
													<button class="calculator__button" data-type="number" type="button">9</button>
												</div>
											</div><?// .calculator__row ?>
											<div class="calculator__row">
												<div class="calculator__cell">
													<button class="calculator__button" data-type="number" type="button">4</button>
												</div>
												<div class="calculator__cell">
													<button class="calculator__button" data-type="number" type="button">5</button>
												</div>
												<div class="calculator__cell">
													<button class="calculator__button" data-type="number" type="button">6</button>
												</div>
											</div><?// .calculator__row ?>
											<div class="calculator__row">
												<div class="calculator__cell">
													<button class="calculator__button" data-type="number" type="button">1</button>
												</div>
												<div class="calculator__cell">
													<button class="calculator__button" data-type="number" type="button">2</button>
												</div>
												<div class="calculator__cell">
													<button class="calculator__button" data-type="number" type="button">3</button>
												</div>
											</div><?// .calculator__row ?>
											<div class="calculator__row">
												<div class="calculator__cell">
													<button class="calculator__button" data-type="number" type="button">0</button>
												</div>
												<div class="calculator__cell">
													<button class="calculator__button calculator__button--dot" data-type="dot" type="button">.</button>
												</div>
											</div><?// .calculator__row ?>
										</div><?// .calculator__column ?>
										<div class="calculator__column">
											<div class="calculator__row">
												<div class="calculator__cell">
													<button class="calculator__button" type="button" title="Умножить" data-type="operator" data-operator="*">
														<section class="calculator-multiply"></section>
													</button>
												</div>
											</div><?// .calculator__row ?>
											<div class="calculator__row">
												<div class="calculator__cell">
													<button class="calculator__button" type="button" title="Отнять" data-type="operator" data-operator="-">–</button>
												</div>
											</div><?// .calculator__row ?>
											<div class="calculator__row">
												<div class="calculator__cell">
													<button class="calculator__button" type="button" title="Прибавить" data-type="operator" data-operator="+">+</button>
												</div>
											</div><?// .calculator__row ?>
											<div class="calculator__row">
												<div class="calculator__cell">
													<button class="calculator__button" type="button" title="Получить результат" data-type="event" data-event="result">=</button>
												</div>
											</div><?// .calculator__row ?>
										</div><?// .calculator__column ?>
									</div><?// .calculator__grid ?>

								</div><?// .calculator__body ?>
							</div><?// .calculator__global-cell ?>
							<div class="calculator__global-cell">

								<section class="calculator-history">
									<div class="calculator-history__container">
										<div class="calculator-history__heading">История вычислений:</div>
										<div class="calculator-history__list">
											<article class="calculator-history__item calculator-history__item--clear">История вычислений пуста</article>
										</div>
									</div>
									<button class="calculator-history__clear">Очистить историю</button>
								</section>

							</div><?// .calculator__global-cell ?>
						</div><?// .calculator__global-grid ?>
					</section><?// .calculator ?>

				</div><?// .content ?>
			</div><?// .content ?>
		</div><?// .wrapper ?>

		<script src="bower_components/jquery/dist/jquery.min.js"></script>
		<script src="build/js/global/project.js"></script>

		</body>
</html>



