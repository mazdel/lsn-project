import customColor from './color-helper';
/**
 * @param  {String} lastColor default null
 * @param  {String} last2Color default null
 * @param  {Array} exclude default []
 */
const randomColor = (lastColor = null, last2Color = null, exclude = []) => {

    const colors = Object.entries(customColor);
    colors.forEach((value, key) => {
        if (value[0] == lastColor || value[0] == last2Color) {
            colors.splice(key, 1);
        }
        exclude.forEach(item => {
            if (value[0] == item) {
                colors.splice(key, 1);
            }
        })
    });
    const result = colors[Math.floor(Math.random() * colors.length)];

    return result;
}
export default randomColor;