import { addPlayButtonToTweet } from "../injector/addPlayButtonToTweet";
import { Tweet } from "../type/Tweet";
import { AllowList } from "../type/AllowList";
import { speaker } from "../speaker";
import { GlobalMute } from "../type/GlobalMute";

const isSpeakTarget = (tweet: Tweet) => AllowList.check(tweet);
const onDetect = (tweetNode: Node) => {
  const tweetElement = tweetNode as Element;
  const tweet = Tweet.fromElement(tweetElement);
  addPlayButtonToTweet(tweetElement);
  if (GlobalMute.get()) return;
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
