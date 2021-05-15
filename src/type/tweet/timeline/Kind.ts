const kinds = [
  "home",
  "user",
  "notifications",
  "search",
  "list",
  "collection",
  "trending",
  "likes",
  "messages",
  "mentions",
  "followers",
  "scheduled",
  "activity",
  "unknown",
] as const;
type Kind = typeof kinds[number];

const isKind = (it: unknown): it is Kind => !!kinds.find((kind) => it === kind);
const fromString = (from: string): Kind => {
  if (isKind(from)) return from;
  return "unknown";
};
const fromIconType = (iconType: string): Kind => {
  const converted = (() => {
    switch (iconType) {
      case "schedule":
        return "scheduled";
      case "favorite":
        return "likes";
      case "follow":
        return "followers";
      case "message":
        return "messages";
      case "mention":
        return "mentions";
      case "custom-timeline":
        return "collection";
      default:
        return iconType;
    }
  })();
  return fromString(converted);
};

const Kind = {
  values: kinds,
  fromString,
  fromIconType,
};
export { Kind };
