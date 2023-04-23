import { DefaultThemeRenderContext, JSX, PageEvent, Reflection } from "typedoc";

export function pageSidebar(
  context: DefaultThemeRenderContext,
  props: PageEvent<Reflection>
) {
  return <>{context.pageNavigation(props)}</>;
}
