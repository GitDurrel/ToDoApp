import {linksSidebar} from '../../constants.js';

export function SideBar( Navigation: (page: string ) =>  void ): HTMLElement
{
    // * Creation de l'element sidebar
    const sidebar = document.createElement('aside');

    // * Transforme le tableau de liens en une liste de buttons et les regroupe en un bloc html , puis l'injecte dans l'element sidebar
    sidebar.innerHTML = linksSidebar
    .map(
      (link) => `
        <button class="sidebar-button" data-id="${link.id}">
          <i class="${link.icon}"></i>
          <span class="sidebar-title">${link.text}</span>
        </button>
      `
    )
    .join('');
    // * Ajout d'une fonction d'ecoute de click sur l'element sidebar
    sidebar.addEventListener('click', (event) => 
        {
            // * On definit une variable target qui est l'element sur lequel on a cliqué
            const target = (event.target as HTMLElement).closest('.sidebar-button');
            // * On verifie si l'element cliqué est un button
            if (target)
            {
                // * On recupere l'id de l'element cliqué 
                const id = target.getAttribute("data-id");
                // * On verifie si l'id n'est pas null
                if (id) 
                {
                    // * On sélectionne tous les buttons de la sidebar et on retire la classe active de tous les buttons
                    const buttons = sidebar.querySelectorAll('.sidebar-button');
                    buttons.forEach((button) => button.classList.remove('active'));
                    // * On ajoute la classe active au button cliqué
                    target.classList.add('active');
                    // * On appelle la fonction Navigation avec l'id du button cliqué
                    Navigation(id);
                } 
            }
        });
    
        
    return sidebar;    
}