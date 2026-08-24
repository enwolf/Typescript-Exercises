import fs from "fs"; // Access Node's fs = file system module

export class CsvFileReader
{
    // Stores the parsed CSV data as rows containing arrays of string fields.
    data: string[][] = [];

    // public filename automatically creates and stores the filename property.
    // No additional constructor logic is needed.
    constructor(public filename: string) { }

    // Read the CSV file and convert it into a two-dimensional array of rows and fields.
    read(): void
    {
        this.data = fs
            .readFileSync(this.filename, { encoding: "utf-8" })
            .split("\n")
            .map(
                (row: string): string[] =>
                {
                    return row.split(",");
                });
    }
}