import { Task } from "../../types/Task.js";

export function taskItem(task: Task): HTMLDivElement {
  const taskDiv = document.createElement("div");
  taskDiv.className = "task-section";

  const div = document.createElement("div");
  div.className = "todo-item flex items-center gap-4 p-2 border-b";

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = task.estTerminee;
  checkbox.className = "task-checkbox";

  const titleContainer = document.createElement("div");
  titleContainer.className = "flex flex-col flex-1";

  const title = document.createElement("span");
  title.textContent = task.titre;
  title.className = "font-medium";

  const date = task.DateRealisation.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' });
  const heure = task.heureRealisation ;

  const time = document.createElement("span");
  time.textContent = heure ? `${date} à ${heure}` : date;
  time.className = "font-medium";



  titleContainer.appendChild(title);
  titleContainer.appendChild(time);

  const star = document.createElement("input");
  star.type = "checkbox";
  star.checked = task.estImportante;
  star.className = "star-checkbox";

  div.appendChild(checkbox);
  div.appendChild(titleContainer);
  div.appendChild(star);

  taskDiv.appendChild(div);

  // * On ajoute la gestion du clic directement ici
  handleTaskCheckbox(taskDiv, task);

  const tasksContainer = document.getElementById("incomplete-tasks-container") as HTMLDivElement;
  if (tasksContainer) 
  {
    tasksContainer.appendChild(taskDiv);
  }

  return tasksContainer;
}

function handleTaskCheckbox(taskDiv: HTMLDivElement, task: Task) {
  const checkbox = taskDiv.querySelector(".task-checkbox") as HTMLInputElement;

  checkbox.addEventListener("change", () => {
    task.estTerminee = checkbox.checked;

    let completedSection = document.getElementById("completed-section");
    if (!completedSection) {
      completedSection = document.createElement("div");
      completedSection.id = "completed-section";
      completedSection.innerHTML = `
        <div class="flex justify-between items-center mb-2">
          <h2>Terminées (0)</h2>
          <button id="toggle-completed" class="text-sm text-blue-500 hover:underline">Réduire</button>
        </div>
        <div id="completed-tasks"></div>
      `;

      const toggleButton = completedSection.querySelector("#toggle-completed") as HTMLButtonElement;
      const completedTasksContainer = completedSection.querySelector("#completed-tasks") as HTMLDivElement;

      toggleButton.addEventListener("click", () => {
        if (completedTasksContainer.style.display === "none") {
          completedTasksContainer.style.display = "block";
        toggleButton.textContent = "Réduire";
        } else {
          completedTasksContainer.style.display = "none";
          toggleButton.textContent = "Déplier";
        }
      });

      const content = document.getElementById('content');
      if (content) 
      {
       content.appendChild(completedSection);
      }
    }

    const completedTasksContainer = document.getElementById("completed-tasks")!;
    const tasksContainer = document.getElementById("incomplete-tasks-container")!;

    if (task.estTerminee) 
    {
      completedTasksContainer.appendChild(taskDiv);
    } else 
    {
      tasksContainer.appendChild(taskDiv);
    }

    updateCompletedTitle();
  });
}

function updateCompletedTitle() {
  const completedTasksContainer = document.getElementById("completed-tasks");
  const completedTitle = document.querySelector("#completed-section h2");
  if (completedTasksContainer && completedTitle) {
    const completedCount = completedTasksContainer.children.length;
    completedTitle.textContent = `Terminées (${completedCount})`;
  }
}
