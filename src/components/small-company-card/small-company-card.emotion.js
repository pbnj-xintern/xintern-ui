import { css } from '@emotion/core'
import hover from '../../globals/hover'

export const Card = css`
    // border-radius: 20px;
    width: 250px;
    // margin-top: 5px;
    // margin-left: -13%;
    transition: all .2s ease-in-out;
    cursor: pointer;
    border: 1px solid rgba(0,0,0,0.1);

    &:hover {
        ${hover.transformScale}
        ${hover.primaryBorders}
        ${hover.shadow}
    }

    @media (min-width: 992px) {
        width: 168px;
    }
    @media (min-width: 1200px) {
        width: 250px;
    }
`

export const BodyStyle = {
    paddingTop: '0',
    paddingBottom: 0,
    paddingLeft: 0,
    paddingRight: 0,
}

export const ImageContainer = css`
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    height: 150px;
    width: 150px;
`
export const LogoImage = css`
    max-width:100px;
    height: auto;
    // object-fit: contain;
`