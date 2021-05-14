import { Timeline } from "./Timeline";
import { WhiteList } from "./WhiteList";

const addToTimelineHeader = (timelineHeader: Element) => {
  const timeline = Timeline.fromElement(timelineHeader);
  const button = document.createElement("a");
  button.href = "#";
  button.title = "toggle speak";
  button.classList.add("tweet-action");
  button.textContent = WhiteList.exists({ timeline }) ? "🔊" : "🔇";
  button.onclick = () => {
    if (WhiteList.exists({ timeline })) {
      button.textContent = "🔇";
      WhiteList.remove({ timeline });
    } else {
      button.textContent = "🔊";
      WhiteList.add({ timeline });
    }
  };
  const container = document.createElement("div");
  container.appendChild(button);
  timelineHeader.firstChild?.after(container);
};

export const addToggleSpeakButtonToTimelines = (): void => {
  const timelineHeaders = Array.from(
    document.getElementsByClassName("column-title")
  );
  timelineHeaders.forEach(addToTimelineHeader);
};
