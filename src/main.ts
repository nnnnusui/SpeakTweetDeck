import { addSpeakButton } from "./addSpeakButton";
import { addSuppressButton } from "./addSuppressButton";
import { Text } from "./Text";
import { Tweet } from "./Tweet";

const secondsToWaitForLoad = 8;
setTimeout(() => {
  addSuppressButton();
  addSpeakButtonToExistingTweets();
  registerTweetObserver();
  console.log("SpeakTweetDeck: loaded.");
}, secondsToWaitForLoad * 1000);

const addSpeakButtonToExistingTweets = () =>
  Array.from(document.getElementsByClassName("tweet")).forEach((it) =>
    addSpeakButton(it, () => speak(Tweet.fromElement(it)))
  );

const registerTweetObserver = () => {
  const observer = new MutationObserver((mutations) =>
    mutations.forEach((mutation) =>
      Array.from(mutation.addedNodes)
        .reverse()
        .forEach((it) => onDetectTweet(it as Element))
    )
  );
  Array.from(document.getElementsByClassName("chirp-container")).forEach((it) =>
    observer.observe(it, { childList: true })
  );
};

const onDetectTweet = (tweetNode: Node) => {
  const tweetElement = tweetNode as Element;
  const tweet = Tweet.fromElement(tweetElement);
  if (isSpeakTarget(tweet)) speak(tweet);
  addSpeakButton(tweetElement, () => speak(tweet));
};

const isSpeakTarget = (tweet: Tweet) => true;
const speak = (tweet: Tweet) => {
  const utterance = utteranceFromTweet(tweet);
  window.speechSynthesis.speak(utterance);
};

const utteranceFromTweet = (tweet: Tweet) => {
  const convertText = (text: Text) => {
    switch (text.kind) {
      case "plain":
        return text.value;
      case "url":
        return `url`;
      default:
        return `${text.kind} ${text.value}`;
    }
  };
  const textContent = Array.from(tweet.text).map(convertText).join("\n");
  const isRetweet = tweet.isRetweet ? "Retweet" : "";
  const isReply = tweet.isReply ? "Reply" : "";
  const mediaInfo = tweet.media
    ? `${tweet.media.type}${tweet.media.amount}`
    : "";
  const utterance = new SpeechSynthesisUtterance(
    [
      tweet.timeline.title,
      isRetweet,
      isReply,
      tweet.userName,
      textContent,
      mediaInfo,
    ].join("\n")
  );
  utterance.rate = 1.6;
  return utterance;
};
