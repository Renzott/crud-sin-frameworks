import { Person } from "../model/Person.js"
import { EmpleadoService } from "../controller/EmpleadoController.js"
import { openModals } from "../script/modals.js"
import { clickOption } from "../script/options.js"

// Instancio las opciones de mantenimiento de los Empleados
var optionsValue = [
    { option: "delete", value: -1 },
    { option: "edit", value: -1 },
    { option: "details", value: -1 }];

/**
 * 
 * @param {Person[]} listaEmpleados 
 */
const llenarTabla = listaEmpleados => {

    if (listaEmpleados) {
        var table = document.getElementById("myTable").children[1]

        table.innerHTML = "";

        listaEmpleados.map(currentEmpleado => {

            var newRow = table.insertRow(-1)

            Object.values(currentEmpleado).forEach((valuesCurrentEmpleado, indexCurrentEmpleado) => {

                let newCell = newRow.insertCell(indexCurrentEmpleado)
                let newChild = "";

                // Si el valor actual es una imagen (Base64)
                if (String(valuesCurrentEmpleado).search("base64") != -1) {
                    newChild = document.createElement("img");
                    newChild.src = valuesCurrentEmpleado;
                    newChild.width = 64;
                    newChild.height = 64;
                } else {
                    newChild = document.createTextNode(valuesCurrentEmpleado);
                }

                newCell.appendChild(newChild);
            })

            // Añadiendo las opciones de mantenimiento de los Empleados

            /*optionsValue.map(currentOption => {
                var optionsCell = newRow.insertCell(-1);
                var options = document.createElement("img");

                options.src = "img/icons/" + currentOption.option + ".svg";
                options.width = 20;
                options.height = 20;
                options.id = currentEmpleado.id;
                options.className = currentOption.option;

                options.onclick = event => {
                    var indexClick = event.srcElement.className;

                    optionsValue.map(currentOptionSelected => {
                        if (currentOptionSelected.option == indexClick) {
                            currentOptionSelected.value = currentEmpleado.id;
                            openModals(currentOptionSelected);
                        }
                    })

                }

                optionsCell.appendChild(options);
            })*/

        })
    }

}


// Setup
(() => {

    var addOption = [{ option: "btnAdd", value: -1 }]

    var db = EmpleadoService.ListaEmpleados();
    llenarTabla(db);

    var btnAdd = document.getElementsByClassName(addOption[0].option)[0];

    btnAdd.onclick = () => {
        openModals(addOption[0])
    }

    clickOption();

    EmpleadoService.ActualizacionDataEmpleado(newData => {
        llenarTabla(newData);
        clickOption();   
    })

})();
