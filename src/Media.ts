const getMediaType = (source: Element) => {
  const isVideo = source.getElementsByClassName("video-overlay").length != 0;
  if (isVideo) return "video";
  return "image";
};
const fromElement = (source: Element) => {
  const mediaType = getMediaType(source);
  const imageContainers = source.getElementsByClassName(
    "media-image-container"
  );
  const amount = imageContainers.length == 0 ? 1 : imageContainers.length;
  return { type: mediaType, amount };
};
type Media = ReturnType<typeof fromElement>;
const Media = {
  fromElement,
};
export { Media };
