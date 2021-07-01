console.log("version: 2.0.0-alpha");
/*
colors: #39ff14 , #ff1439 , hsl(51, 100%, 59%)

To-do list:
- Add a Hover Tips popup at a fixed position
- Ability for users to change the accent color (Maybe)
- check out lit / web components stuff
*/

(async () => {
  const AboutTabs = document.getElementsByClassName("abouttab");
  const AboutContent = <HTMLDivElement>document.getElementById("main-content");
  const ACTIVE_TAB = "activetab";
  let def_Tab;
  let param_Tab;

  let thisPage = new URL(window.location.toString());
  let tabParam = thisPage.searchParams.get("tab");

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

        let x = templ.content.cloneNode(true);
        AboutContent.innerHTML = "";
        AboutContent.appendChild(x);

        thisPage.searchParams.set("tab", temp_data);
        window.history.pushState({}, "", thisPage.toString()); //see more about this method params
      }
    });

    //we also check if the URLparam "tab" is equal to any of the tabs
    //during if it is equal to any, we store it in param_Tab
    if (tabParam == temp_data) {
      param_Tab = tab;
    }
    //Also, if tab has a defopen data attr, we store it in def_Tab
    else if (tab.dataset.defopen) {
      def_Tab = tab;
    }
  }

  //After the above looping, check if param_Tab existence and click on that if it is...
  //else click on default tab button
  if (param_Tab) param_Tab.click();
  else def_Tab?.click();
})();

// (async () => {
//   const username = "u-c-s";
//   let github_api_url = new URL(`https://api.github.com/users/${username}/events/public`);
//   github_api_url.searchParams.append("per_page", "5");

//   let fetchRes = await fetch(github_api_url.toString());
//   let ResponseJson = await fetchRes.json();
// })();

// const x = document.getElementById("The-Pro-Button");
// const thisPage = new URL(window.location.toString());

// x?.addEventListener("click", () => {
//   thisPage.searchParams.set("pro", "1");
//   window.history.pushState({}, "", thisPage.toString());
// });
