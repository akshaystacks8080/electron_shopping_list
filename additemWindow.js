const electron = require("electron");
const { ipcRenderer } = electron;

const itemForm = document.querySelector("#item-form");

function onFormSubmit(e) {
  e.preventDefault();
  const itemInput = document.querySelector("#item-input");
  const itemValue = itemInput.value;
  ipcRenderer.send("item:add", itemValue);
}

itemForm.addEventListener("submit", onFormSubmit);
