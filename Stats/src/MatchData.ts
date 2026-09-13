import { MatchResult } from "./MatchResult";

// Defines the expected structure and types for one parsed football match.
// [date, home team, away team, home goals, away goals, result, referee]
export type MatchData = [Date, string, string, number, number, MatchResult, string];