"use strict";
(() => {
    const currentThemeItem = localStorage.getItem("theme");
    const htmlElem = document.documentElement;
    if (currentThemeItem) {
        htmlElem.dataset.theme = currentThemeItem;
    }
})();
