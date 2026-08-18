import fs from "fs"; //fs stands for file system

// Intermediate refactor: match result codes are now stored in named constants.
// This improves readability, but the draw result ("D") is never used by the current logic.
// Another developer could mistake it for unnecessary code and remove it.

// Read the CSV file, split it into rows, then split each row into its individual fields
const matches = fs
    .readFileSync("football.csv", { encoding: "utf-8" })
    .split("\n")
    .map(
        (row: string): string[] =>
        {
            return row.split(",");
        }
    );

const homeWin = "H";
const awayWin = "A";
const draw = "D"; // Valid result even though this win-counting logic does not use it

let manUnitedWins = 0;

// CSV fields:
// [1] = home team
// [2] = away team
// [5] = match result: H = home win, A = away win
for (let match of matches) 
{
    if (match[1] === "Man United" && match[5] === homeWin)
    {
        manUnitedWins++;
    }
    else if (match[2] === "Man United" && match[5] === awayWin)
    {
        manUnitedWins++;
    }
}

console.log(`Man United won ${manUnitedWins} games`);