import fs from "fs"; // Access Node's fs = file system module

// Generic, abstract CSV reader.
// TypeOfData is a generic type parameter that acts as a placeholder for
// whatever type one parsed CSV row should eventually become.
//
// CsvFileReader handles the reusable file-reading/parsing process,
// while a child class supplies the specific data type and row conversion.
//
// Example:
// MatchReader extends CsvFileReader<MatchData>
// means that, for MatchReader, TypeOfData = MatchData.
export abstract class CsvFileReader<TypeOfData>
{
    // Stores all parsed CSV rows as an array of the generic TypeOfData.
    // The child class determines what TypeOfData actually represents.
    data: TypeOfData[] = [];

    // public filename automatically creates and stores the filename property.
    // No additional constructor logic is needed.
    constructor(public filename: string) { }

    // Defines the row-conversion method that every child reader must provide.
    // CsvFileReader supplies a raw string[] row, and the child class determines
    // how that row is converted into its specific TypeOfData.
    abstract mapRow(row: string[]): TypeOfData;

    // Handles the reusable CSV reading and parsing workflow.
    read(): void
    {
        /*
         * Parsing flow:
         * 1. Read the entire CSV file as a string.
         * 2. Split the file into individual rows.
         * 3. First map: parse each row into its raw string fields.
         * 4. Second map: pass each string[] row to mapRow().
         *    The child class converts it into its specific TypeOfData.
         */
        this.data = fs
            .readFileSync(this.filename, { encoding: "utf-8" })
            .split("\n")
            .map(
                (row: string): string[] =>
                {
                    return row.split(",");
                }
            )
            .map(this.mapRow);
    }
}