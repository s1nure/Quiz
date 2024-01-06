import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js'
import {
	getDatabase,
	ref,
	get,
	push,
} from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js'

const firebaseConfig = {
	apiKey: 'AIzaSyDK3Fjgj93t5fMI20wHig4kQ7DDJbzqx5o',
	authDomain: 'quiz-bf054.firebaseapp.com',
	databaseURL:
		'https://quiz-bf054-default-rtdb.europe-west1.firebasedatabase.app',
	projectId: 'quiz-bf054',
	storageBucket: 'quiz-bf054.appspot.com',
	messagingSenderId: '191248030153',
	appId: '1:191248030153:web:75a7e5cb393a95cfc1f018',
	measurementId: 'G-X1XRYQYM2K',
}

const app = initializeApp(firebaseConfig)
const database = getDatabase(app)

// Now you can use the 'database' object to work with your database
const quizDataRef = ref(database, 'questions')

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
		getData()
	})

	closeModal.addEventListener('click', () => {
		modalBlock.classList.remove('d-block')
	})

	const getData = () => {
		formAnswer.textContent = 'LOAD'
		nextButton.classList.add('d-none')
		prevButton.classList.add('d-none')
		get(quizDataRef)
			.then(snapshot => {
				const questions = snapshot.val()
				console.log(questions)
				setTimeout(() => {
					playTest(questions)
					nextButton.classList.remove('d-none')
					prevButton.classList.remove('d-none')
				}, 500)
			})
			.catch(error => {
				console.error('Error fetching data from the database:', error)
			})
	}

	const playTest = questions => {
		let numQuestion = 0
		let finalAnswers = []
		const renderAnswer = QuestionIndex => {
			formAnswer.innerHTML = ``

			questions[QuestionIndex].answers.forEach(answer => {
				const answerItem = document.createElement('div')

				answerItem.classList.add(
					'answers-item',
					'd-flex',
					'justify-content-center'
				)

				answerItem.innerHTML = `
            <input type="${questions[QuestionIndex].type}" id="${answer.title}" name="answer" class="d-none" value="${answer.title}">
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
				if (numQuestion >= 0 && numQuestion <= questions.length - 1) {
					obj[`${index}_${questions[numQuestion].question}`] = input.value
				}
				if (numQuestion == questions.length) {
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
			const finalAnswersRef = ref(database, 'finalAnswers')

			// Сохранение данных в базу данных
			push(finalAnswersRef, finalAnswers)
				.then(() => {
					console.log('Данные успешно сохранены в базе данных.')
				})
				.catch(error => {
					console.error('Ошибка при сохранении данных в базе данных:', error)
				})
		}

		const renderQuery = RenderIndex => {
			questionTitle.textContent = ''

			switch (RenderIndex) {
				case questions.length:
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

				case questions.length + 1:
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

			if (numQuestion < 0 || numQuestion > questions.length - 1) return

			if (questions[RenderIndex] && questions[RenderIndex].question) {
				questionTitle.textContent = questions[RenderIndex].question
			}

			renderAnswer(RenderIndex)
		}
		renderQuery(numQuestion)
	}
})
