const kabupaten= ()=>{
    return import(`../../data/data-indonesia-master/kabupaten/35.json`)
    .then(kabupaten =>{
        let promises=[];
        kabupaten.default.forEach((kab,i)=>{
            if(kab.id==3509||kab.id==3508){
                const promise=import(`../../data/data-indonesia-master/kecamatan/${kab.id}.json`)
                            .then(kecamatan=>{
                                const dataKab={
                                    id:kab.id,
                                    nama:kab.nama,
                                    kecamatan:kecamatan.default
                                }
                                return dataKab;
                            })
                promises.push(promise);
            }
        })
        return Promise.all(promises).then(resolveds=>{
            let data=[];
            resolveds.forEach((val,i)=>{
                data.push(val);
            })
            return data;
        });    
    })
}
export default kabupaten;