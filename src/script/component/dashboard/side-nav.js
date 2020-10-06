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
        //console.log(site);
        let sidemenu = '',
            _group;

        site.dummy.sidenav.forEach(menu => {
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
                    <a href="#user"><img class="circle" src="src/img/avatars/avatar1.png"></a>
                    <a href="#name"><span class="white-text name">John Emblo</span></a>
                    <a href="#email"><span class="white-text email">johnemblo@gmail.com</span></a>
                </div>
            </li>
            ${sidemenu}
            </ul>
            
        `);
        $('.nav-action').each((key, elm) => {
            $(elm).on('click', () => {
                const pageToGo = $(elm).attr('href').substr($(elm).attr('href').indexOf('#') + 1);

                Chart.helpers.each(Chart.instances, function(instance) {
                        instance.destroy();
                    })
                    //console.log($('.chart'));
                const mainContent = document.querySelector("main-content"); //$(`<main-content></main-content>`)[0];
                mainContent.page = pageToGo;
                if ($(window).innerWidth() <= 992) {
                    $('.sidenav').sidenav('close');
                }
                //console.log(`should have to go to `,mainContent);

            });
        });
        $(document).ready(() => {
            $('.sidenav').sidenav({ inDuration: 500, outDuration: 500 });
            $('header').addClass('sideEffect');
            $('main').addClass('sideEffect');
            $('footer').addClass('sideEffect');
            $('a#sidenav-burger-mobile').attr('data-target', 'slide-out');
            sidenavWidescreen();
        });
        $(window).resize(() => {
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
        $('a#sidenav-burger-wide').on('click', () => {
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
}
customElements.define('side-nav', SideNav);