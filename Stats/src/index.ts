import { MatchReader } from "./MatchReader";
import { Summery } from "./Summery";

// Use MatchReader's static factory method to create a MatchReader
// already configured with a CsvFileReader for football.csv.
const matchReader = MatchReader.fromCsv("football.csv");

// Use Summery's static factory method to create a preconfigured report.
// This factory creates a WinsAnalysis for Man United and pairs it with
// an HtmlReport output target.
const summery = Summery.winsAnalysisWithHtmlreport("Man United");

// Read the CSV file and convert the raw rows into MatchData[].
matchReader.load();

// Run the configured analysis against the loaded match data.
// Summery passes the generated report to HtmlReport, which writes report.html.
summery.buildAndPrintReport(matchReader.matches);