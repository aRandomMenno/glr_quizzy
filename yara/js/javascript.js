const questions = [
    { question: "Wat betekent DM op social media?", answers: ["Direct Message", "Digital Mail", "Data Management"], correct: 0 },
    { question: "Wat betekent hashtag?", answers: ["Een trending onderwerp", "Een merknaam", "Een code"], correct: 0 },
    { question: "Wat is een influencer?", answers: ["Iemand die producten promoot", "Een programmeur", "Een hacker"], correct: 0 },
    { question: "Wat betekent 'viral gaan'?", answers: ["Snel populair worden", "Een virus oplopen", "Een website maken"], correct: 0 },
    { question: "Wat is een meme?", answers: ["Een grappige afbeelding", "Een videospel", "Een computercode"], correct: 0 },
    { question: "Wat is een troll op het internet?", answers: ["Iemand die anderen pest", "Een gamer", "Een programmeertaal"], correct: 0 },
    { question: "Wat betekent 'like' op social media?", answers: ["Een positieve reactie", "Een negatieve reactie", "Een melding"], correct: 0 },
    { question: "Wat is een bio op Instagram?", answers: ["Een korte beschrijving van jezelf", "Een fotoalbum", "Een video"], correct: 0 },
    { question: "Wat betekent 'follow' op social media?", answers: ["Iemand volgen", "Iemand blokkeren", "Iemand berichten sturen"], correct: 0 },
    { question: "Wat betekent 'story' op Instagram?", answers: ["Een tijdelijke post", "Een blogartikel", "Een film"], correct: 0 },
];

let currentQuestionIndex = 0;
let score = 0;

document.getElementById("start-quiz").addEventListener("click", function() {
    document.querySelector(".intro").style.display = "none";
    document.getElementById("quiz-container").style.display = "block";
    loadQuestion();
});

function loadQuestion() {
    const questionEl = document.getElementById("question-text");
    const optionsContainer = document.getElementById("options-container");
    const questionNumberEl = document.getElementById("question-number");

    questionEl.textContent = questions[currentQuestionIndex].question;
    questionNumberEl.textContent = `Vraag ${currentQuestionIndex + 1}`;
    optionsContainer.innerHTML = "";

    questions[currentQuestionIndex].answers.forEach((answer, index) => {
        const button = document.createElement("button");
        button.textContent = answer;
        button.className = "answer-button";
        button.addEventListener("click", () => checkAnswer(index));
        optionsContainer.appendChild(button);
    });
}

function checkAnswer(selectedIndex) {
    if (selectedIndex === questions[currentQuestionIndex].correct) {
        score++;
    }
    nextQuestion();
}

function nextQuestion() {
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        loadQuestion();
    } else {
        showResults();
    }
}

function showResults() {
    document.getElementById("quiz-container").innerHTML = `<h2>Quiz afgerond!</h2>
    <p>Je score: ${score} van de ${questions.length}</p>`;
}

document.getElementById("next").addEventListener("click", nextQuestion);
document.getElementById("prev").addEventListener("click", () => {
    if (currentQuestionIndex > 0) currentQuestionIndex--;
    loadQuestion();
});
document.getElementById("skip").addEventListener("click", nextQuestion);

document.addEventListener("DOMContentLoaded", loadQuestion);
