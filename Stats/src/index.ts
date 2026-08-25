import { MatchReader } from "./MatchReader"; // Import the match-specific CSV reader.
import { MatchResult } from "./MatchResult"; // Import the shared match result enum.

// Create a MatchReader for the football CSV and load the parsed match records.
// MatchReader handles the match-specific conversion while CsvFileReader
// provides the reusable CSV reading and parsing behavior.
const reader = new MatchReader("football.csv");
reader.read();

let manUnitedWins = 0;

// reader.data contains MatchData tuples produced by MatchReader.
// Tuple fields used by the current analysis:
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