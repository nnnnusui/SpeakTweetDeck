export const addSuppressButton = (): void => {
  const button = document.createElement("span");
  button.textContent = "🔈";
  button.onclick = () => window.speechSynthesis.cancel();

  const container = document.createElement("a");
  container.href = "#";
  container.title = "suppress speak";
  container.classList.add("link-clean");
  container.style.display = "block";
  container.style.textAlign = "center";
  container.style.fontSize = "2em";
  container.style.marginBottom = ".2em";
  container.appendChild(button);
  const target = document.getElementsByClassName("app-navigator")[0];
  target.prepend(container);
};
