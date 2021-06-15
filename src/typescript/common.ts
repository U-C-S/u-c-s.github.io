(() => {
  const currentThemeItem = localStorage.getItem("theme");
  const htmlElem = document.documentElement;

  if (currentThemeItem) {
    //htmlElem.setAttribute("data-theme", currentThemeItem);
    htmlElem.dataset.theme = currentThemeItem;
  }

  document.getElementById("The-Theme-Btn")?.addEventListener("click", () => {
    let themeX = htmlElem.dataset.theme == "light" ? "dark" : "light";
    //console.log(themeX);
    htmlElem.dataset.theme = themeX;
    localStorage.setItem("theme", themeX);
  });
})();
