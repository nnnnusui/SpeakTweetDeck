import { Timeline } from "./tweet/Timeline";
import { WhiteList } from "./WhiteList";

const name = "toggle-speak-button";
const addToTimelineHeader = (source: Element) => {
  const title = source.getElementsByClassName("column-title")[0];
  if (!title) return;
  if (Array.from(title.children).find((it) => it.classList.contains(name)))
    return;

  const timeline = Timeline.fromElement(source);
  console.log(timeline);
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
  container.classList.add(name);
  container.appendChild(button);
  title?.firstChild?.after(container);
};

const observer = new MutationObserver((mutations) =>
  mutations.forEach((mutation) => {
    const timeline = mutation.target as Element;
    if (timeline.classList.contains("js-column-state-detail-view")) return;
    addToTimelineHeader(timeline);
  })
);

export const addToggleSpeakButtonToTimelines = (): void => {
  const timelines = Array.from(document.getElementsByClassName("column"));
  timelines.forEach((it) => {
    addToTimelineHeader(it);
    observer.observe(it, {
      attributes: true,
      attributeFilter: ["class"],
    });
  });
};
