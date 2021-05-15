import { speak } from "./speak";
import { Tweet } from "./tweet";
import { Timeline } from "./tweet/Timeline";
import { WhiteList } from "./WhiteList";

export const inject = (): void => {
  const navigator = document.getElementsByClassName("app-navigator")[0];
  if (!navigator) throw Error("html class: 'app-navigator' not found.");
  const timelinesContainer = document.getElementsByClassName("app-columns")[0];
  if (!timelinesContainer) throw Error("html class: 'app-columns' not found.");
  const timelines = Array.from(timelinesContainer.children);
  const tweets = Array.from(document.getElementsByClassName("tweet"));

  addSuppressButtonToNavigator(navigator);
  addGlobalMuteButtonToNavigator(navigator);
  timelines.forEach(addToggleSpeakButtonToTimeline);
  tweets.forEach(addPlayButtonToTweet);

  const tweetContainers = Array.from(
    document.getElementsByClassName("chirp-container")
  );
  setOnAddTimeline(timelinesContainer);
  timelines.forEach(setOnViewDetail);
  tweetContainers.forEach(setOnDetectTweet);
};

const buttonBase = () => {
  const base = document.createElement("a");
  base.href = "#";
  base.classList.add("link-clean");
  return base;
};
const buttonInNavigatorBase = () => {
  const base = buttonBase();
  base.style.display = "flex";
  base.style.justifyContent = "center";
  base.style.fontSize = "2em";
  base.style.marginBottom = ".2em";
  return base;
};

const addSuppressButtonToNavigator = (navigator: Element) => {
  const button = buttonInNavigatorBase();
  button.textContent = "🔈";
  button.title = "speak: suppress";
  button.addEventListener("click", () => window.speechSynthesis.cancel());
  navigator.prepend(button);
};

const addGlobalMuteButtonToNavigator = (navigator: Element): void => {
  const button = buttonInNavigatorBase();
  button.title = "speak: global mute";
  button.textContent = "🔇";
  button.style.opacity = ".5";
  button.addEventListener("click", () => {
    const mute = localStorage.getItem("mute") === true.toString();
    const after = !mute;
    button.style.opacity = after ? "1" : ".5";
    localStorage.setItem("mute", after.toString());
  });
  navigator.prepend(button);
};

const addToggleSpeakButtonToTimeline = (element: Element) => {
  const className = "toggle-speak-button";
  const title = element.getElementsByClassName("column-title")[0];
  if (!title) return;
  if (Array.from(title.children).find((it) => it.classList.contains(className)))
    return;

  const timeline = Timeline.fromElement(element);
  const button = buttonBase();
  button.title = "speak: toggle";
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
  button.classList.add(className);
  title.insertBefore(
    button,
    title.getElementsByClassName("column-header-links")[0]
  );
};

const addPlayButtonToTweet = (tweet: Element) => {
  const actionList = tweet.getElementsByClassName("tweet-actions")[0];
  if (!actionList) return;
  const button = buttonBase();
  button.title = "speak: play";
  button.textContent = "🔊";
  button.addEventListener("click", () => speak(Tweet.fromElement(tweet)));
  button.classList.add("tweet-action");
  const container = document.createElement("li");
  container.appendChild(button);
  actionList.appendChild(container);
};

// observers
const onViewDetail = new MutationObserver((mutations) =>
  mutations.forEach((mutation) => {
    const timeline = mutation.target as Element;
    console.log("observe");
    addToggleSpeakButtonToTimeline(timeline);
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

const isSpeakTarget = (tweet: Tweet) => WhiteList.check(tweet);
const onDetectTweet = (tweetNode: Node) => {
  const tweetElement = tweetNode as Element;
  const tweet = Tweet.fromElement(tweetElement);
  addPlayButtonToTweet(tweetElement);
  if (!isSpeakTarget(tweet)) return;
  const mute = localStorage.getItem("mute") === true.toString();
  if (mute) return;
  speak(tweet);
};
const onDetectTweetObserver = new MutationObserver((mutations) =>
  mutations.forEach((mutation) =>
    Array.from(mutation.addedNodes)
      .reverse()
      .forEach((it) => onDetectTweet(it as Element))
  )
);
const setOnDetectTweet = (target: Node) => {
  onDetectTweetObserver.observe(target, { childList: true });
};
