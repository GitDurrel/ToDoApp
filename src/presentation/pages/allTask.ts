import {createTaskPage} from "./createTaskPage.js";

export function allTask(): HTMLElement {
    const page = createTaskPage("Mes tâches", "fa fa-tasks");
    return page;
}