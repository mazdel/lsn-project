/**
 * @param  {array} data array data 
 */
const prePost = (data) => {
    return data.reduce((obj, item) => {
        obj[item.name] = item.value;
        return obj;
    }, {});
}
export default prePost;