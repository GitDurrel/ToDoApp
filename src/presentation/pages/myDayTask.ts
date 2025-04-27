import  {createTaskPage} from "./createTaskPage.js";

export function myDayTask():HTMLElement
{
    const page =  createTaskPage("Ma journée", "fa fa-sun", true);

    return page ; 
}