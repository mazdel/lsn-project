import moment from 'moment';

class ModalMemberView extends HTMLElement {
    constructor() {
        super();
        moment.locale('id');
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
        const defaultAvatar = (data.gender == 'L') ? 'src/img/avatars/avatar1.png' : 'src/img/avatars/avatar2.png'
        const fotoProfil = data.foto_profil || defaultAvatar;
        $(this).html( /* html */ `
            <div id="viewUser${data.id}" class="modal modal-fixed-footer">
                <div class="modal-content">
                    <div class="container">
                        <h4 class="text-darken-3">Lihat detail anggota "${data.nama||data.username}"</h4>
                        <hr>
                        <div class="row modal-member-view">
                            <div class="col s12 m4 l4">
                                <div class="container green darken-4">
                                    <!--
                                    <div class="col s12">
                                        <img class="responsive-img rounded" src="src/img/logo/icon.png">
                                    </div>
                                    <div class="col s12 black-text center-align">
                                        <h6>Laskar Sholawat Nusantara</h6>
                                    </div>
                                    -->
                                    <div class="col s12">
                                        <img class="responsive-img rounded" src="${fotoProfil}">
                                    </div>
                                    
                                </div>
                            </div>
                            <div class="col s12 m8 l8">
                                <div class="container">
                                    <div class="row">
                                        ${data.nama}
                                    </div>
                                    <div class="row">
                                        ${data.nik}
                                    </div>
                                    <div class="row">
                                        ${(data.gender=='L')?'Pria':'Wanita'}
                                    </div>
                                    <div class="row">
                                        ${data.telp}
                                    </div>
                                    <div class="row">
                                        ${data.domisili_kec}, ${data.domisili_kab}
                                    </div>
                                    <div class="row">
                                        Terdaftar Sejak ${moment(data.tgl_gabung,'YYYY-MM-DD HH:mm:ss').format('DD MMMM YYYY')}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <a class="modal-close waves-effect waves-green btn-flat">Tutup</a>
                </div>
            </div>
        `);
    }
}
customElements.define('modal-member-view', ModalMemberView);