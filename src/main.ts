import "./css/style.css";
import FullList from "./model/FullList";
import ListItem from "./model/ListItem";
import ListTemplate from "./template/ListTemplate";

const initApp = (): void => {
  const fullList = FullList.instance;
  const template = ListTemplate.instance;

  // Add listener to new entry form submit
  const itemEntryForm = document.getElementById(
    "itemEntryForm"
  ) as HTMLFormElement;

  itemEntryForm.addEventListener("submit", (event: SubmitEvent): void => {
    event.preventDefault();

    // Get the new value
    const input = document.getElementById("newItem") as HTMLInputElement;
    const newEntryText: string = input.value.trim(); // trim() removes whitespace from both sides of a string:
    if (!newEntryText.length) return;

    // calculate item ID
    const itemId: number = fullList.list.length
      ? parseInt(fullList.list[fullList.list.length - 1].id + 1)
      : 1;

    // create new item
    const newItem = new ListItem(itemId.toString(), newEntryText);
    // add new item to full list
    fullList.addItem(newItem);
    // Re-render list with new item included
    template.render(fullList);
  });

  // Add listener to "Clear" button
  const clearItem = document.getElementById(
    "clearItemsButton"
  ) as HTMLButtonElement;

  clearItem.addEventListener("click", (): void => {
    fullList.clearList();
    template.clear();
  });

  // load initial data
  fullList.load();
  // initial render of template
  template.render(fullList);
};

document.addEventListener("DOMContentLoaded", initApp);
