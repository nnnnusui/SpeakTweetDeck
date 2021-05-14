const getMediaType = (source: Element) => {
  const isVideo = source.getElementsByClassName("video-overlay").length != 0;
  if (isVideo) return "video";
  return "image";
};
const fromElement = (source: Element): Media => {
  const mediaType = getMediaType(source);
  const imageContainers = source.getElementsByClassName(
    "media-image-container"
  );
  const amount = imageContainers.length == 0 ? 1 : imageContainers.length;
  return { type: mediaType, amount };
};
const none = { type: "none", amount: 0 };
type Media = {
  type: string;
  amount: number;
};
const Media = {
  fromElement,
  none,
};
export { Media };
