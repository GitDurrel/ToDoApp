import { Task } from "../../types/Task.js";

export class TaskModel {
  public task: Task;

  constructor(titre: string, dateRealisation: Date, estImportante = false,heure: string,idTask: string = Date.now().toString()) {
  
    this.task = {
      id: idTask,
      titre,
      estTerminee: false,
      estImportante,
      DateRealisation: dateRealisation,
      DateCreation: new Date(),
      heureRealisation: heure,
    };
  }

  // * Lire les données de la tâche
  get data(): Task {
    return this.task;
  }

  // * Basculer terminée / non-terminée
  BasculerTerminee() {
    this.task.estTerminee = !this.task.estTerminee;
  }

  // * Basculer importante / pas importante
  BasculerImportante() {
    this.task.estImportante = !this.task.estImportante;
  }
}
