import { Tweet } from "./type/Tweet";
import { Text } from "./type/tweet/Text";

export const speak = (tweet: Tweet): void => {
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
  const mediaInfo =
    tweet.media.type === "none"
      ? ""
      : `${tweet.media.type}${tweet.media.amount}`;
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
