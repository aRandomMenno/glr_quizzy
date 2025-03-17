let questions = [
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
    { type: 'open', question: 'Wat zou jij doen als je wordt gepest online?', answer: '' },
    { type: 'open', question: 'Waarom denk je dat mensen cyberpesten?', answer: '' },
    { type: 'open', question: 'Wat kan de overheid doen tegen cyberpesten?', answer: '' },
    { type: 'open', question: 'Heb jij ooit cyberpesten meegemaakt? Zo ja, hoe voelde dat?', answer: '' },
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

    if (currentQuestionIndex < 14) {
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
    for (let i = 1; i <= 15; i++) {
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

    document.getElementById('volgende-btn').textContent = currentQuestionIndex === 14 ? 'Nakijken' : 'Volgende';
    updateMenu();
}

function showResults() {
    alert('Je hebt de quiz voltooid! Bekijk je antwoorden.');
}

document.addEventListener('DOMContentLoaded', loadQuestion);