import { Timeline } from "./Timeline";
import { WhiteList } from "./WhiteList";

const addToTimelineHeader = (timelineHeader: Element) => {
  let mute = true;
  const timeline = Timeline.fromElement(timelineHeader);
  const button = document.createElement("a");
  button.href = "#";
  button.title = "toggle speak";
  button.classList.add("tweet-action");
  button.textContent = "🔇";
  button.onclick = () => {
    if (mute) {
      button.textContent = "🔊";
      WhiteList.push({ timeline });
    } else {
      button.textContent = "🔇";
      const index = WhiteList.indexOf({ timeline });
      WhiteList.splice(index);
    }
    mute = !mute;
    console.log(WhiteList);
  };
  const container = document.createElement("div");
  container.appendChild(button);
  timelineHeader.firstChild?.after(container);
};

export const addToggleSpeakButtonToTimelines = () => {
  const timelineHeaders = Array.from(
    document.getElementsByClassName("column-title")
  );
  timelineHeaders.forEach(addToTimelineHeader);
};
