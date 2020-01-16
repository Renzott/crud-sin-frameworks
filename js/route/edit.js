import { Person } from "../model/Person.js";
import { db } from "../db/localStorage.js";

var editPerson = index => {
  var data = db.getEmpleados();
  var person = data[index];

  console.log(person);
};

export { editPerson };
