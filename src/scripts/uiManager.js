const taskDialog = document.getElementById("taskDialog");
const dialog = document.querySelector("dialog");
const openDialogBtn = document.getElementById("openDialogBtn");
const closeDialogBtn = document.getElementById("closeDialogBtn");

openDialogBtn.addEventListener("click", () => {
    taskTextInput.value = "";
    taskDialog.showModal();
});

dialog.addEventListener("click", (event) => {
    if (event.target === dialog) {
        dialog.close();
    }
});

closeDialogBtn.addEventListener("click", () => {
    taskDialog.close();
});
