import {NavBar} from '../components/navBar.js';
import {SideBar} from '../components/sideBar.js';

export class Default
{
    //  !  Attributs de la classe
    // * Conteneur principal de la page
    private _container: HTMLElement;
    // * Zone centrale où sera chargé dynamiquement les pages
    private _content: HTMLElement;

    // ! Constructeur de la classe
    constructor(Navigation: (page: string) => void)
    {
        // * Creation de l'element container principal
        this._container = document.createElement('div');

         // * Fonction qui retourne ma Navbar
        const navbar = NavBar();
        // * Fonction qui retourne ma Sidebar
        const sidebar = SideBar(Navigation);

        // * Creation de la zone centrale de la page et on lui donne un id content
        this._content = document.createElement('main');
        this._content.id = 'content';

        // * Creation de l'element body qui contiendra la sidebar et la zone centrale
        const body = document.createElement('div');
        body.style.display = "flex";
        body.appendChild(sidebar);
        body.appendChild(this._content);

        // * Assemblage final : on injecte la navbar et le body dans le container principal
        this._container.appendChild(navbar);
        this._container.appendChild(body);
    }

    // ! Methode qui retourne le conteneur principal
    render(): HTMLElement
    {
        return this._container;
    }

    // ! Methode qui permet de changer le contenu de la zone centrale
    setContent(content: HTMLElement)
    {
        this._content.innerHTML = '';
        this._content.appendChild(content);
    }
}


