import { Tweet } from "./type/Tweet";
import { Text } from "./type/tweet/Text";
import { UtteranceParameter } from "./type/UtteranceParameter";

const previewer = (() => {
  const container = document.createElement("div");
  container.classList.add("previewer");
  return container;
})();

let latest = new SpeechSynthesisUtterance("");
let current = new SpeechSynthesisUtterance("");
const play = (utterance: SpeechSynthesisUtterance) => {
  UtteranceParameter.applyTo(utterance);
  window.speechSynthesis.speak(utterance);
};
const cancel = (): void => window.speechSynthesis.cancel();
const reSpeakCurrent = (): void => {
  cancel();
  play(current);
};
export const speaker = {
  speak: (node: Node): void => {
    const element = node as Element;
    const tweet = Tweet.fromElement(element);
    const utterance = utteranceFromTweet(tweet);
    utterance.addEventListener("start", () => {
      current = utterance;
      previewer.childNodes.forEach((it) => it.remove());
      previewer.append(node.cloneNode(true));
      previewer.style.width = `${element.clientWidth}px`;
    });
    if (window.speechSynthesis.speaking) {
      latest.addEventListener("end", () => play(utterance));
    } else {
      play(utterance);
    }
    latest = utterance;
  },
  reSpeakCurrent,
  cancel,
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
