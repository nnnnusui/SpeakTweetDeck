import { addPlayButtonToTweet } from "../injector/addPlayButtonToTweet";
import { Tweet } from "../type/Tweet";
import { AllowList } from "../type/AllowList";
import { speaker } from "../speaker";

const isSpeakTarget = (tweet: Tweet) => AllowList.check(tweet);
const onDetect = (tweetNode: Node) => {
  const tweetElement = tweetNode as Element;
  const tweet = Tweet.fromElement(tweetElement);
  addPlayButtonToTweet(tweetElement);
  const mute = localStorage.getItem("mute") === true.toString();
  if (mute) return;
  if (!isSpeakTarget(tweet)) return;
  speaker.speak(tweetNode);
};

const observer = new MutationObserver((mutations) =>
  mutations.forEach((mutation) =>
    Array.from(mutation.addedNodes)
      .reverse()
      .forEach((it) => onDetect(it as Element))
  )
);
export const onDetectTweet = {
  set: (to: Node): void => {
    observer.observe(to, { childList: true });
  },
  observer,
};
