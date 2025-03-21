const quiz = document.getElementById("quiz");
const quiz_vragen_lijst = document.getElementById("quiz_vragen_lijst");
const header = document.querySelector("header");
const landing = document.getElementById("landing");

let current_question = 1;
let correct_answers = 0;
let incorrect_answers = 0;
let quiz_active = false;
let selected_questions = [];
let user_answers = [];
let current_index = 0;
let selected_answer = null;

function start_quiz() {
    if (!initialize_quiz()) {
        alert("There was a problem setting up the quiz. Please try again.");
        return;
    }

    quiz_active = true;
    quiz.classList.remove("hidden");
    quiz_vragen_lijst.classList.remove("hidden");
    landing.classList.add("hidden");
    header.classList.remove("header_landing");
    header.classList.add("header_quiz");
    show_question(0);
}

function initialize_quiz() {
    let multiple_choice_questions = [];
    let open_ended_questions = [];

    for (let id in questions) {
        if (questions[id].questionType === "multiple_choice") {
            multiple_choice_questions.push({ ...questions[id], id });
        } else if (questions[id].questionType === "open_ended") {
            open_ended_questions.push({ ...questions[id], id });
        }
    }

    if (open_ended_questions.length < 5) {
        console.error("Not enough open-ended questions!");
        return false;
    }

    let selected_open_ended = [];
    while (selected_open_ended.length < 5) {
        let random_index = Math.floor(Math.random() * open_ended_questions.length);
        selected_open_ended.push(open_ended_questions.splice(random_index, 1)[0]);
    }

    let selected_multiple_choice = [];
    const mc_to_select = Math.min(10, multiple_choice_questions.length);
    while (selected_multiple_choice.length < mc_to_select) {
        let random_index = Math.floor(Math.random() * multiple_choice_questions.length);
        selected_multiple_choice.push(multiple_choice_questions.splice(random_index, 1)[0]);
    }

    selected_questions = [...selected_open_ended, ...selected_multiple_choice];
    selected_questions = shuffle_array(selected_questions);
    user_answers = selected_questions.map(() => null);
    return true;
}

function shuffle_array(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function show_question(index) {
    if (index < 0 || index >= selected_questions.length) {
        console.error("Question index out of bounds");
        return;
    }

    current_index = index;
    const question = selected_questions[index];
    document.getElementById("vraag").textContent = `Vraag ${index + 1} van ${selected_questions.length}: ${question.question}`;
    document.getElementById("awn_a").classList.add("hidden");
    document.getElementById("awn_b").classList.add("hidden");
    document.getElementById("awn_c").classList.add("hidden");
    document.getElementById("awn_d").classList.add("hidden");
    document.getElementById("open_question").classList.add("hidden");
    document.getElementById("awn_a").classList.remove("selected");
    document.getElementById("awn_b").classList.remove("selected");
    document.getElementById("awn_c").classList.remove("selected");
    document.getElementById("awn_d").classList.remove("selected");

    const questionImage = document.querySelector(".question_image");
    if (question.image) {
        questionImage.src = question.image;
        questionImage.classList.remove("hidden");
    } else {
        questionImage.src = "";
        questionImage.classList.add("hidden");
    }

    if (question.questionType === "multiple_choice") {
        for (let option in question.answers) {
            const element = document.getElementById(`awn_${option}`);
            element.textContent = `${option.toUpperCase()}: ${question.answers[option]}`;
            element.classList.remove("hidden");
            if (user_answers[index] === option) {
                element.classList.add("selected");
                selected_answer = option;
            }
        }
    } else if (question.questionType === "open_ended") {
        const textarea = document.getElementById("open_question");
        textarea.classList.remove("hidden");
        textarea.value = user_answers[index] || "";
        
        if (user_answers[index] && typeof user_answers[index] === 'object' && user_answers[index].text) {
            textarea.value = user_answers[index].text;
        } else {
            textarea.value = user_answers[index] || "";
        }
    }
    document.getElementById("previous").disabled = index === 0;
    document.getElementById("skip").textContent = index === selected_questions.length - 1 ? "Afronden" : "Vraag overslaan";
    update_question_list();
}

function guess(option) {
    document.getElementById("awn_a").classList.remove("selected");
    document.getElementById("awn_b").classList.remove("selected");
    document.getElementById("awn_c").classList.remove("selected");
    document.getElementById("awn_d").classList.remove("selected");
    document.getElementById(`awn_${option}`).classList.add("selected");
    selected_answer = option;
}

function confirm() {
    const current_question = selected_questions[current_index];
    if (current_question.questionType === "multiple_choice") {
        user_answers[current_index] = selected_answer;
    } else if (current_question.questionType === "open_ended") {
        const answer_text = document.getElementById("open_question").value;
        if (answer_text === "") {
            alert("Gebruik de vraag overslaan knop als je de vraag wil overslaan.");
            return;
        }
        user_answers[current_index] = {
            text: answer_text,
            self_evaluated: false,
            is_correct: false
        };
    }

    selected_answer = null;
    if (current_index < selected_questions.length - 1) {
        show_question(current_index + 1);
    } else {
        const open_ended_indices = [];
        for (let i = 0; i < selected_questions.length; i++) {
            if (selected_questions[i].questionType === "open_ended" &&
                user_answers[i] &&
                !user_answers[i].self_evaluated) {
                open_ended_indices.push(i);
            }
        }

        if (open_ended_indices.length > 0) {
            show_open_ended_evaluation(open_ended_indices, 0);
        } else {
            end_quiz_and_show_results();
        }
    }
}

function show_open_ended_evaluation(indices, current) {
    if (current >= indices.length) {
        end_quiz_and_show_results();
        return;
    }

    const questionIndex = indices[current];
    const question = selected_questions[questionIndex];
    const user_answer = user_answers[questionIndex].text;
    const user_answer_text = user_answer && user_answer.text ? user_answer.text : user_answer;
    const quiz_element = document.getElementById("quiz");

    let evaluation_html = `
        <div class="self_evaluation">
            <h2>Beoordeel je antwoord (${current + 1} van ${indices.length})</h2>
            <div class="evaluation_content">
                <div class="question_container">
                    <h3>Vraag:</h3>
                    <p class="question_text">${question.question}</p>
                </div>
                <div class="user_answer_container">
                    <h3>Jouw antwoord:</h3>
                    <p class="user_answer">${user_answer_text}</p>
                </div>
                <div class="correct_answer_container">
                    <h3>Voorbeeld antwoord:</h3>
                    <p class="correct_answer">${question.correct_answer}</p>
                </div>
                <div class="explanation_container">
                    <h3>Uitleg:</h3>
                    <p class="explanation">${question.explanation}</p>
                </div>
                <p class="evaluation_question">Was jouw antwoord correct?</p>
                <div class="evaluation_buttons">
                    <button id="eval_correct" class="evaluation_button">Ja, correct</button>
                    <button id="eval_incorrect" class="evaluation_button">Nee, incorrect</button>
                </div>
            </div>
        </div>
    `;

    quiz_element.innerHTML = evaluation_html;

    document.getElementById("eval_correct").addEventListener("click", function () {
        user_answers[questionIndex].self_evaluated = true;
        user_answers[questionIndex].is_correct = true;
        correct_answers++;
        show_open_ended_evaluation(indices, current + 1);
    });

    document.getElementById("eval_incorrect").addEventListener("click", function () {
        user_answers[questionIndex].self_evaluated = true;
        user_answers[questionIndex].is_correct = false;
        incorrect_answers++;
        show_open_ended_evaluation(indices, current + 1);
    });
}

function update_question_list() {
    let html = "<h3>Vragen:</h3><ul class='question_nav'>";
    for (let i = 0; i < selected_questions.length; i++) {
        const status = user_answers[i] ? "beantwoord" : "onbeantwoord";
        const current = i === current_index ? " current" : "";
        html += `<li class="${status}${current}" onclick="navigate_to_question(${i})">Vraag ${i + 1}</li>`;
    }
    html += "</ul>";
    quiz_vragen_lijst.innerHTML = html;
}

function end_quiz_and_show_results() {
    let correct_answers = 0;
    let incorrect_answers = 0;
    let unanswered = 0;
    let results_by_question = [];

    for (let i = 0; i < selected_questions.length; i++) {
        const question = selected_questions[i];
        const user_answer = user_answers[i];
        let is_correct = false;

        if (user_answer === null || user_answer === "") {
            unanswered++;
            results_by_question.push({
                question_num: i + 1,
                question: question.question,
                user_answer: "Niet beantwoord",
                correct_answer: question.correct_answer,
                correct_answer_text: question.questionType === "multiple_choice" ?
                    question.answers[question.correct_answer] : question.correct_answer,
                is_correct: false,
                question_type: question.questionType,
                explanation: question.explanation || "Geen uitleg beschikbaar"
            });
        } else if (question.questionType === "multiple_choice") {
            if (user_answer === question.correct_answer) {
                correct_answers++;
                is_correct = true;
            } else {
                incorrect_answers++;
            }
            results_by_question.push({
                question_num: i + 1,
                question: question.question,
                user_answer: user_answer,
                user_answer_text: question.answers[user_answer],
                correct_answer: question.correct_answer,
                correct_answer_text: question.answers[question.correct_answer],
                is_correct: is_correct,
                question_type: "multiple_choice",
                explanation: question.explanation || "Geen uitleg beschikbaar"
            });
        } else if (question.questionType === "open_ended") {
            if (user_answer && user_answer.self_evaluated) {
                if (user_answer.is_correct) {
                    correct_answers++;
                    is_correct = true;
                } else {
                    incorrect_answers++;
                }
            } else {
                unanswered++;
            }

            results_by_question.push({
                question_num: i + 1,
                question: question.question,
                user_answer: user_answer && user_answer.text ? user_answer.text : "Niet beantwoord",
                correct_answer: question.correct_answer,
                is_correct: is_correct,
                question_type: "open_ended",
                explanation: question.explanation || "Geen uitleg beschikbaar",
                self_evaluated: user_answer && user_answer.self_evaluated ? user_answer.self_evaluated : false
            });
        }
    }

    const percentage = (correct_answers / selected_questions.length) * 100;
    const score_out_of_ten = Math.max(1, Math.min(10, Math.round((percentage / 10) * 10) / 10));

    let status_class = "";
    let result_message = "";

    if (score_out_of_ten >= 8) {
        status_class = "passing";
        result_message = "Uitstekend! Je weet al redelijk wat over online veiligheid!";
    } else if (score_out_of_ten >= 6) {
        status_class = "mediocre";
        result_message = "Voldoende! Je hebt een goede basiskennis van online veiligheid.";
    } else {
        status_class = "failing";
        result_message = "Je moet nog wat bijleren over online veiligheid!";
    }

    let quiz_element = document.getElementById("quiz");
    quiz_element.classList.add(status_class);
    let results_html = `
        <div class="results">
            <h2>Quiz Resultaten</h2>
            
            <div class="score-circle ${status_class}">
                ${score_out_of_ten}
            </div>
            
            <div class="result-message ${status_class}">
                ${result_message}
            </div>
            
            <p>Correcte antwoorden: ${correct_answers}</p>
            <p>Onjuiste antwoorden: ${incorrect_answers}</p>
            <p>Onbeantwoorde vragen: ${unanswered}</p>
            <p>Percentage: ${Math.round((correct_answers / selected_questions.length) * 100)}%</p>
        </div>
        <div class="detailed_results">
    `;

    for (let result of results_by_question) {
        const status_class = result.is_correct ? "correct" : (result.user_answer === "Niet beantwoord" || (result.question_type === "open_ended" && !result.self_evaluated) ? "unanswered" : "incorrect");
        if (!result.is_correct) {
            results_html += `<div class="question_result ${status_class}">`;
            results_html += `<h4>Vraag ${result.question_num}: ${result.question}</h4>`;
            if (result.question_type === "multiple_choice") {
                results_html += `<p>Jouw antwoord: ${result.user_answer === "Niet beantwoord" ? "Niet beantwoord" :
                    result.user_answer.toUpperCase() + ": " + result.user_answer_text}</p>`;
                results_html += `<p>Juiste antwoord: ${result.correct_answer.toUpperCase()} -> ${result.correct_answer_text}</p>`;
            } else {
                results_html += `<p>Jouw antwoord: ${result.user_answer === "Niet beantwoord" ? "Niet beantwoord" : result.user_answer}</p>`;
                results_html += `<p>Voorbeeld antwoord: ${result.correct_answer}</p>`;
            }

            results_html += `<p class="explanation">Uitleg: ${result.explanation}</p>`;
            results_html += `</div>`;
        }
    }

    results_html += `
            </div>
            <button onclick="window.location.href = '.'">Quiz Opnieuw Doen</button>
        </div>
    `;

    quiz_element.innerHTML = results_html;
    if (status_class === "passing") {
        const confettiContainer = document.createElement('div');
        confettiContainer.className = 'confetti-container';

        for (let i = 0; i < 50; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = `${Math.random() * 100}%`;
            confetti.style.width = `${Math.random() * 10 + 5}px`;
            confetti.style.height = `${Math.random() * 10 + 5}px`;
            confetti.style.backgroundColor = getRandomColor();
            confetti.style.animationDelay = `${Math.random() * 5}s`;
            confetti.style.animationDuration = `${Math.random() * 3 + 3}s`;
            confettiContainer.appendChild(confetti);
        }

        document.querySelector('.results').prepend(confettiContainer);
    }

    quiz_vragen_lijst.classList.add("hidden");
    quiz.classList.remove("quiz");
    quiz.classList.add("landing");
    header.classList.add("header_landing");
    header.classList.remove("header_quiz");
    quiz_active = false;
    end_quiz();
}

function getRandomColor() {
    const colors = [
        '#f44336', '#e91e63', '#9c27b0', '#673ab7',
        '#3f51b5', '#2196f3', '#03a9f4', '#00bcd4',
        '#009688', '#4CAF50', '#8BC34A', '#CDDC39',
        '#FFEB3B', '#FFC107', '#FF9800', '#FF5722'
    ];
    return colors[Math.floor(Math.random() * colors.length)];
}

function navigate_to_question(index) {
    show_question(index);
}

window.addEventListener("beforeunload", function (event) {
    if (quiz_active) {
        event.preventDefault();
        event.returnValue = "Changes you made mayI not be saved. Are you sure you want to leave the quiz?";
        return event.returnValue;
    }
});

function end_quiz() {
    quiz_active = false;
}

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById("skip").addEventListener("click", function () {
        if (current_index === selected_questions.length - 1) {
            end_quiz_and_show_results();
        } else {
            show_question(current_index + 1);
        }
    });

    document.getElementById("previous").addEventListener("click", function () {
        if (current_index > 0) {
            show_question(current_index - 1);
        }
    });
});

let questions = {
    1: {
        questionType: "multiple_choice",
        question: "Wat maakt een sterk wachtwoord?",
        answers: {
            a: "Een wachtwoord dat bestaat uit kleine letters, cijfers en speciale tekens",
            b: "Een wachtwoord dat je overal kan gebruiken",
            c: "Een wachtwoord dat bestaat uit een combinatie van kleine letters, hoofdletters letters, cijfers en speciale tekens",
            d: "Een wachtwoord dat je makkelijk onthoud en overal gebruikt"
        },
        correct_answer: "c",
        explanation: "Een sterk wachtwoord bevat een mix van hoofdletters, kleine letters, cijfers en speciale tekens. Dit maakt het moeilijker voor hackers om te kraken via brute force aanvallen of woordenboek-aanvallen.",
        image: "./img/password.png"
    },
    2: {
        questionType: "multiple_choice",
        question: "Wat is phishing?",
        answers: {
            a: "Een techniek om vis te vangen",
            b: "Een legitieme e-mail van je bank",
            c: "Een poging om persoonlijke informatie te verkrijgen door middel van misleiding",
            d: "Een manier om software te updaten"
        },
        correct_answer: "c",
        explanation: "Phishing is een cybercrime waarbij aanvallers mensen misleiden om persoonlijke informatie zoals wachtwoorden en creditcardgegevens af te staan. Ze doen zich vaak voor als betrouwbare entiteiten in elektronische communicatie.",
        image: "./img/phishing.png"
    },
    3: {
        questionType: "multiple_choice",
        question: "Wat is een firewall?",
        answers: {
            a: "Een beveiligingsmechanisme dat netwerkverkeer filtert",
            b: "Een type virus",
            c: "Een software voor bestandsbeheer",
            d: "Een hardware-apparaat dat alleen computers voedt"
        },
        correct_answer: "a",
        explanation: "Een firewall is een beveiligingssysteem dat netwerkverkeer controleert en filtert volgens vooraf ingestelde beveiligingsregels. Het vormt een barrière tussen je apparaat of netwerk en potentieel schadelijk internetverkeer.",
        image: null
    },
    4: {
        questionType: "multiple_choice",
        question: "Waarom is het belangrijk om software up-to-date te houden?",
        answers: {
            a: "Zodat je computer sneller wordt",
            b: "Om beveiligingslekken te dichten en nieuwe functies te krijgen",
            c: "Omdat updates leuk zijn",
            d: "Om ruimte op de harde schijf te besparen"
        },
        correct_answer: "b",
        explanation: "Software-updates bevatten vaak patches voor beveiligingslekken die door hackers zouden kunnen worden uitgebuit. Door je software up-to-date te houden, bescherm je jezelf tegen bekende kwetsbaarheden.",
        image: null
    },
    5: {
        questionType: "multiple_choice",
        question: "Wat is een botnet?",
        answers: {
            a: "Een netwerk van geïnfecteerde computers die samen werken voor cyberaanvallen",
            b: "Een soort antivirus",
            c: "Een beveiligingsprotocol",
            d: "Een netwerk voor het delen van bestanden"
        },
        correct_answer: "a",
        explanation: "Een botnet is een netwerk van geïnfecteerde computers die op afstand worden bestuurd door een aanvaller. Deze 'zombies' kunnen samen worden gebruikt voor grootschalige aanvallen zoals DDoS of spam-distributie.",
        image: "./img/botnet.png"
    },
    6: {
        questionType: "multiple_choice",
        question: "Wat is spear phishing?",
        answers: {
            a: "Phishing gericht op grote groepen mensen",
            b: "Gerichte phishing-aanvallen op specifieke individuen of organisaties",
            c: "Het gebruik van malware in phishing",
            d: "Een type virale video"
        },
        correct_answer: "b",
        explanation: "Spear phishing is een gerichte vorm van phishing waarbij aanvallers specifieke individuen of organisaties benaderen met gepersonaliseerde berichten. Ze verzamelen vooraf informatie over hun doelwit om geloofwaardiger over te komen.",
        image: null
    },
    7: {
        questionType: "multiple_choice",
        question: "Wat is een VPN en waarom is het nuttig?",
        answers: {
            a: "Een programma om virussen te verwijderen",
            b: "Een soort firewall",
            c: "Een netwerkprotocol voor snelle verbindingen",
            d: "Een dienst die je internetverkeer versleutelt en je privacy beschermt"
        },
        correct_answer: "d",
        explanation: "Een Virtual Private Network (VPN) creëert een versleutelde verbinding tussen je apparaat en een server op het internet. Het verbergt je IP-adres en versleutelt je internetverkeer, wat je privacy beschermt en helpt om censuur te omzeilen.",
        image: "./img/vpn.png"
    },
    8: {
        questionType: "multiple_choice",
        question: "Wat is het risico van openbare Wi-Fi netwerken?",
        answers: {
            a: "Er is geen risico",
            b: "Ze kunnen makkelijk worden onderschept en misbruikt",
            c: "Ze zijn sneller dan privé netwerken",
            d: "Ze versleutelen automatisch je data"
        },
        correct_answer: "b",
        explanation: "Openbare Wi-Fi netwerken zijn vaak onbeveiligd, waardoor aanvallers het netwerkverkeer kunnen onderscheppen en gevoelige informatie kunnen stelen. Ze kunnen ook 'evil twin' netwerken opzetten die zich voordoen als legitieme netwerken.",
        image: "./img/open_wifi.jpg"
    },
    9: {
        questionType: "multiple_choice",
        question: "Waarom is het belangrijk om back-ups te maken?",
        answers: {
            a: "Om opslagruimte vrij te maken",
            b: "Om gegevensverlies te voorkomen bij een systeemstoring",
            c: "Om de computer sneller te maken",
            d: "Om software te installeren"
        },
        correct_answer: "b",
        explanation: "Back-ups zijn essentieel om je gegevens te beschermen tegen verlies door hardware-fouten, ransomware, diefstal of andere calamiteiten. Met een goede back-up kun je je systeem herstellen en gegevensverlies minimaliseren.",
        image: null
    },
    10: {
        questionType: "multiple_choice",
        question: "Wat is het principe van minste privilege?",
        answers: {
            a: "Gebruikers krijgen alleen de toegangsrechten die ze nodig hebben",
            b: "Iedereen heeft volledige toegang tot alle systemen",
            c: "Alleen beheerders hebben toegang tot systemen",
            d: "Gebruikers kunnen hun eigen toegangsrechten bepalen"
        },
        correct_answer: "a",
        explanation: "Het principe van minste privilege houdt in dat gebruikers en systemen alleen toegang krijgen tot de data en resources die ze nodig hebben voor hun taak. Dit beperkt de schade die kan ontstaan bij een gehackt account of systeem.",
        image: null
    },
    11: {
        questionType: "multiple_choice",
        question: "Wat is een brute force aanval?",
        answers: {
            a: "Een aanval waarbij alle mogelijke wachtwoordcombinaties worden geprobeerd",
            b: "Een aanval met fysieke kracht",
            c: "Een aanval die gebruikmaakt van social engineering",
            d: "Een aanval die malware verspreidt"
        },
        correct_answer: "a",
        explanation: "Bij een brute force aanval probeert een aanvaller systematisch alle mogelijke wachtwoorden of sleutels uit totdat het juiste wordt gevonden. Dit type aanval kan worden tegengegaan met complexe wachtwoorden en inlogbeperkingen.",
        image: null
    },
    12: {
        questionType: "multiple_choice",
        question: "Waarom is het riskant om dezelfde wachtwoorden voor meerdere accounts te gebruiken?",
        answers: {
            a: "Het is moeilijk te onthouden",
            b: "Als één account wordt gehackt, zijn alle accounts kwetsbaar",
            c: "Het kost meer tijd om in te loggen",
            d: "Het is niet riskant"
        },
        correct_answer: "b",
        explanation: "Als één website of dienst een datalek heeft en je wachtwoord wordt gestolen, kunnen aanvallers toegang krijgen tot al je accounts waar je hetzelfde wachtwoord gebruikt. Dit wordt 'credential stuffing' genoemd.",
        image: null
    },
    13: {
        questionType: "multiple_choice",
        question: "Wat is het doel van encryptie?",
        answers: {
            a: "Het versnellen van gegevensoverdracht",
            b: "Het beschermen van gegevens door ze onleesbaar te maken voor onbevoegden",
            c: "Het comprimeren van bestanden",
            d: "Het verwijderen van malware"
        },
        correct_answer: "b",
        explanation: "Encryptie is het proces waarbij gegevens worden omgezet in een code om ongeautoriseerde toegang te voorkomen. Alleen met de juiste sleutel (decryptiesleutel) kunnen de gegevens weer leesbaar worden gemaakt.",
        image: "./img/encryption.jpg"
    },
    14: {
        questionType: "multiple_choice",
        question: "Wat betekent twee-factor authenticatie?",
        answers: {
            a: "Het gebruik van twee wachtwoorden",
            b: "Het gebruik van een wachtwoord en antwoord op een beveiligingsvraag",
            c: "Het combineren van een wachtwoord met een extra verificatie, zoals een TOTP code via Authy.",
            d: "Het gebruik van tweemaal hetzelfde wachtwoord",
        },
        correct_answer: "c",
        explanation: "Twee-factor authenticatie (2FA) voegt een extra beveiligingslaag toe aan het inlogproces door naast een wachtwoord (iets wat je weet) ook een tweede factor te vereisen, zoals een tijdelijke code op je telefoon (iets wat je hebt).",
        image: "./img/2fa.jpg"
    },
    15: {
        questionType: "multiple_choice",
        question: "Wat is social engineering?",
        answers: {
            a: "Het ontwerpen van sociale netwerken",
            b: "Het manipuleren van mensen om vertrouwelijke informatie te verkrijgen",
            c: "Het bouwen van websites",
            d: "Een techniek voor data-encryptie"
        },
        correct_answer: "b",
        explanation: "Social engineering is het psychologisch manipuleren van mensen om vertrouwelijke informatie prijs te geven of bepaalde acties uit te voeren. Het maakt gebruik van menselijke fouten en vertrouwen in plaats van technische hacking.",
        image: null
    },
    16: {
        questionType: "multiple_choice",
        question: "Welke van de volgende is een voorbeeld van een DDoS-aanval?",
        answers: {
            a: "Het stelen van persoonlijke gegevens",
            b: "Het installeren van antivirus software",
            c: "Het versleutelen van data",
            d: "Het overbelasten van een server met verkeer"
        },
        correct_answer: "d",
        explanation: "Een Distributed Denial of Service (DDoS) aanval overbelast een website of service door een enorme hoeveelheid verkeer te genereren vanaf meerdere bronnen, waardoor de service ontoegankelijk wordt voor legitieme gebruikers.",
        image: null
    },
    17: {
        questionType: "multiple_choice",
        question: "Wat is de rol van educatie in cyberbeveiliging?",
        answers: {
            a: "Om mensen te leren hoe ze websites kunnen bouwen",
            b: "Om mensen bewust te maken van de risico's en hoe ze zich kunnen beschermen",
            c: "Om software-updates te installeren",
            d: "Om hardware te repareren"
        },
        correct_answer: "b",
        explanation: "Educatie is cruciaal in cyberbeveiliging omdat veel aanvallen gebruik maken van menselijk gedrag en fouten. Door mensen te onderwijzen over risico's en best practices, kunnen ze zichzelf beter beschermen tegen cyberdreigingen.",
        image: null
    },
    18: {
        questionType: "open_ended",
        question: "Beschrijf hoe phishing werkt en welke methoden je kunt gebruiken om jezelf te beschermen.",
        correct_answer: "Phishing is een methode waarbij aanvallers via valse e-mails of websites proberen persoonlijke informatie te stelen; bescherm jezelf door verdachte links te vermijden en de echtheid van de afzender te verifiëren.",
        explanation: "Phishing werkt door je te misleiden met e-mails of berichten die legitiem lijken maar eigenlijk zijn ontworpen om je persoonlijke gegevens te stelen. Je kunt jezelf beschermen door links niet direct aan te klikken, de URL te controleren voordat je gegevens invoert, en contact op te nemen met de organisatie via officiële kanalen als je twijfelt.",
        image: null
    },
    19: {
        questionType: "open_ended",
        question: "Wat zijn de voordelen van het gebruik van een VPN voor online privacy?",
        correct_answer: "Een VPN versleutelt je internetverkeer en verbergt je IP-adres, wat je online privacy beschermt en het risico op afluisteren vermindert.",
        explanation: "Een VPN (Virtual Private Network) versleutelt al je internetverkeer en maskeert je IP-adres, waardoor je privacy online wordt beschermd. Het voorkomt dat ISP's, websites of hackers je browseactiviteiten kunnen volgen, helpt bij het omzeilen van geografische beperkingen, en biedt bescherming wanneer je openbare Wi-Fi gebruikt.",
        image: null
    },
    20: {
        questionType: "open_ended",
        question: "Beschrijf wat twee-factor authenticatie is en waarom het belangrijk is.",
        correct_answer: "Twee-factor authenticatie vereist een tweede verificatie naast een wachtwoord, zoals een sms-code of authenticator-app, waardoor de beveiliging aanzienlijk verbetert.",
        explanation: "Twee-factor authenticatie voegt een extra beveiligingslaag toe door naast je wachtwoord (iets wat je weet) ook een tweede factor te vereisen (iets wat je hebt, zoals je telefoon). Zelfs als je wachtwoord wordt gestolen, heeft een aanvaller nog steeds de tweede factor nodig om toegang te krijgen, wat de kans op ongeautoriseerde toegang aanzienlijk vermindert.",
        image: null
    },
    21: {
        questionType: "open_ended",
        question: "Wat is het gevaar voor jouw als er een datalek is?",
        correct_answer: "Een datalek kan leiden tot identiteitsdiefstal, financiële schade en reputatieschade, waardoor het belangrijk is om je gegevens te beschermen.",
        explanation: "Een datalek kan ernstige gevolgen hebben zoals identiteitsdiefstal, financiële fraude, afpersing met gelekte gegevens, en reputatieschade. Persoonlijke gegevens zoals je naam, e-mailadres, wachtwoord en financiële informatie kunnen worden misbruikt voor kwaadaardige doeleinden.",
        image: "./img/data_leak.svg"
    },
    22: {
        questionType: "open_ended",
        question: "Hoe kun je de beveiliging van je thuisnetwerk verbeteren?",
        correct_answer: "Je kunt de beveiliging van je thuisnetwerk verbeteren door het standaard wachtwoord van het netwerk te veranderen en dat van de router zelf. Houd ook de firmware van je router up-to-date. ",
        explanation: "Je kunt je thuisnetwerk beveiligen door sterke, unieke wachtwoorden te gebruiken voor je Wi-Fi en router, de router-firmware regelmatig bij te werken, WPA3-encryptie te gebruiken, gasten-netwerken in te stellen voor bezoekers, en een firewall te activeren. Het wijzigen van standaard inloggegevens en het uitschakelen van WPS en externe beheer zijn ook belangrijke maatregelen.",
        image: null
    },
    23: {
        questionType: "open_ended",
        question: "Hoe kun je sterke wachtwoorden creëren en beheren?",
        correct_answer: "Gebruik een combinatie van letters, cijfers en symbolen; vermijd gemakkelijk te raden woorden; en overweeg gebruik te maken van een wachtwoordbeheerder voor het genereren en opslaan van wachtwoorden. bijvoorbeeld, Bitwarden of Proton Pass.",
        explanation: "Sterke wachtwoorden bevatten een mix van hoofdletters, kleine letters, cijfers en speciale tekens, zijn minstens 12 tekens lang, en zijn uniek voor elke dienst. Een wachtwoordbeheerder zoals Bitwarden of Proton Pass kan complexe wachtwoorden genereren en veilig opslaan, zodat je ze niet hoeft te onthouden.",
        image: null
    },
    24: {
        questionType: "open_ended",
        question: "Hoe kun je controleren of een website veilig is voordat je persoonlijke informatie invoert?",
        correct_answer: "Controleer of je een beveiligde verbinding hebt (https://), zoek naar een slotpictogram in de adresbalk en controleer of de URL correct is gespeld en overeenkomt met de echte website.",
        explanation: "Controleer of de website HTTPS gebruikt (let op het slotje in de adresbalk), verifieer dat de URL correct is en niet een lookalike domeinnaam, zoek naar contactinformatie en privacybeleid, gebruik website-veiligheid verificatietools zoals Google Safe Browsing, en let op spelfouten of slechte vormgeving die op nepsites kunnen wijzen.",
        image: null
    },
    25: {
        questionType: "open_ended",
        question: "Wat is het nut van een AD blocker?",
        correct_answer: "Een AD blocker blokkeert advertenties op websites, waardoor je privacy wordt beschermd en de laadtijd van pagina's wordt verkort.",
        explanation: "Een adblocker biedt meerdere voordelen: het beschermt tegen malvertising (kwaadaardige advertenties), verbetert de laadsnelheid van webpagina's, vermindert dataverbruik, verbetert de gebruikerservaring, en beperkt het volgen van je online gedrag door advertentienetwerken, waardoor je privacy wordt verbeterd.",
        image: "./img/ad_blocker.jpg"
    }
};