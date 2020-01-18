import { db } from "../database/localStorage.js"
import { Person } from "../model/Person.js";

class EmpleadoController {


    /**
     * @returns {Person[]}
     */
    ListaEmpleados() {

        var listEmpleados = db.getEmpleados();

        return listEmpleados
    }

    /**
     * @param {Person} empleado
     * @returns {String}
     */
    CrearEmpleado(empleado) {

        var message = "";

        var booleanEmpleado = db.createEmpleado(empleado)

        if (booleanEmpleado) {
            message = "El Usuario se ha creado con Exito"
        } else {
            message = "Ha sucedido un error con la creacion del Empleado"
        }

        return message
    }

    /**
     * @param {Person} empleado
     * @returns {String}
     */
    ActualizarEmpleado(empleado) {

        var message = "";

        var booleanEmpleado = db.updateEmpleado(empleado)

        if (booleanEmpleado) {
            message = "El Usuario se ha actualizado con Exito"
        } else {
            message = "Ha sucedido un error con la actualizacion del Empleado"
        }

        return message
    }

    /**
     * @param {Number} idEmp
     * @returns {String}
     */
    BorrarEmpleado(idEmp) {

        var message = "";

        var booleanEmpleado = db.deleteEmpleado(idEmp)

        if (booleanEmpleado) {
            message = "El Usuario se ha eliminado con Exito"
        } else {
            message = "Ha sucedido un error con la eliminacion del Empleado"
        }

        return message
    }

    /**
     * @param {Number} idEmp
     * @returns {Person}
     */
    BuscarEmpleado(idEmp) {

        var selectEmpleado = db.findEmpleado(idEmp, false)

        return selectEmpleado;
    }

    /**
     * @param {Function} callback 
     */

    ActualizacionDataEmpleado(callback){
        db.setPersistanceData(true,(data) =>{
            callback(data);
        })
    }

}

var EmpleadoService = new EmpleadoController()

export {EmpleadoService}