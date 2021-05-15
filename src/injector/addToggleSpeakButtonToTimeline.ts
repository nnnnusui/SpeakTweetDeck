import { toggleSpeakButton } from "../element/toggleSpeakButton";
import { Timeline } from "../type/tweet/Timeline";

export const addToggleSpeakButtonToTimeline = (element: Element): void => {
  const className = "toggle-speak-button";
  const title = element.getElementsByClassName("column-title")[0];
  if (!title) return;
  if (Array.from(title.children).find((it) => it.classList.contains(className)))
    return;

  const timeline = Timeline.fromElement(element);
  const button = toggleSpeakButton({ timeline });
  title.insertBefore(
    button,
    title.getElementsByClassName("column-header-links")[0]
  );
};
