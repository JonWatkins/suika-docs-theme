import { DefaultTheme, Renderer, PageEvent, Reflection } from "typedoc";
import { ThemeContext } from "./ThemeContext";

export class Theme extends DefaultTheme {
  constructor(renderer: Renderer) {
    super(renderer);
  }

  override getRenderContext(pageEvent: PageEvent<Reflection>): ThemeContext {
    return new ThemeContext(this, pageEvent, this.application.options);
  }
}
