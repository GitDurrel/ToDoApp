import { Task } from "../../types/Task.js";

export class TaskModel {
  private _task: Task;

  constructor(titre: string, dateRealisation: Date, estImportante = false,heure: string) {
  
    this._task = {
      id: Date.now().toString(),
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
    return this._task;
  }

  // * Basculer terminée / non-terminée
  BasculerTerminee() {
    this._task.estTerminee = !this._task.estTerminee;
  }

  // * Basculer importante / pas importante
  BasculerImportante() {
    this._task.estImportante = !this._task.estImportante;
  }
}
