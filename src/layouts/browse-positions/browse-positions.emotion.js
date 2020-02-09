import { css } from '@emotion/core'
import hover from '../../globals/hover'
export const PositionCard = css`

transition: all .2s ease-in-out;
cursor: pointer;

&:hover {
    ${hover.primaryBorders}
    ${hover.shadow}
    ${hover.transformScale}
}

`