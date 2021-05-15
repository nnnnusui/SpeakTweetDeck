import { buttonInNavigatorBase } from "./base/buttonInNavigatorBase";
import { Button } from "./type/Button";

export const globalMuteButton = (): Button => {
  const button = buttonInNavigatorBase();
  button.title = "speak: global mute";
  button.textContent = "🔇";
  button.style.opacity = ".5";
  button.addEventListener("click", () => {
    const mute = localStorage.getItem("mute") === true.toString();
    const after = !mute;
    button.style.opacity = after ? "1" : ".5";
    localStorage.setItem("mute", after.toString());
  });
  return button;
};
