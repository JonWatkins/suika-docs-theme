import {
  PageEvent,
  Reflection,
  JSX,
  DeclarationReflection,
  ProjectReflection,
} from "typedoc";

export const camelToTitleCase = (text: string): string => {
  return (
    text.substring(0, 1).toUpperCase() +
    text.substring(1).replace(/[a-z][A-Z]/g, (x) => `${x[0]} ${x[1]}`)
  );
};

export const displayName = (props: PageEvent<Reflection>) => {
  return props.model.isProject()
    ? getDisplayName(props.model)
    : `${getDisplayName(props.model)} | ${getDisplayName(props.project)}`;
};

export const getDisplayName = (refl: Reflection) => {
  let version = "";
  if (
    (refl instanceof DeclarationReflection ||
      refl instanceof ProjectReflection) &&
    refl.packageVersion
  ) {
    version = ` - v${refl.packageVersion}`;
  }

  return `${refl.name}${version}`;
};

export const classNames = (
  names: Record<string, boolean | null | undefined>,
  extraCss?: string
): string | undefined => {
  const css = Object.keys(names)
    .filter((key) => names[key])
    .concat(extraCss || "")
    .join(" ")
    .trim()
    .replace(/\s+/g, " ");

  return css.length ? css : undefined;
};

export const wordbreak = (str: string): (string | JSX.Element)[] => {
  const ret: (string | JSX.Element)[] = [];
  const re = /[\s\S]*?(?:[^_-][_-](?=[^_-])|[^A-Z](?=[A-Z][^A-Z]))/g;
  let match: RegExpExecArray | null;
  let i = 0;

  while ((match = re.exec(str))) {
    ret.push(match[0], <wbr />);
    i += match[0].length;
  }

  ret.push(str.slice(i));
  return ret;
};

export function getReadme(model: DeclarationReflection): JSX.Element | string {
  const readme = model.readme?.[0]?.text
    .split(/(\r?\n)+/)[0]
    .replace(/#+\s*/, "");

  return readme ? <div class="menu-item-desc">{readme}</div> : "";
}

export const getComment = (
  model: DeclarationReflection
): JSX.Element | string => {
  const comment = model.comment || model.signatures?.[0].comment;
  const summary = comment?.summary;
  if (!summary || !summary.length) return "";
  const content = [];

  for (const line of summary) {
    const lineText = line.text;
    content.push(lineText.trim());
  }

  const textContent = content.join(" ");
  const commentContent = textContent.split(/[\r\n]/)[0] ?? textContent;
  const parsedCommentContent = commentContent
    .replace(/\s,\s/g, ", ")
    .replace(/\s\./g, ".")
    .replace(/(:\s?)?```(tsx?)?$/, "")
    .replace(/^#\s*/, "")
    .replace(/^\[([^\]]+)$/, "$1");

  return parsedCommentContent
    ? JSX.createElement(
        "div",
        { class: "menu-item-desc" },
        parsedCommentContent
      )
    : "";
};
