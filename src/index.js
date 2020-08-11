//import js
import 'regenerator-runtime';
import 'bootstrap';
//import '@fortawesome/fontawesome-free/js/all';
import 'materialize-css/dist/js/materialize.min.js';
//import css
import 'bootstrap/dist/css/bootstrap.min.css';
import 'colors.css/css/colors.css';
import '@fortawesome/fontawesome-free/css/all.css';
import 'materialize-css/dist/css/materialize.min.css';

//import custom js
import main from './script/view/main';
//import custom css
import './style/material-icon.css';
import './style/style.css';
import dashboard from './script/view/dashboard';


$(document).ready(()=>{
    main();
    
    $('.timepicker').timepicker({
        twelveHour:false
    });
    $('.timepicker').datepicker({
        format:'dd/mm/yyyy'
    });
});