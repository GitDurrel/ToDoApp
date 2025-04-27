import  {createTaskPage} from "./createTaskPage.js";

export function myDayTask():HTMLElement
{
    return createTaskPage("Ma journée", "fa fa-sun", true);
}