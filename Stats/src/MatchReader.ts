import { dateStringToDate } from "./utils";
import { MatchResult } from "./MatchResult";
import { MatchData } from "./MatchData";
import { CsvFileReader } from "./CsvFileReader";

// Defines the structure required for an object that can supply raw CSV data.
// MatchReader depends on this interface rather than on CsvFileReader directly.
interface DataReader
{
    read(): void;
    data: string[][];
}

export class MatchReader
{
    // Static factory method that creates a MatchReader configured with
    // a CsvFileReader for the supplied filename.
    static fromCsv(filename: string): MatchReader
    {
        return new MatchReader(new CsvFileReader(filename));
    }

    // Stores the converted football match records using the shared MatchData type.
    matches: MatchData[] = [];

    // Store the DataReader that MatchReader will use to obtain the raw data rows.
    // This can be supplied directly or created through the fromCsv() factory method.
    constructor(public reader: DataReader) { }

    // Read the raw data through the configured DataReader and convert each
    // string[] row into a typed MatchData tuple.
    load(): void
    {
        this.reader.read();

        this.matches = this.reader.data.map(
            (row: string[]): MatchData =>
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
        );
    }
}