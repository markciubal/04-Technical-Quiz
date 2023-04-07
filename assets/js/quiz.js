
/* TODO:
    - Make elements to pick constants instead of hard-coding them.
*/

const timeToPlay = 60;
const numberOfQuestions = 10;
let secondsLeft = timeToPlay;

let score = document.querySelector("#currentScore");
let countdownText = document.querySelector("#countdown");

let questionArea = document.querySelector("question");
let answerList = document.querySelector("#answers");
let answers = document.querySelectorAll(".answer");
let statusText = document.querySelector("#status");
let startButton = document.querySelector("#start");

let lastQuestion = false;
/* Declare globally scoped variables. */
/* Set up questions. */
let questions = [{
    question: "What is a string?",
    answers: [
        "A combination of characters, that can be strung into a variable.",
        "A piece of yarn.",
        "A number.",
        "A true or false value."
    ], 
    correct: 0
}, {
    question: "What is a variable?",
    answers: [
        "A uniquely named thing that stores a reference to a piece of information, which can change.",
        "Something that wiggles.",
        "A number.",
        "Something that changes, like the weather."
    ],
    correct: 0
}];

/* Set up bank of questions that will be pulled through in the quiz. */
let questionBank = [];

/* Globally scope the timer interval so that it may be reset at any point. */
let timerInterval;

/* Give up access to user input at any time. */
let userAnswers = [];

function pickRandomQuestions() {
    /* Set to blank array if it exists. Prevents stacking of questionBank results. */
    questionBank = [];

    /* Pick a random element in the "questions" array, and push it into the questionBank. */
    /* The global variable "numberOfQuestions" is preset and hard-coded into the application.
        - See TODO list.
    */
    for (let i = 0; i <= numberOfQuestions; i++) {
        questionBank.push(questions[Math.floor((questions.length) * Math.random())]);
    }
}

/* Render the question to the "questionArea". */
function renderQuestion(questionNumberIndex) {
    questionArea.textContent = questionBank[questionNumberIndex].question;
}

/* Render the answers to answerHTML. */
function renderAnswers(questionNumberIndex) {
    let answerHTML = "";
    for (let i = 0; i < questionBank[questionNumberIndex].answers.length; i++) {
        let thisAnswerText = questionBank[questionNumberIndex].answers[i];
        answerHTML += `<li><button class="answer" value="${i}">${thisAnswerText}</button></li>`; 
    }
    answerList.innerHTML = answerHTML;
}

function gameOver(userAnswers) {
    questionArea.textContent = "G A M E   O V E R";
    answerList.innerHTML = "";
}

/* Starts the game countdown timer. */
function startCountdown() {
    countdownText.innerHTML = "1 Minute";
    timerInterval = setInterval(function() {
        secondsLeft--;
        countdownText.innerHTML = `${secondsLeft} Seconds`;
        if (secondsLeft === 0) {
            // Stops execution of action at set interval
            clearInterval(timerInterval);

            // Calls function to create and append image
            countdownText.innerHTML = `Game Over!`;
            gameOver();
        }
    
      }, 1000);    
}

function nextQuestion(questionNumberIndex) {
    // console.log("This question: ", questionBank[questionNumberIndex]);
    let nextQuestion = questionNumberIndex + 1;
    renderQuestion(nextQuestion);
    renderAnswers(nextQuestion);
    listenForAnswers(nextQuestion);
    // console.log("Next question: ", questionBank[nextQuestion]);
    if (nextQuestion == 10) {
        gameOver(userAnswers);
    }
}

function renderScore(userAnswers) {
    let numberCorrect = 0;
    let numberIncorrect = 0;
    for (let i = 0; i < userAnswers.length; i++) {
        if (userAnswers[i] === "correct") {
            numberCorrect++;
        } else if (userAnswers[i] === "incorrect") {
            numberIncorrect++;
        }
    }
    let percentageCorrect = ((numberCorrect/(numberCorrect + numberIncorrect))*100).toFixed(0);
    if (percentageCorrect === "NaN") {
        percentageCorrect = 0;
    }
    score.textContent = `Correct: ${numberCorrect} | Incorrect: ${numberIncorrect} | ${percentageCorrect}%`;
}

// function updateQuestion(questionNumberIndex) {
    
// }

function listenForAnswers(questionNumberIndex) {
    let correctAnswer = questionBank[questionNumberIndex].correct;
    answers = document.querySelectorAll(".answer");
    for (let i = 0; i < answers.length; i++) {
        answers[i].addEventListener("mouseup", function() {
            if (this.value == correctAnswer) {
                userAnswers[questionNumberIndex] = "correct";
                nextQuestion(questionNumberIndex);
                statusText.textContent = "Correct!";
            } else {
                userAnswers[questionNumberIndex] = "incorrect";
                nextQuestion(questionNumberIndex);
                statusText.textContent = "Incorrect!";
            }
            if (answers.length === numberOfQuestions) {
                lastQuestion = true;
            }
        });
    }
    renderScore(userAnswers);
    
}

function startGame() {
    secondsLeft = timeToPlay;
    userAnswers = [];
    clearInterval(timerInterval);
    startCountdown()
    pickRandomQuestions();
    // Render the first question.
    renderQuestion(0);
    renderAnswers(0);
    listenForAnswers(0);
}

startButton.addEventListener("click", function() {
    startGame();
    startButton.value = "Restart";
});