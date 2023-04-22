import { cpSync } from "fs";
import { resolve } from "path";
import { Application, RendererEvent } from "typedoc";
import { Theme } from "./Theme";

export function load(app: Application) {
  app.listenTo(app.renderer, RendererEvent.END, () => {
    const from = resolve(__dirname, "../assets/style.css");
    const to = resolve(app.options.getValue("out"), "assets/suika-theme.css");
    cpSync(from, to);
  });

  app.renderer.defineTheme("suika-theme", Theme);
}
