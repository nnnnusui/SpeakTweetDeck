import { addPlayButtonToTweet } from "../injector/addPlayButtonToTweet";
import { speak } from "../speak";
import { Tweet } from "../type/Tweet";
import { AllowList } from "../type/AllowList";

const isSpeakTarget = (tweet: Tweet) => AllowList.check(tweet);
const onDetect = (tweetNode: Node) => {
  const tweetElement = tweetNode as Element;
  const tweet = Tweet.fromElement(tweetElement);
  addPlayButtonToTweet(tweetElement);
  if (!isSpeakTarget(tweet)) return;
  const mute = localStorage.getItem("mute") === true.toString();
  if (mute) return;
  speak(tweet);
};

const observer = new MutationObserver((mutations) =>
  mutations.forEach((mutation) =>
    Array.from(mutation.addedNodes)
      .reverse()
      .forEach((it) => onDetect(it as Element))
  )
);
export const onDetectTweet = {
  set: (it: Node): void => {
    observer.observe(it, { childList: true });
  },
  observer,
};
