import Chart from 'chart.js';
import customColor from '../../helper/color-helper';
import randomColor from '../../helper/randomColor-helper';
import moment from 'moment';
import axios from 'axios';
import kabupaten from '../../data/kabupaten';

class IFrame extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        this.id = $(this).attr("id") || "";
        this.class = $(this).attr("class") || "";
        $(this).attr("class", this.class);
        this.dataDashboard();
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
    dataDashboard() {
        const axiosOpt = {
            method: 'get',
            url: `${document.baseURI}api/getdashboard`,
            data: null,
            headers: {
                'Content-type': 'application/json',
            }
        }
        axios(axiosOpt).then(async response => {
            const data = response.data.response;
            //console.log('data', data);
            const kab = await kabupaten();
            let kabupatenAll = [];
            kab.forEach(kab => {
                data.domisili_kab.forEach((kab2, key) => {
                    if (kab.id == kab2.domisili_kab) {
                        kabupatenAll[key] = {
                            id: kab2.domisili_kab,
                            nama: kab.nama,
                            amount: kab2.amount
                        }

                    }
                });

            });
            data.domisili_kab = kabupatenAll;

            this.render(data);
        })

        /**./get session data */
    }
    render(data) {
        let JumlahAnggota = {
            labels: [],
            data: [],
            color: [],
            totalMember: 0
        };
        let lastColor1 = ``,
            last2Color1 = ``;

        data.domisili_kab.forEach(value => {
            const color = randomColor(lastColor1, last2Color1, ['black', 'white']);

            last2Color1 = lastColor1;
            JumlahAnggota.labels.push(value.nama);
            JumlahAnggota.data.push(parseInt(value.amount));
            JumlahAnggota.totalMember = JumlahAnggota.totalMember + parseInt(value.amount);
            JumlahAnggota.color.push(color[1]);
            lastColor1 = color[0];
        });
        this.innerHTML = ( /*html*/ `
        <div class="green lighten-5">
            <div class="row d block">
                <div class="col s12 m12 l12">
                    <div class="card">
                        <div class="card-content white black-text">
                            <span class="card-title">Anggota LSN</span>
                            <canvas id="chart1" class="chart"></canvas>
                            <h5 id='totMem'>${JumlahAnggota.totalMember}</h5>
                            <p>Total anggota saat ini</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `);

        const chart1 = new Chart($('#chart1'), {
            type: 'bar',
            data: {
                labels: JumlahAnggota.labels,
                datasets: [{
                    data: JumlahAnggota.data,
                    label: `# Anggota`,
                    backgroundColor: JumlahAnggota.color,
                    borderColor: customColor.black,
                    hoverBorderWidth: 1,
                    hoverBorderColor: customColor.black,
                    borderWidth: 1
                }]
            },
            options: {
                /*animation:false*/
            }
        })
    }
}
customElements.define('i-frame', IFrame);