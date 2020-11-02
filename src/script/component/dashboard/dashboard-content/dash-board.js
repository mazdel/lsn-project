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
    render(data) {
        //console.log(data);
        let dougnutChart = {
            labels: [],
            data: [],
            totalMember: 0
        };
        let lineChart = {
            labels: [],
            data: [],
            totalMember: 0
        }
        data.domisili_kab.forEach(value => {
            dougnutChart.labels.push(value.nama);
            dougnutChart.data.push(parseInt(value.amount));
            dougnutChart.totalMember = dougnutChart.totalMember + parseInt(value.amount);
        });
        data.tgl_gabung.forEach(value => {
            lineChart.labels.push(moment(value.tgl_join).format('DD/MM/YY'));
            lineChart.data.push(parseInt(value.amount));
            lineChart.totalMember = lineChart.totalMember + parseInt(value.amount);
        })
        $(this).html( /*html*/ `
        <div class="green lighten-5">
            <div class="row d block">
                <div class="col s12 m6">
                    <div class="card medium">
                        <div class="card-content white black-text">
                            <span class="card-title">Anggota LSN</span>
                            <canvas id="chart1" class="chart"></canvas>
                            <h5 id='totMem'>${dougnutChart.totalMember}</h5>
                            <p>Total anggota saat ini</p>
                        </div>
                    </div>
                </div>
                <div class="col s12 m6">
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
        /** data dummy
        const jember = Math.floor(Math.random() * 100);
        const lumajang = Math.floor(Math.random() * 100);
        $('#totJem').text(jember);
        $('#totLum').text(lumajang);
        $('#totMem').text(jember + lumajang);
        */
        const chart1 = new Chart($('#chart1'), {
            type: 'doughnut',
            data: {
                labels: dougnutChart.labels,
                datasets: [{
                    data: dougnutChart.data,
                    backgroundColor: [
                        customColor.red,
                        customColor.blue,
                        customColor.yellow,
                        customColor.green,
                        customColor.purple,
                        customColor.orange
                    ],
                    borderColor: [
                        customColor.red,
                        customColor.blue,
                        customColor.yellow,
                        customColor.green,
                        customColor.purple,
                        customColor.orange
                    ],
                    hoverBorderWidth: 2,
                    hoverBorderColor: customColor.black,
                    borderWidth: 0
                }]
            },
            options: {
                /*animation:false*/
            }
        })
        const chart2 = new Chart($('#chart2'), {
            type: 'line',
            data: {
                labels: lineChart.labels,
                datasets: [{
                    label: 'Terdaftar',
                    data: lineChart.data,
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