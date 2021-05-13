import { Timeline } from "./Timeline";

const fromElement = (source: Element) => {
  const timelineElement =
    source.parentElement?.parentElement?.parentElement?.parentElement
      ?.parentElement?.parentElement;
  const timeline = Timeline.fromElement(timelineElement!);
  const username = source.getElementsByClassName("fullname")[0].textContent;
  const text = source.getElementsByClassName("js-tweet-text")[0].childNodes;
  return {
    timeline: timeline,
    username: username ? username : "",
    text: text ? text : new NodeList(),
  };
};
type Tweet = ReturnType<typeof fromElement>;
const Tweet = {
  fromElement,
};
export { Tweet };
