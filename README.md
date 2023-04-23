A typedoc theme for Suika documentation.

### installation

To install the theme you can do stuff like this!

```bash
npm i -D typedoc@0.24.5 suika-docs-theme@latest
```

then make a json config

```json
{
  "$schema": "https://typedoc.org/schema.json",
  "entryPoints": ["./src/index.tsx"],
  "out": "docs",
  "exclude": ["**/node_modules/**"],
  "plugin": ["suika-docs-theme"],
  "theme": "suika-theme"
}
```

and a tsconfig

```json
{
  "compilerOptions": {
    "target": "es2020",
    "module": "commonjs",
    "moduleResolution": "node",
    "forceConsistentCasingInFileNames": true,
    "strict": true,
    "outDir": "dist",
    "jsx": "react",
    "jsxFactory": "JSX.createElement",
    "jsxFragmentFactory": "JSX.Fragment",
    "skipLibCheck": true
  },
  "include": ["src"]
}
```

and this in package.json

```json
{
  "scripts": {
    "docs": "typedoc --options typedoc.json"
  }
}
```
