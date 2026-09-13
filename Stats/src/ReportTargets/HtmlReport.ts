import fs from "fs";
import { OutputTarget } from "../Summery";

// Concrete OutputTarget that writes the generated report to an HTML file.
export class HtmlReport implements OutputTarget
{
    // Build a simple HTML document containing the report string
    // and save it to report.html.
    print(report: string): void
    {
        const html =
        `
        <div>
            <h1>Analysis OutPut</h1>
            <div>${report}</div>
        </div>        
        `;

        // Write the generated HTML string to a report.html file us file system function.
        fs.writeFileSync("report.html", html);
    }
}