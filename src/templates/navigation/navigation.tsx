import {
  DeclarationReflection,
  DefaultThemeRenderContext,
  JSX,
  PageEvent,
  ProjectReflection,
  Reflection,
  ReflectionKind,
} from "typedoc";
import {
  classNames,
  wordbreak,
  getDisplayName,
  getReadme,
  getComment,
} from "../utils";

export const navigation = (
  context: DefaultThemeRenderContext,
  props: PageEvent<Reflection>
): JSX.Element => {
  const links = (mod: DeclarationReflection): JSX.Element => {
    const children =
      (mod.kindOf(ReflectionKind.SomeModule | ReflectionKind.Project) &&
        mod.children) ||
      [];

    const nameClasses = classNames(
      { deprecated: mod.isDeprecated() },
      mod.isProject() ? void 0 : context.getReflectionClasses(mod)
    );

    if (!children.length) {
      return link(mod, getComment, nameClasses);
    }

    return (
      <details
        class={classNames({ "tsd-index-accordion": true }, nameClasses)}
        open={inPath(mod)}
        data-key={mod.getFullName()}
      >
        <summary class="tsd-accordion-summary">
          {context.icons.chevronDown()}
          {link(mod)}
        </summary>
        <div class="tsd-accordion-details">
          <ul class="tsd-nested-navigation">
            {children.map((c) => (
              <li>{links(c)}</li>
            ))}
          </ul>
        </div>
      </details>
    );
  };

  const link = (
    child: DeclarationReflection | ProjectReflection,
    fn: typeof getReadme | typeof getComment = getComment,
    nameClasses?: string
  ): JSX.Element => {
    return (
      <a
        href={context.urlTo(child)}
        class={classNames({ current: child === props.model }, nameClasses)}
      >
        {context.icons[child.kind]()}
        <div>
          {wordbreak(getDisplayName(child))}
          {fn(child as DeclarationReflection)}
        </div>
      </a>
    );
  };

  const inPath = (mod: DeclarationReflection | ProjectReflection): boolean => {
    let iter: Reflection | undefined = props.model;
    do {
      if (iter == mod) return true;
      iter = iter.parent;
    } while (iter);
    return false;
  };

  return (
    <nav class="tsd-navigation">
      {link(props.project)}
      <ul class="list-unstyled">
        {props.project.children?.map((c) => (
          <li>{links(c)}</li>
        ))}
      </ul>
    </nav>
  );
};
