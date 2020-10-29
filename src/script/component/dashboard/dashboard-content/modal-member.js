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
        const viewUser = $( /*html */ `<modal-member-view></modal-member-view>`)[0];
        const delUser = $( /*html */ `<modal-member-delete></modal-member-delete>`)[0];
        const editUser = $( /*html */ `<modal-member-edit></modal-member-edit>`)[0];
        viewUser.data = data;
        delUser.data = data;
        editUser.data = data;
        $(this).append(viewUser);
        $(this).append(delUser);
        $(this).append(editUser);
    }
}
customElements.define('modal-member', ModalMember);