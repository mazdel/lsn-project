import site from '../../data/site-data';
import './sign-in';
import './sign-up';

class SignPage extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        this.id = $(this).attr("id") || "sign-page";
        this.class = $(this).attr("class") || "";
        $(this).attr("class", this.class);
        this._page = 'signin';
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
            case 'signin':
                page = `<sign-in></sign-in>`
                break;
            case 'signup':
                page = `<sign-up></sign-up>`
                break;
            default:
                page = `<sign-in></sign-in>`
                break;
        }
        const inPage = $(`${page}`)[0];
        inPage.site = site;

        $(this).html(inPage);

        $('.spage-action').each((key, elm) => {
            $(elm).on('click', () => {
                const pageToGo = $(elm).attr('href').substr(1);
                this.page = pageToGo;
            });
        });
    }
}
customElements.define('sign-page', SignPage);