document.addEventListener("DOMContentLoaded", function() {
    const startButton = document.getElementById("start-btn");
    const quiz = document.querySelector(".quiz");
    const side = document.querySelector(".side");
    const cyber = document.querySelector(".cyber");
    const vraagNummers = document.querySelectorAll(".side .vraag");
    const volgendeButton = document.querySelector(".volgende-btn");
    let huidigeVraag = 1;

    // Verberg de quiz en side bij de start
    quiz.style.display = "none";
    side.style.display = "none";

    // Event listener voor de startknop
    startButton.addEventListener("click", function() {
        // Maak quiz en side zichtbaar
        quiz.style.display = "block";
        side.style.display = "block";
        
        // Verberg de welkomstboodschap
        cyber.style.display = "none";
        
        // Markeer de eerste vraag als actief
        vraagNummers[huidigeVraag - 1].classList.add("actief");
    });

    // Event listener voor de volgende knop
    volgendeButton.addEventListener("click", function() {
        // Verwijder de actieve klasse van de vorige vraag
        vraagNummers[huidigeVraag - 1].classList.remove("actief");
        
        // Verhoog het vraagnummer
        huidigeVraag++;
        
        // Zorg ervoor dat we niet verder gaan dan de laatste vraag
        if (huidigeVraag <= 15) {
            // Markeer de nieuwe vraag als actief
            vraagNummers[huidigeVraag - 1].classList.add("actief");
            
            // Update de inhoud van de quiz naar de volgende vraag
            quiz.querySelector("h1").textContent = `Vraag ${huidigeVraag}: Wat is cyberpesten?`; // Hier kun je de vraaginhoud aanpassen
        }
    });
});

