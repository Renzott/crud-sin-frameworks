//import { Person } from "../model/Person.js"
import { openModals } from "../script/modals.js"

var optionsValue = [
    { option: "delete", value: -1 },
    { option: "edit", value: -1 },
    { option: "details", value: -1 }];


const clickOption = () => {
    var table = document.getElementById("myTable");
    var rows = table.getElementsByTagName("tr");
    for (var i = 1; i < rows.length; i++) {
        var currentRow = table.rows[i];

        console.log(currentRow)

        var createClickHandler = function (row, allRows) {
            return function () {
                var cell = row.getElementsByTagName("td")[0]
                var id = cell.innerHTML

                // Clear Click Backgroud Color
                for (var i = 1; i < allRows.length; i++) {
                    allRows[i].style.backgroundColor = ""
                }

                // Focus Click Backgroud Color
                row.style.backgroundColor = "#c4c8ef"

                getValueOptions(id)
            };
        };
        currentRow.onclick = createClickHandler(currentRow, rows)
    }
}

const getValueOptions = (empleadoID) => {
    Object.values(document.getElementsByClassName("card-body")).map(
        x => {
            switch (x.classList[1]) {
                case "delete":
                    optionsValue[0].value = empleadoID;
                    x.onclick = event => {
                        openModals(optionsValue[0])
                    }
                    break;
                case "edit":
                    optionsValue[1].value = empleadoID;
                    x.onclick = event => {
                        openModals(optionsValue[1])
                    }
                    break;
                case "details":
                    optionsValue[2].value = empleadoID;
                    x.onclick = event => {
                        openModals(optionsValue[2])
                    }
                    break;
            }
        }
    )
}


export { clickOption }