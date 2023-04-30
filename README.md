A typedoc theme for Suika documentation.

### installation

To install the theme you can use a package manager like `npm` `yarn` or `pnpm`

```bash
npm i -D typedoc@0.24.5 suika-docs-theme@latest
```

### Usage

To use the theme using the cli you can pass these arguments.

```bash
typedoc --plugin suika-docs-theme --theme my-theme
```

Or make a json config and pass the config path to the cli instead.

```bash
typedoc --options typedoc.json
```

```json
{
  "$schema": "https://typedoc.org/schema.json",
  "entryPoints": ["./src/index.ts"],
  "out": "docs",
  "exclude": ["**/node_modules/**"],
  "plugin": ["suika-docs-theme"],
  "theme": "suika-theme"
}
```
