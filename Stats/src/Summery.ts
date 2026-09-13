import { MatchData } from "./MatchData";

// Defines the structure required for a component that analyzes match data.
// An analyzer receives MatchData[] and returns the result as a string.
export interface Analyzer
{
    run(matches: MatchData[]): string;
}

// Defines the structure required for a component that outputs a report.
// The output target receives the report string produced by an Analyzer.
export interface OutputTarget
{
    print(report: string): void;
}

// Coordinates an Analyzer with an OutputTarget.
// The specific analyzer and output target are supplied through the constructor.
export class Summery
{
    constructor(public analyzer: Analyzer, public OutputTarget: OutputTarget) {}
}