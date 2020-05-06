console.log("Current Version - v1.2.R-0505a");
console.log("Credits: Font-Awesome v5.13.0");



//The botty Function
function BOTTy() {
  var name = prompt("Hey, What's your name? \nDon't type nothing");
   var letters = name.length;
   var notnum = isNaN(name);

    if(name === null) { alert('YOU LEGENDARY IDIOT!'); }
    else if (name === 'nothing') { alert('You are basically NOTHING!!!'); }
    else if (notnum === false) { alert('Type a name, YOU FOOL'); }
    else if (letters < 4) { alert('I dont believe your name is "' + name + '"'); }
    else if (notnum === true) { alert('So ' + name + ', You will have a Bright Future'); }
}
