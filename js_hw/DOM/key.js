console.dir(document.getElementsByClassName("text"));
console.dir(document.getElementById("params"));
console.dir(document.querySelector("#params h1"));

const second = document.getElementById("second");
second.setAttribute("class", "black orange");

const h3 = document.createElement("h3");
h3.className = "white";

const text = document.createTextNode(
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
);
h3.appendChild(text);

const params = document.getElementById("params");
params.appendChild(h3);
