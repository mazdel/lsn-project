//import web component
import '../component/dashboard/top-nav';
import '../component/dashboard/side-nav';
import '../component/dashboard/main-content';
import '../component/dashboard/footer-credit';

import PageHelper from '../helper/page-helper';

let page = window.location.hash.substr(1);
const path = window.location.pathname.substr(1);
const contentPage = document.querySelector('main-content');

const dashboard =()=>{
    //console.log('loll');
    const content = new PageHelper(contentPage);
    if(path=='dashboard.html'){
        content.loadPage(page);
    }
}
$(document).ready(()=>{
    dashboard();
})
export default dashboard;