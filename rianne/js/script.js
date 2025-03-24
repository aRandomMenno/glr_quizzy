function startQuiz() {
    username = document.getElementById("username").value;
    if (username.trim() === "") {
        alert("Voer een geldige naam in.");
        return;
    }
    localStorage.setItem("username", username);
    document.getElementById("login-container").style.display = "none";
    document.getElementById("quiz-container").style.display = "block";
}

let questions = [
    // Multiple Choice vragen
    { type: 'mc', question: 'Wat is cyberpesten?', options: ['A. Een vriend een meme sturen', 'B. Iemand online beledigen en bedreigen', 'C. Een privégesprek voeren'], answer: 'B' },
    { type: 'mc', question: 'Welke gevolgen kan cyberpesten hebben?', options: ['A. Stress en angst', 'B. Hogere cijfers op school', 'C. Meer vrienden maken'], answer: 'A' },
    { type: 'mc', question: 'Wat is een voorbeeld van cyberpesten?', options: ['A. Een positief bericht sturen', 'B. Iemand uitlachen in een groepschat', 'C. Iemand helpen met huiswerk'], answer: 'B' },
    { type: 'mc', question: 'Wat kun je doen als je wordt gepest online?', options: ['A. Negeren en wegklikken', 'B. Terugpesten', 'C. Het melden bij een volwassene'], answer: 'C' },
    { type: 'mc', question: 'Welke platforms worden het vaakst gebruikt voor cyberpesten?', options: ['A. Online games', 'B. Sociale media', 'C. Beide'], answer: 'C' },
    { type: 'mc', question: 'Wat is een catfish?', options: ['A. Een nepaccount dat iemand anders nadoet', 'B. Een vissoort', 'C. Een online quiz'], answer: 'A' },
    { type: 'mc', question: 'Wat is doxxing?', options: ['A. Het openbaar maken van iemands privégegevens', 'B. Een online game spelen', 'C. Een beveiligingsmaatregel'], answer: 'A' },
    { type: 'mc', question: 'Wat kun je doen als je ziet dat iemand cyberpesten meemaakt?', options: ['A. Er niets aan doen', 'B. De persoon steunen en het melden', 'C. Meedoen met het pesten'], answer: 'B' },
    { type: 'mc', question: 'Wat is het effect van cyberpesten op slachtoffers?', options: ['A. Meer zelfvertrouwen', 'B. Angst en depressie', 'C. Meer vrienden maken'], answer: 'B' },
    { type: 'mc', question: 'Waarom is cyberpesten zo gevaarlijk?', options: ['A. Het blijft vaak anoniem', 'B. Slachtoffers kunnen zich machteloos voelen', 'C. Beide zijn correct'], answer: 'C' },

    // Open vragen met correct antwoord
    { type: 'open', question: 'Noem twee gevolgen van cyberpesten.', answer: 'Angst, depressie, stress, sociale isolatie' },
    { type: 'open', question: 'Welke organisaties kunnen slachtoffers van cyberpesten helpen?', answer: 'Politie, Pestweb, Helpwanted.nl' },
    { type: 'open', question: 'Wat is een effectieve manier om cyberpesten te voorkomen?', answer: 'Sterke wachtwoorden, privacy-instellingen aanpassen, pesten melden' },

    // Open vragen zonder vast antwoord (mening)
    { type: 'open', question: 'Wat zou jij doen als je wordt gepest online?', answer: '' },
    { type: 'open', question: 'Wat zou jij veranderen aan social media om cyberpesten te verminderen?', answer: '' }
];

let userAnswers = {};
let currentQuestionIndex = 0;

function shuffleQuestions() {
    questions = questions.sort(() => Math.random() - 0.5);
}

function startQuiz() {
    shuffleQuestions();
    document.querySelector('.content').style.display = 'none';
    document.querySelector('.content2').style.display = 'block';
    document.getElementById('menu').style.display = 'block';
    loadQuestion();
}

function nextQuestion() {
    const currentQuestion = questions[currentQuestionIndex];

    // Opslaan van het antwoord
    if (currentQuestion.type === 'mc') {
        const selectedAnswer = document.querySelector('input[name="answer"]:checked');
        if (!selectedAnswer) {
            alert('Selecteer een antwoord voordat je verder gaat!');
            return;
        }
        userAnswers[currentQuestionIndex] = selectedAnswer.value;
    } else {
        const answerInput = document.querySelector('#answer-input').value.trim();
        if (!answerInput) {
            alert('Vul een antwoord in voordat je verder gaat!');
            return;
        }
        userAnswers[currentQuestionIndex] = answerInput;
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
    const menu = document.getElementById("menu");
    menu.innerHTML = "";
    for (let i = 1; i <= questions.length; i++) {
        let vraagNummer = document.createElement("h1");
        vraagNummer.textContent = i;
        vraagNummer.style.color = (i === currentQuestionIndex + 1) ? 'rgb(131,58,180)' : 'black';
        menu.appendChild(vraagNummer);
    }
}

function loadQuestion() {
    const questionData = questions[currentQuestionIndex];
    document.querySelector('.quiz h1').textContent = `Vraag ${currentQuestionIndex + 1}`;
    document.querySelector('.quiz h2').textContent = questionData.question;
    const answerContainer = document.getElementById('answer-container');
    answerContainer.innerHTML = "";

    if (questionData.type === 'mc') {
        questionData.options.forEach(option => {
            let label = document.createElement('label');
            label.innerHTML = `<input type="radio" name="answer" value="${option[0]}"> ${option}`;
            answerContainer.appendChild(label);
        });
    } else {
        answerContainer.innerHTML = `<input type="text" id="answer-input" placeholder="Typ hier je antwoord...">`;
    }

    document.getElementById('volgende-btn').textContent = currentQuestionIndex === questions.length - 1 ? 'Nakijken' : 'Volgende';
    updateMenu();
}

function showResults() {
    const resultContainer = document.getElementById('result-container');
    resultContainer.innerHTML = `
        <h2>📊 Jouw Resultaten</h2>
        <p>Bekijk hieronder je antwoorden. Bij fouten wordt uitleg gegeven.</p>
        <div class="results-list"></div>
        <div class="score"></div>
    `;

    const resultsList = resultContainer.querySelector('.results-list');
    let correctAnswersCount = 0; // Variabele voor het bijhouden van het aantal juiste antwoorden

    questions.forEach((question, index) => {
        let userAnswer = userAnswers[index] || "Geen antwoord";
        let correctAnswer = question.answer;
        let isCorrect = (question.type === 'mc') 
                        ? userAnswer === correctAnswer 
                        : userAnswer.toLowerCase().includes(correctAnswer.toLowerCase());
        
        // Verhoog het aantal correcte antwoorden als het antwoord goed is
        if (isCorrect || (question.type === 'open' && correctAnswer === "")) {
            correctAnswersCount++;
        }

        let resultItem = document.createElement('div');
        resultItem.classList.add('result-item');

        // Uitleg waarom een antwoord fout is (indien van toepassing)
        let explanation = "";
        if (!isCorrect && question.type === 'mc') {
            explanation = getExplanation(question.question);
        }

        // Open vragen hebben geen vast correct antwoord
        let correctText = (question.type === 'open' && correctAnswer === "") 
            ? "Dit is een open vraag zonder vast antwoord." 
            : `✅ Correct antwoord: <strong>${correctAnswer}</strong>`;

        resultItem.innerHTML = `
            <div class="question-box">
                <h3>Vraag ${index + 1}</h3>
                <p><strong>${question.question}</strong></p>
                <p><strong>Jouw antwoord:</strong> ${userAnswer}</p>
                <p class="feedback" style="color: ${isCorrect || question.type === 'open' ? 'green' : 'red'};">
                    <strong>
                        ${isCorrect || (question.type === 'open' && correctAnswer === "") ? '✔ Goed!' : '❌ Fout!'}
                    </strong>
                </p>
                ${question.type === 'open' && correctAnswer === "" ? 
                    '<p style="color: grey;">Geen fout antwoord beschikbaar voor deze open vraag.</p>' : ''}
                ${!isCorrect && question.type !== 'open' ? `<p>${correctText}</p>` : ''}
                <p style="color: grey;">${explanation}</p>
            </div>
            <hr class="separator">
        `;

        resultsList.appendChild(resultItem);
    });

    // Toon de score aan het einde
    const scoreContainer = resultContainer.querySelector('.score');
    const totalQuestions = questions.length;
    let displayName = document.getElementById("username").value;
    scoreContainer.innerHTML = `
        <h3>${displayName} heeft: ${correctAnswersCount} van de ${totalQuestions} vragen correct!</h3>
        <p>Dat is ${Math.round((correctAnswersCount / totalQuestions) * 100)}%!</p>
    `;

    
    document.querySelector('.content2').style.display = 'none';
    resultContainer.style.display = 'block';
}

// Uitleg voor foutieve antwoorden
function getExplanation(question) {
    const explanations = {
        "Wat is cyberpesten?": "Cyberpesten betekent iemand online beledigen, bedreigen of lastigvallen. Het is geen normaal gesprek of grap.",
        "Welke gevolgen kan cyberpesten hebben?": "Cyberpesten kan leiden tot angst, depressie en zelfs ernstige mentale problemen.",
        "Wat is een voorbeeld van cyberpesten?": "Uitlachen in een groepschat is een vorm van pesten, terwijl positieve berichten juist goed zijn.",
        "Wat kun je doen als je wordt gepest online?": "Het melden bij een volwassene of platform helpt, terwijl terugpesten het probleem erger maakt.",
        "Welke platforms worden het vaakst gebruikt voor cyberpesten?": "Cyberpesten gebeurt vaak op sociale media én in online games, niet alleen op één van de twee.",
        "Wat is een catfish?": "Een catfish is iemand die zich voordoet als een ander online, vaak om anderen te misleiden.",
        "Wat is doxxing?": "Doxxing betekent het publiceren van iemands privégegevens zonder toestemming, wat gevaarlijk kan zijn.",
        "Wat kun je doen als je ziet dat iemand cyberpesten meemaakt?": "De beste reactie is om de persoon te steunen en het te melden, niet om het te negeren.",
        "Wat is het effect van cyberpesten op slachtoffers?": "Cyberpesten kan leiden tot angst en depressie, niet tot meer vrienden of zelfvertrouwen.",
        "Waarom is cyberpesten zo gevaarlijk?": "Cyberpesten is gevaarlijk omdat het vaak anoniem is en slachtoffers zich machteloos voelen."
    };
    return explanations[question] || "";
}


document.addEventListener('DOMContentLoaded', loadQuestion);

