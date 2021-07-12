/*
colors: #39ff14 , #ff1439 , hsl(51, 100%, 59%)

To-do list:
- Add a Hover Tips popup at a fixed position
- Ability for users to change the accent color (Maybe)
- check out lit / web components stuff
- Check for fonts - at max 2 imported
- Add a NoJS page

Done:
- Fix: flash of incorrect theme
*/

(() => {
  const htmlElem = document.documentElement;

  document.getElementById("The-Theme-Btn")?.addEventListener("click", () => {
    let themeX = htmlElem.dataset.theme == "light" ? "dark" : "light";
    //console.log(themeX);
    htmlElem.dataset.theme = themeX;
    localStorage.setItem("theme", themeX);
  });
})();
