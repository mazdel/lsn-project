class SignIn extends HTMLElement{
    constructor(){
        super();
    }
    connectedCallback(){
        this.id = $(this).attr("id")||"sign-in";
        this.class = $(this).attr("class")||"container";
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
        
        //generate html
        $(this).html(/*html*/`
        <div class="col s12 m6">
            <div class="card">
                <div class="card-image">
                    <img src="./src/img/lsn-banner.jpg">
                </div>
                <div class="card-content">
                    <form class="login-form" >
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
                                <input required class="validate" name="username" id="username" type="text" pattern="[0-9]{16}" title="16 nomor NIK">
                                <label for="username" data-error="wrong" data-success="right">Nomor Induk Kependudukan</label>
                            </div>
                        </div>
                        <div class="row">
                            <div class="input-field col s12">
                                <i class="material-icons prefix">lock_outline</i>
                                <input required id="password" name="password" type="password">
                                <label for="password">Kata Sandi</label>
                            </div>
                        </div>
                        <div class="row">          
                            <div class="input-field col s12 m12 l12  login-text">
                                <label for="remember-me">
                                    <input type="checkbox" name="rememberMe" id="remember-me" />
                                    <span>Ingat saya</span>
                                </label>
                            </div>
                        </div>
                        <div class="row">
                            <div class="input-field col s12">
                                <a href="/dashboard.html" id="btn-login" class="btn green darken-1 waves-effect waves-light col s12 spage-action">Masuk</a>
                            </div>
                        </div>
                        <div class="row">
                            <div class="input-field col s6 m6 l6">
                                <p class="margin medium-small"><a class="green-text spage-action" href="#signup">Daftar Sekarang!</a></p>
                            </div>
                            <div class="input-field col s6 m6 l6">
                                <p class="margin right-align medium-small"><a class="green-text spage-action" href="#forgot" >Lupa kata sandi?</a></p>
                            </div>          
                        </div>
                    </form>
                </div>
            </div>
        </div>
        `);
    }
}
customElements.define('sign-in',SignIn);