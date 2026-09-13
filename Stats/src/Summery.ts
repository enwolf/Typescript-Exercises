import { MatchData } from "./MatchData";
import { WinsAnalysis } from "./Analyzers/WinsAnalysis";
import { HtmlReport } from "./ReportTargets/HtmlReport";

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
// The components can be supplied directly through the constructor or
// created through one of Summery's static factory methods.
export class Summery{
    // Create a preconfigured Summery that performs a win analysis for
    // the supplied team and writes the resulting report to an HTML file.
    static winsAnalysisWithHtmlreport(teamName: string): Summery {
        return new Summery
        (
            new WinsAnalysis(teamName),
            new HtmlReport

        );
    }

    // Store the Analyzer and OutputTarget that this Summery will coordinate.
    constructor(public analyzer: Analyzer, public outputTarget: OutputTarget) {}

    // Run the configured analyzer against the match data, then pass the
    // resulting report string to the configured output target.
    buildAndPrintReport(matches: MatchData[]): void
    {
        const output = this.analyzer.run(matches);
        this.outputTarget.print(output);
    }
}