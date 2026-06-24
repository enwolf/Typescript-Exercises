<<<<<<< HEAD
For Project Sort here is the getting started guide.

## Getting Started 🚀

Want to run this project on your own machine? Here's everything you need.

### What you'll need first

- [Node.js](https://nodejs.org) (npm comes bundled with it)
- [Git](https://git-scm.com)

### Setting things up

1. **Grab the code**
```bash
   git clone https://github.com/enwolf/Typescript-Exercises.git
   cd Typescript-Exercises/sort
```

2. **Install the dependencies**
```bash
   npm install
```
   Don't worry if you don't see a `node_modules` folder in the repo — that's on purpose! This command reads `package.json` and `package-lock.json` like a recipe and installs everything the project needs (`nodemon`, `concurrently`, `typescript`, etc.) fresh on your machine.

3. **Start it up**
```bash
   npm start
```
   This kicks off two things at once, thanks to `concurrently`:
   - 👀 TypeScript watches your files and recompiles automatically (`tsc -w`)
   - 🔄 `nodemon` restarts the app whenever the compiled code changes

   Now you can edit your `.ts` files and see changes reflected right away, no manual rebuilding needed.

### A couple of friendly notes

- The `node_modules/` folder is intentionally left out of version control (see `.gitignore`). It's big, it's regenerable, and nobody wants to scroll through it on GitHub. `npm install` brings it back every time.
- Compiled JavaScript lands in `build/`, generated from your TypeScript source in `src/`. You shouldn't need to edit anything in `build/` directly — it gets overwritten automatically.
=======
# TypeScript Exercises

A collection of small TypeScript projects built while learning TypeScript fundamentals — interfaces, classes, generics, and tooling like Parcel and nodemon.

## Projects

- [`maps/`](./maps) — A Google Maps integration demo using a shared `Mappable` interface, with fake `User` and `Company` data generated via `faker`. Bundled with Parcel.
- [`sort/`](./sort) — Sorting algorithm implementations in TypeScript, with a dev workflow powered by `nodemon` and `concurrently`.

Each project folder has its own `README.md` with setup and run instructions specific to that project.

## General Notes

- Each project has its own `package.json` and dependencies — `npm install` should be run **inside** the relevant project folder, not the repo root.
- `node_modules/` is excluded from version control across all projects (see `.gitignore`). Run `npm install` after cloning to regenerate it.
>>>>>>> 48ff2f2 (Addded New Readme data to repo project per folder in project. This is very neat actually.)
