const site = {
    name :'SISMANA Laskar Sholawat Nusantara',
    shortName : 'SISMANA LSN',
    version :'0.0.1a',
    dummy:{
        sidenav:[
            {
                id:1,
                name:'Dashboard',
                href:'#dashboard',
                icon:'dashboard',
                icon_type:'material',
                group:'1',
                parent:''
            },
            {
                id:2,
                name:'Userlist',
                href:'#userlist',
                icon:'people',
                icon_type:'material',
                group:'1',
                parent:''
            },
            {
                id:3,
                name:'Pengaturan',
                href:'#',
                icon:'settings',
                icon_type:'material',
                group:'2',
                parent:''
            },
            {
                id:4,
                name:'Sign Out',
                href:'index.html',
                icon:'fa fa-sign-out-alt',
                icon_type:'fontawesome',
                group:'2',
                parent:''
            }
        ]
    }
}
export default site;