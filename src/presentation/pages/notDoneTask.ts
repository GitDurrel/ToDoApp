import { createTaskPage } from "./createTaskPage.js";

export function notDoneTask(): HTMLElement 
{
    
    const page = createTaskPage("Tâches non terminées", "fa fa-check-circle");

    return page;
}