import distribute from "./modules/combine.js"
import { docs } from "./modules/fncs.js";

export const config = {
    title: "You Tube",
    icon: "./img/youtube.png",
    css: ['./app.css'],
}

document.body.innerHTML = distribute.codes;
distribute.scripts.forEach(ds => {
    var scs = document.createElement(ds.tag);
    if(ds.src !== '') scs.src = ds.src;
    if(ds.types !== '') scs.type = ds.types;
    if(ds.text !== '') scs.textContent = ds.text;
    document.body.appendChild(scs);
})

docs();