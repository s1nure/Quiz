document.addEventListener('DOMContentLoaded', () => {
	const btnOpenModal = document.querySelector('#btnOpenModal')

	const closeModal = document.querySelector('#closeModal')
	const modalBlock = document.querySelector('#modalBlock')
	const questionTitle = document.querySelector('#question')
	const formAnswer = document.querySelector('#formAnswers')
	const nextButton = document.querySelector('#next')
	const prevButton = document.querySelector('#prev')

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
		const renderAnswer = QuestionIndex => {
      formAnswer.innerHTML = ``
      if (!Questions[QuestionIndex] || !Questions[QuestionIndex].answers) return 
			Questions[QuestionIndex].answers.forEach(answer => {
				const answerItem = document.createElement('div')

				answerItem.classList.add(
					'answers-item',
					'd-flex',
					'justify-content-center'
				)

				answerItem.innerHTML = `
            <input type="${Questions[QuestionIndex].type}" id="${answer.title}" name="answer" class="d-none">
            <label for="${answer.title}" class="d-flex flex-column justify-content-between">
              <img class="answerImg" src="${answer.url}" alt="burger">
              <span>${answer.title}</span>
            </label>
        `
				formAnswer.appendChild(answerItem)
			})
		}

		nextButton.onclick = () => {
			numQuestion++
			renderQuery(numQuestion)
		}

		prevButton.onclick = () => {
			numQuestion--
			renderQuery(numQuestion)
		}

		const renderQuery = RenderIndex => {
			questionTitle.textContent = ''
			if (Questions[RenderIndex] && Questions[RenderIndex].question) {
				questionTitle.textContent = Questions[RenderIndex].question
			}

			if (RenderIndex == Questions.length - 1) {
				nextButton.classList.add('invisible')
			} else {
				nextButton.classList.remove('invisible')
      }
      if (RenderIndex == 0) {
				prevButton.classList.add('invisible')
			} else {
				prevButton.classList.remove('invisible')
			}

			renderAnswer(RenderIndex)
		}
		renderQuery(numQuestion)
	}
})
