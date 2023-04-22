import { DefaultThemeRenderContext, JSX, PageEvent, Reflection } from "typedoc";

export const footer = (
  context: DefaultThemeRenderContext,
  props: PageEvent<Reflection>
) => (
  <footer class="container tsd-generator">
    <p>
      Generated using{" "}
      <a href="https://typedoc.org/" target="_blank">
        TypeDoc
      </a>
    </p>
  </footer>
);
