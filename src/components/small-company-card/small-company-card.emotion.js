import { css } from '@emotion/core'

export const Card = css`
    // border-radius: 20px;
    width: 250px;
    margin-top: 5px;
    margin-left: -13%;
    -webkit-box-shadow: 6px 10px 31px -17px rgba(0,0,0,0.56);
    -moz-box-shadow: 6px 10px 31px -17px rgba(0,0,0,0.56);
    box-shadow: 6px 10px 31px -17px rgba(0,0,0,0.56);
    border: 1px solid darkblue;
    transition: all .2s ease-in-out;
    cursor: pointer;

    &:hover {
        transform: scale(1.03);
    }

    @media (min-width: 992px) {
        width: 168px;
    }
    @media (min-width: 1200px) {
        width: 250px;
    }
`

export const BodyStyle = {
    paddingTop: '1em',
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
`