import site from '../../data/site-data';
import './dashboard-content/dash-board';
import './dashboard-content/user-list';
import './dashboard-content/profil-setting';
import './dashboard-content/kartu-tanda-anggota';


class MainContent extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        this.id = $(this).attr("id") || "main-content";
        this.class = $(this).attr("class") || "";
        $(this).attr("class", this.class);
        this._page = 'dashboard';
        this.render();
    }
    disconnectedCallback() {

    }
    adoptedCallback() {

    }
    attributeChangedCallback(name, oldValue, newValue) {

    }
    static get observedAttributes() {
        return ['src', 'id', 'name', 'class'];
    }
    set page(pagex) {
        this._page = pagex;

        this.render();
    }
    render() {
        let page;
        this.level = sessionStorage.getItem('level');
        switch (this.level) {
            case 'admin':
                switch (this._page) {
                    case 'dashboard':
                        page = `dash-board`;
                        break;
                    case 'userlist':
                        page = `user-list`;
                        break;
                    case 'profil':
                        page = `profil-setting`;
                        break;
                    case 'kta':
                        page = `kartu-tanda-anggota`;
                        break;
                    default:
                        page = `dash-board`;
                        break;
                }
                break;
            default:
                switch (this._page) {
                    case 'profil':
                        page = `profil-setting`;
                        break;
                    case 'kta':
                        page = `kartu-tanda-anggota`;
                        break;
                    default:
                        page = `kartu-tanda-anggota`;
                        break;
                }
                break;
        }

        const inPage = document.createElement(page);
        inPage.site = site;

        this.innerHTML = inPage.outerHTML;

    }
}
customElements.define('main-content', MainContent);