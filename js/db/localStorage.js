class Storage {
  getEmpleados() {
    return JSON.parse(localStorage.getItem("Empleados"));
  }

  setEmpleado(reg) {
    var result;

    try {
      var readData = this.getEmpleados();
      console.log(reg);
      var newData = [];

      for (var item in readData) {
        newData.push(readData[item]);
      }

      newData.push(reg);

      localStorage.setItem("Empleados", JSON.stringify(newData));
      console.log("Nuevo Dato ingresado");
      result = true;
    } catch (e) {
      console.log(e);
      result = false;
    } finally {
      return result;
    }
  }

  updateEmpleados(database) {
    var filterNull = database.filter(x => x != null);
    localStorage.setItem("Empleados", JSON.stringify(filterNull));
  }

  setPersistanceData(option, callback) {
    if (option == true) {
      var originalSetItem = localStorage.setItem;

      localStorage.setItem = function(key, value) {
        var event = new Event("itemInserted");

        event.value = value; // Optional..
        event.key = key; // Optional..

        document.dispatchEvent(event);

        originalSetItem.apply(this, arguments);
      };

      var localStorageSetHandler = function(e) {
        var jsonData = JSON.parse(e.value);
        callback(jsonData);
      };

      document.addEventListener("itemInserted", localStorageSetHandler, false);
    }
  }
}

const db = new Storage();
export { db };
