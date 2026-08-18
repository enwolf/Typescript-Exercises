import fs from "fs"; //fs stands for file system

// Initial working approach used by the instructor as an example of code that will need refactoring.
// The code relies on remembering what values like match[1], match[2], match[5], "H", and "A" represent.

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

let manUnitedWins = 0;

// CSV fields:
// [1] = home team
// [2] = away team
// [5] = match result: H = home win, A = away win
for (let match of matches) 
{
    if (match[1] === "Man United" && match[5] === "H")
    {
        manUnitedWins++;
    }
    else if (match[2] === "Man United" && match[5] === "A")
    {
        manUnitedWins++;
    }
}

console.log(`Man United won ${manUnitedWins} games`);