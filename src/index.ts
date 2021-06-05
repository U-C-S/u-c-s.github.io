import { OnOff } from "./exports.js";

console.log("version: 2.0.0-alpha");

OnOff("The-Pro-Button", "Pro-status");
OnOff("The-Theme-Button", "Theme-status");

/*
colors: #39ff14 , #ff1439 , hsl(51, 100%, 59%)

To-do list:
- Add a Hover Tips popup at a fixed position
- Ability for users to change the accent color (Maybe)
- check out lit / web components stuff

*/

const aboutContent = <HTMLDivElement>document.getElementById("about-content");
let about_tabs: [string, string][] = [
  ["tab-blog", "templ-blog"],
  ["tab-intr", "templ-intr"],
  ["tab-abou", "templ-abou"],
];

const tabblog = <HTMLButtonElement>document.getElementById("tab-blog");
const templb = <HTMLTemplateElement>document.getElementById("templ-blog");

tabblog?.addEventListener("click", () => {
  let x = templb.content.cloneNode(true);
  aboutContent.appendChild(x);
});

tabblog.click();
