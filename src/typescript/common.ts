(async () => {
  const htmlElem = document.documentElement;
  const toggleThemeBtn = document.getElementById("The-Theme-Btn");
  const currentThemeCokie = localStorage.getItem("theme");
  if (currentThemeCokie) {
    document.documentElement.setAttribute("data-theme", currentThemeCokie);
  }

  toggleThemeBtn?.addEventListener("click", () => {
    if (htmlElem.dataset.theme === "dark") {
      htmlElem.setAttribute("data-theme", "light");
      localStorage.setItem("theme", "light");
    } else {
      htmlElem.setAttribute("data-theme", "dark");
      localStorage.setItem("theme", "dark");
    }
  });
})();
