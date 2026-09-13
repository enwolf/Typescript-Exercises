import { MatchReader } from "./MatchReader";
import { CsvFileReader } from "./CsvFileReader";
//import { ConsoleReport } from "./ReportTargets/ConsoleReport";
import { WinsAnalysis } from "./Analyzers/WinsAnalysis";
import { Summery } from "./Summery";
import { HtmlReport } from "./ReportTargets/HtmlReport";

// Create the CSV reader that will load the raw football.csv data.
// CsvFileReader satisfies the DataReader interface expected by MatchReader.
const csvFileReader = new CsvFileReader("football.csv");

// Create MatchReader with the CSV reader and load the raw rows.
// MatchReader converts the raw string[][] data into MatchData[].
const matchReader = new MatchReader(csvFileReader);
matchReader.load();

// Configure the report by supplying a concrete Analyzer and OutputTarget.
// WinsAnalysis performs the Man United win analysis, while HtmlReport
// determines how the resulting report string will be output.
const summery = new Summery
(
    new WinsAnalysis("Man United"),
    new HtmlReport()
);

// Run the configured analysis against the loaded match data and pass
// the resulting report to HtmlReport, which writes it to report.html.
summery.buildAndPrintReport(matchReader.matches);