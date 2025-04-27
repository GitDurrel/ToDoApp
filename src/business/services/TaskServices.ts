import { TaskModel } from "../../business/models/TaskModel.js";

const STORAGE_KEY = 'myTodoAppTasks'; // clé de stockage dans LocalStorage

export class TaskServices {
    
    static saveTasks(tasks: TaskModel[]) {
        const serialized = tasks.map(task => task.data); // On serialize les données
        localStorage.setItem(STORAGE_KEY, JSON.stringify(serialized));
    }
    
    static getTasks(): TaskModel[] {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return [];
        const parsed = JSON.parse(raw);
        return parsed.map((taskData: any) => new TaskModel(
            taskData.titre,
            taskData.DateRealisation ? new Date(taskData.DateRealisation) : new Date(),
            taskData.estImportante,
            taskData.heureRealisation,
            taskData.id
        ));
    }
    
    static addTask(task: TaskModel) {
        const tasks = this.getTasks();
        tasks.push(task);
        this.saveTasks(tasks);
    }
    
    static deleteTask(taskId: string) {
        let tasks = this.getTasks();
        // Ici, il faut utiliser task.data.id au lieu de task.id
        tasks = tasks.filter(task => task.data.id !== taskId);
        this.saveTasks(tasks);
    }
    
    static updateTask(updatedTask: TaskModel) {
        const tasks = this.getTasks().map(task => 
            // Ici aussi, il faut utiliser task.data.id
            task.data.id === updatedTask.data.id ? updatedTask : task
        );
        this.saveTasks(tasks);
    }
}