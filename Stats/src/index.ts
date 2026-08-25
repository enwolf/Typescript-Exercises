import { CsvFileReader } from "./CsvFileReader"; // Import the CSV reader class.
import { MatchResult } from "./MatchResult"; // Import the shared match result enum.

// Create a CSV reader for the football data and load the parsed match records.
// CsvFileReader handles reading and parsing the CSV instead of index.ts.
const reader = new CsvFileReader("football.csv");
console.log(reader.read());

// Temporary output to inspect the parsed match data while refactoring.
console.log(reader.data);

let manUnitedWins = 0;

// reader.data contains the parsed CSV match records.
// CSV fields used by the current analysis:
// [1] = home team
// [2] = away team
// [5] = match result
for (let match of reader.data)
{
    if (match[1] === "Man United" && match[5] === MatchResult.HomeWin)
    {
        manUnitedWins++;
    }
    else if (match[2] === "Man United" && match[5] === MatchResult.AwayWin)
    {
        manUnitedWins++;
    }
}

console.log(`Man United won ${manUnitedWins} games`);