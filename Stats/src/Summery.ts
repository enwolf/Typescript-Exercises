import { MatchData } from "./MatchData";

export interface Analyzer 
{
    run(matches: MatchData[]): string;
}

export interface OutputTarget 
{
    print(report: string): void; 
} 

export class Summery 
{
    constructor(public analyzer: Analyzer, public OutputTarget: OutputTarget) {}
}

