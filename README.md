<h1 align="center">Chanakya's Website</h1>
<p align="center">A Website about me, for me, built by me!</p>

### Built with:

- [Zola](https://github.com/getzola/zola) - A Static Site Generator, built with Rust
- [TypeScript](https://www.typescriptlang.org/) - Modern JavaScript with Static Typing
- [esbuild](https://esbuild.github.io/) - An extremely fast JavaScript bundler
- [SCSS](https://sass-lang.com) - CSS Preprocessor

### Local Environment Setup:

- You need to install
    - **Node.js v16+** (IMPORTANT)
    - **Zola** v0.13+ (IMPORTANT | [installation process](https://www.getzola.org/documentation/getting-started/installation/) | make sure it's available with `zola` command)
    - Git (to clone the repo)
    - VS Code (for editing the code)
- Then, clone this Repository into your PC and Open it in VS Code
- `npm install` - To install all the dependencies
- `npm run develop` - To start a local Dev Server which opens the site directly in the browser

### Directory Structure

| Directory | What it contains                                                                        |
| --------- | --------------------------------------------------------------------------------------- |
| bin       | DevOps - local development server & build and deploy                                    |
| content   | Content Markdown files used by the tera templates                                       |
| src \*    | Json, Sass and TypeScript files that will be sent to static folder during build process |
| static    | These are directly copied to output folder during the build process                     |
| templates | Contains the Tera template files                                                        |

\* = The Json files will be used by Templates while sass and ts files will be compiled to css and js and used as static files for the website
