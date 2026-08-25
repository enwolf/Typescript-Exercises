import fs from "fs"; // Access Node's fs = file system module
import { dateStringToDate } from "./utils"; // Import the date conversion function from utils.ts
import { MatchResult } from "./MatchResult"; // Import the shared match result enum

export class CsvFileReader
{
    // Stores the parsed CSV match data.
    // This was originally string[][], but the second mapping step now converts
    // some fields into Date, number, and MatchResult values.
    // The row structure will be refined further as the exercise continues.
    data: string[][] = [];

    // public filename automatically creates and stores the filename property.
    // No additional constructor logic is needed.
    constructor(public filename: string) { }

    // Read the CSV file and transform the raw file contents into usable match data.
    read(): void
    {
        this.data = fs
            // Read the entire CSV file as one UTF-8 string.
            .readFileSync(this.filename, { encoding: "utf-8" })

            // Split the file into individual match rows.
            .split("\n")

            // First map:
            // Split each row at the commas to create an array of CSV fields.
            // At this stage every field is still stored as a string.
            .map(
                (row: string): string[] =>
                {
                    return row.split(",");
                }
            )

            // Second map:
            // Convert each raw CSV row into the types needed by the application.
            .map((row: string[]): any =>
            {

                // Converted match row structure:
                // [0] Date        - match date
                // [1] string      - home team
                // [2] string      - away team
                // [3] number      - home goals
                // [4] number      - away goals
                // [5] MatchResult - result code ("H", "A", or "D")
                // [6] string      - referee
                return [
                    dateStringToDate(row[0]),

                    row[1],
                    row[2],
                    parseInt(row[3]),
                    parseInt(row[4]),
                    row[5] as MatchResult,
                    row[6]
                ];

            });
    }
}