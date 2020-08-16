import site from '../../../data/site-data';
import kabupaten from '../../../data/kabupaten';

class UserList extends HTMLElement{
    constructor(){
        super();
    }
    connectedCallback(){
        this.id = $(this).attr("id")||"user-list";
        this.class = $(this).attr("class")||"";
        $(this).attr("class",this.class);
        
        this.render();
    }
    disconnectedCallback(){
        
    }
    adoptedCallback(){

    }
    attributeChangedCallback(name,oldValue,newValue){

    }
    static get observedAttributes(){
        return ['src','id','name','class'];
    }
    set site(data){
        this._site=data;
        //this.render();
    }
    render(){
        let user_list ='',user_modal='';
        site.dummy.user.forEach((user,key)=>{
            user_list+=/*html*/`
            <tr>
                <td>${key+1}</td>
                <td>${user.fullname}</td>
                <td>${user.domisili_kab}</td>
                <td>
                    <div class="white-text center">
                        <a href="#viewUser${user.id}" class="modal-trigger waves-effect btn-flat waves-light blue btn-small">
                        <i class="material-icons">visibility</i>
                        </a>
                        <a href="#editUser${user.id}" class="modal-trigger waves-effect btn-flat waves-light green btn-small">
                            <i class="material-icons">edit</i>
                        </a>
                        <a href="#delUser${user.id}" class="modal-trigger waves-effect btn-flat waves-light red btn-small">
                            <i class="material-icons">delete</i>
                        </a>
                    </div>
                </td>
            </tr>
            `;
            user_modal+=/*html*/`
            <div id="viewUser${user.id}" class="modal modal-fixed-footer">
                <div class="modal-content">
                    <h4>Lihat detail anggota ${user.fullname}</h4>
                    
                </div>
                <div class="modal-footer">
                    <a class="modal-close waves-effect waves-green btn-flat">Tutup</a>
                </div>
            </div>
            <div id="editUser${user.id}" class="modal modal-fixed-footer">
                <div class="modal-content">
                    <h4>Edit data anggota ${user.fullname}</h4>
                    
                </div>
                <div class="modal-footer">
                    <a class="modal-close waves-effect waves-green btn-flat">Batal</a>
                    <a id="submitEdit" data-identity="${user.id}" class="modal-close waves-effect waves-green btn-flat">Submit</a>
                </div>
            </div>
            <div id="delUser${user.id}" class="modal modal-fixed-footer">
                <div class="modal-content">
                    <h4>Anda yakin menghapus anggota ${user.fullname}?</h4>
                    
                </div>
                <div class="modal-footer">
                    <a class="modal-close waves-effect waves-green btn-flat">Tidak</a>
                    <a class="modal-close waves-effect waves-green btn-flat">Ya, saya yakin</a>
                </div>
            </div>
            `
        })
        $(this).html(/*html*/`
        <div class="green lighten-5">
            <div class="row d block">
                <div class="col s12 m12 l12">
                    <div class="card">
                        <div class="card-content black-text">
                            <span class="card-title">Daftar Anggota LSN</span>
                            <table class="responsive-table">
                                <thead>
                                    <tr>
                                        <th>No.</th>
                                        <th>Nama</th>
                                        <th>Domisili</th>
                                        <th class="center">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${user_list}
                                </tbody>
                            </table>
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
                <li><a class="btn-floating blue tooltipped modal-trigger" href="#modal1" data-position="left" data-tooltip="Tambah Anggota">
                    <i class="material-icons">person_add</i>
                </a></li>
                <!-- <li><a class="btn-floating yellow darken-1"><i class="material-icons">format_quote</i></a></li>-->
                <li><a class="btn-floating green tooltipped" data-position="left" data-tooltip="Download seluruh data anggota (coming soon)">
                    <i class="material-icons">file_download</i>
                </a></li>
                
            </ul>
        </div>
        <!-- Modal -->
        <div id="modal1" class="modal modal-fixed-footer">
            <div class="modal-content">
                <h4>Tambah Anggota</h4>
                <form class="login-form" >
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
                            <label for="domisili_kab">Domisili</label>
                        </div>
                    </div>
                    <div class="row">
                        <div class="input-field col s12" id="_kecamatan">
                            
                        </div>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <a class="modal-close waves-effect waves-green btn-flat">Tutup</a>
                <a  id="submit" class="modal-close waves-effect waves-green btn-flat">Submit</a>
            </div>
        </div>
        ${user_modal}
        `);
        $(document).ready(function(){
            $('.fixed-action-btn').floatingActionButton({
                hoverEnabled:false
            });
            $('.tooltipped').tooltip();
            $('.modal').modal();
            
        });
        $('#submit').click(()=>{
            M.toast({html: 'Penambahan anggota sukses'});
        });
        //untuk menampilkan kecamatan setiap ganti kabupaten
        const showKecamatan = (id=3509)=>{
            kabupaten().then(items=>{
                let selections = `
                    <i class="material-icons prefix">location_on</i>
                    <select name="domisili_kec" id="domisili_kec" >
                        <option value="" disabled selected>Pilih Kecamatan</option>
                `;
                items.forEach((item)=>{
                    if(item.id==id){
                        item.kecamatan.forEach(kecamatan=>{
                            selections+=`<option value="${kecamatan.id}">${kecamatan.nama}</option>`
                        })
                    }
                });
                selections+=`
                    </select>
                    <label for="domisili_Kec">Pilih Kecamatan</label>`;

                //console.log(selections);
                $('div#_kecamatan').html(selections);
                //$('select').select2({width: "70%"});
                $('select').formSelect();
            });
        }
        kabupaten().then(items=>{
            let selections = `<option value="" disabled selected>Pilih Kabupaten</option>`;
            items.forEach((item)=>{
                selections+=`<option value="${item.id}">${item.nama}</option>`
                //console.log(item);
            })
            $('select#domisili_kab').html(selections);
            //$('select').select2({width: "70%"});
            $('select').formSelect();
            $('select#domisili_kab').on(`change`,(event)=>{
                
                //solving bug that has been discussed here
                //https://github.com/Dogfalo/materialize/issues/6123
                const selectedIndex = M.FormSelect.getInstance($('select#domisili_kab')).el.selectedIndex;
                const selectedVal = $('select#domisili_kab').children().eq(selectedIndex).val();
                showKecamatan(selectedVal);
            })
        });
    }
}
customElements.define('user-list',UserList);