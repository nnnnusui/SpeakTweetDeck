export const addGlobalMuteButton = (): void => {
  const button = document.createElement("span");
  button.textContent = "🔇";
  button.style.opacity = ".5";
  button.onclick = () => {
    const mute = localStorage.getItem("mute") === true.toString();
    const after = !mute;
    button.style.opacity = after ? "1" : ".5";
    localStorage.setItem("mute", after.toString());
  };

  const container = document.createElement("a");
  container.href = "#";
  container.title = "global mute speak";
  container.classList.add("link-clean");
  container.style.display = "block";
  container.style.textAlign = "center";
  container.style.fontSize = "2em";
  container.style.marginBottom = ".2em";
  container.appendChild(button);
  const target = document.getElementsByClassName("app-navigator")[0];
  target.prepend(container);
};
