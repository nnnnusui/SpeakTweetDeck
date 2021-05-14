import { Timeline } from "./tweet/Timeline";
import { WhiteList } from "./WhiteList";

const name = "toggle-speak-button";
const addToTimelineHeader = (source: Element) => {
  const title = source.getElementsByClassName("column-title")[0];
  if (!title) return;
  if (Array.from(title.children).find((it) => it.classList.contains(name)))
    return;

  const timeline = Timeline.fromElement(source);
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

const onViewDetail = new MutationObserver((mutations) =>
  mutations.forEach((mutation) => {
    const timeline = mutation.target as Element;
    if (timeline.classList.contains("js-column-state-detail-view")) return;
    addToTimelineHeader(timeline);
  })
);
const setOnViewDetail = (target: Node) => {
  onViewDetail.observe(target, {
    attributes: true,
    attributeFilter: ["class"],
  });
};

const onAddTimeline = new MutationObserver((mutations) =>
  mutations.forEach((mutation) => mutation.addedNodes.forEach(setOnViewDetail))
);
const setOnAddTimeline = (target: Node) => {
  onAddTimeline.observe(target, { childList: true });
};

export const addToggleSpeakButtonToTimelines = (): void => {
  const timelinesContainer = document.getElementsByClassName("app-columns")[0];
  if (!timelinesContainer)
    throw Error("timelinesContainer: 'app-columns' not found.");

  setOnAddTimeline(timelinesContainer);

  const timelines = Array.from(timelinesContainer.children);
  timelines.forEach((it) => {
    addToTimelineHeader(it);
    setOnViewDetail(it);
  });
};
