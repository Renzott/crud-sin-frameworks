import { Person } from "../model/Person.js";
import { db } from "../db/localStorage.js";

import { deletePerson } from "../route/delete.js";
import { editPerson } from "../route/edit.js";

const listRoute = data => {
  if (data) {
    let table = document.getElementById("myTable").children[1];
    table.innerHTML = "";
    data.forEach((items, idValue) => {
      let newRow = table.insertRow(-1);
      Object.values(items).forEach((elems, i) => {
        let newCell = newRow.insertCell(i);
        let newChild = "";
        if (String(elems).search("base64") != -1) {
          newChild = document.createElement("img");
          newChild.src = elems;
          newChild.width = 64;
          newChild.height = 64;
        } else {
          newChild = document.createTextNode(elems);
        }

        newCell.appendChild(newChild);
      });

      var optionsValue = ["delete", "edit", "details"];

      for (var i = 0; i < 3; i++) {
        let optionsCell = newRow.insertCell(-1);
        let options = document.createElement("img");
        options.src = "img/icons/" + optionsValue[i] + ".svg";
        options.width = 20;
        options.height = 20;
        options.id = "btnEdit";
        options.className = optionsValue[i];
        options.onclick = event => {
          var indexClick = event.srcElement.className;
          if (indexClick == optionsValue[0]) {
            deletePerson(idValue);
          }
          if (indexClick == optionsValue[1]) {
            editPerson(idValue);
          }
        };
        optionsCell.appendChild(options);
      }
    });
  } else {
    console.log("vacio");
  }
};

var readData = db.getEmpleados();
listRoute(readData);

db.setPersistanceData(true, newData => {
  listRoute(newData);
});

const openModals = () => {
  var options = [
    { Modal: "addModal", Button: "btnAdd" },
    { Modal: "editModal", Button: "btnEdit" }
  ];

  options.forEach(index => {
    var modal = document.getElementById(index.Modal);
    var btn = document.getElementById(index.Button);
    var span = document.getElementsByClassName("close")[0];

    btn.onclick = () => {
      modal.style.display = "block";
    };

    span.onclick = () => {
      modal.style.display = "none";
    };

    window.onclick = event => {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    };
  });
};

openModals();
