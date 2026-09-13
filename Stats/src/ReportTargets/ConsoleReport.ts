import { OutputTarget } from "../Summery";

// Concrete OutputTarget that sends the generated report to the console.
export class ConsoleReport implements OutputTarget
{
    // Print the supplied report string to the terminal.
    print(report: string): void
    {
        console.log(report);
    }
}