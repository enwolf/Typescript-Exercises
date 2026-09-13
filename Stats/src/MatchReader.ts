import { dateStringToDate } from "./utils";
import { MatchResult } from "./MatchResult";
import { MatchData } from "./MatchData";

// Defines the structure required for an object that can supply raw CSV data.
interface DataReader
{
    read(): void;
    data: string[][];
}

export class MatchReader
{
    // Stores the converted football match records using the shared MatchData type.
    matches: MatchData[] = [];

    // Store a DataReader that MatchReader can use to obtain the data rows.
    constructor(public reader: DataReader) { }

    // Read the raw data through the supplied DataReader and convert each
    // string[] row into a typed MatchData tuple.
    // In this case, we are loading match data from football.csv.
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