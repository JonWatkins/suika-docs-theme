import { Theme } from "./Theme";
import { cpSync } from "fs";
import { resolve } from "path";
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
    const from = resolve(__dirname, "../dist/style.css");
    const to = resolve(app.options.getValue("out"), `assets/${THEME_NAME}.css`);
    cpSync(from, to);
  });

  app.renderer.defineTheme(THEME_NAME, Theme);
}
