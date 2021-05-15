import { FilteringCondition } from "../FilteringCondition";
import { WhiteList } from "../WhiteList";
import { buttonBase } from "./base/buttonBase";

export const className = "toggle-speak-button";
export const toggleSpeakButton = (
  condition: FilteringCondition
): HTMLAnchorElement => {
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
