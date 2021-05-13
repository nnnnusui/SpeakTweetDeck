type Plain = {
  kind: "plain";
  value: string;
};
type Url = {
  kind: "url";
  value: string;
};
type User = {
  kind: "user";
  value: string;
};
type Hashtag = {
  kind: "hashtag";
  value: string;
};

type TextContent = Plain | Url | User | Hashtag;

const fromNode = (source: Node): TextContent => {
  const text = source.textContent ? source.textContent : "";
  switch (source.nodeName) {
    case "A": {
      if (text.startsWith("@")) return { kind: "user", value: text.substr(1) };
      if (text.startsWith("#"))
        return { kind: "hashtag", value: text.substr(1) };
      const url = (source as Element).getAttribute("data-full-url");
      return {
        kind: "url",
        value: url ? url : "",
      };
    }
    default:
      return { kind: "plain", value: text };
  }
};
type Text = ReturnType<typeof fromNode>;
const Text = {
  fromNode,
};
export { Text };
