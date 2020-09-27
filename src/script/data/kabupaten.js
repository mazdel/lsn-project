const kabupaten = (id = 35) => {
    return import (`../../data/data-indonesia-master/kabupaten/${id}.json`)
        .then(kabupaten => {
            let sub_districts = [];
            kabupaten.default.forEach((kab, i) => {
                //if (kab.id == 3509 || kab.id == 3508) {
                const sub_district =
                    import (`../../data/data-indonesia-master/kecamatan/${kab.id}.json`)
                    .then(kecamatan => {
                        const dataKab = {
                            id: kab.id,
                            nama: kab.nama,
                            kecamatan: kecamatan.default
                        }
                        return dataKab;
                    })
                sub_districts.push(sub_district);
                //}
            })
            return Promise.all(sub_districts).then(resolveds => {
                let data = [];
                resolveds.forEach((val, i) => {
                    data.push(val);
                })
                return data;
            });
        })
}
export default kabupaten;