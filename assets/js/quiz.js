
/* 
As per https://ossja.ucdavis.edu/suggestions-avoiding-academic-misconduct

Avoid Plagiarism

Do your best to put information in your own words and document all sources that you use,
including websites and content generated by artificial intelligence (AI).
    - The array assigned to the variable "questionsAI" in the "questionsAI.js" file were generated using ChatGPT and Copilot.
        - The file is, by default, commented out of the project.
        - I changed some of the answers to make them easier to remember the right ones. :)
        
Questions taken from:   https://www.w3schools.com/quiztest/quiztest.asp?qtest=JavaScript
                        https://mindmajix.com/full-stack-developer-interview-questions


If I cannot do this, please let me know and I will generate a new set of questions and answers.

The same process could be used to generate questions for other subjects.

If I had more time, I would add an input to take in a json file and be able to load sets of other questions.

All other code was written by Mark Ciubal, unless otherwise stated.

*/

/* Declare globally scoped variables. */
/* Set up questions. */
const timeToPlay = 60;
const numberOfQuestions = 10;
const incorrectPenalty = 5;

let secondsLeft = timeToPlay;
let scoreboard = document.querySelector('scoreboard');
let scores = document.querySelector('#scores');
let highscoresText = document.querySelector('#highScores');
let closeScores = document.querySelector('#closeScoreboard')
let score = document.querySelector("#currentScore");
let countdownText = document.querySelector("#countdown");
let questionArea = document.querySelector("question");
let gameoverArea = document.querySelector("gameover");
let answerList = document.querySelector("#answers");
let answers = document.querySelectorAll(".answer");
let statusText = document.querySelector("#status");
let startButton = document.querySelector("#start");
let nameValue = document.querySelector('#name');
let correctElement = document.querySelector('correct');

let lastQuestion = false;

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
}, {
    question: "Which line of code would select the first element with the class 'example'?",
    answers: [
        "document.window;",
        "document.gelementByID('#example');",
        "document.querySelector('.example');",
        "alert('You are wrong!');"
    ],
    correct: 2
}, {
    question: `What is the correct JavaScript syntax to change the content of the HTML element below?
    
    <p id="demo">This is a demonstration.</p>`,
    answers: [
        "document.getElement('demo').innerHTML('Hello World!');",
        "document.getElementByName('p').innerHTML('Hello World!');",
        "document.getElementById('demo').innerHTML = 'Hello World!';",
        "document.getElementById('p').innerHTML('Hello World!')';"
    ],
    correct: 2
}, {
    question: "How do you write 'Hello World' in an alert box?",
    answers: [
        "alertBox('Hello World');",
        "msg('Hello World');",
        "alert('Hello World!'); <- This one is alert-y!",
        "msgBox('Hello World');"
    ],
    correct: 2
}, {
    question: "How do you create a function in JavaScript?",
    answers: [
        "function = myFunction()",
        "function myFunction()",
        "function:myFunction()",
        "function myFunction() { //code goes here }", 
    ],
    correct: 3
}, {
    question: "How do you call a function named 'myFunction'?",
    answers: [
        "call myFunction();",
        "call function myFunction();",
        "myFunction();",
        "myFunction;"
    ],
    correct: 2
}];

// list of all questions, choices, and answers
var questionsSlack = [
    {
        question: 'Commonly used data types DO NOT include:',
        answers: ['strings', 'booleans', 'alerts', 'numbers'],
        correct: 2,
    },
    {
        question: 'The condition in an if / else statement is enclosed within ____.',
        answers: ['quotes', 'curly brackets', 'parentheses', 'square brackets'],
        correct: 2,
    },
    {
        question: 'Arrays in JavaScript can be used to store ____.',
        answers: [
        'numbers and strings',
        'other arrays',
        'booleans',
        'all of the above',
      ],
      correct: 3,
    },
    {
        question: 'String values must be enclosed within ____ when being assigned to variables.',
        answers: ['commas', 'curly brackets', 'quotes', 'parentheses'],
        correct: 2,
    },
    {
        question: 'A very useful tool used during development and debugging for printing content to the debugger is:',
        answers: ['JavaScript', 'terminal / bash', 'for loops', 'console.log'],
        correct: 3,
    },
  ];

questions.push(...questionsSlack);

if (typeof questionsAI !== 'undefined') {
    questions.push(...questionsAI);
}

let originalQuestions = [...questions];

// How many questions are we picking from?
console.log("Questions Loaded: " + questions.length);

/* Set up bank of questions that will be pulled through in the quiz. */
let questionBank = [];

/* Globally scope the timer interval so that it may be reset at any point. */
let timerInterval;

/* Give up access to user input at any time. */
let userAnswers = [];

let scoreObject = {
    name: "Anonymous",
    points: 0,
    percentage: 0,
    correct: 0,
    incorrect: 0
}
/* Points to 0, this is different than score because points grows by a product of time left. */
let points = 0;
let currentScores;

// If there's any value in the currentScores stored item, retrieve it.
if (JSON.parse(localStorage.getItem("currentScores"))) {
    currentScores = JSON.parse(localStorage.getItem("currentScores"));
} else {
    currentScores = [];
}

// Picks a random question from the questions array.
function pickRandomQuestions() {
    // Reset to pick an array of brand new questions, including previously answered.
    questions = [...originalQuestions];

    /* Set to blank array if it exists. Prevents stacking of questionBank results. */
    questionBank = [];

    /* Pick a random element in the "questions" array, and push it into the questionBank. */
    /* The global variable "numberOfQuestions" is preset and hard-coded into the application.
        - See TODO list.
    */
    for (let i = 0; i < numberOfQuestions; i++) {
        let randomQuestionIndex = Math.floor((questions.length) * Math.random());
        randomQuestion = questions[randomQuestionIndex];
        questionBank.push(randomQuestion);

        // Remove this question from the list of candidates to prevent duplication of questions.
        question = questions.splice(randomQuestionIndex, 1);
    }
    console.log(questionBank);
}

/* Render the question to the "questionArea". */
function renderQuestion(questionNumberIndex) {
    if (questionNumberIndex < numberOfQuestions) {
        questionArea.textContent = questionBank[questionNumberIndex].question;
    } else {
        gameOver();
    }
}

/* Render the answers to answerHTML. */
function renderAnswers(questionNumberIndex) {
    if (questionNumberIndex < numberOfQuestions) {
        let answerHTML = "";
        for (let i = 0; i < questionBank[questionNumberIndex].answers.length; i++) {
            let thisAnswerText = questionBank[questionNumberIndex].answers[i];
            answerHTML += `<li><button class="answer" value="${i}">${thisAnswerText}</button></li>`; 
        }
        answerList.innerHTML = answerHTML;
    }
}


/* Starts the game countdown timer. */
function startCountdown() {
    countdownText.innerHTML = timeToPlay + " seconds";
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
    // Render question and answers.
    let nextQuestion = questionNumberIndex + 1;
    // If the next question is the last question, then end the game.
    // This will happen when the index of the next question is 9, which is the 10 question.

    renderQuestion(nextQuestion);
    renderAnswers(nextQuestion);
    listenForAnswers(nextQuestion);
}

function renderScore(userAnswers) {
    let numberCorrect = 0;
    let numberIncorrect = 0;

    // Tally up score.
    for (let i = 0; i < userAnswers.length; i++) {
        if (userAnswers[i] === "correct") {
            numberCorrect++;
            if (secondsLeft > 0) {
                points += 10 * secondsLeft;
            }
        } else if (userAnswers[i] === "incorrect") {
            numberIncorrect++;
        }
    }

    // Calculate the precentage of correct items.
    let percentageCorrect = ((numberCorrect/(numberCorrect + numberIncorrect))*100).toFixed(0);
    if (percentageCorrect === "NaN") {
        percentageCorrect = 0;
    }
        
    scoreObject = {
        name: nameValue.value,
        points: points,
        percentage: percentageCorrect,
        correct: numberCorrect,
        incorrect: numberIncorrect
    }

    // Display the score in the score area (top left of the page).
    score.textContent = `Points: ${points} | Correct: ${numberCorrect} | Incorrect: ${numberIncorrect} | ${percentageCorrect}%`;
}

// Listens on ".answer" classed elements to check for clicks.
// If something is clicked it checks the value, logs it, and moves on to the next question.
function listenForAnswers(questionNumberIndex) {
    if (questionNumberIndex < numberOfQuestions) {
        let correctAnswer = questionBank[questionNumberIndex].correct;
        answers = document.querySelectorAll(".answer");
        for (let i = 0; i < answers.length; i++) {
            answers[i].addEventListener("mouseup", function(event) {
                event.preventDefault();
                if (this.value == correctAnswer) {
                    userAnswers[questionNumberIndex] = "correct";
                    statusText.innerHTML = `<span class="correctAnswer">Correct!</span>`;
                } else {
                    secondsLeft = secondsLeft - incorrectPenalty;
                    // Shows the score with red incorrect penalty text.
                    countdownText.innerHTML = `<span style="color: red">${secondsLeft + incorrectPenalty}-${incorrectPenalty}</span> Seconds`;
                    userAnswers[questionNumberIndex] = "incorrect";
                    statusText.innerHTML = `<span class="incorrectAnswer">Incorrect!</span>`;
                }
                nextQuestion(questionNumberIndex);
            });
        }
    }
    renderScore(userAnswers);
    
}

function renderHighScores() {
    let scoreList = JSON.parse(localStorage.getItem("currentScores"));

    /* Sort the table from highest to lowest points value. */
    scoreList = scoreList.sort(function(a,b) {
        return +b.points - +a.points;
    });
    let scoreTable = `<tr><th>Name</th><th>Score</th></tr>`;
    for (let i = 0; i < scoreList.length; i++) {
        if (scoreList[i].points != 0) {
            scoreTable += `<tr><td>${scoreList[i].name}</td><td>${scoreList[i].points}</td></tr>`;
        }
    }
    scores.innerHTML = scoreTable;
}

function startGame() {
    // Reset the score object if new game.
    scoreObject = {
        name: nameValue.value,
        points: scoreObject.points,
        percentage: scoreObject.percentage,
        correct: scoreObject.correct,
        incorrect: scoreObject.incorrect
    }

    // If a game just ended, push the scoreObject to currentScores.
    currentScores.push(scoreObject);

    // Store to currentScores.
    localStorage.setItem("currentScores", JSON.stringify(currentScores));

    /* Reset timer, points, and answers. */
    secondsLeft = timeToPlay;
    clearInterval(timerInterval);
    points = 0;
    userAnswers = [];
    gameoverArea.textContent = "";
    gameoverArea.className = "";
    nameValue.style = "display: none;";
    startCountdown()
    pickRandomQuestions();

    // Render the first question, answers, and listen for answers from newly created elements.
    renderQuestion(0);
    renderAnswers(0);
    listenForAnswers(0);
}

function showScores() {
    renderHighScores();
    scoreboard.className = "visible";
}

function hideScores() {
    scoreboard.className = 'hidden';
}

startButton.addEventListener("click", function() {
    startGame();
    startButton.value = "Restart";
});

highscoresText.addEventListener("click", function() {
    showScores();
});

closeScores.addEventListener("click", function() {
    hideScores();
});

function gameOver() {
    clearInterval(timerInterval);
    countdownText.innerHTML = "";
    gameoverArea.className = 'gameover';
    gameoverArea.textContent = "GAME OVER";
    questionArea.textContent = "";
    if (statusText) {
        statusText.textContent = "";
    } else {
        alert("Could not find status text.");
    }
    nameValue.style = "display: all";
    answerList.innerHTML = "";
    statusText.textContent = '';
    startButton.value = "Save and Restart";
    localStorage.setItem("score", JSON.stringify(scoreObject));
}