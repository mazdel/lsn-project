import axios from 'axios';
import prePost from '../../helper/api-helper';

class SignIn extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        this.id = $(this).attr("id") || "sign-in";
        this.class = $(this).attr("class") || "";
        $(this).attr("class", this.class);
        this.render();
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
    render() {

        //generate html
        $(this).html( /*html*/ `
        <div class="container">
        <div class="col s12 m6">
            <div class="card">
                <div class="card-image">
                    <img src="./src/img/lsn-banner.jpg">
                </div>
                <div class="card-content">
                    <form class="signin-form" id="signin" method="post" >
                        <div class="row">
                            <div class="input-field col s12">
                                <div class="form-title">
                                    <h5>Selamat Datang di ${this._site.name}</h5>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="input-field col s12">
                                <i class="material-icons prefix">person_outline</i>
                                <input required class="validate" name="username" id="username" type="text" title="16 nomor NIK atau username Anda">
                                <label for="username" data-error="wrong" data-success="right">Nomor Induk Kependudukan</label>
                                <span class="helper-text">Helper text</span>
                            </div>
                        </div>
                        <div class="row">
                            <div class="input-field col s12">
                                <i class="material-icons prefix">lock_outline</i>
                                <input required id="password" name="password" type="password">
                                <label for="password">Kata Sandi</label>
                                <span class="helper-text">Helper text</span>
                            </div>
                        </div>
                        <div class="row">          
                            <div class="input-field col s12 m12 l12  login-text">
                                <!--
                                <label for="remember-me">
                                    <input type="checkbox" name="rememberMe" id="remember-me" />
                                    <span>Ingat saya</span>
                                </label>
                                -->
                            </div>
                        </div>
                        <div class="row">
                            <div class="input-field col s12">
                                <button type="submit" id="btn-signin" class="btn green darken-1 waves-effect waves-light col s12" form="signin">Masuk</button>
                            </div>
                            <div class="progress" id="loading">
                                <div class="indeterminate green darken-3"></div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="input-field col s6 m6 l6">
                                <p class="margin medium-small"><a class="green-text spage-action" href="#signup">Anda belum punya akun? Daftar Sekarang!</a></p>
                            </div>
                            <div class="input-field col s6 m6 l6">
                                <!--
                                <p class="margin right-align medium-small"><a class="green-text spage-action" href="#forgot" >Lupa kata sandi?</a></p>
                                -->
                            </div>          
                        </div>
                    </form>
                </div>
            </div>
        </div>
        </div>
        `);
        $(() => {
            $('#loading').hide();
            $(`input`).siblings('span').hide();
            if (sessionStorage.getItem('nik')) {
                $('#btn-signin').text('Signed in');
            }

        })
        $('form#signin').on('submit', (event) => {
            event.preventDefault();
            const btn_signin = event.originalEvent.submitter;
            const data = prePost($('form#signin').serializeArray());
            $(`input`).siblings('span').hide();

            $('#loading').show();
            const axiosOpt = {
                method: 'post',
                url: `${document.baseURI}api/signin`,
                data: data,
                headers: {
                    'Content-type': 'application/json',
                }
            }
            axios(axiosOpt).then(response => {
                const data = response.data;
                if (data.status === true) {

                    $(btn_signin).text(`${data.response}`);
                    setTimeout(() => {
                        location.href = `${location.origin}${location.pathname}${data.redirect}`;
                    }, 1000);
                } else {
                    for (const key in data.response) {
                        if (data.response.hasOwnProperty(key)) {
                            const message = data.response[key];
                            const msgElement = $(`input#${key}`).siblings('span');
                            msgElement.text(`${message}`);
                            msgElement.show();

                        }
                    }
                }
                $('#loading').hide();
            }).catch(error => {
                console.error(error);
            })
        })
    }
}
customElements.define('sign-in', SignIn);