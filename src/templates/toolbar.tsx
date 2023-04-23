import { DefaultThemeRenderContext, JSX, PageEvent, Reflection } from "typedoc";
import { displayName } from "./utils";

export interface toolbarLink {
  url: string;
  label: string;
  target: string;
}

export type toolbarLinks = toolbarLink[];

export const renderToolbarLinks = (
  context: DefaultThemeRenderContext,
  values: toolbarLinks
) => {
  if (Array.isArray(values) && values.length) {
    return (
      <div class="field">
        <div id="tsd-toolbar-links">
          <a href={context.relativeURL("./index.html")}>DOCS</a>
          <a href={context.relativeURL("./modules.html")}>API</a>
          {values.map(
            ({ url, label, target = "_self" }: toolbarLink): JSX.Element => (
              <a href={url} target={target}>
                {label}
              </a>
            )
          )}
        </div>
      </div>
    );
  }
};

export const renderToolbarTitle = (
  context: DefaultThemeRenderContext,
  props: PageEvent<Reflection>
): JSX.Element => {
  return (
    <a
      href={
        context.options.getValue("titleLink") ||
        context.relativeURL("index.html")
      }
      class="title"
    >
      {displayName(props)}
    </a>
  );
};

export const renderSearchField = (
  context: DefaultThemeRenderContext
): JSX.Element => {
  return (
    <div class="field">
      <label
        for="tsd-search-field"
        class="tsd-widget tsd-toolbar-icon search no-caption"
      >
        {context.icons.search()}
      </label>
      <input type="text" id="tsd-search-field" aria-label="Search" />
    </div>
  );
};

export const renderSearchResults = (): JSX.Element => {
  return (
    <ul class="results">
      <li class="state loading">Preparing search index...</li>
      <li class="state failure">The search index is not available</li>
    </ul>
  );
};

export const toolbar = (
  context: DefaultThemeRenderContext,
  props: PageEvent<Reflection>
): JSX.Element => (
  <header class="tsd-page-toolbar">
    <div class="tsd-toolbar-contents container">
      <div
        class="table-cell"
        id="tsd-search"
        data-base={context.relativeURL("./")}
      >
        {renderSearchField(context)}
        {renderToolbarLinks(
          context,
          context.options.getValue("toolbarLinks") as toolbarLinks
        )}
        {renderSearchResults()}
        {renderToolbarTitle(context, props)}
      </div>

      <div class="table-cell" id="tsd-widgets">
        <a
          href="src/template/toolbar#"
          class="tsd-widget tsd-toolbar-icon menu no-caption"
          data-toggle="menu"
          aria-label="Menu"
        >
          {context.icons.menu()}
        </a>
      </div>
    </div>
  </header>
);
