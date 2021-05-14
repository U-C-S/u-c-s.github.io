export function RandomNumber() {
  let x = Math.random() + 1;
  return x;
}

export function OnOff(Id: string, spanId: string) {
  document.getElementById(Id)!.onclick = () => {
    let x = document.getElementById(spanId);
    if (x!.innerHTML == "OFF") x!.innerText = "ON";
    else x!.innerText = "OFF";
  };
}

// Create a class for the element

