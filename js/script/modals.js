import { EmpleadoService } from "../controller/EmpleadoController.js"
import { Person } from "../model/Person.js"

var allModals = [
    { Modal: "addModal", Button: "btnAdd" },
    { Modal: "deleteModal", Button: "delete" },
    { Modal: "editModal", Button: "edit" },
    { Modal: "detailsModal", Button: "details" },
];

const showHideModal = (actualModal) => {
    var modal = document.getElementById(actualModal);
    var span = modal.getElementsByClassName("close")[0];

    modal.style.display = "block";

    span.onclick = () => {
        modal.style.display = "none";
    };

    window.onclick = event => {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    };
}

const closeAfterSubmitModal = (actualForm) => {
    console.log(actualForm);
    actualForm.offsetParent.style.display = "none";
}

const openModals = (optionSelected) => {
    var actualNameModal = allModals.find(x => x.Button == optionSelected.option).Modal;
    var actualModal = document.getElementById(actualNameModal);

    switch (optionSelected.option) {
        case "btnAdd":
            actualModal.firstElementChild.children[2].id.value = parseInt(EmpleadoService.ListaEmpleados().pop().id) + 1;
            showHideModal(actualNameModal);

            console.log(optionSelected)
            break;
        case "delete":

            console.log(EmpleadoService.BorrarEmpleado(optionSelected.value));
            break;
        case "edit":
            console.log(optionSelected)
            break;
        case "details":
            console.log(optionSelected)
            break;
    }

}

window.addEventListener("submit", async ev => {
    ev.preventDefault()

    var actualForm = ev.srcElement
    var formData = new FormData(actualForm)
    var actualEmpleado = new Person();
    console.log(actualForm)
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
            closeAfterSubmitModal(actualForm)
            break;
        case "editForm":
            console.log(formName + "- ")
            break;
        case "deleteForm":
            EmpleadoService.BorrarEmpleado()
            console.log(formName + "- ")
            break;
        case "detailsForm":
            console.log(formName + "- ")
            break;
    }

})

window.oninput = ev => {
    if (ev.srcElement.type == "file") {
        var canvas = document.getElementById("canvasPreview");
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


export { openModals }