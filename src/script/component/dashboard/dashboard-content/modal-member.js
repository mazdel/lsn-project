import './modal-member-child/modal-member-edit';
import './modal-member-child/modal-member-delete';
import './modal-member-child/modal-member-view';

class ModalMember extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        this.id = $(this).attr("id") || "";
        this.class = $(this).attr("class") || "black-text";
        $(this).attr("class", this.class);
        this.innerHTML = "";
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
    set data(data) {
        this._data = data;
    }
    render() {
        const data = this._data;
        const viewUser = document.createElement(`modal-member-view`);
        const delUser = document.createElement(`modal-member-delete`);
        const editUser = document.createElement(`modal-member-edit`);
        viewUser.data = data;
        delUser.data = data;
        editUser.data = data;
        this.appendChild(viewUser);
        this.appendChild(delUser);
        this.appendChild(editUser);
    }
}
customElements.define('modal-member', ModalMember);