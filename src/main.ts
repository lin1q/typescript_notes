import {loga} from "./index";

export function initPage () {
    // here you add listeners to dom elements
    let box = document.getElementById("para");
    if(box){
      box.addEventListener("click", (e:Event) => loga());

      box.style.color = 'red';

    }
  
  }

// this is the starting point of your app
initPage();