TypeScript Exercises

A collection of small TypeScript projects built while learning TypeScript fundamentals — interfaces, classes, generics, inheritance, composition, and development tooling like Parcel, nodemon, and concurrently.

Projects
maps/ — A Google Maps integration demo using a shared Mappable interface, with fake User and Company data generated via faker. Bundled with Parcel.
Sort/ — Sorting algorithm implementations in TypeScript, exploring interfaces, abstract classes, inheritance, and reusable sorting logic. Development workflow powered by nodemon and concurrently.
Stats/ — A football statistics project that reads match data from a CSV file and analyzes team results. The project was refactored through several approaches, including inheritance with generics, composition using interfaces, and separate analyzer/reporting components. The final version can output results to the console or an HTML file and uses static factory methods to simplify setup.

Each project folder has its own README.md with setup, run instructions, and additional details specific to that project.

General Notes
Each project has its own package.json and dependencies — npm install should be run inside the relevant project folder, not the repo root.
node_modules/ is excluded from version control across all projects (see .gitignore). Run npm install after cloning to regenerate it.
Some projects also include a NOTES.md file containing more detailed learning notes and explanations.
