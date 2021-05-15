import { globalMuteButton } from "./element/globalMuteButton";
import { suppressButton } from "./element/suppressButton";
import { addPlayButtonToTweet } from "./injector/addPlayButtonToTweet";
import { addToggleSpeakButtonToTimeline } from "./injector/addToggleSpeakButtonToTimeline";
import { onUpdateTimeline } from "./observer/onUpdateTimeline";
import { speak } from "./speak";
import { Tweet } from "./type/Tweet";
import { WhiteList } from "./WhiteList";

export const inject = (): void => {
  const navigator = document.getElementsByClassName("app-navigator")[0];
  if (!navigator) throw Error("html class: 'app-navigator' not found.");
  const timelinesContainer = document.getElementsByClassName("app-columns")[0];
  if (!timelinesContainer) throw Error("html class: 'app-columns' not found.");
  const timelines = Array.from(timelinesContainer.children);
  const tweets = Array.from(document.getElementsByClassName("tweet"));

  navigator.prepend(globalMuteButton(), suppressButton());
  timelines.forEach(addToggleSpeakButtonToTimeline);
  tweets.forEach(addPlayButtonToTweet);

  const tweetContainers = Array.from(
    document.getElementsByClassName("chirp-container")
  );
  setOnAddTimeline(timelinesContainer);
  timelines.forEach(onUpdateTimeline.set);
  tweetContainers.forEach(setOnDetectTweet);
};

// observers
const onAddTimeline = new MutationObserver((mutations) =>
  mutations.forEach((mutation) =>
    mutation.addedNodes.forEach(onUpdateTimeline.set)
  )
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
