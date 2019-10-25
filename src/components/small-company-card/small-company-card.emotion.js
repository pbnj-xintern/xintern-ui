import { css } from '@emotion/core'

export const Card = css`
    border-radius:20px;
    width: 250px;
    margin-top: 5px;
    -webkit-box-shadow: 6px 10px 31px -17px rgba(0,0,0,0.56);
    -moz-box-shadow: 6px 10px 31px -17px rgba(0,0,0,0.56);
    box-shadow: 6px 10px 31px -17px rgba(0,0,0,0.56);
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
    max-width:150px;
    height: auto;
`