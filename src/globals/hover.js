const color = require( './colors')
const HOVER =  {
    shadow: `-webkit-box-shadow: 6px 10px 31px -17px rgba(0,0,0,0.56);
    -moz-box-shadow: 6px 10px 31px -17px rgba(0,0,0,0.56);
    box-shadow: 6px 10px 31px -17px rgba(0,0,0,0.56);
    box-shadow: inset 0 0 20px rgba(0, 0, 0, .01), 0 0 20px rgba(0, 0, 0, .2);
    `,
    primaryBorders : `border: 1px solid ${color.primary};`,
    transformScale: 'transform: scale(1.03);',
}




module.exports = HOVER;