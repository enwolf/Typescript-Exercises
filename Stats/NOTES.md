## Project Setup

- Ran `npm init -y` inside the `Stats` folder.
- This created a local `package.json` for the exercise.
- npm generated `"type": "commonjs"`, which means Node will currently treat `.js` files in this package as CommonJS modules by default.
- Leaving that unchanged for now and following the instructor's setup unless the exercise later requires something different.

### `npm init -y` Output

```text
PS C:\Users\robin\Visual Studio Code Workspace\Typescript-Exercises\Stats> npm init -y
Wrote to C:\Users\robin\Visual Studio Code Workspace\Typescript-Exercises\Stats\package.json:

{
  "name": "stats",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "type": "commonjs"
}
```

### TypeScript Configuration

Ran the following command from inside the `Stats/` project folder:

```powershell
tsc --init
```

#### What the Command Means

- `tsc` runs the **TypeScript compiler**.
- `--init` tells the TypeScript compiler to initialize TypeScript configuration for the current folder.
- Because the terminal was currently inside `Stats/`, it created `Stats/tsconfig.json`.

The current terminal directory matters. Running the same command from a different folder would create the configuration file there instead.

The terminal confirmed:

```text
Created a new tsconfig.json
```

#### What `tsconfig.json` Is For

`tsconfig.json` controls how TypeScript will type-check and compile the project.

It can define things such as:

- Which JavaScript version TypeScript should target
- Module behaviour
- Strictness of type checking
- Source and output directories
- Additional compiler output such as source maps

Running `tsc --init` only created the TypeScript configuration file.

It did **not**:

- Create any TypeScript source files
- Compile any TypeScript
- Generate JavaScript
- Create a source or output folder
- Install any dependencies

### Installing Development Tools

Ran:

```powershell
npm install nodemon concurrently
```

Terminal output:

```text
PS C:\Users\robin\Visual Studio Code Workspace\Typescript-Exercises\Stats> npm install nodemon concurrently

added 48 packages, and audited 49 packages in 5s

15 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities
```

#### What the Command Did

- `npm install` downloads packages and adds them to the current npm project.
- `nodemon` can watch files for changes and automatically restart a running Node process.
- `concurrently` allows multiple commands/processes to run at the same time from one terminal command.
- Although only two packages were requested, npm also installed the packages they depend on, resulting in 48 packages being added.
- `found 0 vulnerabilities` means npm's dependency audit did not report any known vulnerabilities in the installed dependency tree.

This installation also changed the project structure:

```text
Stats/
├── node_modules/
├── NOTES.md
├── package-lock.json
├── package.json
├── README.md
└── tsconfig.json
```

- `node_modules/` contains the locally installed packages and their dependencies.
- `package-lock.json` records the exact dependency versions npm installed so the dependency tree can be reproduced later.
- `package.json` now records `nodemon` and `concurrently` as dependencies for this project.

These packages were installed locally for the `Stats` project, not globally across the computer.

#### Dependency Note

The instructor used:

```powershell
npm install nodemon concurrently
```

rather than:

```powershell
npm install -D nodemon concurrently
```

or the equivalent `--save-dev` option.

Both packages are development tools rather than code the finished application would normally require at runtime, so they are commonly stored as development dependencies.

Leaving the instructor's setup unchanged for now and following the exercise.

### Configuring Source and Build Directories

Changed the generated `tsconfig.json` file layout settings to:

```json
"rootDir": "./src",
"outDir": "./build",
```

- `rootDir` tells the TypeScript compiler that the project's TypeScript source files will live inside the `src/` folder.
- `outDir` tells the compiler to place the generated JavaScript and other compiler output inside the `build/` folder.
- These options were already present in the generated `tsconfig.json`, but were commented out. They were uncommented and `outDir` was changed from the generated `./dist` example to `./build` to match the instructor's project setup.

This establishes the intended project flow:

```text
src/
    ↓ TypeScript compiler (`tsc`)
build/
```

The folders are not created just by changing these settings. `src/` will be created as part of the project setup, and `build/` will be created when TypeScript has files to compile.

### Configuring npm Scripts

Updated the `"scripts"` section of `package.json` from the default test script to:

```json
"scripts": {
  "start:build": "tsc -w",
  "start:run": "nodemon build/index.js",
  "start": "concurrently npm:start:*"
}
```

#### What the Scripts Do

- `"start:build": "tsc -w"` runs the TypeScript compiler in **watch mode**, automatically recompiling when source files change.
- `"start:run": "nodemon build/index.js"` runs the compiled JavaScript and automatically restarts Node when the generated file changes.
- `"start": "concurrently npm:start:*"` uses `concurrently` to run the `start:build` and `start:run` scripts together.

This creates the development workflow:

```text
src/index.ts
    ↓ TypeScript compiler
build/index.js
    ↓ nodemon
Node
```

The full development environment can now be started with:

```powershell
npm start
```

#### Updated `package.json`

```json
{
  "name": "stats",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "start:build": "tsc -w",
    "start:run": "nodemon build/index.js",
    "start": "concurrently npm:start:*"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "type": "commonjs",
  "dependencies": {
    "concurrently": "^10.0.5",
    "nodemon": "^3.1.14"
  }
}
```

### Verifying the Development Workflow

Ran:

```powershell
npm start
```

This executes the `"start"` script from `package.json`:

```json
"start": "concurrently npm:start:*"
```

That starts both of the other `start:` scripts together:

- `start:build` runs `tsc -w`, which compiles the TypeScript and stays in watch mode for file changes.
- `start:run` runs `nodemon build/index.js`, which executes the compiled JavaScript and restarts automatically when the build output changes.

The terminal confirmed that both processes started successfully:

```text
[build] Starting compilation in watch mode...
[build] Found 0 errors. Watching for file changes.

[run] [nodemon] starting `node build/index.js`
[run] Hi there
[run] [nodemon] clean exit - waiting for changes before restart
```

This confirms the development flow is working:

```text
src/index.ts
    ↓ `tsc -w`
build/index.js
    ↓ `nodemon`
Node
```
Because `tsc` and `nodemon` remain running in watch mode, the terminal stays active after the program finishes. Press `Ctrl+C` to stop both processes and return to the PowerShell prompt.

The instructor noted that this setup can sometimes produce errors when first starting the two processes together, but no errors occurred in this environment.

### Adding Node Type Definitions

Installed:

```powershell
npm install @types/node
```

This adds TypeScript type definitions for Node.js APIs.

The exercise will read data from a `.csv` file, so the code needs to use Node's built-in file-system module:

```ts
import fs from "fs";
```

#### Why `@types/node` Is Needed

- `fs` is already built into Node.js and provides the actual file-system functionality.
- `@types/node` does **not** install `fs`.
- Instead, it provides TypeScript with type information describing Node APIs such as `fs`, including their functions, parameters, and return types.
- This allows TypeScript and VS Code to understand and type-check code that uses Node-specific functionality.

The intended data flow for this exercise is:

```text
.csv file
    ↓ Node `fs`
file contents
    ↓
TypeScript code
    ↓
parse and work with the data
```

The earlier `"Hi there"` test in `src/index.ts` was replaced with the `fs` import as the exercise begins working with the CSV data.

After installing `@types/node`, the module-related error disappeared. The remaining warning only indicates that `fs` has been imported but is not being used yet.

### Node Type Definitions and `fs` Setup

Installed Node.js type definitions:

```powershell
npm install @types/node
```

This allows TypeScript to understand Node-specific APIs such as the built-in `fs` file-system module.

The exercise will use `fs` to read data from `football.csv`:

```ts
import fs from "fs";
```

- `fs` is already built into Node.js and provides the actual file-system functionality.
- `@types/node` does **not** install `fs`.
- Instead, it provides TypeScript with type information for Node APIs so they can be type-checked correctly.

After installing `@types/node`, `package.json` and `package-lock.json` were updated to record the new dependency.

#### Enabling Node Types in `tsconfig.json`

Installing `@types/node` did not completely remove the TypeScript error because the generated `tsconfig.json` contained:

```json
"types": [],
```

This was changed to:

```json
"types": ["node"],
```

This allows TypeScript to include the installed Node type definitions and recognize modules such as `fs`.

#### CommonJS and Import Compatibility

After enabling the Node types, TypeScript reported:

```text
ECMAScript imports and exports cannot be written in a CommonJS file under 'verbatimModuleSyntax'.
```

The project currently uses:

```json
"type": "commonjs"
```

in `package.json`, while the generated `tsconfig.json` contained:

```json
"verbatimModuleSyntax": true
```

This conflicted with the instructor's import style:

```ts
import fs from "fs";
```

To keep following the instructor's code, changed:

```json
"verbatimModuleSyntax": true
```

to:

```json
"verbatimModuleSyntax": false
```

After this change, the `fs` import compiled successfully.

These additional `tsconfig.json` changes were needed because the newer TypeScript configuration generated on this machine differs from the instructor's older setup.

### Parsing the CSV Into Match Records

The CSV file is initially read as one large string:

```ts
fs.readFileSync("football.csv", { encoding: "utf-8" })
```

The data is then transformed in two steps:

```ts
const matches = fs
    .readFileSync("football.csv", { encoding: "utf-8" })
    .split("\n")
    .map(
        (row: string): string[] =>
        {
            return row.split(",");
        }
    );
```

- `.split("\n")` separates the file into individual match rows, producing a `string[]`.
- `.map(...)` processes each row individually.
- `row.split(",")` separates each match into its individual fields and returns a `string[]`.
- Since every row becomes its own `string[]`, the final `matches` variable is a two-dimensional `string[][]`.

The resulting structure can be thought of as:

```text
matches[match][field]
```

- The first index selects a complete match record.
- The second index selects a specific field within that match.
- Using only the first index, such as `matches[0]`, returns the entire match record.

### Template Literals

JavaScript and TypeScript can use backticks instead of regular quotes to create a **template literal**:

```ts
console.log(`Man United won ${manUnitedWins} games`);
```

The `${...}` syntax inserts the value of an expression directly into the string.

For example:

```ts
const wins = 18;

console.log(`Man United won ${wins} games`);
```

produces:

```text
Man United won 18 games
```

This is a cleaner alternative to string concatenation:

```ts
console.log("Man United won " + wins + " games");
```

The expression inside `${...}` does not have to be only a variable:

```ts
console.log(`Next year: ${wins + 1} wins`);
```

Regular quoted strings do not interpolate `${...}`:

```ts
console.log("Man United won ${wins} games");
```

would print `${wins}` literally.

### Object Properties vs Enum Members

The `MatchResult` object originally used colons:

```ts
const MatchResult =
{
    HomeWin: "H",
    AwayWin: "A",
    Draw: "D"
};
```

Object properties use:

```text
name: value
```

After changing `MatchResult` to an enum:

```ts
enum MatchResult
{
    HomeWin = "H",
    AwayWin = "A",
    Draw = "D"
}
```

the syntax changes to `=` because enum members are assigned values using:

```text
member = value
```

So the distinction is:

```text
Object property → name: value
Enum member    → name = value
```

### JavaScript Object Bracket Notation

Object properties can be accessed using either dot notation or bracket notation:

```js
MatchResult.HomeWin
MatchResult["HomeWin"]
```

Both access the `HomeWin` property.

Bracket notation looks similar to array indexing, but the value inside the brackets can be the name of an object property rather than an array index.

JavaScript also allows a property to be created by assigning to it:

```js
const matchResult = {};

matchResult["HomeWin"] = "H";
```

After the assignment, `matchResult` contains a `HomeWin` property with the value `"H"`.

This is similar to assigning a value to an array position:

```js
const values = [];

values[0] = "hello";
```

A useful general pattern is:

```text
container[key] = value
```