import { Kind } from "./timeline/Kind";

type Timeline =
  | { kind: "scheduled" }
  | {
      kind:
        | "home"
        | "user"
        | "notifications"
        | "likes"
        | "followers"
        | "activity";
      account: string;
    }
  | { kind: "messages" | "mentions"; account: string }
  | { kind: "list" | "collection"; title: string; account: string }
  | {
      kind: "search";
      input: string;
    }
  | { kind: "trending"; account: string }
  | { kind: "unknown"; title: string; account: string; input: string };

const getTimeline = (source: Element, kind: Kind): Timeline => {
  const mayBeAccount = source
    ?.getElementsByClassName("column-header-title")[0]
    ?.getElementsByClassName("attribution")[0]?.textContent;
  const accountOr = (els: string) => (mayBeAccount ? mayBeAccount : els);
  const account = accountOr("");

  const mayBeTitle =
    source.getElementsByClassName("column-heading")[0]?.textContent;
  const title = mayBeTitle ? mayBeTitle : "";

  const mayBeInput = source
    .getElementsByClassName("column-title-edit-box")[0]
    ?.getAttribute("value");
  const input = mayBeInput ? mayBeInput : "";

  switch (kind) {
    case "scheduled":
      return { kind };
    case "home":
    case "notifications":
    case "followers":
    case "activity":
    case "user":
    case "likes":
      return { kind, account };

    case "messages":
    case "mentions":
      return { kind, account: accountOr("all accounts") };

    case "list":
    case "collection": {
      return { kind, title, account };
    }

    case "search": {
      return { kind, input };
    }

    case "trending": {
      const mayBe = source
        .getElementsByClassName("column-message")[0]
        ?.firstChild?.lastChild?.textContent?.substr("Trends for @".length);
      const account = mayBe ? mayBe : "";
      return { kind, account };
    }

    case "unknown":
      return { kind, title, account, input };
  }
};

const iconTypePrefix = "icon-";
const fromElement = (source: Element): Timeline => {
  const icon = source.getElementsByClassName("column-type-icon")[0];
  const iconType = Array.from(icon.classList)
    .find((it) => it.startsWith(iconTypePrefix))
    ?.substr(iconTypePrefix.length);
  const kind = Kind.fromIconType(iconType ? iconType : "");

  const timeline = getTimeline(source, kind);
  return timeline;
};

type AnyTimeline = {
  kind: Kind;
  title?: string;
  account?: string;
  input?: string;
};
const equals = (_lhs: Timeline, _rhs: Timeline): boolean => {
  if (_lhs.kind !== _rhs.kind) return false;

  const lhs = _lhs as AnyTimeline;
  const rhs = _rhs as AnyTimeline;
  return (
    lhs.title === rhs.title &&
    lhs.account === rhs.account &&
    lhs.input === rhs.input
  );
};

const Timeline = {
  fromElement,
  equals,
};
export { Timeline };
