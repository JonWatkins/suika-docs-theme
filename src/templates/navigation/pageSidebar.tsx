import { DefaultThemeRenderContext, JSX, PageEvent, Reflection } from "typedoc";

export const pageSidebar = (
  context: DefaultThemeRenderContext,
  props: PageEvent<Reflection>
): JSX.Element => {
  return (
    <>
      {/* context.settings()*/}
      {context.pageNavigation(props)}
    </>
  );
};
