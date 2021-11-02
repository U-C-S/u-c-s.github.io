<p align="center">
  <img width="64" align="center" src="static/favicon.ico">
</p>
<h1 align="center">Personal Website of Chanakya</h1>

### Built with:

- [Zola](https://github.com/getzola/zola) - A Static Site Generator, written in Rust
- [TypeScript](https://www.typescriptlang.org/) - Strongly typed language that builds on JavaScript
- [Solid.js](https://www.solidjs.com/) - A declarative and efficient JavaScript library for building UIs
- [esbuild](https://esbuild.github.io/) - An extremely fast JavaScript bundler
- [SCSS](https://sass-lang.com) - CSS Preprocessor

## Local Environment Setup:

- You need to install
  - **Node.js v16+** (IMPORTANT)
  - **Zola** v0.13+ (IMPORTANT | [installation process](https://www.getzola.org/documentation/getting-started/installation/) | make sure it's available with `zola` command)
  - Optional: Git and VS Code
- Clone this Repository into your PC and In the cloned directory, use the following commands
```sh
npm install       # To install all the project dependencies
npm run develop   # To start a local Dev Server which opens the site directly in the browser
```

### Directory Structure

| Directory | What it contains                                                                        |
| --------- | --------------------------------------------------------------------------------------- |
| bin       | DevOps - build scripts including code bundling, running zola and building static site   |
| content   | Content - Markdown files used by the tera templates                                     |
| src \*    | Json, Sass and TypeScript files that will be sent to static folder during build process |
| static    | Files in this are directly copied to output folder during the build/develop process     |
| templates | Contains the Tera (Zola templating language) template files                             |

\* = The Json files will be used by Templates while sass and ts files will be compiled to css and js and used as static files for the website
