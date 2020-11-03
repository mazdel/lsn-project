import '../form-data-member';
import axios from 'axios';
import kabupaten from '../../../data/kabupaten';
import printJS from 'print-js';
import QRCode from 'qrcode';

class KartuTandaAnggota extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        this.id = $(this).attr("id") || "";
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
                data.no_kta = data.no_kta || data.domisili_kec_id + data.id;
                this.render(data);
            })
            .catch(error => {
                console.log(error);
            })
            /**./get session data */
    }
    render(data) {
        const defaultAvatar = (data.gender == "L") ? "src/img/avatars/avatar1.png" : "src/img/avatars/avatar2.png";
        data.foto_profil = data.foto_profil || defaultAvatar;

        this.innerHTML = /*html*/ `
            <div class="row">
                <div class="col s12 m12 l12">
                    <div class="card white">
                        <div class="card-content black-text" id="kta">
                            <div class="row valign-wrapper green white-text rounded" id="headerKTA">
                                <div class="col s4 m4 l4 center">
                                    <img class="circle logo" src="src/img/logo/icon.png">
                                </div>
                                <div class="col s8 m8 l8">
                                    <h4>KARTU TANDA ANGGOTA</h4>
                                    <h5>LASKAR SHOLAWAT NUSANTARA</h5>
                                </div>
                            </div>
                            
                            <div id="dataDiri" class="row valign-wrapper">
                                <div class="col s12 m4 l4">
                                    <img class="circle profil" src="${data.foto_profil}">
                                </div>
                                <div class="col s12 m8 l8">
                                    <p class="bold">No.KTA : ${data.no_kta}</p>
                                    <p>${data.nama}</p>
                                    <p>${data.tempat_tgl_lahir}</p>
                                    <p>${data.alamat?data.alamat:""}</p>
                                    <p>${data.domisili_kec}, ${data.domisili_kab}</p>
                                </div>
                                <div class="col s12 m4 l4" >
                                    <canvas id="qrcode"></canvas>
                                </div>
                            </div>
                            <div class="row valign-wrapper white-text green rounded">
                                <div class="col s12 m12 l12 center">
                                    <p> Kartu ini hanya dapat dipergunakan untuk kepentingan organisasi</p>
                                </div>
                            </div>
                        </div>
                        <div class="card-action right-align">
                            <button id="print" data-target="kta" class="btn white-text green waves-effect waves-green btn-flat" type="button">
                            <span class="fas fa-print"><span> Cetak
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        const widthChangeAction = () => {
                if (window.innerHeight > window.innerWidth) {
                    //portrait
                    $('button#print').hide();
                    $('#dataDiri').removeClass('valign-wrapper');
                    $('#dataDiri').addClass('center-align');
                }
                if (window.innerWidth > window.innerHeight) {
                    //landscape
                    $('button#print').show();
                    $('#dataDiri').addClass('valign-wrapper');
                    $('#dataDiri').removeClass('center-align');
                }
            }
            //document ready
        $(() => {
                widthChangeAction();
            })
            //window resize
        $(window).on('resize', () => {
            widthChangeAction();
        })
        console.log($(window).width());
        $('button#print').on('click', (event) => {
            event.stopPropagation();
            const target = $(event.currentTarget).data('target');
            printJS({ printable: target, type: 'html', targetStyles: ['*'] })
        });
        const QRCanvas = document.getElementById(`qrcode`);
        QRCode.toCanvas(QRCanvas, `No.KTA LSN : ${data.no_kta}`, {
            errorCorrectionLevel: 'H'
        }, (error) => {
            console.log(error);
        });
    }
}
customElements.define('kartu-tanda-anggota', KartuTandaAnggota);