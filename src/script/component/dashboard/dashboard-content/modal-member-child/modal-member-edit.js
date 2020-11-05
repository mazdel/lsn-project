import '../../form-data-member';
import prePost from '../../../../helper/api-helper';

import axios from 'axios';

class ModalMemberEdit extends HTMLElement {
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
        const form = document.createElement(`form-data-member`); //$(`<form-data-member></form-data-member>`)[0];
        form.form = {
            type: 'edit',
            data: data,
            id: `formEdit${data.id}`,
            kta_field: 'disabled'
        }
        this.innerHTML = /* html */ `
            <div id="editUser${data.id}" class="modal modal-fixed-footer modal-l">
                <div class="modal-content">
                    <div class="container">
                        <h4 class="">Ubah data anggota "${data.nama||data.username}"</h4>
                        <hr>
                        <div class="row modal-member-view">
                            <div class="col s12 m12 l12">
                                
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <a class="modal-close waves-effect waves-green btn-flat">Tutup</a>
                    <button type="submit" id="submit${data.id}" form="formEdit${data.id}" class="waves-effect waves-green btn-flat">Simpan</button>
                </div>
            </div>
        `;
        document.querySelector(`#editUser${data.id}>div.modal-content>div.container>div.row div.col`).appendChild(form);
        //$(`#editUser${data.id}>div.modal-content>div.container>div.row div.col`).append(form);
        //simpan data

        $(`form#formEdit${data.id}`).off();
        $(`form#formEdit${data.id}`).on('submit', async(event) => {
            event.stopPropagation();
            event.preventDefault();
            const editdata = prePost($(`form#formEdit${data.id}`).serializeArray());

            $('span.helper-text').hide();
            $(`#addMemberLoading-formEdit${data.id}`).show();

            this.editMember(data.id, editdata).then((result) => {
                $(`#addMemberLoading-formEdit${data.id}`).hide();
                if (result.status == true) {
                    $(`#pageLoading`).show();
                    document.querySelector(`user-list`).tableData();

                    $(`#editUser${data.id}`).modal('close');
                    M.toast({ html: `Perubahan data anggota ${data.nama||data.username||data.nik} sukses` });
                } else {
                    for (const key in result.response) {
                        if (result.response.hasOwnProperty(key)) {
                            const message = result.response[key];
                            const msgElement = $(`input#${key}-${form.id}`).siblings('span');
                            msgElement.text(`${message}`);
                            msgElement.show();
                            if (message) {
                                M.toast({ html: `${message}` });
                            }
                        }
                    }
                }
            }).catch(error => {
                console.log(error);
            });
        });
    }
    async editMember(id = null, data = null) {
        try {
            const level = sessionStorage.getItem('level');
            const axiosOpt = {
                method: 'post',
                url: `${document.baseURI}api/${level}/editmember/${id}`,
                data: data,
                headers: {
                    'Content-type': 'application/json',
                }
            }
            const result = await axios(axiosOpt);
            console.log(result);
            return result.data;
        } catch (error) {
            return error;
        }
    }
}
customElements.define('modal-member-edit', ModalMemberEdit);