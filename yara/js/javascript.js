let questions = [
    { type: 'mc', question: 'Wat betekent "DM" op sociale media?', options: ['A. Direct Message', 'B. Data Management', 'C. Digital Marketing'], answer: 'A' },
    { type: 'mc', question: 'Wat is een "meme"?', options: ['A. Een grappige afbeelding of video', 'B. Een computervirus', 'C. Een programmeertaal'], answer: 'A' },
    { type: 'mc', question: 'Wat betekent "trending" op Twitter?', options: ['A. Een populaire trend', 'B. Een nieuw account', 'C. Een bug in de app'], answer: 'A' },
    { type: 'mc', question: 'Wat is een "hashtag"?', options: ['A. Een type code', 'B. Een label voor posts', 'C. Een wachtwoord'], answer: 'B' },
    { type: 'mc', question: 'Wat is een "influencer"?', options: ['A. Een virus', 'B. Iemand met veel volgers die merken promoot', 'C. Een hacker'], answer: 'B' },
    { type: 'mc', question: 'Wat betekent "viral gaan"?', options: ['A. Een virus oplopen', 'B. Snel populair worden', 'C. Een nepnieuwsbericht delen'], answer: 'B' },
    { type: 'mc', question: 'Wat is een "troll" op sociale media?', options: ['A. Iemand die expres ruzie zoekt', 'B. Een soort robot', 'C. Een bekende YouTuber'], answer: 'A' },
    { type: 'mc', question: 'Wat is een "story" op Instagram?', options: ['A. Een blogpost', 'B. Een tijdelijke foto of video', 'C. Een online roman'], answer: 'B' },
    { type: 'mc', question: 'Wat is een "filter" op sociale media?', options: ['A. Een tool om foto’s te bewerken', 'B. Een app voor video-editing', 'C. Een beveiligingsinstelling'], answer: 'A' },
    { type: 'mc', question: 'Wat betekent "FOMO"?', options: ['A. Fear of Missing Out', 'B. Follow My Online', 'C. Friends Over Media'], answer: 'A' },
    { type: 'mc', question: 'Wat is een "bio" op sociale media?', options: ['A. Een kort profieltekstje', 'B. Een document over je leven', 'C. Een beveiligingsinstelling'], answer: 'A' },
    { type: 'mc', question: 'Wat is "shadowbanning"?', options: ['A. Een onzichtbare straf waardoor je posts minder zichtbaar zijn', 'B. Een soort filter voor donkere foto’s', 'C. Een manier om je account te beveiligen'], answer: 'A' },
    { type: 'mc', question: 'Wat betekent "engagement" op sociale media?', options: ['A. Hoeveel interactie je posts krijgen', 'B. Een verloving aankondigen', 'C. Een account verwijderen'], answer: 'A' },
    { type: 'mc', question: 'Wat is een "algorithm" op sociale media?', options: ['A. Een systeem dat bepaalt welke content je ziet', 'B. Een nieuw social media-platform', 'C. Een beveiligingsinstelling'], answer: 'A' },
    { type: 'mc', question: 'Wat betekent "verified" op sociale media?', options: ['A. Een blauw vinkje om authenticiteit te tonen', 'B. Een account met veel volgers', 'C. Een beveiligingsfunctie'], answer: 'A' }
];

let userAnswers = {};
let currentQuestionIndex = 0;

function shuffleQuestions() {
    questions = questions.sort(() => Math.random() - 0.5);
}

function startQuiz() {
    shuffleQuestions();
    document.querySelector('.quiz-content').style.display = 'none';
    document.querySelector('.quiz-section').style.display = 'block';
    document.getElementById('quiz-menu').style.display = 'block';
    loadQuestion();
}

function nextQuestion() {
    const currentQuestion = questions[currentQuestionIndex];

    if (currentQuestion.type === 'mc') {
        const selectedAnswer = document.querySelector('input[name="answer"]:checked');
        if (!selectedAnswer) {
            alert('Selecteer een antwoord voordat je verder gaat!');
            return;
        }
        userAnswers[currentQuestionIndex] = selectedAnswer.value;
    }

    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        loadQuestion();
    } else {
        showResults();
    }
}

function prevQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        loadQuestion();
    }
}

function updateMenu() {
    const menu = document.getElementById("quiz-menu");
    menu.innerHTML = "";
    for (let i = 1; i <= questions.length; i++) {
        let vraagNummer = document.createElement("h1");
        vraagNummer.textContent = i;
        vraagNummer.style.color = (i === currentQuestionIndex + 1) ? 'rgb(58,131,180)' : 'black';
        menu.appendChild(vraagNummer);
    }
}

function loadQuestion() {
    const questionData = questions[currentQuestionIndex];
    document.querySelector('.quiz-questions h1').textContent = `Vraag ${currentQuestionIndex + 1}`;
    document.querySelector('.quiz-questions h2').textContent = questionData.question;
    const answerContainer = document.getElementById('answer-container');
    answerContainer.innerHTML = "";

    if (questionData.type === 'mc') {
        questionData.options.forEach(option => {
            let label = document.createElement('label');
            label.innerHTML = `<input type="radio" name="answer" value="${option[0]}"> ${option}`;
            answerContainer.appendChild(label);
        });
    }

    document.getElementById('volgende-btn').textContent = currentQuestionIndex === questions.length - 1 ? 'Nakijken' : 'Volgende';
    updateMenu();
}

function showResults() {
    const resultContainer = document.getElementById('result-container');
    resultContainer.innerHTML = `
        <h2>📊 Jouw Resultaten</h2>
        <p>Bekijk hieronder je antwoorden.</p>
        <div class="results-list"></div>
    `;

    const resultsList = resultContainer.querySelector('.results-list');

    questions.forEach((question, index) => {
        let userAnswer = userAnswers[index] || "Geen antwoord";
        let correctAnswer = question.answer;
        let isCorrect = userAnswer === correctAnswer;
        let resultItem = document.createElement('div');
        resultItem.classList.add('result-item');

        let correctText = isCorrect ? "" : `<p style="color: blue;">✅ Correct antwoord: <strong>${correctAnswer}</strong></p>`;

        resultItem.innerHTML = `
            <div class="question-box">
                <h3>Vraag ${index + 1}</h3>
                <p><strong>${question.question}</strong></p>
                <p><strong>Jouw antwoord:</strong> ${userAnswer}</p>
                <p class="feedback" style="color: ${isCorrect ? 'green' : 'red'};">
                    <strong>${isCorrect ? '✔ Correct!' : '❌ Fout!'}</strong>
                </p>
                ${correctText}
            </div>
            <hr class="separator">
        `;
        resultsList.appendChild(resultItem);
    });

    document.querySelector('.quiz-section').style.display = 'none';
    resultContainer.style.display = 'block';
}

document.addEventListener('DOMContentLoaded', loadQuestion);
