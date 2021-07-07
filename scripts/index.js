import { EventParse } from "./github-api.js";
console.log("version: 2.0.0-beta");
const URLparams = {
    url: new URL(window.location.toString()),
    add: function (key, value) {
        let { url } = this;
        url.searchParams.set(key, value);
        window.history.replaceState({}, document.title, url.toString());
    },
    get: function (key) {
        return this.url.searchParams.get(key);
    },
};
(async () => {
    const ACTIVE_TAB = "activetab";
    const AboutTabs = document.getElementsByClassName("abouttab");
    const AboutContent = document.getElementById("main-content");
    let def_Tab;
    let param_Tab;
    let tabParam = URLparams.get("tab");
    for (let i = 0; i < AboutTabs.length; i++) {
        const tab = AboutTabs[i];
        let temp_data = tab.dataset.tempid;
        const templ = document.getElementById(`templ-${temp_data}`);
        tab.addEventListener("click", () => {
            var _a;
            if (!tab.classList.contains(ACTIVE_TAB)) {
                (_a = document.getElementsByClassName(ACTIVE_TAB)[0]) === null || _a === void 0 ? void 0 : _a.classList.remove(ACTIVE_TAB);
                tab.classList.add(ACTIVE_TAB);
                let x = templ.content.cloneNode(true);
                AboutContent.innerHTML = "";
                AboutContent.appendChild(x);
                URLparams.add("tab", temp_data);
            }
        });
        if (tabParam == temp_data) {
            param_Tab = tab;
        }
        else if (tab.dataset.defopen) {
            def_Tab = tab;
        }
    }
    if (param_Tab)
        param_Tab.click();
    else
        def_Tab === null || def_Tab === void 0 ? void 0 : def_Tab.click();
})();
(async () => {
    const listElement = document.getElementById("git-events");
    const USER_NAME = "U-C-S";
    const QUERY_NUM = "5";
    let github_api_url = new URL(`https://api.github.com/users/${USER_NAME}/events/public`);
    github_api_url.searchParams.append("per_page", QUERY_NUM);
    let fetchRes = await fetch(github_api_url.toString());
    let ResponseJson = await fetchRes.json();
    let listElems = "";
    ResponseJson.forEach((x) => (listElems += "<li>" + EventParse(x) + "</li>"));
    listElement.innerHTML = listElems;
})();
