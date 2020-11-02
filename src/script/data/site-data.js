const basepath = `${location.origin}${location.pathname}`;
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
                    href: `${basepath}` + '#dashboard',
                    icon: 'dashboard',
                    icon_type: 'material',
                    group: '1',
                    parent: ''
                },
                {
                    id: 2,
                    name: 'Daftar Anggota',
                    href: `${basepath}` + '#userlist',
                    icon: 'people',
                    icon_type: 'material',
                    group: '1',
                    parent: ''
                },
                {
                    id: 3,
                    name: 'Pengaturan Profil',
                    href: `${basepath}` + '#profil',
                    icon: 'person',
                    icon_type: 'material',
                    group: '2',
                    parent: ''
                },
                {
                    id: 4,
                    name: 'Kartu Anggota',
                    href: `${basepath}` + '#kta',
                    icon: 'contacts',
                    icon_type: 'material',
                    group: '2',
                    parent: ''
                },
                {
                    id: 5,
                    name: 'Sign Out',
                    href: `${basepath}` + '#signout',
                    icon: 'fa fa-sign-out-alt',
                    icon_type: 'fontawesome',
                    group: '3',
                    parent: ''
                }
            ],
            anggota: [{
                    id: 1,
                    name: 'Profil Saya',
                    href: `${basepath}` + '#profil',
                    icon: 'person',
                    icon_type: 'material',
                    group: '1',
                    parent: ''
                },
                {
                    id: 2,
                    name: 'Kartu Anggota',
                    href: `${basepath}` + '#kta',
                    icon: 'contacts',
                    icon_type: 'material',
                    group: '1',
                    parent: ''
                },
                {
                    id: 3,
                    name: 'Sign Out',
                    href: `${basepath}` + '#signout',
                    icon: 'fa fa-sign-out-alt',
                    icon_type: 'fontawesome',
                    group: '2',
                    parent: ''
                }
            ]
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