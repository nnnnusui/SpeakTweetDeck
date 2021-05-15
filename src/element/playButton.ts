import { speak } from "../speak";
import { Tweet } from "../type/Tweet";
import { buttonBase } from "./base/buttonBase";
import { Button } from "./type/Button";

export const playButton = (tweet: Tweet): Button => {
  const button = buttonBase();
  button.title = "speak: play";
  button.textContent = "🔊";
  button.addEventListener("click", () => speak(tweet));
  button.classList.add("tweet-action");
  return button;
};
