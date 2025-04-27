import { Default } from "./presentation/layouts/Default.js";
import { allTask } from "./presentation/pages/allTask.js";
import { myDayTask } from "./presentation/pages/myDayTask.js";
import { importantTask } from "./presentation/pages/importantTask.js";
import { notDoneTask } from "./presentation/pages/notDoneTask.js";

const app = document.getElementById("app");

if (app) {
  const layout = new Default(handleNavigation);
  app.appendChild(layout.render());
  layout.setContent(allTask()); // * page par défaut

  // ! Gestion de la navigation
  function handleNavigation(page: string) {
    switch (page) {
      case "today":
        layout.setContent(myDayTask());
        break;
      case "important":
        layout.setContent(importantTask());
        break;
      case "notdone":
        layout.setContent(notDoneTask());
        break;
      case "all":
        layout.setContent(allTask());
        break;
      default:
        layout.setContent(allTask());
    }
  }
}

