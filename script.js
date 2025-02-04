const quiz = [
    { question: "What is the capital of France?", options: ["Paris", "Berlin", "Madrid", "Rome"], correct: 0 },
    { question: "What is 5 + 7?", options: ["10", "11", "12", "13"], correct: 2 },
    { question: "Which language is used for system programming?", options: ["Python", "C++", "Java", "Ruby"], correct: 1 },
    { question: "Which planet is known as the Red Planet?", options: ["Earth", "Mars", "Jupiter", "Venus"], correct: 1 },
    { question: "Which ocean is the largest?", options: ["Atlantic", "Indian", "Pacific", "Arctic"], correct: 2 }
];

let currentQuestion = 0;
let userAnswers = [];

function loadQuestion() {
    if (currentQuestion >= quiz.length) {
        showThankYouPage();
        return;
    }

    let q = quiz[currentQuestion];
    document.getElementById("question").innerHTML = q.question;
    document.getElementById("options").innerHTML = q.options
        .map((option, index) => `<button class="option" onclick="selectAnswer(${index})">${option}</button>`)
        .join('');
    
    document.getElementById("progress").innerText = `Question ${currentQuestion + 1} of ${quiz.length}`;
    document.getElementById("prev-btn").disabled = (currentQuestion === 0);
    document.getElementById("next-btn").disabled = true;
}

function selectAnswer(index) {
    userAnswers[currentQuestion] = index;
    document.querySelectorAll(".option").forEach((btn, i) => {
        btn.classList.toggle("selected", i === index);
    });
    document.getElementById("next-btn").disabled = false;
}

function prevQuestion() {
    if (currentQuestion > 0) {
        currentQuestion--;
        loadQuestion();
    }
}

function nextQuestion() {
    if (currentQuestion < quiz.length - 1) {
        currentQuestion++;
        loadQuestion();
    } else {
        showSubmitButton();
    }
}

function showSubmitButton() {
    // Check if the submit button already exists before adding a new one
    if (!document.getElementById("submit-btn")) {
        document.getElementById("quiz-content").innerHTML += `
            <button id="submit-btn" onclick="submitQuiz()">Submit Quiz</button>
        `;
    }
}

function submitQuiz() {
    let score = userAnswers.filter((ans, i) => ans === quiz[i].correct).length;
    document.getElementById("quiz-content").classList.add("hidden");
    document.getElementById("result").classList.remove("hidden");
    document.getElementById("result").innerHTML = `
        <p class="thank-you">🎉 Thanks for Playing! 🎉</p>
        <p>Your Final Score: ${score}/${quiz.length}</p>
        <button id="restart-btn" onclick="restartQuiz()">🔄 Play Again</button>
    `;
}

function restartQuiz() {
    currentQuestion = 0;
    userAnswers = [];
    document.getElementById("quiz-content").classList.remove("hidden");
    document.getElementById("result").classList.add("hidden");
    loadQuestion();
}

window.onload = loadQuestion;
