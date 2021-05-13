import { Media } from "./Media";
import { Text } from "./Text";
import { Timeline } from "./Timeline";

const fromElement = (source: Element) => {
  const timelineElement =
    source.parentElement?.parentElement?.parentElement?.parentElement
      ?.parentElement?.parentElement;
  if (!timelineElement) throw new Error("Could not find Timeline element.");
  const timeline = Timeline.fromElement(timelineElement);

  const mediaElement = source.getElementsByClassName("media-preview")[0];
  const media = mediaElement ? Media.fromElement(mediaElement) : null;

  // const activityElement =
  //   source.getElementsByClassName("activity-header")[0]?.textContent;
  // const isLiked = activityElement?.includes("liked");
  // const isFollowed = activityElement?.includes("followed");

  const isRetweet = !!source
    .getElementsByClassName("tweet-context")[0]
    ?.textContent?.includes("Retweeted");

  const isReply = !!source.getElementsByClassName("other-replies")[0];

  const userName = source.getElementsByClassName("fullname")[0].textContent;
  const userId = source
    .getElementsByClassName("username")[0]
    .textContent?.substr(1);
  const text = Array.from(
    source.getElementsByClassName("js-tweet-text")[0].childNodes
  ).map(Text.fromNode);
  return {
    timeline,
    isRetweet,
    isReply,
    media,
    userName: userName ? userName : "",
    userId: userId ? userId : "",
    text: text ? text : ([] as typeof text),
  };
};
type Tweet = ReturnType<typeof fromElement>;
const Tweet = {
  fromElement,
};
export { Tweet };
