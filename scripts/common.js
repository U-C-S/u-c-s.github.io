"use strict";
(() => {
    var _a;
    const htmlElem = document.documentElement;
    (_a = document.getElementById("The-Theme-Btn")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => {
        let themeX = htmlElem.dataset.theme == "light" ? "dark" : "light";
        htmlElem.dataset.theme = themeX;
        localStorage.setItem("theme", themeX);
    });
})();
