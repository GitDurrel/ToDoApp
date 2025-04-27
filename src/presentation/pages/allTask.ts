import {createTaskPage} from "./createTaskPage.js";

export function allTask(): HTMLElement
{
    return createTaskPage("Mes tâches", "fa fa-tasks");
}