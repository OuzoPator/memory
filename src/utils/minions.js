function createMinion() {
  const minion = document.createElement("div");
  minion.classList.add("minion");

  // Use emoji (or a set of them if you want variety)
  const emojis = ["🟡", "👓", "😂", "🙃"];
  minion.textContent = emojis[Math.floor(Math.random() * emojis.length)];

  minion.style.left = Math.random() * window.innerWidth + "px";
  minion.style.fontSize = Math.random() * 20 + 20 + "px";
  minion.style.animationDuration = Math.random() * 2 + 2 + "s";

  document.body.appendChild(minion);

  setTimeout(() => {
    minion.remove();
  }, 4000);
}

function rainMinions(count = 50) {
  for (let i = 0; i < count; i++) {
    setTimeout(createMinion, i * 50);
  }
}

window.addEventListener("load", () => {
  rainMinions();
});
