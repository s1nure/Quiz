document.addEventListener('DOMContentLoaded', () => {
	const btnOpenModal = document.querySelector('#btnOpenModal')

	const closeModal = document.querySelector('#closeModal')
	const modalBlock = document.querySelector('#modalBlock')
	const questionTitle = document.querySelector('#question')
	const formAnswer = document.querySelector('#formAnswers')
	const nextButton = document.querySelector('#next')
	const prevButton = document.querySelector('#prev')
	const sendButton = document.querySelector('#send')

	btnOpenModal.addEventListener('click', () => {
		modalBlock.classList.add('d-block')
		playTest()
	})

	closeModal.addEventListener('click', () => {
		modalBlock.classList.remove('d-block')
	})

	const Questions = [
		{
			question: 'Какого цвета бургер?',
			answers: [
				{
					title: 'Стандарт',
					url: './image/burger.png',
				},
				{
					title: 'Черный',
					url: './image/burgerBlack.png',
				},
			],
			type: 'radio',
		},
		{
			question: 'Из какого мяса котлета?',
			answers: [
				{
					title: 'Курица',
					url: './image/chickenMeat.png',
				},
				{
					title: 'Говядина',
					url: './image/beefMeat.png',
				},
				{
					title: 'Свинина',
					url: './image/porkMeat.png',
				},
			],
			type: 'radio',
		},
		{
			question: 'Дополнительные ингредиенты?',
			answers: [
				{
					title: 'Помидор',
					url: './image/tomato.png',
				},
				{
					title: 'Огурец',
					url: './image/cucumber.png',
				},
				{
					title: 'Салат',
					url: './image/salad.png',
				},
				{
					title: 'Лук',
					url: './image/onion.png',
				},
			],
			type: 'checkbox',
		},
		{
			question: 'Добавить соус?',
			answers: [
				{
					title: 'Чесночный',
					url: './image/sauce1.png',
				},
				{
					title: 'Томатный',
					url: './image/sauce2.png',
				},
				{
					title: 'Горчичный',
					url: './image/sauce3.png',
				},
			],
			type: 'radio',
		},
	]

	const playTest = () => {
		let numQuestion = 0
		let finalAnswers = []
		const renderAnswer = QuestionIndex => {
			formAnswer.innerHTML = ``
			// if (!Questions[QuestionIndex] || !Questions[QuestionIndex].answers) return
			Questions[QuestionIndex].answers.forEach(answer => {
				const answerItem = document.createElement('div')

				answerItem.classList.add(
					'answers-item',
					'd-flex',
					'justify-content-center'
				)

				answerItem.innerHTML = `
            <input type="${Questions[QuestionIndex].type}" id="${answer.title}" name="answer" class="d-none" value="${answer.title}">
            <label for="${answer.title}" class="d-flex flex-column justify-content-between">
              <img class="answerImg" src="${answer.url}" alt="burger">
              <span>${answer.title}</span>
            </label>
        `
				formAnswer.appendChild(answerItem)
			})
		}

		const checkAnswer = () => {
			const obj = {}
			const inputs = [...formAnswer.elements].filter(
				input => input.checked || input.id == 'numberPhone'
			)
			console.log(inputs)

			inputs.forEach((input, index) => {
				if (numQuestion >= 0 && numQuestion <= Questions.length - 1) {
					obj[`${index}_${Questions[numQuestion].question}`] = input.value
				}
				if (numQuestion == Questions.length) {
					obj[`Номер телефона`] = input.value
				}
			})

			finalAnswers.push(obj)
		}

		nextButton.onclick = () => {
			checkAnswer()
			numQuestion++
			renderQuery(numQuestion)
		}

		prevButton.onclick = () => {
			numQuestion--
			renderQuery(numQuestion)
		}
		sendButton.onclick = () => {
			checkAnswer()
			numQuestion++
			renderQuery(numQuestion)
			console.log(finalAnswers)
		}

		const renderQuery = RenderIndex => {
			questionTitle.textContent = ''

			switch (RenderIndex) {
				case Questions.length:
					questionTitle.textContent = 'Введите номер телефона'
					formAnswer.innerHTML = `
            <div class="input-group mb-3">
              <span class="input-group-text" id="numberPhone">Number Phone</span>
              <input type="text" id="numberPhone" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default">
            </div>
            `
					nextButton.classList.add('d-none')
					sendButton.classList.remove('d-none')
					break

				case 0:
					nextButton.classList.remove('d-none')
					sendButton.classList.add('d-none')
					prevButton.classList.add('d-none')
					break

				case Questions.length + 1:
					formAnswer.innerHTML = ''
					questionTitle.textContent = 'Спасибо за пройденный тест'
					nextButton.classList.add('d-none')
					sendButton.classList.add('d-none')
					prevButton.classList.add('d-none')

					setTimeout(() => {
						modalBlock.classList.remove('d-block')
					}, 3000)
					break

				default:
					prevButton.classList.remove('d-none')
					break
			}

			if (numQuestion < 0 || numQuestion > Questions.length - 1) return

			if (Questions[RenderIndex] && Questions[RenderIndex].question) {
				questionTitle.textContent = Questions[RenderIndex].question
			}

			renderAnswer(RenderIndex)
		}
		renderQuery(numQuestion)
	}
})
