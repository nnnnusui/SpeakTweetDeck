import { FilteringCondition } from "../type/FilteringCondition";
import { WhiteList } from "../type/WhiteList";
import { buttonBase } from "./base/buttonBase";
import { Button } from "./type/Button";

export const className = "toggle-speak-button";
export const toggleSpeakButton = (condition: FilteringCondition): Button => {
  const button = buttonBase();
  button.title = "speak: toggle";
  button.textContent = WhiteList.exists(condition) ? "🔊" : "🔇";
  button.onclick = () => {
    if (WhiteList.exists(condition)) {
      button.textContent = "🔇";
      WhiteList.remove(condition);
    } else {
      button.textContent = "🔊";
      WhiteList.add(condition);
    }
  };
  button.classList.add(className);
  return button;
};
