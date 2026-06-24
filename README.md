# TypeScript Exercises

A collection of small TypeScript projects built while learning TypeScript fundamentals — interfaces, classes, generics, and tooling like Parcel and nodemon.

## Projects

- [`maps/`](./maps) — A Google Maps integration demo using a shared `Mappable` interface, with fake `User` and `Company` data generated via `faker`. Bundled with Parcel.
- [`Sort/`](./Sort) — Sorting algorithm implementations in TypeScript, with a dev workflow powered by `nodemon` and `concurrently`.

Each project folder has its own `README.md` with setup and run instructions specific to that project.

## General Notes

- Each project has its own `package.json` and dependencies — `npm install` should be run **inside** the relevant project folder, not the repo root.
- `node_modules/` is excluded from version control across all projects (see `.gitignore`). Run `npm install` after cloning to regenerate it.