import '../form-data-member';
import axios from 'axios';
import kabupaten from '../../../data/kabupaten';
import prePost from '../../../helper/api-helper';

class ProfilSetting extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        this.id = $(this).attr("id") || "template";
        this.class = $(this).attr("class") || "";
        $(this).attr("class", this.class);
        this.getprofile();
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
    async getprofile() {
        /**get session data */
        const axiosOpt = {
            method: 'post',
            url: `${document.baseURI}api/getsession`,
            data: null,
            headers: {
                'Content-type': 'application/json',
            }
        }
        axios(axiosOpt).then(async response => {
                const data = response.data.signedin;
                const kab = await kabupaten();
                kab.forEach(kab => {
                    if (kab.id == data.domisili_kab) {
                        data.domisili_kab_id = data.domisili_kab;
                        data.domisili_kab = kab.nama;

                        kab.kecamatan.forEach(kec => {
                            if (kec.id == data.domisili_kec) {
                                data.domisili_kec_id = data.domisili_kec;
                                data.domisili_kec = kec.nama;
                            }
                        })
                    }
                });

                this.render(data);
            })
            .catch(error => {
                console.log(error);
            })
            /**./get session data */
    }
    render(data) {

        const profileForm = document.createElement(`form-data-member`);
        const formId = `profil`;
        profileForm.form = {
            type: 'edit',
            data: data,
            id: formId,
            withPassword: true,
            kta_field: 'disabled',

        }

        const defaultAvatar = (data.gender == "L") ? "src/img/avatars/avatar1.png" : "src/img/avatars/avatar2.png";
        data.foto_profil = data.foto_profil || defaultAvatar;

        this.innerHTML = /*html*/ `
            <div class="row">
                <div class="col s12 m4 l4">
                    <div class="card white">
                        <div class="card-content white-text">
                            <img class="circle rounded" src="${data.foto_profil}">
                        </div>
                        <div class="card-action right-align">
                            <button data-target="uploadFoto" class="btn modal-trigger waves-effect waves-green btn-flat" type="button">Ganti Foto</button>
                        </div>
                    </div>
                </div>
                <div class="col s12 m8 l8">
                    <div class="card white">
                        <div class="card-content white-text"  id="editprofil">
                            
                        </div>
                        <div class="card-action right-align">
                            <button class="btn waves-effect waves-green btn-flat" type="submit" form="${formId}">Simpan</button>
                        </div>
                    </div>
                </div>
            </div>
            <div id="uploadFoto" class="modal modal-fixed-footer modal-m">
                <div class="modal-content">
                    <div class="container">
                        <h4 class="text-darken-3"></h4>
                        
                        <div class="row">
                            <div class="col s12 m12 l12">
                                <div class="img-cropper">
                                    <img id="previewFoto" class="responsive-img rounded" src="${data.foto_profil}">
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col s12 m12 l12">
                                <form id="formUploadFoto">
                                    <div class="file-field input-field">
                                        <div class="btn">
                                            <span>File</span>
                                            <input id="inputFoto" name="foto_profil" type="file">
                                        </div>
                                        <div class="file-path-wrapper">
                                            <input class="file-path validate" type="text">
                                        </div>
                                    </div>
                                    <div  id="pagination" class="col s4 m4">
                                        <div class="progress" id="uploadingFoto">
                                            <div class="indeterminate green darken-3"></div>
                                        </div>
                                    </div>
                                </form>

                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <a class="modal-close waves-effect waves-green btn-flat">Batal</a>
                    <button type="submit" id="submitFoto" form="formUploadFoto" class="waves-effect waves-green btn-flat">Simpan</button>
                </div>
            </div>
        `;
        $(() => {
            $('.modal').modal();
            $('#uploadingFoto').hide();
        });
        /**preview foto */
        const readURL = (input, output) => {
            if (input.files && input.files[0]) {
                const reader = new FileReader();

                reader.onload = function(e) {
                    $(`${output}`).attr('src', e.target.result);
                }
                reader.readAsDataURL(input.files[0]); // convert to base64 string
            }
        }
        $("#inputFoto").on(`change`, (event) => {
            event.stopPropagation();
            readURL(event.currentTarget, `#previewFoto`);
        });

        $('#editprofil').html(profileForm);
        /**submit upload foto */
        $(`form#formUploadFoto`).on('submit', event => {
            event.preventDefault();
            event.stopPropagation();
            $('#uploadingFoto').show();
            const fileToUpload = event.currentTarget[0].files[0];
            const fieldname = event.currentTarget[0].name;
            const dataFoto = new FormData();
            dataFoto.append(fieldname, fileToUpload);

            this.uploadFotoProfil(dataFoto).then(result => {
                $('#uploadingFoto').hide();
                $('img#fotoProfil').attr('src', result.response.uploaded);
                this.getprofile();
            }).catch(error => {
                $('#uploadingFoto').hide();
                console.log(error.response);
                console.log(error.data);
                console.log(error);
            });
        });
        /*submit editprofil */
        $(`form#${formId}`).on('submit', async(event) => {
            event.preventDefault();
            event.stopPropagation();
            const data = prePost($(`form#${formId}`).serializeArray());

            $('span.helper-text').hide();
            $(`#addMemberLoading-${formId}`).show();

            this.editProfil(data).then((data) => {
                $(`#addMemberLoading-${formId}`).hide();
                if (data.status == true) {
                    M.toast({ html: 'Perubahan Profil Sukses' });
                    //this.getprofile();
                } else {
                    for (const key in data.response) {
                        //console.log(data);
                        if (data.response.hasOwnProperty(key)) {
                            const message = data.response[key];
                            const msgElement = $(`input#${key}`).siblings('span');
                            msgElement.text(`${message}`);
                            msgElement.show();
                            if (message) {
                                M.toast({ html: `${message}` });
                            }
                        }
                    }
                }
            }).catch(error => {
                console.log(error.response);
                console.log(error.data);
                console.log(error);
            });
        });
        /*./edit profil */
    }
    async editProfil(data = null) {
        try {
            const level = sessionStorage.getItem('level');
            const axiosOpt = {
                method: 'post',
                url: `${document.baseURI}api/${level}/editprofil/`,
                data: data,
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
    async uploadFotoProfil(data = null) {
        try {
            const level = sessionStorage.getItem('level');
            const axiosOpt = {
                method: 'post',
                url: `${document.baseURI}api/${level}/fotoprofil/`,
                data: data,
                headers: {
                    'Content-type': 'multipart/form-data',
                }
            }

            const result = await axios(axiosOpt);

            return result.data;
        } catch (error) {
            console.log(error.response, error.data, error);
        }
    }
}
customElements.define('profil-setting', ProfilSetting);