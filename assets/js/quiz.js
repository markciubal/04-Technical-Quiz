
/* TODO:
    - Make elements to pick constants instead of hard-coding them.
    - Add local storage to save high schores.
*/
/* Helper functions. 

FROM: https://stackoverflow.com/questions/951021/what-is-the-javascript-version-of-sleep */
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const timeToPlay = 60;
const numberOfQuestions = 10;
let secondsLeft = timeToPlay;

let score = document.querySelector("#currentScore");
let countdownText = document.querySelector("#countdown");

let questionArea = document.querySelector("question");
let gameoverArea = document.querySelector("gameover");
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

let scoreObject = {
    points: 0,
    percentage: 0,
    correct: 0,
    incorrect: 0
}
/* Points to 0, this is different than score because points grows by a product of time left. */
let points = 0;
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
            countdownText.innerHTML = "";
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
            points += 10 * secondsLeft;
        } else if (userAnswers[i] === "incorrect") {
            numberIncorrect++;
        }
    }
    let percentageCorrect = ((numberCorrect/(numberCorrect + numberIncorrect))*100).toFixed(0);
    if (percentageCorrect === "NaN") {
        percentageCorrect = 0;
    }
        
    scoreObject = {
        points: points,
        percentage: percentageCorrect,
        correct: numberCorrect,
        incorrect: numberIncorrect
    }

    localStorage.setItem("score", JSON.stringify(scoreObject));

    score.textContent = `Points: ${points} | Correct: ${numberCorrect} | Incorrect: ${numberIncorrect} | ${percentageCorrect}%`;
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
                statusText.textContent = "Correct!";
            } else {
                secondsLeft = secondsLeft - 5;
                userAnswers[questionNumberIndex] = "incorrect";
                statusText.textContent = "Incorrect!";
            }
            nextQuestion(questionNumberIndex);
        });
    }

    renderScore(userAnswers);
    
}

function startGame() {
    /* Reset timer, points, and answers. */
    secondsLeft = timeToPlay;
    clearInterval(timerInterval);
    points = 0;
    userAnswers = [];
    gameoverArea.textContent = "";
    gameoverArea.className = "";
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

function gameOver(userAnswers) {
    clearInterval(timerInterval);
    countdownText.innerHTML = "";
    gameoverArea.className = 'gameover';
    gameoverArea.textContent = "G A M E   O V E R";
    questionArea.textContent = "";
    if (statusText) {
        console.log("Found status text.");
        statusText.textContent = "";
    } else {
        alert("Could not find status text.");
    }
    
    answerList.innerHTML = "";
    
}