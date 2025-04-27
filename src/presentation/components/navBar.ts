export function NavBar(): HTMLElement
{
    // * Creation de l'element nav
    const nav = document.createElement('nav');
    // * Creation de la structure de la barre de navigation et injection de la structure dans l'element nav
    nav.innerHTML = `
    <div class="navbar">
      <div class="navbar-title">ToDo App</div>
      <div class="search-container">
        <span class="search-icon">🔍</span>
        <input type="text" placeholder="Rechercher..." class="search-input" />
      </div>
    </div>
  `;
  return nav;

}