import {createTaskPage} from "./createTaskPage.js";

export function importantTask(): HTMLElement
{
    return createTaskPage('Important', 'fa fa-star');
}