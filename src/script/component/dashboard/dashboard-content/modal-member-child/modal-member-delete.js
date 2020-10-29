class ModalMemberDelete extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        this.id = $(this).attr("id") || "";
        this.class = $(this).attr("class") || "";
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
        $(this).html( /* html */ `
            <div id="delUser${data.id}" class="modal modal-fixed-footer">
                <div class="modal-content valign-wrapper">
                    <h4 class="red-text text-darken-3">
                        Anda yakin menghapus anggota "${data.nama||data.username}"?
                    </h4>
                </div>
                <div class="modal-footer">
                    <a class="modal-close waves-effect waves-green btn-flat">Tidak</a>
                    <a class="modal-close waves-effect waves-green btn-flat">Ya, saya yakin</a>
                </div>
            </div>
        `);
    }
}
customElements.define('modal-member-delete', ModalMemberDelete);