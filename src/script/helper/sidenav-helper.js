class SidenavHelper{
    /**
     * 
     * @param {string} target navigation target, example '.nav-action'
     * @param {string} event jquery event
     * @param {Function} action function to be run 
     */
    static navAction(target,event,action){
        $(target).each((key,elm)=>{
            $(elm).on(event,action);
        });
    }
}
export default SidenavHelper;