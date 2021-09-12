import { EventParse } from "./github-api.js";

console.log("site-version: 2.0.0");

/**
 * Simple API for updating the current URL with search queries
 *
 * Uses BrowserAPIs: URL API and History API's replaceState method
 */
const URLparams = {
  url: new URL(window.location.toString()),

  add: function (key: string, value: string) {
    let { url } = this;
    url.searchParams.set(key, value);
    window.history.replaceState({}, document.title, url.toString());
  },

  get: function (key: string) {
    return this.url.searchParams.get(key);
  },
};

(async () => {
  const ACTIVE_TAB = "activetab";
  const AboutTabs = document.getElementsByClassName("tabs");
  const AboutContent = <HTMLDivElement>document.getElementById("main-content");

  let def_Tab;
  let param_Tab;

  let tabParam = URLparams.get("tab");

  //loop over all the tab buttons and give them the click event-listeners
  for (let i = 0; i < AboutTabs.length; i++) {
    const tab = <HTMLButtonElement>AboutTabs[i];
    let temp_data = <string>tab.dataset.tempid;
    const templ = <HTMLTemplateElement>document.getElementById(`templ-${temp_data}`);

    tab.addEventListener("click", () => {
      if (!tab.classList.contains(ACTIVE_TAB)) {
        //change btn color
        document.getElementsByClassName(ACTIVE_TAB)[0]?.classList.remove(ACTIVE_TAB);
        tab.classList.add(ACTIVE_TAB);

        //copies the HTML template code to the main div
        let x = templ.content.cloneNode(true);
        AboutContent.innerHTML = "";
        AboutContent.appendChild(x);

        URLparams.add("tab", temp_data);
      }
    });

    //we also check if the URLparam "tab" is equal to any of the tabs
    //during if it is equal to any, we store it in param_Tab
    //else if tab has a defopen data attr, we store it in def_Tab
    if (tabParam == temp_data) {
      param_Tab = tab;
    } else if (tab.dataset.defopen) {
      def_Tab = tab;
    }
  }

  //After the above looping, check if param_Tab existence and click on that if it is...
  //else click on default tab button
  if (param_Tab) param_Tab.click();
  else def_Tab?.click();

  //End of IIFE
})();

// For the showing a list of my recent Github public events
(async () => {
  //In Future, Place this div somewhere. For Ex: (In a new Nav-Section: Updates) or (Bottom of About)
  const listElement = <HTMLElement>document.getElementById("git-events");
  const USER_NAME = "U-C-S";
  const QUERY_NUM = "5";

  let github_api_url = new URL(`https://api.github.com/users/${USER_NAME}/events/public`);
  github_api_url.searchParams.append("per_page", QUERY_NUM);

  let fetchRes = await fetch(github_api_url.toString());
  let ResponseJson: ghEventApi[] = await fetchRes.json();
  let listElems = "";

  ResponseJson.forEach((x) => (listElems += "<li>" + EventParse(x) + "</li>"));

  listElement.innerHTML = listElems;

  //End of IIFE
})();

// const x = document.getElementById("The-Pro-Button");
// const thisPage = new URL(window.location.toString());

// x?.addEventListener("click", () => {
//   thisPage.searchParams.set("pro", "1");
//   window.history.pushState({}, "", thisPage.toString());
// });
