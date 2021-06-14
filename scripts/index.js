"use strict";
console.log("version: 2.0.0-alpha");
(async () => {
    const AboutTabs = document.getElementsByClassName("abouttab");
    const AboutContent = document.getElementById("main-content");
    const ACTIVE_TAB = "activetab";
    for (let i = 0; i < AboutTabs.length; i++) {
        const tab = AboutTabs[i];
        const templ = document.getElementById(`templ-${tab.dataset.tempid}`);
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
    function change_active_tab_color(tab) {
        var _a;
        (_a = document.getElementsByClassName(ACTIVE_TAB)[0]) === null || _a === void 0 ? void 0 : _a.classList.remove(ACTIVE_TAB);
        tab.classList.add(ACTIVE_TAB);
    }
})();
const x = document.getElementById("The-Pro-Button");
const thisPage = new URL(window.location.toString());
x === null || x === void 0 ? void 0 : x.addEventListener("click", () => {
    thisPage.searchParams.set("pro", "1");
    window.history.pushState({}, "", thisPage.toString());
});
