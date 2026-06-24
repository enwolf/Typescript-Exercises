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
