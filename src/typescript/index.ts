import "./components/gh-events";
import "./components/status";

console.log("site-version: 2.2.0");

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

// ----------------------------------------------------------------------------

// Tab implementation
(async () => {
  const AboutContent = <HTMLDivElement>document.getElementById("main-content");
  const ACTIVE_TAB = "activetab";
  const AboutTabs = document.getElementsByClassName("tabs");

  let def_Tab;
  let param_Tab;

  let tabParam = URLparams.get("tab");

  //loop over all the tab buttons and give them the click event-listeners
  for (let i = 0; i < AboutTabs.length; i++) {
    const tab = <HTMLButtonElement>AboutTabs[i];
    let temp_data = <string>tab.dataset.contentName;
    //console.log(temp_data);
    const templ = <HTMLDivElement>document.getElementById(`content-${temp_data}`);

    tab.addEventListener("click", () => {
      if (!tab.classList.contains(ACTIVE_TAB)) {
        //change btn color
        document.getElementsByClassName(ACTIVE_TAB)[0]?.classList.remove(ACTIVE_TAB);
        tab.classList.add(ACTIVE_TAB);

        //copies the HTML template code to the main div
        let x = templ.cloneNode(true);
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

// ----------------------------------------------------------------------------

// (() => {
//   const AboutContent = <HTMLDivElement>document.getElementById("main-content");
//   const ContentsOfTab = <HTMLCollectionOf<HTMLDivElement>>document.getElementsByClassName("TabContent");

//   const ACTIVE_TAB = <HTMLButtonElement>document.getElementsByClassName("activetab")[0];
//   let temp_data = <string>ACTIVE_TAB.dataset.contentName;

//   for (let i = 0; i < ContentsOfTab.length; i++) {
//     if (!ContentsOfTab[i].classList.contains(temp_data)) {
//       AboutContent.innerHTML = "none";
//     }
//   }

//   AboutContent.addEventListener("wheel", (e) => {});

//   const tab = <HTMLButtonElement>document.getElementsByClassName(ACTIVE_TAB)[0];
//   let temp_data = <string>tab.dataset.contentName;
//   const templ = <HTMLDivElement>document.getElementById(`content-${temp_data}`);

//   AboutContent.addEventListener("wheel", () => {
//     tab?.classList.remove(ACTIVE_TAB);

//     tab.classList.add(ACTIVE_TAB);

//     //copies the HTML template code to the main div
//     let x = templ.cloneNode(true);
//     AboutContent.innerHTML = "0";
//     AboutContent.appendChild(x);

//     URLparams.add("tab", temp_data);
//   });
// })();

// const x = document.getElementById("The-Pro-Button");
// const thisPage = new URL(window.location.toString());

// x?.addEventListener("click", () => {
//   thisPage.searchParams.set("pro", "1");
//   window.history.pushState({}, "", thisPage.toString());
// });
