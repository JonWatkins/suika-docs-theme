import { DefaultThemeRenderContext, JSX, PageEvent, Reflection } from "typedoc";

export const toolbar = (
  context: DefaultThemeRenderContext,
  props: PageEvent<Reflection>
) => (
  <header class="tsd-page-toolbar">
    <div class="tsd-toolbar-contents container">
      <div
        class="table-cell"
        id="tsd-search"
        data-base={context.relativeURL("./")}
      >
        <div class="field">
          <label
            for="tsd-search-field"
            class="tsd-widget tsd-toolbar-icon search no-caption"
          >
            {context.icons.search()}
          </label>
          <input type="text" id="tsd-search-field" aria-label="Search" />
        </div>

        <div class="field">
          <div id="tsd-toolbar-links">
            {Object.entries(context.options.getValue("navigationLinks")).map(
              ([label, url]) => (
                <a href={url} target="_blank">
                  {label}
                </a>
              )
            )}
          </div>
        </div>

        <ul class="results">
          <li class="state loading">Preparing search index...</li>
          <li class="state failure">The search index is not available</li>
        </ul>

        <a
          href={
            context.options.getValue("titleLink") ||
            context.relativeURL("index.html")
          }
          class="title"
        >
          {props.project.name} - v{props.project.packageVersion}
        </a>
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
