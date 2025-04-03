const cardSymbols = [
  "🐶",
  "🐱",
  "🐭",
  "🐹",
  "🐰",
  "🦊",
  "🐻",
  "🐼",
  "🐨",
  "🦁",
  "🐯",
  "🦒",
  "🦘",
  "🦡",
  "🦝",
  "🦨",
  "🦦",
  "🦥",
  "🦫",
  "🐿️",
  "🦔",
  "🦇",
  "🦜",
  "🦢",
];

// Funktion zum Erstellen der Kartenpaare
function createCards(numberPairs) {
  if (numberPairs > cardSymbols.length) {
    console.warn(
      `Warnung: Es können maximal ${cardSymbols.length} Paare verwendet werden.`
    );
    numberPairs = cardSymbols.length;
  }

  // Symbole mischen und auswählen
  const searchSymbols = [...cardSymbols]
    .sort(() => Math.random() - 0.5)
    .slice(0, numberPairs);

  // Kartenpaare erstellen
  const cards = searchSymbols.map((symbol, index) => ({
    id: index + 1,
    symbol: symbol,
  }));

  return cards;
}

// Funktion zum Mischen der Karten
function mixCards(cardsArray) {
  const cardPairs = [...cardsArray, ...cardsArray];

  // Fisher-Yates Shuffle Algorithmus
  for (let i = cardPairs.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cardPairs[i], cardPairs[j]] = [cardPairs[j], cardPairs[i]];
  }

  return cardPairs;
}

// Spielfeld erstellen
function playground(numberPairs = 8) {
  const allCards = createCards(numberPairs);
  const mixedCards = mixCards(allCards);
  const spielfeld = document.querySelector("#spielfeld");

  spielfeld.innerHTML = ""; // Altes Spielfeld leeren

  // Grid erstellen anhand der Anzahl der Karten
  const columns = Math.ceil(Math.sqrt(numberPairs * 2));
  spielfeld.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;

  let flippedCards = [];

  mixedCards.forEach((card, index) => {
    const cardElement = document.createElement("div");
    cardElement.classList.add("card");
    cardElement.dataset.id = card.id;
    cardElement.dataset.index = index;
    cardElement.textContent = "❓"; // Verdeckte Karte

    cardElement.addEventListener("click", () => {
      if (
        !cardElement.classList.contains("umgedreht") &&
        !cardElement.classList.contains("gefunden")
      ) {
        cardElement.textContent = card.symbol;
        cardElement.classList.add("umgedreht");
        flippedCards.push(cardElement);

        if (flippedCards.length === 2) {
          setTimeout(checkMatch, 500);
        }
      }
    });

    spielfeld.appendChild(cardElement);
  });

  function checkMatch() {
    const [card1, card2] = flippedCards;

    if (card1.dataset.id === card2.dataset.id) {
      card1.classList.add("gefunden");
      card2.classList.add("gefunden");
    } else {
      card1.textContent = "❓";
      card2.textContent = "❓";
      card1.classList.remove("umgedreht");
      card2.classList.remove("umgedreht");
    }

    flippedCards = [];
  }
}

// Event-Listener für die Steuerelemente
document.addEventListener("DOMContentLoaded", () => {
  const kartenAnzahlSelect = document.getElementById("kartenAnzahl");
  const neuesSpielButton = document.getElementById("neuesSpiel");

  // Spielfeld initial erstellen
  playground(parseInt(kartenAnzahlSelect.value));

  // Event-Listener für den "Neues Spiel"-Button
  neuesSpielButton.addEventListener("click", () => {
    const numberPairs = parseInt(kartenAnzahlSelect.value);
    playground(numberPairs);
  });
});
