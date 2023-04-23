import {
  ContainerReflection,
  JSX,
  PageEvent,
  Reflection,
  RenderTemplate,
} from "typedoc";

import { ThemeContext } from "../ThemeContext";
import { classNames, displayName } from "./utils";

export const renderTitle = (
  props: PageEvent<ContainerReflection>
): JSX.Element => <title>{displayName(props)}</title>;

export const renderKeywords = (values: string[]): JSX.Element | string => {
  if (Array.isArray(values) && values.length) {
    return <meta name="keyword" content={values.join(" ")} />;
  } else {
    return "";
  }
};

export const renderMeta = (
  context: ThemeContext,
  props: PageEvent<ContainerReflection>
) => {
  return (
    <>
      <meta charSet="utf-8" />
      <meta http-equiv="x-ua-compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta
        name="description"
        content={`Documentation for ${props.project.name}`}
      />
      {renderKeywords(context.options.getValue("keywords") as string[])}
    </>
  );
};

export const renderLinks = (context: ThemeContext): JSX.Element => {
  return (
    <>
      <link
        rel="stylesheet"
        href={context.relativeURL("assets/style.css", true)}
      />
      <link
        rel="stylesheet"
        href={context.relativeURL("assets/highlight.css", true)}
      />
      <link
        rel="stylesheet"
        href={context.relativeURL("assets/suika-theme.css")}
      />
      {context.options.getValue("customCss") && (
        <link
          rel="stylesheet"
          href={context.relativeURL("assets/custom.css", true)}
        />
      )}
    </>
  );
};

export const renderScripts = (context: ThemeContext): JSX.Element => {
  return (
    <>
      <script defer src={context.relativeURL("assets/main.js", true)}></script>
      <script
        async
        src={context.relativeURL("assets/search.js", true)}
        id="search-script"
      ></script>
      <script>
        <JSX.Raw html='document.documentElement.dataset.theme = localStorage.getItem("tsd-theme") || "os"' />
      </script>
    </>
  );
};

export const renderMainBody = (
  context: ThemeContext,
  template: RenderTemplate<PageEvent<Reflection>>,
  props: PageEvent<ContainerReflection>
): JSX.Element => {
  return (
    <div
      class={classNames({
        container: true,
        "container-main": true,
      })}
    >
      <div class="col-content">
        {context.hook("content.begin")}
        {context.header(props)}
        {template(props)}
        {context.hook("content.end")}
      </div>
      <div class="col-sidebar">
        <div class="page-menu">
          {context.hook("pageSidebar.begin")}
          {context.pageSidebar(props)}
          {context.hook("pageSidebar.end")}
        </div>
        <div class="site-menu">
          {context.hook("sidebar.begin")}
          {context.sidebar(props)}
          {context.hook("sidebar.end")}
        </div>
      </div>
    </div>
  );
};

export const defaultLayout = (
  context: ThemeContext,
  template: RenderTemplate<PageEvent<Reflection>>,
  props: PageEvent<ContainerReflection>
): JSX.Element => {
  return (
    <html class="default" lang={context.options.getValue("htmlLang")}>
      <head>
        {context.hook("head.begin")}
        {renderMeta(context, props)}
        {renderTitle(props)}
        {renderLinks(context)}
        {renderScripts(context)}
        {context.hook("head.end")}
      </head>
      <body>
        {context.hook("body.begin")}
        {context.toolbar(props)}
        {renderMainBody(context, template, props)}
        {context.footer()}
        {context.analytics()}
        {context.hook("body.end")}
        <div class="overlay"></div>
      </body>
    </html>
  );
};
