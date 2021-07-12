<h1 align="center">Chanakya's Website</h1>
<p align="center">A Website about me, for me, built by me!</p>

### Built with:

- [Zola](https://github.com/getzola/zola) - A Static Site Generator, built with Rust
- [TypeScript](https://www.typescriptlang.org/) - Modern JavaScript with Static Typing 
- [SCSS](https://sass-lang.com) - CSS Preprocessor

### For Setting Up Local Environment to test the code:

- You need Git and Node.js version 14+
- Also, Zola Binary ([Installation Ref.](https://www.getzola.org/documentation/getting-started/installation/)) and make sure it's available with `zola` cmd
- Clone / Download this Repo
- Install the NPM Dependencies with `npm install`
- use `node bin/develop.js` to start a local Dev Server which opens the site directly in the browser

### Directory Structure

| Directory | What it does                                                                            |
| --------- | --------------------------------------------------------------------------------------- |
| bin       | DevOps - local development server & build and deploy                                    |
| content   | Content Markdown files used by the templates                                            |
| src \*    | Json, Sass and TypeScript files that will be sent to static folder during build process |
| static    | These are directly copied to output folder during the build process                     |
| templates | Contains the Tera template files                                                        |

\* = The Json files will be used by Templates while sass and ts files will be compiled to css and js and used as static files for the website
