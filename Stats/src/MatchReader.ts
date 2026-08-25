import { CsvFileReader } from "./CsvFileReader";
import { dateStringToDate } from "./utils";
import { MatchResult } from "./MatchResult";

// Defines the fixed structure and types for one parsed football match.
// [date, home team, away team, home goals, away goals, result, referee]
type MatchData = [Date, string, string, number, number, MatchResult, string];


// MatchReader extends CsvFileReader, so it inherits the reusable CSV-reading
// behavior defined by the abstract parent class.
//
// <MatchData> supplies the concrete type for CsvFileReader's generic TypeOfData.
// For this subclass, TypeOfData = MatchData, so inherited data is effectively
// MatchData[] and mapRow() must return a MatchData tuple.
export class MatchReader extends CsvFileReader<MatchData>
{
    // Provides the match-specific conversion required by CsvFileReader.
    // The parent class handles reading and splitting the CSV;
    // this method defines how one raw string[] row becomes a MatchData tuple.
    mapRow(row: string[]): MatchData
    {
        return [
            dateStringToDate(row[0]),
            row[1],
            row[2],
            parseInt(row[3]),
            parseInt(row[4]),
            row[5] as MatchResult,
            row[6]
        ];
    }
}