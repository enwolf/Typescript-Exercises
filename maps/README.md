## About This Project

A small TypeScript project demonstrating **interfaces** and **Google Maps API** integration, bundled with **Parcel**. The app places markers on a Google Map for two different types of entities (`User` and `Company`), both implementing a shared `Mappable` interface.

### What it does

- `CustomeMap` — wraps the Google Maps API, creates a map, and adds markers
- `Mappable` interface — defines what any object needs (a `location` and a `markerContent()` method) to be placed on the map
- `User` — a fake user with a name and random location, generated using the `faker` package
- `Company` — a fake company with a name, catchphrase, and random location, also via `faker`

When run, the app creates a `User` and a `Company`, plots both on the map, and shows their info in a popup when clicked.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org) (includes npm)
- [Git](https://git-scm.com)
- A **Google Maps JavaScript API key** ([get one here](https://developers.google.com/maps/documentation/javascript/get-api-key))

### Setup

1. **Clone the repository**
```bash
   git clone https://github.com/enwolf/Typescript-Exercises.git
   cd Typescript-Exercises/maps
```

2. **Install dependencies**
```bash
   npm install
```
   This installs `faker`, `@types/faker`, and `@types/google.maps`. Parcel itself is run via `npx`, so it doesn't need to be a listed dependency.

3. **Add your own Google Maps API key**

   Open `index.html` and replace the key in the script tag with your own:
```html
   <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY_HERE"></script>
```
   ⚠️ Never commit a real API key to a public repo.

4. **Start the dev server**
```bash
   npm start
```
   This runs `parcel index.html --open`, which bundles the TypeScript files and automatically opens the app in your browser at `http://localhost:1234`.

### Project structure

- `src/CustomeMap.ts` — the map wrapper class and `Mappable` interface
- `src/User.ts` — fake user data generator implementing `Mappable`
- `src/Company.ts` — fake company data generator implementing `Mappable`
- `src/index.ts` — entry point that creates the map and adds markers
- `index.html` — entry HTML file loaded by Parcel

### Notes

- `node_modules/` and Parcel's build cache (`.parcel-cache/`, `dist/`) are excluded from version control — see `.gitignore`.