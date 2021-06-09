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

const AboutTabs = document.getElementsByClassName("abouttab");
const AboutContent = <HTMLDivElement>document.getElementById("about-content");
const ACTIVE_TAB = "activetab";

for (let i = 0; i < AboutTabs.length; i++) {
  const tab = <HTMLButtonElement>AboutTabs[i];
  const templ = <HTMLTemplateElement>document.getElementById(`templ-${tab.dataset.tempid}`);

  tab.addEventListener("click", () => {
    if (!tab.classList.contains(ACTIVE_TAB)) {
      change_active_tab_color(tab);
      let x = templ.content.cloneNode(true);
      AboutContent.innerHTML = "";
      AboutContent.appendChild(x);
    }
  });

  if (tab.dataset.defopen) {
    tab.click();
  }
}

function change_active_tab_color(tab: HTMLButtonElement) {
  document.getElementsByClassName(ACTIVE_TAB)[0]?.classList.remove(ACTIVE_TAB);
  tab.classList.add(ACTIVE_TAB);
}

//......
//testing whether I can call a elem with id which is in a template tag

let meow = document.getElementById("meowx");
console.log(meow?.innerHTML);
//looks like we cannot
