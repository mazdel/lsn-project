//import web component
import '../component/dashboard/top-nav';
import '../component/dashboard/side-nav';
import '../component/dashboard/main-content';
import '../component/dashboard/footer-credit';

import PageHelper from '../helper/page-helper';

let page = window.location.hash.substr(1);
const contentPage = document.querySelector('main-content');

const dashboard = () => {

    const content = new PageHelper(contentPage);

    content.loadPage(page);

}
$(() => {
    dashboard();
})
export default dashboard;