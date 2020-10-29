import site from '../../data/site-data';

class TopNav extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        this.id = $(this).attr("id") || "top-nav";
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

    render() {
        $(this).html( /*html*/ `
        <div class="navbar-fixed">
            <nav class="green darken-1">
            <div class="nav-wrapper green darken-1">
                <div class="row">
                    <div class="col s2 m2 l2">
                        <a href="javascript:;" id="sidenav-burger-wide"  class="show-on-large">
                            <i class="material-icons">menu</i>
                        </a>
                        <a href="javascript:;" id="sidenav-burger-mobile" data-target="slide-out" class="sidenav-trigger">
                            <i class="material-icons">menu</i>
                        </a>
                    </div>
                    <div class="col s5 m5 l5">
                        <a href="#!" class="brand-logo">${site.shortName}</a>
                    </div>
                    <div class="col s5 m5 l5">
                        <ul class="right hide-on-med-and-down">
                        <li></li>
                        <li></li>
                        </ul>
                    </div>
                    
                    
                </div>
            </div>
            </nav>
        </div>
        `);
    }
}
customElements.define('top-nav', TopNav);