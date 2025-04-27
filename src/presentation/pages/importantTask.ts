import {createTaskPage} from "./createTaskPage.js";

export function importantTask(): HTMLElement
{
    const page = createTaskPage('Important', 'fa fa-star');

    return page;
}