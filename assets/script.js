let startButton = document.querySelector('#start');
let questionArea = document.querySelector("question");
let answerList = document.querySelector("#answers");
let countdownText = document.querySelector("#countdown");

let questions = [];
let questionBank = [];

questions.push({
    question: "What is a string?",
    answers: [
        'A combination of characters, that can be strung into a variable.',
        'A piece of yarn.',
        'A number.',
        'A true or false value.'
    ], 
    correct: 0
}, {
    question: "What is a variable?",
    answers: [
        'A uniquely named thing that stores a reference to a piece of information, which can change.',
        'Something that wiggles.',
        'A number.',
        'Something that changes, like the weather.'
    ],
    correct: 0
})

function pickRandomQuestions() {
    questionBank = [];
    let numberOfQuestions = 10;

    for (let i = 0; i < numberOfQuestions; i++) {
        questionBank.push(questions[Math.floor((questions.length) * Math.random())]);
    }
    console.log(questionBank);
}

function renderQuestion(questionNumber) {
    questionArea.textContent = questionBank[questionNumber].question;
}

function renderAnswers(questionNumber) {
    let answerHTML = "<li>" + questionBank[questionNumber].answers.a + "</li>"; 
    answerHTML += "<li>" + questionBank[questionNumber].answers.b + "</li>"; 
    answerHTML += "<li>" + questionBank[questionNumber].answers.c + "</li>"; 
    answerHTML += "<li>" + questionBank [questionNumber].answers.d + "</li>"; 
    answerList.innerHTML = answerHTML;
}

function startCountdown() {
    countdownText.innerHTML("<p style=\"font-size: 50px\">Started Countdown</p>");
}

function startGame() {
    startCountdown()
    pickRandomQuestions();
    //for each question in questionbank.
    renderQuestion(0);
    renderAnswers(0);
}
if (startButton) {
startButton.addEventListener("click", function() {
    startGame();
    startButton.value = 'Restart';
});
} else {
    console.log("No start button found.");
}



console.log(questions);