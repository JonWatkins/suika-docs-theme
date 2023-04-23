import { DefaultThemeRenderContext, JSX, PageEvent, Reflection } from "typedoc";

export const footer = (
  context: DefaultThemeRenderContext,
  props: PageEvent<Reflection>
): JSX.Element => (
  <footer class="tsd-generator">
    <p>
      Generated using{" "}
      <a href="https://typedoc.org/" target="_blank">
        TypeDoc
      </a>
    </p>
  </footer>
);
