import { TaskModel } from '../../business/models/TaskModel.js';
import { taskItem } from '../components/taskItem.js';

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

                const taskDate = dateValue ? new Date(dateValue) : new Date();
                const newTask = new TaskModel(titre, taskDate, false,heure);
                const todoItem = taskItem(newTask.data);

                tasksContainer.appendChild(todoItem);

                input.value = "";
                timeInput.value = "";
                if (dateInput) dateInput.value = "";
                popup.classList.add('hidden');
            });
        }
    }, 0);

    return container;
}