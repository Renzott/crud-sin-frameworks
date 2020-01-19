import { Person } from "../model/Person.js";

class Storage {

    /**
     * @returns {Person[]}
     */
    getEmpleados() {


        var currentDataEmpleados = JSON.parse(localStorage.getItem("Empleados"));

        if(currentDataEmpleados == null) 
            return [];

        return currentDataEmpleados;
    }


    /**
     * 
     * @param {Person} updateEmpleado
     * @returns {Boolean}
     */
    createEmpleado(updateEmpleado) {

        var result;

        try {

            // Llamo a los empleados existentes en localstorage
            var actualDataEmpleados = this.getEmpleados();

            // Instancio un Array donde se coloraran los existentes empleados + el nuevo
            var newDataEmpleados = [];

            // Añado los existentes empleados al nuevo Array
            for (var item in actualDataEmpleados) {
                newDataEmpleados.push(actualDataEmpleados[item]);
            }

            // Verifico si "updateEmpleado" es null
            if (updateEmpleado) {
                //  Añado al nuevo empleado en el Array
                newDataEmpleados.push(updateEmpleado);

                // Actualizo el localStorage
                localStorage.setItem("Empleados", JSON.stringify(newDataEmpleados));
                console.log("Nuevo Empleado ingresado ");
                result = true;
            } else {
                console.log("El Empleados esta Vacio");
                result = false;
            }

        } catch (e) {
            console.log(e);

            result = false;
        } finally {
            return result;
        }
    }

    /**
    * 
    * @param {Number} id
    * @param {boolean} index
    * @returns {Person|Number}
    */
    findEmpleado(id, indexBoolean) {
        // Llamo a los empleados existentes en localstorage
        var actualDataEmpleados = this.getEmpleados();

        if (indexBoolean) {
            // Busco el index del elemento solicitado y lo retorno
            return actualDataEmpleados.findIndex(x => x.id == id);
        } else {
            return actualDataEmpleados.find(x => x.id == id);
        }
    }

    /**
     * 
     * @param {Number} id 
     * @returns {Boolean}
     */
    deleteEmpleado(id) {

        var result;

        // Llamo a los empleados existentes en localstorage
        var actualDataEmpleados = this.getEmpleados();

        // Busco el index del elemento a borrar
        var index = this.findEmpleado(id, true)

        // Verifico si el Index es negativo
        if (index != -1) {
            // Elimino el Empleado Deseado
            delete actualDataEmpleados[index]

            //Filtro los posibles datos NULL
            var filterNull = actualDataEmpleados.filter(x => x != null)
            //Actualizo la base de datos 
            localStorage.setItem("Empleados", JSON.stringify(filterNull))
            result = true;
        } else {
            result = false;
        }

        return result;
    }

    /**
     * 
     * @param {Person} updateEmpleado
     * @returns {Boolean}
     */
    updateEmpleado(updateEmpleado) {

        var result;

        // Llamo a los empleados existentes en localstorage
        var actualDataEmpleados = this.getEmpleados();

        // Verifico si "updateEmpleado" es null
        if (updateEmpleado) {

            // Busco el index del empleado solicitado
            var selectIndexEmpleado = this.findEmpleado(updateEmpleado.id, true)

            // Verifico si "selectEmpleado" es -1 o menos
            if (selectIndexEmpleado > -1) {

                // Modifico el actual index del empleado por el nuevo registro de empleado seleccionado
                actualDataEmpleados[selectIndexEmpleado] = updateEmpleado;

                //Filtro los posibles datos NULL
                var filterNull = actualDataEmpleados.filter(x => x != null)
                // Actualizo la base de datos 
                localStorage.setItem("Empleados", JSON.stringify(filterNull))

                result = true

            } else {
                console.log("No se ha encontrado el empleado a actualizar")
                result = false
            }


        } else {
            console.log("Los datos del empleado estan vacios")
            result = false
        }

    }

    /**
     * @param {boolean} option 
     * @param {Function} callback 
     */

    setPersistanceData(option, callback) {

        // Verifico si se quiere activar la persistencia
        if (option) {

            // Instacio setItem en un nuevo var
            var originalSetItem = localStorage.setItem;

            // Instacio una funcion dentro de "localstogare.setItem"
            localStorage.setItem = function (key, value) {

                // Instancio Nuevo Evento
                var event = new Event("itemInserted");

                event.value = value;
                event.key = key;

                // Envio la informacion actualizada
                document.dispatchEvent(event);

                // Aplico los cambios a la instacia anterior
                originalSetItem.apply(this, arguments);
            };

            // Observer o la escucha del evento, recibo la informacion actualizada de "event"
            var localStorageSetHandler = function (e) {
                var jsonData = JSON.parse(e.value);

                // devuelvo el evento mediante un callback (function)
                callback(jsonData);
            };

            // Añado nuevo Evento en document
            document.addEventListener("itemInserted", localStorageSetHandler, false);
        } else {
            alert("La persistencia esta desactivada, actualize la pagina para ver los resultados")
        }
    }
}

const db = new Storage();
export { db };
