import { createTaskPage } from "./createTaskPage.js";

export function notDoneTask(): HTMLElement {
    return createTaskPage("Tâches non terminées", "fa fa-check-circle");
}