import { EmpleadoService } from "../controller/EmpleadoController.js"
import { Person } from "../model/Person.js"

var allModals = [
    { Modal: "addModal", Button: "btnAdd" },
    { Modal: "deleteModal", Button: "delete" },
    { Modal: "editModal", Button: "edit" },
    { Modal: "detailsModal", Button: "details" },
];


const openModals = (optionSelected) => {
    var actualNameModal = allModals.find(x => x.Button == optionSelected.option).Modal;
    var actualModal = document.getElementById(actualNameModal);

    switch (optionSelected.option) {
        case "btnAdd":

            if (EmpleadoService.ListaEmpleados().length > 0)
                actualModal.firstElementChild.children[2].id.value = parseInt(EmpleadoService.ListaEmpleados().pop().id) + 1;
            else
                actualModal.firstElementChild.children[2].id.value = 0
            break;
        case "delete":
            //actualModal.firstElementChild.children[2].id.value = parseInt(EmpleadoService.ListaEmpleados().pop().id) + 1;
            actualModal.firstElementChild.children[2].id.value = optionSelected.value
            break;
        case "edit":
            var actualEmpleado = EmpleadoService.BuscarEmpleado(optionSelected.value);

            for (var [key, valueEmpleado] of Object.entries(actualEmpleado)) {
                if (key == "foto") {
                    var imgEditPreview = new Image();
                    imgEditPreview.src = valueEmpleado;

                    var editCanvas = actualModal.getElementsByTagName("canvas")[0]
                    var contextEditCanvas = editCanvas.getContext("2d");

                    imgEditPreview.onload = () => {
                        contextEditCanvas.drawImage(imgEditPreview, 0, 0, 64, 64);
                    };

                } else {
                    actualModal.firstElementChild.children[2][key].value = valueEmpleado
                }
            }



            break;
        case "details":
            var actualEmpleado = EmpleadoService.BuscarEmpleado(optionSelected.value);
            for (var [key, valueEmpleado] of Object.entries(actualEmpleado)) {
                if (key == "foto") {
                    var imgEditPreview = new Image();
                    imgEditPreview.src = valueEmpleado;

                    var editCanvas = actualModal.getElementsByTagName("canvas")[0]
                    var contextEditCanvas = editCanvas.getContext("2d");

                    imgEditPreview.onload = () => {
                        contextEditCanvas.drawImage(imgEditPreview, 0, 0, 64, 64);
                    };
                }else{
                    actualModal.querySelector(`label[name=${key}]`).innerText = valueEmpleado
                }
            }
            break;
    }

    showHideModal(actualNameModal);

}


// Event Submit Forms Modals

window.addEventListener("submit", async ev => {
    ev.preventDefault()

    var actualForm = ev.srcElement
    var formData = new FormData(actualForm)
    var actualEmpleado = new Person();

    for (var [key, value] of formData.entries()) {
        if (key == "foto") {
            var canvasPreview = actualForm.getElementsByTagName("canvas")[0]
            actualEmpleado[key] = canvasPreview.toDataURL();
        } else {
            actualEmpleado[key] = value;
        }
    }

    switch (actualForm.name) {
        case "addForm":
            EmpleadoService.CrearEmpleado(actualEmpleado)
            break;
        case "editForm":
            EmpleadoService.ActualizarEmpleado(actualEmpleado)
            break;
        case "deleteForm":
            EmpleadoService.BorrarEmpleado(actualEmpleado.id)
            break;
        case "detailsForm":
            break;
    }

    clearForm(actualForm)
    closeAfterSubmitModal(actualForm)

})

const showHideModal = (actualModal) => {
    var modal = document.getElementById(actualModal)
    var form = modal.getElementsByTagName("form")[0]
    var span = modal.getElementsByClassName("close")[0]
    

    modal.style.display = "block"
    
    span.onclick = () => {
        modal.style.display = "none"
        clearForm(form)
    };

    window.onclick = event => {
        if (event.target == modal) {
            modal.style.display = "none"
            clearForm(form)
        }
    };
}

const closeAfterSubmitModal = (actualForm) => {

    actualForm.offsetParent.style.display = "none";
}

/**
 * 
 * @param {HTMLFormElement} actualForm 
 */
const clearForm = (actualForm) => {

    if (actualForm.name != "deleteForm") {
        var actualCanvas = actualForm.getElementsByTagName("canvas")[0]
        var contextActualCanvas = actualCanvas.getContext('2d')

        contextActualCanvas.clearRect(0, 0, actualCanvas.width, actualCanvas.height)
    }

    actualForm.reset();
}

window.oninput = ev => {
    if (ev.srcElement.type == "file") {
        var canvas = ev.srcElement.parentNode.getElementsByTagName("canvas")[0]
        var context = canvas.getContext("2d");
        console.log(ev.srcElement);
        var blob = URL.createObjectURL(ev.srcElement.files[0]);

        var imgPreview = new Image();
        imgPreview.src = blob;

        imgPreview.onload = () => {
            context.drawImage(imgPreview, 0, 0, 64, 64);
        }
    }
}


export { openModals }