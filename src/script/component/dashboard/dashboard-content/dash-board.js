import Chart from 'chart.js';
import customColor from '../../../helper/color-helper';
import moment from 'moment';
import axios from 'axios';
import kabupaten from '../../../data/kabupaten';

class DashBoard extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        this.id = $(this).attr("id") || "dash-board";
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
    set site(data) {
        this._site = data;
        //this.render();
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

    /**
     * @param  {String} lastColor default null
     * @param  {String} last2Color default null
     * @param  {Array} exclude default []
     */
    randomColor(lastColor = null, last2Color = null, exclude = []) {

        const colors = Object.entries(customColor);
        colors.forEach((value, key) => {
            if (value[0] == lastColor || value[0] == last2Color) {
                colors.splice(key, 1);
            }
            exclude.forEach(item => {
                if (value[0] == item) {
                    colors.splice(key, 1);
                }
            })
        });
        const result = colors[Math.floor(Math.random() * colors.length)];

        return result;
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
        let terdaftarHarian = {
            labels: [],
            data: [],
            color: [],
            totalMember: 0
        };
        let lastColor2 = ``,
            last2Color2 = ``;
        data.domisili_kab.forEach(value => {
            const color = this.randomColor(lastColor1, last2Color1, ['black', 'white']);

            last2Color1 = lastColor1;
            JumlahAnggota.labels.push(value.nama);
            JumlahAnggota.data.push(parseInt(value.amount));
            JumlahAnggota.totalMember = JumlahAnggota.totalMember + parseInt(value.amount);
            JumlahAnggota.color.push(color[1]);
            lastColor1 = color[0];
        });
        data.tgl_gabung.forEach(value => {
            terdaftarHarian.labels.push(moment(value.tgl_join).format('DD/MM/YY'));
            terdaftarHarian.data.push(parseInt(value.amount));
            terdaftarHarian.totalMember = terdaftarHarian.totalMember + parseInt(value.amount);
        })
        $(this).html( /*html*/ `
        <div class="green lighten-5">
            <div class="row d block">
                <div class="col s12 m12 l6">
                    <div class="card medium">
                        <div class="card-content white black-text">
                            <span class="card-title">Anggota LSN</span>
                            <canvas id="chart1" class="chart"></canvas>
                            <h5 id='totMem'>${JumlahAnggota.totalMember}</h5>
                            <p>Total anggota saat ini</p>
                        </div>
                    </div>
                </div>
                <div class="col s12 m12 l6">
                    <div class="card medium">
                        <div class="card-content white black-text">
                            <span class="card-title">Pertumbuhan Anggota</span>
                            <canvas id="chart2" class="chart" ></canvas>
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
        const chart2 = new Chart($('#chart2'), {
            type: 'line',
            data: {
                labels: terdaftarHarian.labels,
                datasets: [{
                    label: 'Terdaftar',
                    data: terdaftarHarian.data,
                    pointBackgroundColor: [
                        customColor.red,
                        customColor.blue,
                        customColor.yellow,
                        customColor.green,
                        customColor.purple,
                        customColor.orange,
                        customColor.red,
                    ],
                    fill: false,
                    backgroundColor: customColor.blue,
                    borderColor: customColor.blue,
                    hoverBorderWidth: 2,
                    hoverBorderColor: customColor.black,
                    borderWidth: 0
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                },
                /*animation:false*/
            }
        })

    }
    membergrowth(data) {
        //still unused
        const result = /*html */ `
        <div class="col s12 m6">
            <div class="card medium">
                <div class="card-content black-text">
                    <span class="card-title">Anggota Lumajang</span>
                    <h3 id='totLum'>5</h3> Pendaftar baru hari ini
                </div>
            </div>
        </div>
        `;
    }
}
customElements.define('dash-board', DashBoard);