//import library
import axios from 'axios';

//import data wilayah
import kabupaten from '../../data/kabupaten';

//import helper
import prePost from '../../helper/api-helper';

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
                        <form id="signup" class="signup-form" >
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
                                    <select required name="domisili_kab" id="domisili_kab" >
                                        
                                    </select>
                                    <label for="domisili_kab">Pilih Kabupaten Domisili</label>
                                </div>
                            </div>
                            <div class="row">
                                <div class="input-field col s12" id="_kecamatan">
                                    
                                </div>
                            </div>
                            <div class="row">
                                <div class="input-field col s12">
                                    <button type="submit" form="signup" id="btn-login" class="btn green darken-1 waves-effect waves-light col s12">Daftar</button>
                                </div>
                                <div class="progress" id="loading">
                                <div class="indeterminate green darken-3"></div>
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
                    <select required name="domisili_kec" id="domisili_kec" >
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


                $('div#_kecamatan').html(selections);
                $('select').formSelect();
            });
        }

        //show the kabupaten options
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

        //for sending data to API
        $(() => {
            $('#loading').hide();
        })
        $('form#signup').on('submit', (event) => {
            event.preventDefault();
            const btn_signup = event.originalEvent.submitter;
            const data = prePost($('form#signup').serializeArray());
            console.log('data =>', data);

            //show the loading progress
            $('#loading').show();

            //begin submit
            const axiosOpt = {
                method: 'post',
                url: './api/signin',
                data: data,
                headers: {
                    'Content-type': 'application/json',
                }
            }

            axios(axiosOpt).then(response => {
                console.log(response.data);
                if (response.data.status === true) {

                }
                $('#loading').hide();
                $(btn_signup).text('Signed Up');
            })

        })
    }
}
customElements.define('sign-up', SignUp);