import axios from 'axios';

import SideNavHelper from '../../helper/sidenav-helper';
import site from '../../data/site-data';
import IconHelper from '../../helper/icon-helper';

class SideNav extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        this.id = $(this).attr("id") || "side-nav";
        this.class = $(this).attr("class") || "";
        $(this).attr("class", this.class);
        this.getsession();
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
    async getsession() {
        /**get session data */
        const axiosOpt = {
            method: 'post',
            url: `${document.baseURI}api/getsession`,
            data: null,
            headers: {
                'Content-type': 'application/json',
            }
        }
        axios(axiosOpt).then(response => {
                const data = response.data.signedin;
                const defaultAvatar = (data.gender == "L") ? "src/img/avatars/avatar1.png" : "src/img/avatars/avatar2.png";
                data.foto_profil = data.foto_profil || defaultAvatar;
                data.nama = data.nama || data.username || data.nik;

                Object.entries(data).forEach((data) => {
                    sessionStorage.setItem(data[0], data[1]);
                });

                this.render(data);
            })
            .catch(error => {
                console.log(error);
            })
            /**./get session data */
    }
    render(data = { level: 'anggota' }) {
        //console.log(site);
        let sidemenu = '',
            _group;
        const sidemenuData = site.dummy.sidenav[data.level];
        sidemenuData.forEach(menu => {
            let icon = IconHelper.icon(menu.icon, menu.icon_type);

            //shorthand untuk mengisi variabel _group apabila masih kosong
            _group = _group ? _group : menu.group;
            if (_group != menu.group) {
                sidemenu += `<li><div class="divider"></div></li>`;
            }
            sidemenu += `
                <li>
                    <a class="waves-effect nav-action" href="${menu.href}">${icon}${menu.name}</a>
                </li>
            `;
            _group = menu.group;
        });
        //console.log(sidemenu);
        $(this).html( /*html*/ `
            <ul id="slide-out" class="sidenav sidenav-fixed">
            <li>
                <div class="user-view">
                    <div class="background">
                    <img src="src/img/lsn-banner.jpg">
                    </div>
                    <img id="fotoProfil" class="circle" src="${data.foto_profil}">
                    <span id="nama" class="white-text name">${data.nama}</span>
                    <span id="phone" class="white-text email">${data.telp}</span>
                </div>
            </li>
            ${sidemenu}
            </ul>
            
        `);
        $('.nav-action').each((key, elm) => {
            $(elm).on('click', (event) => {
                event.stopPropagation();
                const pageToGo = $(elm).attr('href').substr($(elm).attr('href').indexOf('#') + 1);
                if (pageToGo == 'signout') {
                    this.signout().then(data => {
                        if (data.status) {
                            sessionStorage.clear();
                            window.location.replace(`${document.baseURI}${data.response.redirect}`);
                        }
                    })
                } else {
                    Chart.helpers.each(Chart.instances, function(instance) {
                            instance.destroy();
                        })
                        //console.log($('.chart'));
                    const mainContent = document.querySelector("main-content");
                    mainContent.page = pageToGo;
                    if ($(window).innerWidth() <= 992) {
                        $('.sidenav').sidenav('close');
                    }
                }
            });
        });

        $(() => {

            $('.sidenav').sidenav({ inDuration: 500, outDuration: 500 });
            $('header').addClass('sideEffect');
            $('main').addClass('sideEffect');
            $('footer').addClass('sideEffect');
            $('a#sidenav-burger-mobile').attr('data-target', 'slide-out');
            sidenavWidescreen();
        });
        $(window).on(`resize`, (event) => {
            event.stopPropagation();
            sidenavWidescreen();
        })

        const sidenavWidescreen = () => {
            if ($(window).innerWidth() > 992) {
                $('a#sidenav-burger-wide').show();
                $('ul.sidenav').addClass('smoothly');
                $('header').addClass('smoothly');
                $('main').addClass('smoothly');
                $('footer').addClass('smoothly');
            } else {
                $('a#sidenav-burger-wide').hide();
                $('ul.sidenav').removeClass('smoothly');
                $('header').removeClass('smoothly');
                $('main').removeClass('smoothly');
                $('footer').removeClass('smoothly');
            }
        }

        ///fungsi side-menu untuk layar lebar (>992px)
        $('a#sidenav-burger-wide').on('click', (event) => {
            event.stopPropagation();
            const sidenav = M.Sidenav.getInstance($('.sidenav#slide-out'));
            //console.log(sidenav.isFixed);
            if (sidenav.isOpen) {
                $('header').removeClass('sideEffect');
                $('main').removeClass('sideEffect');
                $('footer').removeClass('sideEffect');

                //$('ul.sidenav').removeClass('sidenav-fixed');
                $('.sidenav').sidenav('close');
                $('.smoothly').find('.smoothly div').css({ 'width': '100%' });
                console.log($('.sideEffect').width());
                sidenav.isFixed = false;
                sidenav.close()
            } else {
                $('header').addClass('sideEffect');
                $('main').addClass('sideEffect');
                $('footer').addClass('sideEffect');
                console.log($('.sideEffect').width());
                $('.smoothly').find('.smoothly div').css({ 'width': $('.sideEffect').width() - 300 + 'px' });
                //$('ul.sidenav').addClass('sidenav-fixed');
                sidenav.isFixed = true;
                sidenav.open();
            }

        })


    }
    async signout() {
        const axiosOpt = {
            method: 'post',
            url: `${document.baseURI}api/signout`,
            data: null,
            headers: {
                'Content-type': 'application/json',
            }
        }
        try {
            const response = await axios(axiosOpt);
            console.log(response);
            return response.data;

        } catch (error) {
            console.log(error.response);
        }

    }

}
customElements.define('side-nav', SideNav);