# TypeScript with NodeJs
## Start Project
1. Init Project
```bash
npm init -y
```
2. TypeScript + ts-node install kare
```bash
npm install typescript ts-node @types/node --save-dev
```
- typescript → compiler
- ts-node → bina compile kare TS ko run kar sakte ho
- @types/node → Node.js ke types

3. tsconfig.json banaye

```bash
npx tsc --init

```
- tsconfig.json ko edit karo:
```json
{
  "compilerOptions": {
    "target": "ES6",
    "module": "commonjs",
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules"]
}
// rootDir → src (source files)
// outDir → dist (compiled JS files)

```


4. package.json me scripts banao

```json
"scripts": {
  "start": "node dist/index.js",
  "build": "tsc",
  "dev": "ts-node src/index.ts"
}
// npm start → compiled code run karo

// npm run build → compile TS → JS

// npm run dev → bina build ke direct run (good for dev)

```

5. 
```bash

```


```bash

```


```bash

```

```bash

```

```bash

```

```bash

```

```bash

```

```bash

```