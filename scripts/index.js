"use strict";
console.log("version: 2.0.0-alpha");
(async () => {
    const AboutTabs = document.getElementsByClassName("abouttab");
    const AboutContent = document.getElementById("main-content");
    const ACTIVE_TAB = "activetab";
    let def_Tab;
    let param_Tab;
    let thisPage = new URL(window.location.toString());
    let tabParam = thisPage.searchParams.get("tab");
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
                thisPage.searchParams.set("tab", temp_data);
                window.history.pushState({}, "", thisPage.toString());
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
