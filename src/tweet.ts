import { Media } from "./Media";
import { Timeline } from "./Timeline";

const fromElement = (source: Element) => {
  const timelineElement =
    source.parentElement?.parentElement?.parentElement?.parentElement
      ?.parentElement?.parentElement;
  const timeline = Timeline.fromElement(timelineElement!);
  const username = source.getElementsByClassName("fullname")[0].textContent;
  const userid = source
    .getElementsByClassName("username")[0]
    .textContent?.substr(1);
  const text = source.getElementsByClassName("js-tweet-text")[0].childNodes;
  const mediaElement = source.getElementsByClassName("media-preview")[0];
  const media = mediaElement ? Media.fromElement(mediaElement) : null;
  return {
    timeline: timeline,
    username: username ? username : "",
    useid: userid ? userid : "",
    text: text ? text : new NodeList(),
    media,
  };
};
type Tweet = ReturnType<typeof fromElement>;
const Tweet = {
  fromElement,
};
export { Tweet };
