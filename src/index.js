//import js
import 'regenerator-runtime';
//import 'bootstrap';
//import '@fortawesome/fontawesome-free/js/all';
import 'materialize-css/dist/js/materialize.min.js';
//import css

//import 'bootstrap/dist/css/bootstrap.min.css';
import 'colors.css/css/colors.css';
import '@fortawesome/fontawesome-free/css/all.css';
import 'materialize-css/dist/css/materialize.min.css';
//import custom css
import './style/material-icon.css';
import './style/style.css';

//import custom js
import main from './script/view/main';

import dashboard from './script/view/dashboard';
import iframe from './script/view/iframe';

$(() => {
    main();

    $('.timepicker').timepicker({
        twelveHour: false
    });
    $('.timepicker').datepicker({
        format: 'dd/mm/yyyy'
    });
});