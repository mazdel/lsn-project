import axios from 'axios';

import site from '../../../data/site-data';
import kabupaten from '../../../data/kabupaten';
import prePost from '../../../helper/api-helper';

/* import component */
import './modal-member';

class UserList extends HTMLElement {
    constructor() {
        super();

    }
    connectedCallback() {
        this.id = $(this).attr("id") || "user-list";
        this.class = $(this).attr("class") || "";
        $(this).attr("class", this.class);
        this.dataCount = 50;
        this.currentPage = 1;


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
        this.innerHTML = ( /*html*/ `
        <div class="green lighten-5">
            <div class="row d block">
                <div class="col s12 m12 l12">
                    <div class="card">
                        <div class="card-content black-text">
                            <span class="card-title">Daftar Anggota LSN</span>
                            <table class="responsive-table striped">
                                <thead>
                                    <tr>
                                        <th>No.</th>
                                        <th>Nama</th>
                                        <th>NIK</th>
                                        <th>Domisili</th>
                                        <th class="center">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody id="user-table-data">
                                    
                                </tbody>
                            </table>
                        </div>
                        <div class="card-action">
                            <div class="row">
                                <div class="col s4 m4 left-align">
                                    <button id="firstPage" class="btn-pagination btn white-text btn-flat green darken-1 btn-small waves-effect waves-light"> 
                                    <i class="material-icons">first_page</i>
                                </button>
                                    <button data-page="1" id="prevPage" class="btn-pagination btn white-text btn-flat green darken-1 btn-small waves-effect waves-light"> 
                                        <i class="material-icons">chevron_left</i>
                                    </button>
                                </div>
                                <div  id="pagination" class="col s4 m4">
                                    <div class="progress" id="pageLoading">
                                        <div class="indeterminate green darken-3"></div>
                                    </div>
                                </div>
                                <div class="col s4 m4 right-align">
                                    <button data-page="2" id="nextPage" class="btn-pagination btn white-text btn-flat green darken-1 btn-small waves-effect waves-light"> 
                                        <i class="material-icons">chevron_right</i>
                                    </button>
                                    <button id="lastPage" class="btn-pagination btn white-text btn-flat green darken-1 btn-small waves-effect waves-light"> 
                                        <i class="material-icons">last_page</i>
                                    </button>
                                </div>
                            <div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!--action button-->
        <div class="fixed-action-btn">
            <a class="btn-floating btn-large red">
                <i class="large material-icons">menu</i>
            </a>
            <ul>
                <li>
                    <button data-target="modalAdd" class="btn-floating blue tooltipped modal-trigger btn" data-position="left" data-tooltip="Tambah Anggota">
                        <i class="material-icons">person_add</i>
                    </button>
                    
                </li>
                <!-- <li><a class="btn-floating yellow darken-1"><i class="material-icons">format_quote</i></a></li>-->
                <li><a class="btn-floating green tooltipped" data-position="left" data-tooltip="Download seluruh data anggota (coming soon)">
                    <i class="material-icons">file_download</i>
                </a></li>
                
            </ul>
        </div>
        <!-- Modal -->
        <div id="modals">
        </div>
        <div id="modal-primary">
            <div id="modalAdd" class="modal black-text">
                <div class="modal-content">
                    <h4>Tambah Anggota</h4>
                    <form class="" id="addMember">
                    <div class="row">
                        <div class="input-field col s12">
                            <i class="prefix fas fa-id-card"></i>
                            <input aria-required="true" required class="validate" name="nik" id="nik" type="text" pattern="[0-9]{16}">
                            <label for="nik" data-error="wrong" data-success="right">Nomor Induk Kependudukan*</label>
                            <span class="helper-text">Helper text</span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="input-field col s12">
                            <i class="material-icons prefix">person_outline</i>
                            <input aria-required="true" required class="validate" name="nama" id="nama" type="text">
                            <label for="nama" data-error="wrong" data-success="right">Nama Lengkap*</label>
                            <span class="helper-text">Helper text</span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="input-field col s12">
                            <i class="fas fa-birthday-cake prefix"></i>
                            <input placeholder="Jakarta, 17-08-1945" aria-required="true" required class="validate" name="tempat_tgl_lahir" id="tempat_tgl_lahir" type="text">
                            <label for="tempat_tgl_lahir">Tempat, Tanggal Lahir*</label>
                            <span class="helper-text">Helper text</span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="input-field col s12">
                            <div class="input-radio-inline">
                                <i class="fas fa-venus-mars"></i>
                                <label for="gender-pria">
                                    <input aria-required="true" value="L" checked class="validate" name="gender" id="gender-pria" type="radio"><span>Pria</span>
                                </label>
                                <label for="gender-wanita">
                                    <input aria-required="true" value="P" class="validate" name="gender" id="gender-wanita" type="radio"><span>Wanita</span>
                                </label>
                            </div>
                            <span class="helper-text">Helper text</span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="input-field col s12">
                            <i class="material-icons prefix">smartphone</i>
                            <input aria-required="true" required class="validate" name="telp" id="telp" type="tel" pattern="[0-9]{11,13}" title="Nomor HP yang Valid">
                            <label for="telp" data-error="wrong" data-success="right">No.HP* (0856xxxxx)</label>
                            <span class="helper-text">Helper text</span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="input-field col s12">
                            <i class="material-icons prefix">lock_outline</i>
                            <input aria-required="true" id="password" name="password" type="password">
                            <label for="password">Kata Sandi</label>
                            <span class="helper-text">Helper text</span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="input-field col s12">
                            <i class="material-icons prefix">lock_outline</i>
                            <input aria-required="true" id="passwordConf" name="passwordConf" type="password">
                            <label for="password">Ulangi Kata Sandi</label>
                            <span class="helper-text">Helper text</span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="input-field col s12" id="_kabupaten">
                            <i class="material-icons prefix">location_on</i>
                            <select aria-required="true" aria-required="true" required name="domisili_kab" id="domisili_kab" >
                                
                            </select>
                            <label for="domisili_kab">Pilih Kabupaten Domisili</label>
                            <span class="helper-text">Helper text</span>
                        </div>
                    </div>
                        <div class="row">
                            <div class="input-field col s12" id="_kecamatan">
                                
                            </div>
                        </div>
                        <div class="progress" id="addMemberLoading">
                            <div class="indeterminate green darken-3"></div>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <a class="modal-close waves-effect waves-green btn-flat">Tutup</a>
                    <button type="submit" id="submit" form="addMember" class="waves-effect waves-green btn-flat">Tambahkan</button>
                </div>
            </div>
        </div>
        `);
        const count = this.dataCount;
        /**generate table data */
        this.tableData({
            page: 1,
            count: count
        });
        /*fungsi untuk pagination */
        $('.btn-pagination').off();
        $('.btn-pagination').on('click', (event) => {
            event.stopPropagation();
            const page = $(event.currentTarget).data('page');
            $(`#pageLoading`).show();
            this.tableData({
                page: page,
                count: count
            });
        });

        $(() => {
            $('.fixed-action-btn').floatingActionButton({
                hoverEnabled: false
            });
            $('.tooltipped').tooltip();
            $('#modalAdd').modal();
            $('#addMemberLoading').hide();
            $('.helper-text').hide();
        });

        /*submit add member */
        $('form#addMember').off();
        $('form#addMember').on('submit', async(event) => {
            event.preventDefault();
            event.stopPropagation();
            const data = prePost($('form#addMember').serializeArray());

            $('span.helper-text').hide();
            $('#addMemberLoading').show();

            this.addMember(data).then((data) => {
                $('#addMemberLoading').hide();
                if (data.status == true) {
                    $(`#pageLoading`).show();
                    this.tableData();
                    $('#modalAdd').modal('close');
                    M.toast({ html: 'Penambahan anggota sukses' });
                } else {
                    console.log(data);
                    for (const key in data.response) {
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
                console.log(error);
            });
        });
        /*./add member */

        //menampilkan kecamatan setiap ganti kabupaten
        const showKecamatan = (id = 3509) => {
            kabupaten().then(items => {
                let selections = `
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
                selections += `
                    </select>
                    <label for="domisili_Kec">Pilih Kecamatan</label>
                    `;
                $('div#_kecamatan').html(selections);
                $('select').formSelect();
            });
        }
        kabupaten().then(items => {
            let selections = `<option value="" disabled selected>Pilih Kabupaten</option>`;
            items.forEach((item) => {
                selections += `<option value="${item.id}">${item.nama}</option>`
            })
            $('select#domisili_kab').html(selections);
            $('select').formSelect();

            $('select#domisili_kab').off();
            $('select#domisili_kab').on(`change`, (event) => {
                event.stopPropagation();
                //solving bug that has been discussed here
                //https://github.com/Dogfalo/materialize/issues/6123
                const selectedIndex = M.FormSelect.getInstance($('select#domisili_kab')).el.selectedIndex;
                const selectedVal = $('select#domisili_kab').children().eq(selectedIndex).val();
                showKecamatan(selectedVal);
            })
        });
    }

    //still need to be improved, to maintain low RAM
    async tableData(paging = { page: this.currentPage, count: this.dataCount }) {
        /**get table data */
        const level = sessionStorage.getItem('level');
        const axiosOpt = {
            method: 'post',
            url: `${document.baseURI}api/${level}/getmember`,
            data: {
                page: paging.page,
                count: paging.count
            },
            headers: {
                'Content-type': 'application/json',
            }
        }

        axios(axiosOpt).then(response => {
                const data = response.data;
                const paging = response.data.paging;
                const page = {
                    first: 1,
                    prev: (paging.page < 2 ? 2 : paging.page) - 1,
                    next: (paging.page >= paging.pages ? paging.pages - 1 : paging.page) + 1,
                    last: paging.pages,
                    now: paging.page
                }
                this.currentPage = page.now;
                if (this.currentPage == page.first) {

                    $(`button#prevPage`).addClass('disabled');
                    $(`button#firstPage`).addClass('disabled');
                }
                if (this.currentPage == page.last) {

                    $(`button#nextPage`).addClass('disabled');
                    $(`button#lastPage`).addClass('disabled');
                }
                if (this.currentPage != page.last || this.currentPage != page.first) {
                    $(`button#prevPage`).removeClass('disabled');
                    $(`button#firstPage`).removeClass('disabled');
                    $(`button#nextPage`).removeClass('disabled');
                    $(`button#lastPage`).removeClass('disabled');
                }

                $('tbody#user-table-data').empty();
                $('div#modals').empty();
                let rowNum = ((page.now - 1) * paging.dataCount);
                data.response.forEach(async(data, key) => {
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
                    data.no_kta = data.no_kta || data.domisili_kec_id + data.id;
                    rowNum++;
                    const tableRow = /*html */ `
                    <tr>
                        <td>${rowNum}</td>
                        <td>${data.nama||data.username}</td>
                        <td>${data.nik}</td>
                        <td>${data.domisili_kab}</td>
                        <td>
                            <div class="white-text center">
                                <button data-target="viewUser${data.id}" class=" modal-trigger btn waves-effect btn-flat waves-light blue btn-small">
                                <i class="material-icons">visibility</i>
                                </button> 
                                <button data-target="editUser${data.id}" class="modal-trigger btn waves-effect btn-flat waves-light green btn-small">
                                    <i class="material-icons">edit</i>
                                </button>
                                <button data-target="delUser${data.id}" class="modal-trigger btn modal-trigger waves-effect btn-flat waves-light red btn-small">
                                    <i class="material-icons">delete</i>
                                </button>
                            </div>
                        </td>
                    </tr>`;
                    const modalUser = $( /*html*/ `<modal-member></modal-member>`)[0];
                    modalUser.data = data;
                    $('tbody#user-table-data').append(tableRow);
                    $('div#modals').append(modalUser);
                    $(`.modal`).modal();
                });
                $(`button#prevPage`).data('page', page.prev);
                $(`button#nextPage`).data('page', page.next);
                $(`#pageLoading`).hide();
            })
            .catch(error => {
                console.log(error);
            })

    }
    async addMember(data = null) {
        try {
            const level = sessionStorage.getItem('level');
            const axiosOpt = {
                method: 'post',
                url: `${document.baseURI}api/${level}/addmember`,
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
}
customElements.define('user-list', UserList);