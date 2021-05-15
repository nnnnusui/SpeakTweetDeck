import { FilteringCondition } from "../type/FilteringCondition";
import { AllowList } from "../type/AllowList";
import { buttonBase } from "./base/buttonBase";
import { Button } from "./type/Button";

export const className = "toggle-speak-button";
export const toggleSpeakButton = (condition: FilteringCondition): Button => {
  const button = buttonBase();
  button.title = "speak: toggle";
  button.textContent = AllowList.exists(condition) ? "🔊" : "🔇";
  button.onclick = () => {
    if (AllowList.exists(condition)) {
      button.textContent = "🔇";
      AllowList.remove(condition);
    } else {
      button.textContent = "🔊";
      AllowList.add(condition);
    }
  };
  button.classList.add(className);
  return button;
};
