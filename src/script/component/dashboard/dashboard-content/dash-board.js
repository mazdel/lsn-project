import Chart from 'chart.js';
import customColor from '../../../helper/color-helper';
import moment from 'moment';

class DashBoard extends HTMLElement{
    constructor(){
        super();
    }
    connectedCallback(){
        this.id = $(this).attr("id")||"dash-board";
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
        $(this).html(`
        <div class="green lighten-5">
            <div class="row d block">
                <div class="col s12 m6">
                    <div class="card">
                        <div class="card-content black-text">
                            <span class="card-title">Anggota Lumajang</span>
                            <h3>5</h3> Pendaftar baru hari ini
                        </div>
                    </div>
                </div>
                <div class="col s12 m6">
                    <div class="card">
                        <div class="card-content black-text">
                            <span class="card-title">Anggota Jember</span>
                            <h3>10</h3> Pendaftar baru hari ini
                        </div>
                    </div>
                </div>
                <div class="col s12 m6">
                    <div class="card">
                        <div class="card-content white black-text">
                            <span class="card-title">Anggota LSN</span>
                            <canvas id="chart1" class="chart"></canvas>
                            <h5>180</h5>
                            <p>Total anggota saat ini</p>
                        </div>
                    </div>
                </div>
                <div class="col s12 m6">
                    <div class="card">
                        <div class="card-content white black-text">
                            <span class="card-title">Pertumbuhan Anggota</span>
                            <canvas id="chart2" class="chart" ></canvas>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `);
        const chart1 = new Chart($('#chart1'),{
            type: 'doughnut',
            data: {
                labels: ['Lumajang', 'Jember'],
                datasets: [{
                    data: [80, 100],
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
                    hoverBorderWidth:2,
                    hoverBorderColor:customColor.black,
                    borderWidth: 0
                }]
            },
            options: {
                animation:false
            }
        })
        const chart2 = new Chart($('#chart2'),{
            type: 'line',
            data: {
                labels: [
                    moment().subtract(6,'d').format('DD/MM/YY'),
                    moment().subtract(5,'d').format('DD/MM/YY'),
                    moment().subtract(4,'d').format('DD/MM/YY'),
                    moment().subtract(3,'d').format('DD/MM/YY'),
                    moment().subtract(2,'d').format('DD/MM/YY'),
                    moment().subtract(1,'d').format('DD/MM/YY'),
                    moment().format('DD/MM/YY')
                ],
                datasets: [{
                    label:'Terdaftar',
                    data: [
                        Math.floor(Math.random() * 100),
                        Math.floor(Math.random() * 100),
                        Math.floor(Math.random() * 100),
                        Math.floor(Math.random() * 100),
                        Math.floor(Math.random() * 100),
                        Math.floor(Math.random() * 100),
                        Math.floor(Math.random() * 100)
                    ],
                    pointBackgroundColor: [
                        customColor.red,
                        customColor.blue,
                        customColor.yellow,
                        customColor.green,
                        customColor.purple,
                        customColor.orange,
                        customColor.red,
                    ],
                    fill:false,
                    backgroundColor: customColor.blue,
                    borderColor: customColor.blue,
                    hoverBorderWidth:2,
                    hoverBorderColor:customColor.black,
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
                animation:false
            }
        })
        
    }
}
customElements.define('dash-board',DashBoard);