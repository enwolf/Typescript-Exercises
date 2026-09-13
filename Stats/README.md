# Stats

A TypeScript learning project that reads football match data from a CSV file, converts it into typed match records, analyzes the results, and generates a report.

The project began as a simple CSV-processing exercise and was gradually refactored several times. Each version solves the same general problem while exploring different TypeScript and object-oriented design techniques.

## What It Does

The application reads match data from `football.csv` and counts the number of wins for a selected team.

The current example analyzes Manchester United:

```text
Team Man United won 18 games
```

Reports can be sent to either the console or an HTML file.

## Project Evolution

### Base Version

The project started by reading `football.csv`, splitting the file into rows and fields, and counting Manchester United wins directly from the CSV data.

As the project developed, the data became more structured. Match results were represented with a `MatchResult` enum, dates were converted into `Date` objects, and the CSV-reading logic was moved into `CsvFileReader`.

This produced a working program and provided the starting point for the larger refactors.

### Refactor #1 — Inheritance and Generics

The first major refactor separated general CSV-reading behavior from the football-specific logic used to interpret each row.

`CsvFileReader` became an abstract generic class responsible for reading the file, while `MatchReader` extended it and supplied the conversion from a CSV row into `MatchData`.

Conceptually:

```text
MatchReader IS A specialized CsvFileReader
```

This version explored abstract classes, abstract methods, generics, and inheritance.

The completed inheritance-based version is preserved in `src/inheritance/` for comparison. :contentReference[oaicite:0]{index=0}

### Refactor #2 — Composition

The second refactor solved the same problem without inheritance.

`CsvFileReader` became responsible only for reading raw CSV data. `MatchReader` instead receives an object satisfying the `DataReader` interface and converts that data into `MatchData`.

The relationship changed to:

```text
MatchReader HAS A DataReader
```

This made the difference between inheritance and composition much easier to see because both approaches perform essentially the same job using different structures. :contentReference[oaicite:1]{index=1}

### Refactor #3 — Analysis and Reporting Components

The final refactor separated the analysis itself from the way the result is reported.

`WinsAnalysis` became responsible for analyzing `MatchData`, while `ConsoleReport` and `HtmlReport` became interchangeable output targets.

`Summery` connects those pieces:

```text
MatchData[]
    ↓
WinsAnalysis
    ↓
Summery
    ↓
ConsoleReport / HtmlReport
```

This means the output method can change without rewriting the analysis logic.

Static factory methods were also added for the common configurations:

```ts
const matchReader = MatchReader.fromCsv("football.csv");
matchReader.load();

const summery = Summery.winsAnalysisWithHtmlreport("Man United");
summery.buildAndPrintReport(matchReader.matches);
```

These methods keep `index.ts` focused on the high-level application flow instead of manually creating every dependency. :contentReference[oaicite:2]{index=2} :contentReference[oaicite:3]{index=3}

## Final Application Flow

```text
football.csv
    ↓
CsvFileReader
    ↓
MatchReader
    ↓
MatchData[]
    ↓
WinsAnalysis
    ↓
Summery
    ↓
HtmlReport
    ↓
report.html
```

By the end of the project, reading, converting, analyzing, and reporting the data are separate responsibilities rather than being mixed together in `index.ts`.

## Running the Project

Install the dependencies:

```powershell
npm install
```

Start the development environment:

```powershell
npm start
```

The project runs the TypeScript compiler in watch mode alongside `nodemon`, with both processes managed through `concurrently`. :contentReference[oaicite:4]{index=4}

## Concepts Practiced

- TypeScript tuples and enums
- interfaces and structural typing
- generics
- abstract classes
- inheritance
- composition
- constructor injection
- static factory methods
- Node's `fs` module
- CSV parsing and transformation
- TypeScript/npm project configuration

## Notes

`NOTES.md` contains the detailed learning record for the project, including setup, debugging, compiler configuration, and the step-by-step development of each refactor.

This README is intended as the shorter overview of what the project does and how its design evolved.