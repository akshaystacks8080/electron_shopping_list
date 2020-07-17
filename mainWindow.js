const electron = require("electron");
const { ipcRenderer } = electron;

//Add items
ipcRenderer.on("item:add", onItemAdd);
ipcRenderer.on("item:clear", onItemsClear);

function onItemAdd(e, item) {
  const shoppingList = document.querySelector("#shopping-list");
  const li = document.createElement("li");
  li.className = "collection-item";
  const itemText = document.createTextNode(item);
  li.appendChild(itemText);
  shoppingList.appendChild(li);
}

function onItemsClear() {
  const shoppingList = document.querySelector("#shopping-list");
  shoppingList.innerHTML = "";
}

function removeItem(e) {
  e.target.remove();
}

const shoppingList = document.querySelector("#shopping-list");
shoppingList.addEventListener("dblclick", removeItem);
