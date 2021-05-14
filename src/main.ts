import { addSpeakButton } from "./addSpeakButton";
import { addSuppressButton } from "./addSuppressButton";
import { addToggleSpeakButtonToTimelines } from "./addToggleSpeakButtonToTimelines";
import { Text } from "./Text";
import { Tweet } from "./Tweet";
import { WhiteList } from "./WhiteList";

const secondsToWaitForLoad = 8;
setTimeout(() => {
  addSuppressButton();
  addToggleSpeakButtonToTimelines();
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

const isSpeakTarget = (tweet: Tweet) =>
  WhiteList.filter(
    (it) => !it.timeline || it.timeline.title === tweet.timeline.title
  )
    .filter(
      (it) => !it.timeline || it.timeline.account === tweet.timeline.account
    )
    .filter((it) => !it.isReply || it.isReply === tweet.isReply)
    .filter((it) => !it.isRetweet || it.isRetweet === tweet.isRetweet)
    .filter(
      (it) => !it.media || !tweet.media || it.media.type === tweet.media.type
    )
    // .filter((it) => !it.media || !tweet.media || it.media.amount === tweet.media.amount)
    .filter((it) => !it.userId || it.userId === tweet.userId)
    .filter((it) => !it.userName || it.userName === tweet.userName).length !==
  0;
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
