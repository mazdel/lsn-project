import site from '../../data/site-data';
import './dashboard-content/dash-board';
import './dashboard-content/user-list';


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
        switch (this._page) {
            case 'dashboard':
                page = `<dash-board></dash-board>`;
                break;
            case 'userlist':
                page = `<user-list></user-list>`;
                break;
            default:
                page = `<dash-board></dash-board>`;
                break;
        }
        const inPage = $(`${page}`)[0];
        inPage.site = site;

        $(this).html(inPage);

    }
}
customElements.define('main-content', MainContent);