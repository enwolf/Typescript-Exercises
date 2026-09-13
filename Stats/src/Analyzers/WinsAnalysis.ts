import { Analyzer } from "../Summery";
import { MatchData } from "../MatchData";
import { MatchResult } from "../MatchResult";

// Concrete Analyzer that contains the win-counting analysis.
export class WinsAnalysis implements Analyzer
{
    // Store the team name supplied when the analyzer is created.
    constructor(public teamName: string) {}

    // Analyze the supplied match records and return the result as a string.
    run(matches: MatchData[]): string
    {
        let wins = 0;

        // Check each match for a Man United home or away win.
        for (let match of matches)
        {
            if (match[1] === "Man United" && match[5] === MatchResult.HomeWin)
            {
                wins++;
            }
            else if (match[2] === "Man United" && match[5] === MatchResult.AwayWin)
            {
                wins++;
            }
        }

        // Return the current analysis result.
        return "Team ${this.team} won ${wins} games";
    }
}