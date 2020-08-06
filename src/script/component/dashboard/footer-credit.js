import site from '../../data/site-data';
import './dashboard-content/dash-board';
import './dashboard-content/user-list';
import moment from 'moment';

class FooterCredit extends HTMLElement{
    constructor(){
        super();
    }
    connectedCallback(){
        this.id = $(this).attr("id")||"footer-credit";
        this.class = $(this).attr("class")||"";
        $(this).attr("class",this.class);
        this._page='dashboard';
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
    set page(pagex){
        this._page=pagex;
        this.render();
    }
    render(){
        const fromYear = moment('2020','YYYY').format('YYYY');
        const thisYear = moment().format('YYYY');
        $(this).html(`
        <footer class="page-footer green darken-1" style="padding-top:0">
            <div class="footer-copyright">
                <div class="container">
                © ${fromYear} by 
                <a class="grey-text text-lighten-4" href="t.me/delyachmad">delyachmad</a>
                </div>
            </div>
        </footer>
        `);
    }
}
customElements.define('footer-credit',FooterCredit);