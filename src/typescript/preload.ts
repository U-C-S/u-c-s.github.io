(() => {
  const currentThemeItem = localStorage.getItem("theme");
  const htmlElem = document.documentElement;

  if (currentThemeItem) {
    //htmlElem.setAttribute("data-theme", currentThemeItem);
    htmlElem.dataset.theme = currentThemeItem;
  }
})();
