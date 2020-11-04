import site from '../../data/site-data';
import './sign-in';
import './sign-up';
import axios from 'axios';

class SignPage extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        this.id = $(this).attr("id") || "sign-page";
        this.class = $(this).attr("class") || "";
        $(this).attr("class", this.class);
        this._page = 'signin';
        this.getsess().then((data) => {
            if (data) {
                console.log(data);
                const thisUrl = document.baseURI.replace(/(main)\/?/gi, "");
                console.log(`${thisUrl}main`);
                window.location.href = `${thisUrl}main/dashboard`;
            }
        })

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
        let page = "";
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
            $(elm).on('click', (event) => {
                event.stopPropagation();
                const pageToGo = $(elm).attr('href').substr($(elm).attr('href').indexOf('#') + 1);
                this.page = pageToGo;
            });
        });

    }
    async getsess() {
        /**get session data */
        const thisBaseUri = document.baseURI.replace(/(main)\/?/gi, "");
        const axiosOpt = {
            method: 'post',
            url: `${thisBaseUri}api/getsession`,
            data: null,
            headers: {
                'Content-type': 'application/json',
            }
        }
        try {
            const response = await axios(axiosOpt);
            const data = response.data.signedin;
            return data;
        } catch (error) {
            console.log(error);
        }

        /**./get session data */
    }
}
customElements.define('sign-page', SignPage);