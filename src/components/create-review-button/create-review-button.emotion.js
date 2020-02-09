import { css } from '@emotion/core'
import colors from '../../globals/colors'
import hover from '../../globals/hover'

export const ButtonStyles = css`
    z-index: 5;
    width: 4em;
    height: 4em;
    position: fixed;
    // left: 91%;
    // top: 85%;
    bottom: 4em;
    right: 2em;
    border-color: ${colors.primary} !important;
    transition: all 0.2s ease-in;
    box-shadow: 6px 10px 31px -17px rgba(0,0,0,0.56);

    &:hover {
        ${hover.transformScale}
    }
`

export const IconStyles = css`
    font-size: 2em; 
    height: fit-content;
    padding-top: 4%;
    color: ${colors.primary};
`