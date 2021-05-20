import { speaker } from "../speaker";
import { buttonBase } from "./base/buttonBase";
import { Button } from "./type/Button";

export const playButton = (tweet: Node): Button => {
  const button = buttonBase();
  button.title = "speak: play";
  button.textContent = "🔊";
  button.addEventListener("click", () => speaker.speak(tweet));
  button.classList.add("tweet-action");
  return button;
};
