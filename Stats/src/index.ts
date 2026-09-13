import { MatchReader } from "./MatchReader";
import { CsvFileReader } from "./CsvFileReader";
import { ConsoleReport } from "./ReportTargets/ConsoleReport";
import { WinsAnalysis } from "./Analyzers/WinsAnalysis";
import { Summery } from "./Summery";

// Create an object that satisfies the DataReader interface.
const csvFileReader = new CsvFileReader("football.csv");

// Create an instance of MatchReader and pass in something that
// satisfies the DataReader interface.
const matchReader = new MatchReader(csvFileReader);
matchReader.load();

const summery = new Summery
(
    new WinsAnalysis("Man United"),
    new ConsoleReport()
);


summery.buildAndPrintReport(matchReader.matches);