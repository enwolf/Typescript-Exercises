import { MatchData } from "./MatchData";

// Defines the structure required for a component that analyzes match data.
// An analyzer receives MatchData[] and returns the completed analysis as a string.
export interface Analyzer
{
    run(matches: MatchData[]): string;
}

// Defines the structure required for a component that outputs a report.
// An output target receives the report string produced by an Analyzer.
export interface OutputTarget
{
    print(report: string): void;
}

// Coordinates an Analyzer with an OutputTarget.
// The specific analyzer and output target are supplied through the constructor.
export class Summery
{
    constructor(public analyzer: Analyzer, public outputTarget: OutputTarget) {}

    // Run the supplied analyzer against the match data, then pass the
    // resulting report string to the configured output target.
    buildAndPrintReport(matches: MatchData[]): void
    {
        const output = this.analyzer.run(matches);
        this.outputTarget.print(output);
    }
}