import { playButton } from "../element/playButton";
import { Tweet } from "../type/Tweet";

export const addPlayButtonToTweet = (tweet: Element): void => {
  const actionList = tweet.getElementsByClassName("tweet-actions")[0];
  if (!actionList) return;
  const button = playButton(Tweet.fromElement(tweet));
  const container = document.createElement("li");
  container.appendChild(button);
  actionList.appendChild(container);
};
