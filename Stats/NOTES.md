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

### Ignoring Generated and Installed Files

Added a project `.gitignore` containing:

```text
node_modules/
build/
```

- `node_modules/` contains locally installed npm packages and should not be committed.
- `build/` contains JavaScript and other files generated by the TypeScript compiler.
- Both can be recreated from the tracked project files, so Git only needs the source and configuration files.

The ignore rules were verified before the initial project commit to make sure neither directory was being tracked.

### Node Type Definitions and `fs` Setup

Installed Node.js type definitions:

```powershell
npm install @types/node
```

The exercise reads data from `football.csv` using Node's built-in file-system module:

```ts
import fs from "fs";
```

#### Why `@types/node` Is Needed

- `fs` is already built into Node.js and provides the actual file-system functionality.
- `@types/node` does **not** install `fs`.
- Instead, it provides TypeScript with type information describing Node APIs such as `fs`, including their functions, parameters, and return types.
- This allows TypeScript and VS Code to understand and type-check Node-specific code.

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

Installing `@types/node` updated `package.json` and `package-lock.json` to record the new dependency.

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

The project uses:

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

This compatibility change was needed because the newer TypeScript configuration generated on this machine differs from the instructor's older setup.

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

### Match Result Refactor Progression

The initial win-counting logic worked directly with CSV field positions:

```ts
match[1] // home team
match[2] // away team
match[5] // match result
```

The match result was originally checked using the CSV values directly:

```ts
"H" // home win
"A" // away win
```

This was gradually refactored:

```text
"H" / "A" / "D"
        ↓
named constants
        ↓
MatchResult object
        ↓
MatchResult enum
```

The named constants made the conditions easier to read:

```ts
const homeWin = "H";
const awayWin = "A";
const draw = "D";
```

However, `draw` was not used by the current win-counting logic. Another developer could reasonably mistake it for unnecessary code even though `"D"` is still a valid match result.

The values were then grouped under a single `MatchResult` object before being replaced with a TypeScript enum:

```ts
enum MatchResult
{
    HomeWin = "H",
    AwayWin = "A",
    Draw = "D"
}
```

This makes the valid match results explicit and keeps `Draw` represented even though the current analysis does not use it.

#### CSV String Comparisons Are Case-Sensitive

While testing the win counter, this comparison initially used:

```ts
"man United"
```

but the CSV contained:

```text
Man United
```

Because JavaScript and TypeScript string comparisons are case-sensitive, the home-win condition never matched and only the away wins were counted.

The string had to match the CSV value exactly:

```ts
"Man United"
```

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

### Extracting CSV Reading Into `CsvFileReader`

The CSV reading and parsing logic was moved out of `index.ts` and into a dedicated `CsvFileReader` class.

Previously, `index.ts` was responsible for both:

- Reading and parsing `football.csv`
- Analyzing the match data

The responsibilities are now separated:

```text
CsvFileReader.ts
    ↓
reads and parses the CSV
    ↓
stores parsed rows in data

index.ts
    ↓
creates CsvFileReader
    ↓
calls read()
    ↓
analyzes reader.data
```

#### Constructor Parameter Property

The constructor uses TypeScript's parameter-property shorthand:

```ts
constructor(public filename: string) { }
```

Adding `public` causes TypeScript to automatically create and store a `filename` property on the class.

This allows:

```ts
this.filename
```

to be used inside `read()` without manually declaring and assigning the property in the constructor.

No additional constructor logic is currently needed, so the constructor body remains empty.

#### Reading the Data

The `read()` method now owns the CSV reading and parsing logic:

```ts
read(): void
{
    this.data = fs
        .readFileSync(this.filename, { encoding: "utf-8" })
        .split("\n")
        .map(
            (row: string): string[] =>
            {
                return row.split(",");
            });
}
```

The parsing process itself is unchanged; it has simply been moved into the class responsible for reading CSV files.

`index.ts` now creates the reader and asks it to load the file:

```ts
const reader = new CsvFileReader("football.csv");
reader.read();
```

The match analysis then works with:

```ts
reader.data
```

instead of directly reading and parsing the CSV inside `index.ts`.

This refactor separates **reading/parsing the data** from **using/analyzing the data**.

### Splitting and Mapping a String Into an Array

Given:

```ts
const dateParts = dateString
    .split("/")
    .map((value: string): number => {
        return parseInt(value);
    });
```

the entire expression on the right side is evaluated before the final result is assigned to `dateParts`.

#### `split()` Creates the First Array

If:

```ts
dateString = "10/08/2018";
```

then:

```ts
dateString.split("/");
```

returns:

```ts
["10", "08", "2018"]
```

`split()` takes the original string and creates a `string[]`.

So conceptually:

```text
"10/08/2018"
      ↓ split("/")
["10", "08", "2018"]
```

`dateParts` has not been assigned yet. The method chain is still being evaluated.

#### `map()` Creates a Transformed Array

`map()` receives the array created by `split()` and calls a function once for each element.

The course uses an arrow function:

```ts
.map((value: string): number => {
    return parseInt(value);
})
```

This converts each string into a number:

```text
["10", "08", "2018"]
        ↓ map(...)
[10, 8, 2018]
```

`map()` returns a new array, so the final result is a `number[]`.

Only then is the result assigned:

```ts
const dateParts = [10, 8, 2018];
```

TypeScript infers that `dateParts` is a `number[]`, so it does not need to be explicitly declared as:

```ts
const dateParts: number[] = ...
```

#### Arrow Functions as Callbacks

`map()` expects a function that it can call once for each value in the array.

The compact arrow-function version:

```ts
.map((value: string): number => {
    return parseInt(value);
})
```

can be mentally expanded into a normal named function:

```ts
function convertToNumber(value: string): number
{
    return parseInt(value);
}

const dateParts = dateString
    .split("/")
    .map(convertToNumber);
```

The wiring is:

```text
split()
    ↓
creates an array
    ↓
map()
    ↓
receives convertToNumber
    ↓
calls it once for each array element
    ↓
collects the returned values into a new array
```

The arrow function is not doing anything fundamentally different. It defines the callback directly inside the call to `map()` instead of declaring and naming the function separately.

Arrow functions are very common in modern JavaScript and TypeScript, so mentally expanding them into a normal named function can make the underlying wiring easier to see.

### Importing Specific Functions From a Module

TypeScript modules can export individual functions directly:

```ts
export const dateStringToDate = (dateString: string): Date =>
{
    ...
};
```

Another file can then import that specific function:

```ts
import { dateStringToDate } from "./utils";
```

The `{ ... }` syntax is a **named import**. It selects a specific named export from the module.

A module can contain several exported values:

```ts
export const dateStringToDate = ...
export const anotherFunction = ...
export class SomeClass
{
    ...
}
```

and another file can choose only the ones it needs:

```ts
import { dateStringToDate, SomeClass } from "./utils";
```

So importing from a module does not mean the entire module has to become directly available under one variable or object. Individual exported functions, classes, constants, and other values can be imported by name.

### Transforming CSV Rows Into Match Data

`CsvFileReader` now uses two mapping steps.

The first `map()` splits each CSV row into individual string fields:

```ts
.map(
    (row: string): string[] =>
    {
        return row.split(",");
    }
)
```

The second `map()` converts selected fields into the types the program actually needs:

```ts
return [
    dateStringToDate(row[0]),
    row[1],
    row[2],
    parseInt(row[3]),
    parseInt(row[4]),
    row[5] as MatchResult,
    row[6]
];
```

The intended row structure is:

```text
[0] Date        - match date
[1] string      - home team
[2] string      - away team
[3] number      - home goals
[4] number      - away goals
[5] MatchResult - result code
[6] string      - referee
```

`dateStringToDate()` and `parseInt()` perform actual runtime conversions.

```ts
row[5] as MatchResult
```

is different. This is a **type assertion** that tells TypeScript to treat the existing string as a `MatchResult`; it does not convert the value at runtime.

`MatchResult` was also moved into its own exported module so both `index.ts` and `CsvFileReader.ts` can use the same enum definition.

The current row typing is still temporary:

```ts
data: string[][] = [];
```

and the second `map()` currently returns `any`, even though the transformed row now contains several different types. This structure will be refined as the exercise continues.

### Newline After `return`

A returned expression must begin on the same line as `return`.

This works:

```ts
return [
    ...
];
```

This does not behave the same way:

```ts
return
[
    ...
];
```

Because `return` is a restricted JavaScript statement, a newline immediately after it causes **automatic semicolon insertion**, effectively making it:

```ts
return;
```

This causes the function to return immediately and makes the array underneath unreachable.

So even when using next-line formatting elsewhere, keep the returned expression on the same line as `return`.

#### Disabling `noUncheckedIndexedAccess`

The generated TypeScript configuration originally used:

```json
"noUncheckedIndexedAccess": true
```

This caused indexed array access such as:

```ts
row[0]
dateParts[2]
```

to be treated as potentially `undefined`, producing errors throughout the course code.

The setting was changed to:

```json
"noUncheckedIndexedAccess": false
```

to better match the assumptions used by the exercise.

Another option would be to use TypeScript's non-null assertion operator:

```ts
row[0]!
```

but this would require adding assertions throughout the CSV parsing code without adding any runtime validation.

For this exercise, disabling the setting keeps the code focused on the concepts being taught.

### Refactor #1 - Abstract Class and Generics

The first major `CsvFileReader` refactor separates the general CSV-reading process from the match-specific conversion logic.

Previously, `CsvFileReader` handled both:

```text
reading/splitting the CSV
        +
knowing what each football match field represents
```

The refactor separates those responsibilities:

```text
CsvFileReader
    ↓
general CSV reading/parsing behavior

MatchReader
    ↓
football-match-specific row conversion
```

#### Generic Type Parameter

`CsvFileReader` is now generic:

```ts
export abstract class CsvFileReader<TypeOfData>
```

`TypeOfData` is a placeholder for whatever type a parsed row should eventually become.

For example:

```ts
data: TypeOfData[] = [];
```

means that the base class can store an array of parsed data without needing to know the exact type in advance.

The conventional generic name would often be `T`:

```ts
CsvFileReader<T>
```

but `TypeOfData` makes the role of the generic type more explicit while learning.

#### Abstract Class and Abstract Method

`CsvFileReader` is also now an **abstract class**.

It contains the reusable CSV-reading logic, but leaves the row-specific conversion to a child class.

That required conversion is defined with an abstract method:

```ts
abstract mapRow(row: string[]): TypeOfData;
```

The parent class is effectively saying:

> Any class extending me must know how to turn a raw `string[]` row into its specific `TypeOfData`.

The parent does not provide the implementation itself.

Its reusable `read()` method can still call:

```ts
.map(this.mapRow);
```

The CSV-reading process stays in the parent, while the child class supplies the actual `mapRow()` implementation.

#### Extending the Generic Reader

`MatchReader` extends the abstract reader:

```ts
export class MatchReader extends CsvFileReader<MatchData>
```

Two things are happening in the same declaration:

```text
extends CsvFileReader
→ inherit the reusable CSV-reading behavior

<MatchData>
→ use MatchData as the generic TypeOfData
```

For `MatchReader`:

```text
TypeOfData = MatchData
```

So the parent's:

```ts
data: TypeOfData[]
```

effectively becomes:

```ts
data: MatchData[]
```

and:

```ts
mapRow(row: string[]): TypeOfData
```

effectively becomes:

```ts
mapRow(row: string[]): MatchData
```

`MatchReader` then implements `mapRow()` and contains the football-specific knowledge of what each CSV column represents.

This moves the hardcoded match-column conversion out of the general-purpose `CsvFileReader` and into the class specifically responsible for match data.

The resulting structure is:

```text
CsvFileReader<TypeOfData>
    │
    ├── reads the file
    ├── splits the CSV data
    └── requires mapRow()
                ↓
MatchReader extends CsvFileReader<MatchData>
    │
    └── implements mapRow() for MatchData
                ↓
            MatchData[]
```

This is the first refactoring approach demonstrated by the course, using **inheritance, an abstract class, an abstract method, and generics**. A later refactor will solve the same general problem using a different design.


### Refactor #2 - Starting the Alternate Approach

We have now started the instructor's second refactoring approach for the CSV reader.

Before changing the code for Refactor #2, we preserved the completed Refactor #1 implementation by creating a new directory:

`src/inheritance/`

The Refactor #1 versions of these files were moved into that directory:

- `src/inheritance/CsvFileReader.ts`
- `src/inheritance/MatchReader.ts`

This keeps the first solution available as a separate example of the inheritance-based approach while the main files in `src/` are reused for Refactor #2.

```text
src/inheritance/
    CsvFileReader.ts
    MatchReader.ts

    ↓

completed Refactor #1
abstract class + generics + inheritance
```

For Refactor #2, we are using the previously saved:

`src/CsvFileReader.bak`

as the new active:

`src/CsvFileReader.ts`

The `.bak` file contains the earlier version of `CsvFileReader` from before Refactor #1. By restoring that version as the working `CsvFileReader.ts`, Refactor #2 starts from the same earlier implementation instead of building on top of the inheritance-based refactor.

```text
src/CsvFileReader.bak
    ↓
restored as
    ↓
src/CsvFileReader.ts
    ↓
starting point for Refactor #2
```

#### Moving Match-Specific Logic into MatchReader

As part of Refactor #2, match-specific functionality is being moved out of `CsvFileReader.ts` and into the new `MatchReader.ts`.

`CsvFileReader.ts` now only handles the general CSV-reading work:

- read the file
- split it into rows
- split each row into its individual string fields
- store the result as `string[][]`

The match-specific pieces have been moved into `MatchReader.ts`, including:

- the `MatchData` tuple type
- the `MatchResult` dependency
- the `dateStringToDate()` dependency
- the existing `string[]` to `MatchData` conversion logic

This means `CsvFileReader` no longer needs to know what the CSV columns represent or how football match data should be converted.

At the current stage of the refactor, the conversion logic has been moved into `MatchReader.ts` but is still commented out while the new structure is being built.

#### Excluding the Preserved Inheritance Version from Compilation

After moving the completed Refactor #1 files into:

`src/inheritance/`

TypeScript continued compiling those files because they were still located underneath the configured:

```json
"rootDir": "./src"
```

### Refactor #2 - Completed DataReader-Based Approach

Refactor #2 is now complete and the application is working again.

The main result of this refactor is that the responsibility for reading raw data and the responsibility for interpreting football match data are now separated without using inheritance.

#### Final Responsibility Split

`CsvFileReader.ts` is now responsible only for reading raw CSV data.

It:

- reads the file
- splits the file into rows
- splits each row into individual string fields
- stores the result as `string[][]`

Its data therefore remains completely generic:

```text
CsvFileReader
    ↓
reads CSV file
    ↓
string[][]
```
### Comparing Refactor #1 and Refactor #2

We have now completed two different approaches to solving the same problem. Originally, `CsvFileReader` was doing two jobs at once: reading the CSV file and understanding what the football data meant. Both refactors separate those responsibilities so the general file-reading code no longer needs to know anything about football matches.

In Refactor #1, `MatchReader` extends `CsvFileReader`. The general CSV-reading behavior lives in the parent class, and `MatchReader` inherits that behavior while supplying the football-specific conversion. Generics allow the parent class to stay reusable while `MatchReader` tells it that, in this case, the final data type is `MatchData`. The simplest way to think about this version is: **`MatchReader` IS A specialized `CsvFileReader`.**

In Refactor #2, `MatchReader` no longer extends `CsvFileReader`. Instead, `CsvFileReader` only reads the file and produces raw `string[][]` data. `MatchReader` receives an object that satisfies the `DataReader` interface, uses that object to obtain the raw data, and then converts the rows into `MatchData`. `CsvFileReader` happens to satisfy that interface because it already has the required `read()` method and `data` property. The simplest way to think about this version is: **`MatchReader` HAS A `DataReader`.**

This means the two approaches connect the same responsibilities in different ways. Refactor #1 uses **inheritance**: `MatchReader` gets the reading behavior from its parent class. Refactor #2 uses **composition**: `MatchReader` uses another object to provide the reading behavior. Refactor #2 also makes the two stages of the data especially clear: `CsvFileReader` holds the raw `string[][]`, while `MatchReader` holds the converted `MatchData[]`.

Both versions ultimately do the same job and still produce the same result. The important lesson is that there can be more than one good way to separate responsibilities. Refactor #1 shows an inheritance-based solution using an abstract class and generics, while Refactor #2 shows a composition-based solution using an interface and a separate reader object. Keeping both versions in the project gives us a concrete example of the difference between **"IS A" inheritance** and **"HAS A" composition**.

#### Refactor #3 - Initial Component Setup

At this point, Refactor #3 has introduced several structural changes to prepare the application for a component-based approach.

`MatchData` has been moved into its own shared `MatchData.ts` file so it can be imported and reused by multiple parts of the application. `MatchReader.ts` has been updated to import that shared `MatchData` type instead of defining it locally.

A new `Summery.ts` file has also been created. This file introduces two new interfaces:

- `Analyzer`, which defines a component that can analyze `MatchData[]` and return a string result
- `OutputTarget`, which defines a component that can receive that string result and output it somewhere

`Summery.ts` also introduces the new `Summery` class, which receives both an `Analyzer` and an `OutputTarget` through its constructor.

At this point, Refactor #3 has introduced:

- a shared `MatchData.ts` file
- an updated `MatchReader.ts` that imports the shared `MatchData` type
- a new `Summery.ts` file
- an `Analyzer` interface
- an `OutputTarget` interface
- a `Summery` class that receives both components

This gives the refactor its initial component-based structure, with the shared match data, analysis responsibility, and output responsibility now beginning to exist as separate pieces.

#### Adding the WinsAnalysis Component

The next step in Refactor #3 was to move the Man United win-counting logic out of `index.ts` and into its own analysis component.

A new file was created:

`src/Analyzers/WinsAnalysis.ts`

`WinsAnalysis` implements the `Analyzer` interface:

```ts
export class WinsAnalysis implements Analyzer
```

This means `WinsAnalysis` provides the `run()` method required by `Analyzer` and is responsible for performing the win-counting analysis on the supplied `MatchData[]`.

The win-counting loop that previously lived in `index.ts` was moved into `WinsAnalysis.run()`. This continues the component-based refactor by moving the actual analysis responsibility out of the main application file and into a dedicated analyzer component.

This step also added new component files and directories, reorganized some existing code, and connected the reporting pipeline.

Newly created:

- `src/ReportTargets/` directory
- `src/ReportTargets/ConsoleReport.ts`, which implements `OutputTarget` and prints a completed report string to the console
- `src/Analyzers/` directory, which now contains `WinsAnalysis.ts`

Updated:

- `WinsAnalysis.ts` was moved into `src/Analyzers/`, so its relative imports were updated to point back to `Summery.ts`, `MatchData.ts`, and `MatchResult.ts`
- `Summery.ts` gained `buildAndPrintReport()`, which runs the configured `Analyzer`, receives its report string, and passes that string to the configured `OutputTarget`
- the `outputTarget` property name in `Summery.ts` was corrected so the constructor and `buildAndPrintReport()` use the same capitalization
- `index.ts` was updated to import `WinsAnalysis`, `ConsoleReport`, and `Summery`, create those concrete components, and pass them into the new reporting pipeline
- `index.ts` now calls `summery.buildAndPrintReport(matchReader.matches)` instead of containing the reporting logic itself