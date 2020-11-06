import kabupaten from '../../data/kabupaten';

class FormDataMember extends HTMLElement {
    constructor() {
        super();

    }
    connectedCallback() {
        this.id = $(this).attr("id") || "";
        this.class = $(this).attr("class") || "";
        this.formId = $(this).data('formId') || "";
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

    set form(
        form = {
            type: "add",
            data,
            id: this.formId,
            withPassword: false,
            customHeader: null,
            kta_field: null,
            nik_field: 'disabled',
            level_field: 'disabled',
            class: null
        }) {
        this._form = form;
    }
    render() {
        const form = this._form;
        let data = {},
            passwordField = ``,
            kta_field = "",
            level_field = "";
        if (form.kta_field) {
            let ktaDisabled;
            if (form.kta_field == 'disabled') {
                ktaDisabled = 'disabled';
            }
            kta_field = /*html */ `
            <div class="row">
                <div class="input-field col s12">
                    <i class="prefix fas fa-id-card"></i>
                    <input ${ktaDisabled||""} class="validate" name="no_kta" id="no_kta-${form.id}" type="text" value="${form.data.no_kta|| (form.data.domisili_kec_id || "") + form.data.id}">
                    
                    <label for="no_kta-${form.id}">Nomor Kartu Anggota</label>
                    <span class="helper-text">Helper text</span>
                </div>
            </div>
        `;
        }

        if (form.level_field == 'enabled') {
            let level = "";
            if (form.data) {
                level = form.data.level || "";
            }
            level_field = /*html */ `
            <div class="row">
                <div class="input-field col s12">
                    <i class="prefix fas fa-users-cog"></i>
                    <select aria-required="true" aria-required="true" required name="level" id="level-${form.id}" >
                        
                        <option value="anggota" ${level=="anggota"?'selected':''}>Anggota</option>
                        <option value="admin" ${level=="admin"?'selected':''}>Admin</option>
                    </select>
                    <label for="level-${form.id}">Pilih level user</label>
                    <span class="helper-text">Helper text</span>
                </div>
            </div>
        `;
        }
        if (form.type == "edit") {
            data = form.data;

            if (form.withPassword) {
                passwordField = /*html */ `
                    <div class="row">
                        <div class="input-field col s12">
                            <i class="material-icons prefix">lock_outline</i>
                            <input placeholder="[abaikan jika tidak ingin mengubah kata sandi]" aria-required="true" id="password-${form.id}" name="password" type="password">
                            <label for="password-${form.id}">Kata Sandi</label>
                            <span class="helper-text">Helper text</span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="input-field col s12">
                            <i class="material-icons prefix">lock_outline</i>
                            <input placeholder="[abaikan jika tidak ingin mengubah kata sandi]" aria-required="true" id="passwordConf-${form.id}" name="passwordConf" type="password">
                            <label for="password-${form.id}">Ulangi Kata Sandi</label>
                            <span class="helper-text">Helper text</span>
                        </div>
                    </div>
                `;

            } else {
                passwordField = /*html*/ `
                <div class="row">
                    <div class="input-field col s12">
                        <div class="input-radio-inline">
                            <i class="material-icons prefix">lock_outline</i>
                            <label for="reset-pass-yes-${form.id}">
                                <input aria-required="true" value="Y" class="validate" name="resetpass" id="reset-pass-yes-${form.id}" type="radio"><span>Ya, reset password</span>
                            </label>
                            <label for="reset-pass-no-${form.id}">
                                <input aria-required="true" value="N" checked class="validate" name="resetpass" id="reset-pass-no-${form.id}" type="radio"><span>Tidak, biarkan saja</span>
                            </label>
                        </div>
                    </div>
                </div>
            `;
            }
        } else {
            passwordField = /*html */ `
                <div class="row">
                    <div class="input-field col s12">
                        <i class="material-icons prefix">lock_outline</i>
                        <input aria-required="true" id="password-${form.id}" name="password" type="password">
                        <label for="password-${form.id}">Kata Sandi</label>
                        <span class="helper-text">Helper text</span>
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s12">
                        <i class="material-icons prefix">lock_outline</i>
                        <input aria-required="true" id="passwordConf-${form.id}" name="passwordConf" type="password">
                        <label for="password-${form.id}">Ulangi Kata Sandi</label>
                        <span class="helper-text">Helper text</span>
                    </div>
                </div>
            `;
        }
        this.innerHTML = /*html */ `
            <form class="${form.class||""}" id="${form.id}">
                
                ${form.customHeader||""}
                ${kta_field}
                <div class="row">
                    <div class="input-field col s12">
                        <i class="prefix fas fa-id-card"></i>
                        <input aria-required="true" required class="validate" ${form.nik_field||""} name="nik" id="nik-${form.id}" type="text" pattern="[0-9]{16}" value="${data.nik||""}">
                        <label for="nik-${form.id}" data-error="wrong" data-success="right">Nomor Induk Kependudukan*</label>
                        <span class="helper-text">Helper text</span>
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s12">
                        <i class="material-icons prefix">person_outline</i>
                        <input value="${data.nama||""}" aria-required="true" required class="validate" name="nama" id="nama-${form.id}" type="text">
                        <label for="nama-${form.id}" data-error="wrong" data-success="right">Nama Lengkap*</label>
                        <span class="helper-text">Helper text</span>
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s12">
                        <i class="fas fa-birthday-cake prefix"></i>
                        <input placeholder="Jakarta, 17-08-1945" value="${data.tempat_tgl_lahir||""}" aria-required="true" required class="validate" name="tempat_tgl_lahir" id="tempat_tgl_lahir-${form.id}" type="text">
                        <label for="tempat_tgl_lahir-${form.id}">Tempat, Tanggal Lahir*</label>
                        <span class="helper-text">Helper text</span>
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s12">
                        <div class="input-radio-inline">
                            <i class="fas fa-venus-mars"></i>
                            <label for="gender-pria-${form.id}">
                                <input aria-required="true" value="L" ${(data.gender=='L')?'checked':''} class="validate" name="gender" id="gender-pria-${form.id}" type="radio"><span>Pria</span>
                            </label>
                            <label for="gender-wanita-${form.id}">
                                <input aria-required="true" value="P" ${(data.gender=='P')?'checked':''} class="validate" name="gender" id="gender-wanita-${form.id}" type="radio"><span>Wanita</span>
                            </label>
                        </div>
                        <span class="helper-text">Helper text</span>
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s12">
                        <i class="material-icons prefix">smartphone</i>
                        <input placeholder="081234567890" value="${data.telp||""}" aria-required="true" required class="validate" name="telp" id="telp-${form.id}" type="tel" pattern="[0-9]{11,13}" title="Nomor HP yang Valid">
                        <label for="telp-${form.id}" data-error="wrong" data-success="right">No.HP*</label>
                        <span class="helper-text">Helper text</span>
                    </div>
                </div>
                ${passwordField}
                <div class="row">
                    <div class="input-field col s12">
                        <i class="material-icons prefix">location_on</i>
                        <textarea placeholder="Jl. Kenangan, No.26" class="materialize-textarea" name="alamat" id="alamat-${form.id}" type="text">${data.alamat||""}</textarea>
                        <label for="alamat-${form.id}">Alamat</label>
                        <span class="helper-text">Helper text</span>
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s12" id="_kabupaten-${form.id}">
                        <i class="material-icons prefix">location_on</i>
                        <select aria-required="true" aria-required="true" required name="domisili_kab" id="domisili_kab-${form.id}" >
                            
                        </select>
                        <label for="domisili_kab-${form.id}">Pilih Kabupaten Domisili</label>
                        <span class="helper-text">Helper text</span>
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s12" id="_kecamatan-${form.id}">
                        
                    </div>
                </div>
                ${level_field}
                <div class="progress" id="addMemberLoading-${form.id}">
                    <div class="indeterminate green darken-3"></div>
                </div>
                
                </form>
        `;

        $(`#addMemberLoading-${form.id}`).hide();
        $('.helper-text').hide();
        M.updateTextFields();
        //menampilkan kecamatan setiap ganti kabupaten
        //buggy here

        const showKecamatan = (id = 3509) => {
            kabupaten().then(items => {
                let selections = /*html */ `
                    <i class="material-icons prefix">location_on</i>
                    <select name="domisili_kec" id="domisili_kec-${form.id}" >
                        <option value="" disabled ${data.domisili_kec_id?'':'selected'}>Pilih Kecamatan</option>
                `;
                items.forEach((item) => {
                    if (item.id == id) {
                        item.kecamatan.forEach(kecamatan => {
                            selections += `<option value="${kecamatan.id}" ${(kecamatan.id==data.domisili_kec_id)?'selected':''}>${kecamatan.nama}</option>`
                        })
                    }
                });
                selections += `
                    </select>
                    <label for="domisili_kec-${form.id}">Pilih Kecamatan</label>
                    `;
                $(`div#_kecamatan-${form.id}`).html(selections);
                $('select').formSelect();
            });
        }
        kabupaten().then(items => {
            let selections = `<option value="" disabled ${data.domisili_kab_id?'':'selected'}>Pilih Kabupaten</option>`;
            items.forEach((item) => {
                selections += `<option value="${item.id}" ${(item.id==data.domisili_kab_id)?'selected':''}>${item.nama}</option>`
            })
            $(`select#domisili_kab-${form.id}`).html(selections);
            $('select').formSelect();

            $(`select#domisili_kab-${form.id}`).on(`change`, (event) => {
                event.stopPropagation();
                const selectedIndex = M.FormSelect.getInstance($(`select#domisili_kab-${form.id}`)).el.selectedIndex;
                const selectedVal = $(`select#domisili_kab-${form.id}`).children().eq(selectedIndex).val();
                showKecamatan(selectedVal);
            })
            if (data.domisili_kab_id) {
                showKecamatan(data.domisili_kab_id);
            }
        });


    }
}
customElements.define('form-data-member', FormDataMember);