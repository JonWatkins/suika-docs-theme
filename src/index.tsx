import { Theme } from "./Theme";
import { writeFileSync } from "fs";
import { resolve } from "path";
import * as sass from "sass";
const THEME_NAME = "suika-theme";

import { Application, RendererEvent, ParameterType } from "typedoc";
export * as utils from "./templates/utils";
export * as templates from "./templates";
export { Theme } from "./Theme";
export { ThemeContext } from "./ThemeContext";

export function load(app: Application) {
  app.options.addDeclaration({
    name: "keywords",
    help: "Meta keywords",
    type: ParameterType.Object,
  });

  app.options.addDeclaration({
    name: "toolbarLinks",
    help: "Toolbar navigation links",
    type: ParameterType.Mixed,
  });

  app.listenTo(app.renderer, RendererEvent.END, (): void => {
    const from = resolve(__dirname, "../src/scss/style.scss");
    const to = resolve(app.options.getValue("out"), `assets/${THEME_NAME}.css`);
    const compiled = sass.compile(from, { style: "compressed" });
    writeFileSync(to, compiled.css);
  });

  app.renderer.defineTheme(THEME_NAME, Theme);
}
