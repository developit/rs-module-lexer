# rs-module-lexer

ES module parser powered by Rust.

This package is a Rust version of [es-module-lexer](https://github.com/guybedford/es-module-lexer)

### Motivation

`es-module-lexer` cannot parse `jsx` / `ts` / `tsx` files, we need transform `ts` to `js` using `esbuild` / `swc` first, and then parse :

```ts
import { parse } from 'es-module-lexer'
import { transformSync } from 'esbuild'

// 1. transform ts to js
const js = transformSync(ts)
// 2. parse modules
const result = parse(js)
```

`rs-module-lexer` resolved this problem, it can parse the `ts(x)` file directly.

### Install

```bash
  pnpm i -D rs-module-lexer
```

### Usage

```ts
import { parseAsync } from 'rs-module-lexer'
// Sync: import { parse } from 'rs-module-lexer'

const { output } = await parseAsync({
  input: [
    {
      filename: 'index.ts',
      code: `
        export const member = 5
        import { useState } from 'react'
      `,
    },
    // ... other files
  ],
})

// [ { n: 'react', s: 67, e: 72, ss: 41, se: 73, d: -1, a: -1 } ]
console.log(output[0].imports)
// [ { n: 'member', ln: 'member', s: 22, e: 28, ls: 22, le: 28 } ]
console.log(output[0].exports)
```

For details of the parse results, please see [`es-module-lexer`](https://github.com/guybedford/es-module-lexer).

#### Migration from `es-module-lexer`

```diff
- import { init, parse } from 'es-module-lexer'
- await init
- const [imports, exports] = parse(code)

+ import { parseAsync } from 'rs-module-lexer'
+ const { output } = await parseAsync({ input: [{ filename: 'index.ts', code }] })
+ const { imports, exports } = output[0]
```

`rs-module-lexer` can parse multiple files at once, the syntax is auto detect based on `filename`.

### Benchmark

parse `ts(x)` files:

```bash
# parse 8 files 
es-module-lexer average: 383.6ms
rs-module-lexer average: 70.6ms 🎉
```

parse `js` files:

```bash
# parse 8 files 
es-module-lexer average: 51.3ms 🎉
rs-module-lexer average: 67.6ms
```

### License

MIT
