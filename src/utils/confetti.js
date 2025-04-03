function createConfettiPiece() {
  const confetti = document.createElement("div");
  confetti.classList.add("confetti");

  // machssu farbe
  const colors = ["#ff0", "#f0f", "#0ff", "#0f0", "#f00", "#00f"];
  confetti.style.backgroundColor =
    colors[Math.floor(Math.random() * colors.length)];

  // random position
  confetti.style.left = Math.random() * window.innerWidth + "px";

  // größe auch
  const size = Math.random() * 10 + 5;
  confetti.style.width = size + "px";
  confetti.style.height = size + "px";

  // zufallsanimationsdauer
  confetti.style.animationDuration = Math.random() * 2 + 2 + "s";

  document.body.appendChild(confetti);

  // tschüss konfetti nach animation
  setTimeout(() => {
    confetti.remove();
  }, 2500);
}

export function launchConfetti(count = 100) {
  for (let i = 0; i < count; i++) {
    setTimeout(createConfettiPiece, i * 20);
  }
}

// confetti on page load
window.addEventListener("load", () => {
  launchConfetti();
});
