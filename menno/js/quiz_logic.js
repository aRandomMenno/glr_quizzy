// ~ Constants:
const quiz = document.getElementById("quiz");
const quiz_vragen_lijst = document.getElementById("quiz_vragen_lijst");
const header = document.querySelector("header");
const landing = document.getElementById("landing");

// ~ Variables:
let current_question = 1;
let correct_answers = 0;
let incorrect_answers = 0;
let quiz_active = false;

function start_quiz() {
    quiz_active = true;
    quiz.classList.remove("hidden");
    quiz_vragen_lijst.classList.remove("hidden");
    landing.classList.add("hidden");
    header.classList.remove("header_landing");
    header.classList.add("header_quiz");
    show_question(current_question);
}

// ~ Warning when you close the page when the quiz is active
window.addEventListener("beforeunload", function (event) {
    if (quiz_active) {
        event.preventDefault();
        event.returnValue = "Changes you made may not be saved. Are you sure you want to leave the quiz?";
        return event.returnValue;
    }
});

function end_quiz() {
    quiz_active = false;
}

let questions = {
    1: {
        questionType: "multiple_choice",
        question: "Wat maakt een sterk wachtwoord?",
        answers: {
            a: "Een wachtwoord dat bestaat uit kleine letters, cijfers en speciale tekens",
            b: "Een wachtwoord dat je overal kan gebruiken",
            c: "Een wachtwoord dat bestaat uit een combinatie van letters kleine en hoofdletters, cijfers en speciale tekens",
            d: "Een wachtwoord dat je makkelijk onthoud en overal gebruikt"
        },
        correct_answer: "c"
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
        correct_answer: "c"
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
        correct_answer: "a"
    },
    4: {
        questionType: "multiple_choice",
        question: "Wat is het doel van een firewall?",
        answers: {
            a: "Het blokkeren van ongeautoriseerde toegang tot een netwerk",
            b: "Het versnellen van internetverbindingen",
            c: "Het opslaan van wachtwoorden",
            d: "Het maken van back-ups van bestanden"
        },
        correct_answer: "a"
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
        correct_answer: "b"
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
        correct_answer: "a"
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
        correct_answer: "b"
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
        correct_answer: "d"
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
        correct_answer: "b"
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
        correct_answer: "b"
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
        correct_answer: "a"
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
        correct_answer: "a"
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
        correct_answer: "b"
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
        correct_answer: "b"
    },
    14: {
        questionType: "multiple_choice",
        question: "Wat betekent twee-factor authenticatie?",
        answers: {
            a: "Het gebruik van twee wachtwoorden",
            b: "Het gebruik van een wachtwoord en een biometrische factor",
            c: "Het combineren van een wachtwoord met een extra verificatie, zoals een code via sms",
            d: "Het gebruik van tweemaal hetzelfde wachtwoord"
        },
        correct_answer: "c"
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
        correct_answer: "b"
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
        correct_answer: "d"
    },
    17: {
        questionType: "multiple_choice",
        question: "Wat is de rol van educatie in cyberbeveiliging?",
        answers: {
            a: "Om mensen te leren hoe ze websites kunnen bouwen",
            b: "Om mensen bewust te maken van de risico\"s en hoe ze zich kunnen beschermen",
            c: "Om software-updates te installeren",
            d: "Om hardware te repareren"
        },
        correct_answer: "b"
    },
    18: {
        questionType: "open_ended",
        question: "Beschrijf hoe phishing werkt en welke methoden je kunt gebruiken om jezelf te beschermen.",
        correct_answer: "Phishing is een methode waarbij aanvallers via valse e-mails of websites proberen persoonlijke informatie te stelen; bescherm jezelf door verdachte links te vermijden en de echtheid van de afzender te verifiëren."
    },
    19: {
        questionType: "open_ended",
        question: "Wat zijn de voordelen van het gebruik van een VPN voor online privacy?",
        correct_answer: "Een VPN versleutelt je internetverkeer en verbergt je IP-adres, wat je online privacy beschermt en het risico op afluisteren vermindert."
    },
    20: {
        questionType: "open_ended",
        question: "Beschrijf wat twee-factor authenticatie is en waarom het belangrijk is.",
        correct_answer: "Twee-factor authenticatie vereist een tweede verificatie naast een wachtwoord, zoals een sms-code of authenticator-app, waardoor de beveiliging aanzienlijk verbetert."
    },
    21: {
        questionType: "open_ended",
        question: "Wat is het gevaar voor jouw als er een datalek is?",
        correct_answer: "Een datalek kan leiden tot identiteitsdiefstal, financiële schade en reputatieschade, waardoor het belangrijk is om je gegevens te beschermen."
    },
    22: {
        questionType: "open_ended",
        question: "Hoe kun je de beveiliging van je thuisnetwerk verbeteren?",
        correct_answer: "Je kunt de beveiliging van je thuisnetwerk verbeteren door het standaard wachtwoord van het netwerk te veranderen en dat van de router zelf. Houd ook de firmware van je router up-to-date. "
    },
    23: {
        questionType: "open_ended",
        question: "Hoe kun je sterke wachtwoorden creëren en beheren?",
        correct_answer: "Gebruik een combinatie van letters, cijfers en symbolen; vermijd gemakkelijk te raden woorden; en overweeg gebruik te maken van een wachtwoordbeheerder voor het genereren en opslaan van wachtwoorden. bijvoorbeeld, Bitwarden of Proton Pass."
    },
    24: {
        questionType: "open_ended",
        question: "Hoe kun je controleren of een website veilig is voordat je persoonlijke informatie invoert?",
        correct_answer: "Controleer of je een beveiligde verbinding hebt (https://), zoek naar een slotpictogram in de adresbalk en controleer of de URL correct is gespeld en overeenkomt met de echte website."
    },
    25: {
        questionType: "open_ended",
        question: "Wat is het nut van een AD blocker?",
        correct_answer: "Een AD blocker blokkeert advertenties op websites, waardoor je privacy wordt beschermd en de laadtijd van pagina's wordt verkort."
    }
};