//import web component
import '../component/sign-page/sign-page';
import './dashboard';
import PageHelper from '../helper/page-helper';

let page = window.location.hash.substr(1);
const path = window.location.pathname.substr(1);
const signPage = document.querySelector('sign-page');
//generate event ketika tombol .cstm-action di klik


const main =()=>{
    const fpage = new PageHelper(signPage);
    if(path.length==0 ||path=='index.html'){
        fpage.loadPage(page);
    }
}
export default main;