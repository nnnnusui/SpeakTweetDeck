import { Tweet } from "./type/Tweet";
import { Text } from "./type/tweet/Text";

const previewer = (() => {
  const container = document.createElement("div");
  container.classList.add("previewer");
  return container;
})();
export const speaker = {
  speak: (node: Node): void => {
    const tweet = Tweet.fromElement(node as Element);
    const utterance = utteranceFromTweet(tweet);
    utterance.addEventListener("start", () => {
      previewer.childNodes.forEach((it) => it.remove());
      previewer.append(node.cloneNode(true));
    });
    window.speechSynthesis.speak(utterance);
  },
  previewer,
};

const utteranceFromTweet = (tweet: Tweet): SpeechSynthesisUtterance => {
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
      tweet.timeline.kind,
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
