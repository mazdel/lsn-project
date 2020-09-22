import 'select2';
import 'select2/dist/css/select2.css';
import '../../../style/materialize-select2.css';
import kabupaten from '../../data/kabupaten';

class SignUp extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        this.id = $(this).attr("id") || "sign-in";
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
    set site(data) {
        this._site = data;
        //this.render();
    }
    render() {

        $(this).html( /*html*/ `
        <div class="container">
            <div class="col s12 m6">
                <div class="card">
                    <div class="card-image">
                        <img src="./src/img/lsn-banner.jpg">
                        
                    </div>
                    <div class="card-content">
                        <form class="login-form" >
                            <div class="row">
                                <div class="form-title">
                                    <h5>Selamat Datang di ${this._site.name}</h5>
                                    <p>
                                        Silahkan isi formulir berikut untuk pendaftaran akun anda
                                    </p>
                                </div>
                            </div>
                            <div class="row">
                                <div class="input-field col s12">
                                    <i class="material-icons prefix">card_membership</i>
                                    <input required class="validate" name="nik" id="nik" type="text" pattern="[0-9]{16}">
                                    <label for="nik" data-error="wrong" data-success="right">Nomor Induk Kependudukan*</label>
                                </div>
                            </div>
                            <div class="row">
                                <div class="input-field col s12">
                                    <i class="material-icons prefix">person_outline</i>
                                    <input required class="validate" name="nama" id="nama" type="text">
                                    <label for="nik" data-error="wrong" data-success="right">Nama Lengkap*</label>
                                </div>
                            </div>
                            <div class="row">
                                <div class="input-field col s12">
                                    <i class="material-icons prefix">smartphone</i>
                                    <input required class="validate" name="telp" id="telp" type="tel" pattern="[0-9]{11,13}" title="Nomor HP yang Valid">
                                    <label for="telp" data-error="wrong" data-success="right">No.HP* (0856xxxxx)</label>
                                </div>
                            </div>
                            <div class="row">
                                <div class="input-field col s12">
                                    <i class="material-icons prefix">lock_outline</i>
                                    <input required id="password" name="password" type="password">
                                    <label for="password">Kata Sandi*</label>
                                </div>
                            </div>
                            <div class="row">
                                <div class="input-field col s12">
                                    <i class="material-icons prefix">lock_outline</i>
                                    <input required id="passwordConf" name="passwordConf" type="password">
                                    <label for="password">Ulangi Kata Sandi*</label>
                                </div>
                            </div>
                            <div class="row">
                                <div class="input-field col s12" id="_kabupaten">
                                    <i class="material-icons prefix">location_on</i>
                                    <select name="domisili_kab" id="domisili_kab" >
                                        
                                    </select>
                                    <label for="domisili_kab">Pilih Kab. Domisili</label>
                                </div>
                            </div>
                            <div class="row">
                                <div class="input-field col s12" id="_kecamatan">
                                    
                                </div>
                            </div>
                            <div class="row">
                                <div class="input-field col s12">
                                    <a href="./dashboard.html" id="btn-login" class="btn green darken-1 waves-effect waves-light col s12 spage-action">Daftar</a>
                                </div>
                            </div>
                            <div class="row">
                                <div class="input-field col s6 m6 l6">
                                    <p class="margin medium-small"><a class="green-text spage-action" href="#signin">Sudah punya akun?</a></p>
                                </div>         
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        `);
        //untuk menampilkan kecamatan setiap ganti kabupaten
        const showKecamatan = (id = 3509) => {
            kabupaten().then(items => {
                let selections = /*html*/ `
                    <i class="material-icons prefix">location_on</i>
                    <select name="domisili_kec" id="domisili_kec" >
                        <option value="" disabled selected>Pilih Kecamatan</option>
                `;
                items.forEach((item) => {
                    if (item.id == id) {
                        item.kecamatan.forEach(kecamatan => {
                            selections += `<option value="${kecamatan.id}">${kecamatan.nama}</option>`
                        })
                    }
                });
                selections += /*html*/ `
                    </select>
                    <label for="domisili_Kec">Pilih Kecamatan</label>`;

                //console.log(selections);
                $('div#_kecamatan').html(selections);
                //$('select').select2({width: "70%"});
                $('select').formSelect();
            });
        }
        kabupaten().then(items => {
            let selections = /*html*/ `<option value="" disabled selected>Pilih Kabupaten</option>`;
            items.forEach((item) => {
                selections += /*html*/ `<option value="${item.id}">${item.nama}</option>`
                    //console.log(item);
            })
            $('select#domisili_kab').html(selections);

            $('select').formSelect();
            $('select#domisili_kab').on(`change`, (event) => {

                //solving bug that has been discussed here
                //https://github.com/Dogfalo/materialize/issues/6123
                const selectedIndex = M.FormSelect.getInstance($('select#domisili_kab')).el.selectedIndex;
                const selectedVal = $('select#domisili_kab').children().eq(selectedIndex).val();
                showKecamatan(selectedVal);
            })
        });
    }
}
customElements.define('sign-up', SignUp);