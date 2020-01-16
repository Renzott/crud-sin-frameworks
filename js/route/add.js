import { Person } from "../model/Person.js";
import { db } from "../db/localStorage.js";

var form = document.forms.namedItem("myForm");

const toBase64 = file =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });

form.addEventListener("submit", async ev => {
  ev.preventDefault();

  var formData = new FormData(form);
  console.log(...formData);

  var reg = new Person();

  for (var [key, value] of formData.entries()) {
    if (key == "foto") {
      var canvasPreview = document.getElementById("addCanvasPreview");
      reg[key] = canvasPreview.toDataURL();
    } else {
      reg[key] = value;
    }
  }

  db.setEmpleado(reg);
});

window.oninput = ev => {
  if (ev.srcElement.type == "file") {
    var canvas = document.getElementById("addCanvasPreview");
    var context = canvas.getContext("2d");

    var blob = URL.createObjectURL(ev.srcElement.files[0]);
    console.log(blob);
    var imgPreview = new Image();
    imgPreview.src = blob;

    imgPreview.onload = () => {
      context.drawImage(imgPreview, 0, 0, 64, 64);
    };
  }
};
