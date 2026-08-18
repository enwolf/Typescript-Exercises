import fs from "fs"; //fs stands for file system

// Intermediate refactor: match result codes are now grouped together under MatchResult.
// This makes their relationship clearer and keeps valid results like Draw from looking
// like unrelated or unnecessary values.

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

const MatchResult =
{
    HomeWin: "H",
    AwayWin: "A",
    Draw: "D"
};

let manUnitedWins = 0;

// CSV fields:
// [1] = home team
// [2] = away team
// [5] = match result
for (let match of matches) 
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