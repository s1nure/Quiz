document.addEventListener('DOMContentLoaded', () => {
	const btnOpenModal = document.querySelector('#btnOpenModal')

	const closeModal = document.querySelector('#closeModal')
  const modalBlock = document.querySelector('#modalBlock')
  const questionTitle = document.querySelector('#question')
  const formAnswer = document.querySelector('#formAnswers')
	btnOpenModal.addEventListener('click', () => {
    modalBlock.classList.add('d-block')
    playTest()
	})

	closeModal.addEventListener('click', () => {
		modalBlock.classList.remove('d-block')
  })
  
  const Questions = {
		question1: 'Какого цвета бургер вы хотите?',
	}
  const Answers = {
		burgerAnswer1: {
			text: 'Стандарт',
			image: './image/burger.png',
		},
		burgerAnswer2: {
			text: 'Черный',
			image: './image/burgerBlack.png',
		},
	}

  const playTest = () => {
    const renderQuery = () => {
      questionTitle.textContent = Questions.question1

      formAnswer.innerHTML = `
              <div class="answers-item d-flex flex-column">
                <input type="radio" id="answerItem1" name="answer" class="d-none">
                <label for="answerItem1" class="d-flex flex-column justify-content-between">
                  <img class="answerImg" src="${Answers.burgerAnswer1.image}" alt="burger">
                  <span>${Answers.burgerAnswer1.text}</span>
                </label>
              </div>
              <div class="answers-item d-flex justify-content-center">
                <input type="radio" id="answerItem2" name="answer" class="d-none">
                <label for="answerItem2" class="d-flex flex-column justify-content-between">
                  <img class="answerImg" src="${Answers.burgerAnswer2.image}" alt="burger">
                  <span>${Answers.burgerAnswer2.text}</span>
                </label>
              </div> 
      `
    }
    renderQuery()
  }
})
