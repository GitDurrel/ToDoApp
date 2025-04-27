import { TaskModel } from '../../business/models/TaskModel.js';
import { taskItem } from '../components/taskItem.js';
import { TaskServices } from '../../business/services/TaskServices.js';

export function createTaskPage(title: string, faIconClass: string, showDate: boolean = false): HTMLElement {
    const container = document.createElement('div');

    const today = new Date().toLocaleDateString('fr-FR', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    container.innerHTML = `
        <div class="main-content">
            <div class="main-content-title">
                <div class="title-text">
                    <i class="${faIconClass}" style="margin-right: 8px;"></i> ${title}
                </div>
                ${showDate ? `<div class="task-date">${today}</div>` : ""}
            </div>

            ${title === 'Tâches non terminées' ? '' : `
            <div class="add-task">
                <span class="add-task-icon"> + </span>
                <input type="text" placeholder="Ajouter une tâche" class="task-input" />
                <div class="popup-add hidden">
                    <input type="time" class="task-time-input" />
                    ${(title === 'Important' || title === 'Mes tâches') 
                    ? `<input type="date" class="task-date-input" />` 
                    : ``}
                    <button class="confirm-add-btn">Ajouter</button>
                </div>
            </div>
            `}
            ${title === 'Tâches non terminées' ? `
                <div class="instruction-text">
                    <i class="fas fa-info-circle"></i>
                    Cette page liste automatiquement toutes vos tâches non terminées
                </div>
            ` : ''}
        </div>
        <div id="incomplete-tasks-container"></div>
    `;

    setTimeout(() => {
        const input = container.querySelector('.task-input') as HTMLInputElement;
        const popup = container.querySelector('.popup-add') as HTMLDivElement;
        const addButton = container.querySelector('.confirm-add-btn') as HTMLButtonElement;
        const tasksContainer = container.querySelector('#incomplete-tasks-container') as HTMLDivElement;
        const timeInput = container.querySelector('.task-time-input') as HTMLInputElement;
        const dateInput = container.querySelector('.task-date-input') as HTMLInputElement | null;

        input.addEventListener('click', () => {
            popup.classList.remove('hidden');
        });

        document.addEventListener('click', (event) => {
            const target = event.target as HTMLElement;
            const inputClicked = input.contains(target);
            const popupClicked = popup.contains(target);

            if (!inputClicked && !popupClicked) {
                popup.classList.add('hidden');
            }
        });

        if (addButton && input && tasksContainer) {
            addButton.addEventListener('click', () => {
                const titre = input.value.trim();
                const heure = timeInput.value;
                const dateValue = dateInput ? dateInput.value : null;

                if (titre === "") {
                    alert("Veuillez entrer un intitulé pour votre tâche !");
                    return;
                }

                if ((title === 'Important' || title === 'Mes tâches') && (!dateValue || dateValue.trim() === '')) 
                {
                    alert("Veuillez choisir une date de réalisation !");
                    return;
                }
                // Utiliser la date d'aujourd'hui pour "Ma journée"
                let taskDate;
                if (title === "Ma journée") {
                    taskDate = new Date(); 
                } else {
                taskDate = dateValue ? new Date(dateValue) : new Date();
                }
                // Définir estImportante à true si la page est "Important"
                const isImportant = title === 'Important';
                const newTask = new TaskModel(titre, taskDate, isImportant, heure);

                // * Ajout de la tâche au localStorage
                TaskServices.addTask(newTask);

                // * Créer et afficher l'élément de tâche
                const todoItem = taskItem(newTask.data);
                container.querySelector('#incomplete-tasks-container')?.appendChild(todoItem);

                // Réinitialiser les champs
                input.value = "";
                timeInput.value = "";
                if (dateInput) dateInput.value = "";
                popup.classList.add('hidden');
            });
        }
        loadTasks(title, tasksContainer);
    }, 0);

    return container;
}

// Fonction pour charger les tâches du localStorage
function loadTasks(pageTitle: string, container: HTMLElement) {
    // Récupérer toutes les tâches
    const tasks = TaskServices.getTasks();
    
    // Filtrer les tâches selon la page actuelle
    let filteredTasks = tasks;
    
    if (pageTitle === 'Ma journée') {
        // Filtrer les tâches d'aujourd'hui
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        filteredTasks = tasks.filter(task => {
            const taskDate = new Date(task.data.DateRealisation);
            taskDate.setHours(0, 0, 0, 0);
            return taskDate.getTime() === today.getTime();
        });
    } else if (pageTitle === 'Important') {
        // Filtrer les tâches importantes
        filteredTasks = tasks.filter(task => task.data.estImportante);
    } else if (pageTitle === 'Tâches non terminées') {
        // Filtrer les tâches non terminées
        filteredTasks = tasks.filter(task => !task.data.estTerminee);
    }
    
    // Afficher les tâches filtrées
    filteredTasks.forEach(task => {
        const todoItem = taskItem(task.data);
        container.appendChild(todoItem);
    });
}
