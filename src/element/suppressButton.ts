import { buttonInNavigatorBase } from "./base/buttonInNavigatorBase";
import { Button } from "./type/Button";

export const suppressButton = (): Button => {
  const button = buttonInNavigatorBase();
  button.textContent = "🔈";
  button.title = "speak: suppress";
  button.addEventListener("click", () => window.speechSynthesis.cancel());
  return button;
};
