class IconHelper{
    /**
     * 
     * @param {string} icon icon that you want to process 
     * @param {string} type icon type, you can choose only (material|fontawesome) for now
     */
    static icon(icon,type='material'){
        let result = '';
        if(icon){
            switch(type){
                case 'material':
                    result=`<i class="material-icons">${icon}</i>`;
                    break;
                case 'fontawesome':
                    result=`<i class="${icon}"></i>`;
                    break;
            }
        }
        return result;
    }
}
export default IconHelper;