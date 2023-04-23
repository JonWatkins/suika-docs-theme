import { Theme } from "./Theme";
import { cpSync } from "fs";
import { resolve } from "path";
import { THEME_NAME, OPTIONS_NAME } from "./constants";

import {
  Application,
  RendererEvent,
  ParameterType,
  Converter,
  Context,
} from "typedoc";

export function load(app: Application) {
  app.options.addDeclaration({
    name: OPTIONS_NAME,
    help: "",
    type: ParameterType.Object,
  });

  app.listenTo(app.renderer, RendererEvent.END, () => {
    const from = resolve(__dirname, "../assets/style.css");
    const to = resolve(app.options.getValue("out"), `assets/${THEME_NAME}.css`);
    cpSync(from, to);
  });

  app.renderer.defineTheme(THEME_NAME, Theme);
}
