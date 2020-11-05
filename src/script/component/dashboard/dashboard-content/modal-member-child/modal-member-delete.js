import axios from 'axios';

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
                    <button type="button" data-target="${data.id}" id="btnDelete-${data.id}"class="waves-effect waves-green btn-flat">Ya, saya yakin</button>
                </div>
            </div>
        `);
        $(`#btnDelete-${data.id}`).off();
        $(`#btnDelete-${data.id}`).on(`click`, async event => {
            event.stopPropagation();
            const targetId = $(event.currentTarget).data('target');
            this.deleteMember(targetId).then(result => {
                if (result.status == true) {
                    $(`#pageLoading`).show();
                    document.querySelector(`user-list`).tableData();

                    $(`#editUser${data.id}`).modal('close');
                    M.toast({ html: `data anggota ${data.nama||data.username||data.nik} telah terhapus` });
                }
            }).catch(error => {
                console.log(error);
            });
        })
    }
    async deleteMember(id = null) {
        try {
            const level = sessionStorage.getItem('level');
            const axiosOpt = {
                method: 'post',
                url: `${document.baseURI}api/${level}/deletemember`,
                data: { id: id },
                headers: {
                    'Content-type': 'application/json',
                }
            }
            const result = await axios(axiosOpt);

            return result.data;
        } catch (error) {
            return error;
        }
    }
}
customElements.define('modal-member-delete', ModalMemberDelete);