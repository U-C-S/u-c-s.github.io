console.log("version: 1.5.3");
/* colors: #39ff14 , #ff1439 , hsl(51, 100%, 59%) */

fetch("files/svg-paths.json")
  .then((res) => res.json())
  .then((svg_paths) => {
    for (let id in svg_paths) {
      let draw = svg_paths[id];
      document.getElementById(id).setAttribute("d", draw);
    }
  });

/*
To-do list:
- Add a Hover Tips popup at a fixed position
- Ability for users to change the accent color (Maybe)

*/
