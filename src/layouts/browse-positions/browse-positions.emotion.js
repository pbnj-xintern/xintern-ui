import { css } from '@emotion/core'

export const PositionCard = css`

transition: all .2s ease-in-out;
cursor: pointer;

&:hover {
    transform: scale(1.03);
    -webkit-box-shadow: 6px 10px 31px -17px rgba(0,0,0,0.56);
    -moz-box-shadow: 6px 10px 31px -17px rgba(0,0,0,0.56);
    box-shadow: 6px 10px 31px -17px rgba(0,0,0,0.56);
    border: 1px solid darkblue;
}

`