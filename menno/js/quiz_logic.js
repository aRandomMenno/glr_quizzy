const quiz = document.getElementById('quiz');
const quiz_vragen_lijst = document.getElementById('quiz_vragen_lijst');
const header = document.querySelector('header');
const landing = document.getElementById('landing');

let quiz_active = false;

function start_quiz() {
    quiz.classList.remove('hidden');
    quiz_vragen_lijst.classList.remove('hidden');
    landing.classList.add('hidden');
    header.classList.remove('header_landing');
    header.classList.add('header_quiz');
}

window.addEventListener('beforeunload', function (e) {
    if (quiz_active) {
        e.preventDefault();
        e.returnValue = 'Changes you made may not be saved. Are you sure you want to leave the quiz?';
        return e.returnValue;
    }
});

function end_quiz() {
    quiz_active = false;
}

// ! Deze vragen en antwoorden zijn placeholders, de echte vragen en antwoorden moeten nog bedacht worden.
let questions = {
    1: {
        question: 'Wat is de hoofdstad van Nederland?',
        answers: {
            a: 'Amsterdam',
            b: 'Rotterdam',
            c: 'Den Haag',
            d: 'Utrecht'
        },
        correct_answer: 'c'
    },
    2: {
        question: 'Wat is de hoofdstad van Frankrijk?',
        answers: {
            a: 'Lyon',
            b: 'Marseille',
            c: 'Parijs',
            d: 'Nice'
        },
        correct_answer: 'c'
    },
    3: {
        question: 'Wat is de hoofdstad van Duitsland?',
        answers: {
            a: 'München',
            b: 'Berlijn',
            c: 'Hamburg',
            d: 'Keulen'
        },
        correct_answer: 'b'
    },
    4: {
        question: 'Wat is de hoofdstad van Spanje?',
        answers: {
            a: 'Barcelona',
            b: 'Madrid',
            c: 'Valencia',
            d: 'Sevilla'
        },
        correct_answer: 'b'
    },
    5: {
        question: 'Wat is de hoofdstad van Italië?', 
        answers: {
            a: 'Rome',
            b: 'Milaan',
            c: 'Napels',
            d: 'Turijn'
        },  
        correct_answer: 'a'
    },
    6: {
        question: 'Wat is de hoofdstad van Portugal?',
        answers: {
            a: 'Porto',
            b: 'Lissabon',
            c: 'Faro',
            d: 'Coimbra'
        },
        correct_answer: 'b'
    },
    7: {
        question: 'Wat is de hoofdstad van Zweden?',
        answers: {
            a: 'Göteborg',
            b: 'Malmö',
            c: 'Stockholm',
            d: 'Uppsala'
        },
        correct_answer: 'c'
    },
    8: {
        question: 'Wat is de hoofdstad van Noorwegen?',
        answers: {
            a: 'Oslo',
            b: 'Bergen',
            c: 'Trondheim',
            d: 'Stavanger'
        },
        correct_answer: 'a'
    },
    9: {
        question: 'Wat is de hoofdstad van Denemarken?',
        answers: {
            a: 'Aarhus',
            b: 'Odense',
            c: 'Aalborg',
            d: 'Kopenhagen'
        },
        correct_answer: 'd'
    },
    10: {
        question: 'Wat is de hoofdstad van Oostenrijk?',
        answers: {
            a: 'Wenen',
            b: 'Salzburg',
            c: 'Innsbruck',
            d: 'Graz'
        },
        correct_answer: 'a'
    },
    11: {
        question: 'Wat is de hoofdstad van Griekenland?',
        answers: {
            a: 'Thessaloniki',
            b: 'Athene',
            c: 'Patras',
            d: 'Heraklion'
        },
        correct_answer: 'b'
    },
    12: {
        question: 'Wat is de hoofdstad van België?',
        answers: {
            a: 'Antwerpen',
            b: 'Gent',
            c: 'Brussel',
            d: 'Brugge'
        },
        correct_answer: 'c'
    },
    13: {
        question: 'Wat is de hoofdstad van Zwitserland?',
        answers: {
            a: 'Zürich',
            b: 'Genève',
            c: 'Bazel',
            d: 'Bern'
        },
        correct_answer: 'd'
    },
    14: {
        question: 'Wat is de hoofdstad van Polen?',
        answers: {
            a: 'Warschau',
            b: 'Krakau',
            c: 'Gdańsk',
            d: 'Wrocław'
        },
        correct_answer: 'a'
    },
    15: {
        question: 'Wat is de hoofdstad van Hongarije?',
        answers: {
            a: 'Debrecen',
            b: 'Szeged',
            c: 'Boedapest',
            d: 'Pécs'
        },
        correct_answer: 'c'
    }
};