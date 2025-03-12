document.getElementById("start-btn").addEventListener("click", function() {
    // Verberg de huidige content en menu
    document.querySelector(".content").style.display = "none";
    document.querySelector(".menu").style.display = "none";

    // Toon de quiz-content en menu
    document.querySelector(".content2").style.display = "block";
    document.querySelector(".menu2").style.display = "block";
});


const quizData = [
    // Meerkeuzevragen
    {
        vraag: "Wat is een voorbeeld van cyberpesten?",
        opties: [
            "A. Een vriend een grappige meme sturen",
            "B. Iemand online beledigen (gemeen doen) en bedreigen (bang maken)",
            "C. Een privégesprek met iemand voeren"
        ],
        juisteAntwoord: 1, // Index van het juiste antwoord
        afbeelding: "images/cyberpesten.png"
    },
    {
        vraag: "Welke van de volgende gevolgen kan cyberpesten hebben?",
        opties: [
            "A. Stress en angst (je vervelend en bang voelen)",
            "B. Sneller internet",
            "C. Meer likes op social media"
        ],
        juisteAntwoord: 0,
        afbeelding: "images/gevolgen.png"
    },
    {
        vraag: "Wat is doxing (persoonlijke info verspreiden)?",
        opties: [
            "A. Het online delen van iemands adres of telefoonnummer zonder toestemming",
            "B. Een anonieme (zonder naam) account aanmaken",
            "C. Het downloaden van illegale films"
        ],
        juisteAntwoord: 0,
        afbeelding: "images/doxing.png"
    },
    {
        vraag: "Wat moet je doen als je online wordt gepest?",
        opties: [
            "A. Terugpesten zodat de ander stopt",
            "B. Bewijs bewaren en hulp vragen aan een volwassene of organisatie",
            "C. Alles negeren en hopen dat het vanzelf overgaat"
        ],
        juisteAntwoord: 1,
        afbeelding: "images/online-pesten.png"
    },
    {
        vraag: "Wat is catfishing (je voordoen als iemand anders)?",
        opties: [
            "A. Iemand online bedreigen (bang maken) met een nepaccount",
            "B. Doen alsof je iemand anders bent om anderen te misleiden (voor de gek houden)",
            "C. Een foto van een kat posten op social media"
        ],
        juisteAntwoord: 1,
        afbeelding: "images/catfishing.png"
    },
    {
        vraag: "Waarom pesten sommige mensen online?",
        opties: [
            "A. Ze vervelen zich of willen aandacht krijgen",
            "B. Ze willen anderen helpen",
            "C. Ze willen vrienden maken"
        ],
        juisteAntwoord: 0,
        afbeelding: "images/online-pesten-redenen.png"
    },
    {
        vraag: "Welke wet (regel) kan cyberpesten strafbaar maken?",
        opties: [
            "A. De Auteurswet (regels over wie iets heeft gemaakt)",
            "B. De Wet Computercriminaliteit (regels over misdaad met computers)",
            "C. De Wet Bescherming Persoonsgegevens (regels over privacy)"
        ],
        juisteAntwoord: 1,
        afbeelding: "images/wet-cyberpesten.png"
    },
    {
        vraag: "Wat betekent “trollen” (online plagen)?",
        opties: [
            "A. Iemand expres irriteren (lastigvallen) of boos maken op internet",
            "B. Een anonieme (zonder naam) blog starten",
            "C. Een compliment geven aan een online vriend"
        ],
        juisteAntwoord: 0,
        afbeelding: "images/trollen.png"
    },
    {
        vraag: "Wat kan je doen als je ziet dat iemand online gepest wordt?",
        opties: [
            "A. Niks, het is niet jouw probleem",
            "B. De pestkop aanmoedigen voor de grap",
            "C. De gepeste persoon steunen (helpen) en het melden bij een volwassene of platform"
        ],
        juisteAntwoord: 2,
        afbeelding: "images/pesten-steunen.png"
    },
    {
        vraag: "Welke organisatie kan helpen bij cyberpesten?",
        opties: [
            "A. De ANWB (hulp bij autopech)",
            "B. De politie en Meldknop.nl (een website voor online problemen)",
            "C. Netflix (een streamingdienst)"
        ],
        juisteAntwoord: 1,
        afbeelding: "images/organisatie-helpen.png"
    },

    // Open vragen
    {
        vraag: "Wat zou jij doen als een vriend(in) online gepest wordt?",
        openVraag: true, // Aanduiding dat dit een open vraag is
        afbeelding: "images/online-steunen.png"
    },
    {
        vraag: "Waarom doen sommige mensen online gemeen terwijl ze in het echt anders doen?",
        openVraag: true, // Aanduiding dat dit een open vraag is
        afbeelding: "images/gemeen-online.png"
    },
    {
        vraag: "Noem drie manieren om jezelf te beschermen tegen cyberpesten.",
        openVraag: true, // Aanduiding dat dit een open vraag is
        afbeelding: "images/bescherming.png"
    },
    {
        vraag: "Wat zijn de verschillen tussen cyberpesten en gewoon pesten op school?",
        openVraag: true, // Aanduiding dat dit een open vraag is
        afbeelding: "images/verschillen-pesten.png"
    },
    {
        vraag: "Wat kunnen social media zoals TikTok en Instagram doen om cyberpesten te stoppen?",
        openVraag: true, // Aanduiding dat dit een open vraag is
        afbeelding: "images/social-media.png"
    }
];

let huidigeVraagIndex = 0;

// Functie om de quizdata willekeurig te schudden (behalve de eerste vraag)
function schudVraagData() {
    // Haal de eerste vraag eruit, die blijft altijd als eerste
    const eersteVraag = quizData[0];

    // Maak een nieuw array met de overige vragen
    const overigeVragen = quizData.slice(1);

    // Schud de overige vragen
    for (let i = overigeVragen.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [overigeVragen[i], overigeVragen[j]] = [overigeVragen[j], overigeVragen[i]];
    }

    // Voeg de eerste vraag weer toe aan het begin van de lijst
    quizData.length = 0;
    quizData.push(eersteVraag, ...overigeVragen);
}

// Roep de functie aan om de quizdata te schudden
schudVraagData();

const vraagTitel = document.querySelector(".quiz h1");
const vraagTekst = document.querySelector(".quiz h2");
const antwoordOpties = document.querySelectorAll(".quiz label");
const afbeelding = document.querySelector(".image");
const volgendeKnop = document.getElementById("volgende-btn");
const vorigeKnop = document.getElementById("vorige-btn");
const menuItems = document.querySelectorAll(".menu2 h1");
const inputContainer = document.querySelector(".input-container"); // Dit is waar we het invoerveld boven de knoppen plaatsen

function laadVraag(index) {
    const vraagData = quizData[index];

    vraagTitel.textContent = `Vraag ${index + 1}`;
    vraagTekst.textContent = vraagData.vraag;

    // Maak de container voor inputvelden leeg voor de volgende vraag
    inputContainer.innerHTML = "";

    // Als het een open vraag is, toon een tekstveld boven de knoppen
    if (vraagData.openVraag) {
        const inputVeld = document.createElement("input");
        inputVeld.type = "text";
        inputVeld.placeholder = "Schrijf hier je antwoord...";
        inputVeld.classList.add("openvraag-input");
        inputContainer.appendChild(inputVeld); // Voeg het invoerveld toe aan de container boven de knoppen
    } else {
        antwoordOpties.forEach((label, i) => {
            label.style.display = "block"; // Maak de opties weer zichtbaar
            const radioId = `antwoord-${index}-${i}`;
            label.innerHTML = `<input type="radio" name="antwoord" id="${radioId}" value="${i}"> ${vraagData.opties[i]}`;
            label.setAttribute("for", radioId);
        });
    }

    afbeelding.style.backgroundImage = `url('${vraagData.afbeelding}')`;

    // Maak eerst alle menu-items zwart
    menuItems.forEach(item => item.style.color = "black");

    // Kleur het actieve vraagnummer paars
    menuItems[index].style.color = "rgb(131,58,180)";

    // Verberg de "Vorige" knop als we op de eerste vraag zijn
    if (index === 0) {
        vorigeKnop.style.display = "none"; // Verberg de vorige knop
    } else {
        vorigeKnop.style.display = "inline-block"; // Zorg dat de vorige knop zichtbaar is
    }
}

// Event Listeners voor de knoppen
volgendeKnop.addEventListener("click", () => {
    // Ga altijd door naar de volgende vraag, zonder enige validatie
    if (huidigeVraagIndex < quizData.length - 1) {
        huidigeVraagIndex++;
        laadVraag(huidigeVraagIndex);
    }
});

vorigeKnop.addEventListener("click", () => {
    if (huidigeVraagIndex > 0) {
        huidigeVraagIndex--;
        laadVraag(huidigeVraagIndex);
    }
});

// Start met de eerste vraag
laadVraag(huidigeVraagIndex);
