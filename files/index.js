console.log("version: 2.0.0-alpha");

fetch("files/svg-paths.json")
  .then((res) => res.json())
  .then((svg_paths) => {
    for (let id in svg_paths) {
      let draw = svg_paths[id];
      document.getElementById(id).setAttribute("d", draw);
    }
  });

function OnOff(Id, spanId) {
  document.getElementById(Id).onclick = function () {
    let x = document.getElementById(spanId);
    if (x.innerHTML == "OFF") x.innerText = "ON";
    else x.innerText = "OFF";
  };
}

OnOff("The-Pro-Button", "Pro-status");
OnOff("The-Theme-Button", "Theme-status");

/*
colors: #39ff14 , #ff1439 , hsl(51, 100%, 59%)

To-do list:
- Add a Hover Tips popup at a fixed position
- Ability for users to change the accent color (Maybe)
- check out lit / web components stuff

*/
