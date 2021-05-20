import { GlobalMute } from "../type/GlobalMute";
import { buttonInNavigatorBase } from "./base/buttonInNavigatorBase";
import { Button } from "./type/Button";

export const globalMuteButton = (): Button => {
  const button = buttonInNavigatorBase();
  button.title = "speak: global mute";
  button.textContent = "🔇";
  button.style.opacity = ".5";
  button.addEventListener("click", () => {
    const after = GlobalMute.toggle();
    button.style.opacity = after ? "1" : ".5";
  });
  return button;
};
