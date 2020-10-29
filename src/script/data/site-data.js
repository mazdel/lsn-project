const site = {
    name: 'SISMANA Laskar Sholawat Nusantara',
    shortName: 'SISMANA LSN',
    version: '0.0.1a',
    publicPath: 'http://localhost:8081/',
    dummy: {
        sidenav: {
            admin: [{
                    id: 1,
                    name: 'Dashboard',
                    href: `${location.origin}${location.pathname}` + '#dashboard',
                    icon: 'dashboard',
                    icon_type: 'material',
                    group: '1',
                    parent: ''
                },
                {
                    id: 2,
                    name: 'Userlist',
                    href: `${location.origin}${location.pathname}` + '#userlist',
                    icon: 'people',
                    icon_type: 'material',
                    group: '1',
                    parent: ''
                },
                {
                    id: 3,
                    name: 'Pengaturan',
                    href: `${location.origin}${location.pathname}` + '#',
                    icon: 'settings',
                    icon_type: 'material',
                    group: '2',
                    parent: ''
                },
                {
                    id: 4,
                    name: 'Sign Out',
                    href: 'index.html',
                    icon: 'fa fa-sign-out-alt',
                    icon_type: 'fontawesome',
                    group: '2',
                    parent: ''
                }
            ],
        },
        user: [{
                id: 1,
                name: 'admin',
                nik: '123456',
                password: 'diadmini',
                fullname: 'ngadimin',
                telp: '08999991919',
                domisili_kab: 'KAB. JEMBER',
                domisili_kec: 'KENCONG',
            },
            {
                id: 2,
                name: 'john',
                nik: '123456',
                password: 'diadmini',
                fullname: 'john emblo',
                telp: '08999991919',
                domisili_kab: 'KAB. LUMAJANG',
                domisili_kec: 'TEMPEH',
            },
            {
                id: 3,
                name: 'ECLAIR',
                nik: '123456',
                password: 'diadmini',
                fullname: 'eclair bin sutakir',
                telp: '08999991919',
                domisili_kab: 'KAB. JEMBER',
                domisili_kec: 'BALUNG',
            }
        ]
    }
}
export default site;