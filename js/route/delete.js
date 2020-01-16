import { Person } from "../model/Person.js";
import { db } from "../db/localStorage.js";

var deletePerson = index => {
  var data = db.getEmpleados();
  delete data[index];
  console.log("Dato Index delete: ", index);
  db.updateEmpleados(data);
};

export { deletePerson };
