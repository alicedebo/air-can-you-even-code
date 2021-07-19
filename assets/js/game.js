const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let timeEl = document.querySelector(".timer");
let secondsLeft = 60;
let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
    {
        question: 'When using the "typeof" operator in JavaScript, what kind of output would you expect from "I love Coding"',
        choice1: 'number',
        choice2: 'string',
        choice3: 'boolean',
        choice4: 'undefined',
        //correct answer
        answer: 2,
    },
    {
        question: 'What method can be used to round a number DOWN to the nearest integer?',
        choice1: 'Math.ceil()',
        choice2: 'Math.round()',
        choice3: 'Math.floor()',
        choice4: 'Math.trunc()',
        answer: 3,
    },
    {
        question: 'Which browser-specific function is used to have a user input text?',
        choice1: 'placeholder',
        choice2: 'confirm',
        choice3: 'alert',
        choice4: 'prompt',
        answer: 4,
    },
    {
        question: 'Of the four, which is the proper syntax for changing the font-size of the "pTags"?',
        choice1: 'pTags.setAttribute("style", "font-size: 40px;")',
        choice2: 'pTags[0].setAttribute("style", "font-size: 40px;")',
        choice3: 'pTags.setAttribute("style," "font-size: 40px;")',
        choice4: 'pTags.setAttribute(style = "font-size: 40px;")',
        answer: 1,
    },

    
]

const SCORE_POINTS = 100;
const MAX_QUESTIONS = 4;

startGame = () => {
    questionCounter = 0;
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('./end.html')
    }

    questionCounter++ 
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`

    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

function setTime() {
    let timerInterval = setInterval(function(){
        secondsLeft--;
        timeEl.textContent = secondsLeft

        if(secondsLeft === 0) {
            clearInterval(timerInterval);
            sendMessage()
        }
    }, 1000)
}

function sendMessage() {
    timeEl.textContent = "Times up!!";
    window.location.assign('./end.html')
}
setTime()

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if (!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if (classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        if (classToApply === 'incorrect') {
            secondsLeft -= 2 * 5 * 1;
        }


        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() =>{
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()

        }, 1000)
    })
})

incrementScore = num => {
    score += num
    scoreText.innerText = score
}

startGame()
// updateCountdown()